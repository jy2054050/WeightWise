import type { Express } from "express";
import { createServer, type Server } from "http";
import { weightCheckSchema, growthCheckSchema, type WeightResult, type GrowthResult } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Weight calculation endpoint (backward compatibility)
  app.post("/api/calculate-weight", async (req, res) => {
    try {
      const validatedData = weightCheckSchema.parse(req.body);
      const { age, gender, weight } = validatedData;
      
      // Calculate percentile using WHO growth standards
      const result = calculateWeightPercentile(age, gender, weight);
      
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  // Comprehensive growth calculation endpoint
  app.post("/api/calculate-growth", async (req, res) => {
    try {
      const validatedData = growthCheckSchema.parse(req.body);
      const { age, gender, weight, height, headCircumference } = validatedData;
      
      // Calculate percentiles for all provided measurements
      const result = calculateGrowthPercentiles(age, gender, { weight, height, headCircumference });
      
      res.json(result);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// ===== WHO GROWTH DATA TABLES =====

// WHO Weight-for-Age percentile data (kg)
const boysWeightData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.9, p97: 4.4 },
  1: { p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
  2: { p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
  3: { p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
  4: { p3: 5.6, p15: 6.2, p50: 7.0, p85: 7.8, p97: 8.7 },
  5: { p3: 6.0, p15: 6.7, p50: 7.5, p85: 8.4, p97: 9.3 },
  6: { p3: 6.4, p15: 7.1, p50: 7.9, p85: 8.8, p97: 9.8 },
  9: { p3: 7.1, p15: 7.8, p50: 8.6, p85: 9.6, p97: 10.5 },
  12: { p3: 7.7, p15: 8.4, p50: 9.6, p85: 10.8, p97: 12.0 },
  15: { p3: 8.3, p15: 9.0, p50: 10.3, p85: 11.7, p97: 13.1 },
  18: { p3: 8.8, p15: 9.6, p50: 10.9, p85: 12.4, p97: 14.1 },
  24: { p3: 9.7, p15: 10.5, p50: 12.2, p85: 14.3, p97: 16.3 },
  30: { p3: 10.4, p15: 11.3, p50: 13.3, p85: 15.7, p97: 18.3 },
  36: { p3: 11.0, p15: 12.0, p50: 14.2, p85: 16.9, p97: 20.0 },
  42: { p3: 11.6, p15: 12.6, p50: 15.0, p85: 18.0, p97: 21.5 },
  48: { p3: 12.1, p15: 13.1, p50: 15.7, p85: 19.0, p97: 22.9 },
  54: { p3: 12.6, p15: 13.7, p50: 16.4, p85: 19.9, p97: 24.2 },
  60: { p3: 13.1, p15: 14.2, p50: 17.0, p85: 20.7, p97: 25.4 }
};

// Girls data (weight in kg by month)
const girlsWeightData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 2.4, p15: 2.8, p50: 3.2, p85: 3.7, p97: 4.2 },
  1: { p3: 3.2, p15: 3.6, p50: 4.2, p85: 4.8, p97: 5.5 },
  2: { p3: 3.9, p15: 4.5, p50: 5.1, p85: 5.8, p97: 6.6 },
  3: { p3: 4.5, p15: 5.2, p50: 5.8, p85: 6.6, p97: 7.5 },
  4: { p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.3, p97: 8.2 },
  5: { p3: 5.4, p15: 6.1, p50: 6.9, p85: 7.8, p97: 8.8 },
  6: { p3: 5.7, p15: 6.5, p50: 7.3, p85: 8.2, p97: 9.3 },
  9: { p3: 6.4, p15: 7.0, p50: 8.0, p85: 9.0, p97: 10.2 },
  12: { p3: 7.0, p15: 7.6, p50: 8.9, p85: 10.1, p97: 11.5 },
  15: { p3: 7.4, p15: 8.1, p50: 9.6, p85: 11.0, p97: 12.6 },
  18: { p3: 7.8, p15: 8.6, p50: 10.2, p85: 11.8, p97: 13.7 },
  24: { p3: 8.5, p15: 9.4, p50: 11.5, p85: 13.5, p97: 15.8 },
  30: { p3: 9.1, p15: 10.1, p50: 12.5, p85: 15.0, p97: 17.6 },
  36: { p3: 9.6, p15: 10.7, p50: 13.3, p85: 16.3, p97: 19.2 },
  42: { p3: 10.1, p15: 11.3, p50: 14.0, p85: 17.4, p97: 20.7 },
  48: { p3: 10.5, p15: 11.8, p50: 14.6, p85: 18.4, p97: 22.1 },
  54: { p3: 11.0, p15: 12.3, p50: 15.2, p85: 19.3, p97: 23.5 },
  60: { p3: 11.4, p15: 12.7, p50: 15.8, p85: 20.2, p97: 24.9 }
};

// WHO Height/Length-for-Age percentile data (cm)
const boysHeightData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 46.1, p15: 47.5, p50: 49.9, p85: 52.3, p97: 53.7 },
  1: { p3: 50.8, p15: 52.3, p50: 54.7, p85: 57.1, p97: 58.6 },
  2: { p3: 54.4, p15: 56.0, p50: 58.4, p85: 60.8, p97: 62.4 },
  3: { p3: 57.3, p15: 59.0, p50: 61.4, p85: 63.9, p97: 65.5 },
  4: { p3: 59.7, p15: 61.5, p50: 63.9, p85: 66.4, p97: 68.0 },
  5: { p3: 61.7, p15: 63.6, p50: 66.0, p85: 68.5, p97: 70.1 },
  6: { p3: 63.3, p15: 65.3, p50: 67.6, p85: 70.1, p97: 71.9 },
  9: { p3: 67.0, p15: 69.1, p50: 71.7, p85: 74.5, p97: 76.5 },
  12: { p3: 71.0, p15: 73.2, p50: 76.1, p85: 79.3, p97: 81.5 },
  15: { p3: 74.8, p15: 77.1, p50: 80.2, p85: 83.6, p97: 86.0 },
  18: { p3: 78.0, p15: 80.5, p50: 83.9, p85: 87.7, p97: 90.4 },
  24: { p3: 82.3, p15: 85.1, p50: 89.2, p85: 93.9, p97: 97.3 },
  30: { p3: 85.7, p15: 88.7, p50: 93.2, p85: 98.3, p97: 102.0 },
  36: { p3: 88.7, p15: 91.9, p50: 96.5, p85: 102.0, p97: 106.1 },
  42: { p3: 91.4, p15: 94.7, p50: 99.3, p85: 105.0, p97: 109.4 },
  48: { p3: 93.9, p15: 97.3, p50: 102.0, p85: 107.7, p97: 112.5 },
  54: { p3: 96.2, p15: 99.7, p50: 104.4, p85: 110.2, p97: 115.2 },
  60: { p3: 98.3, p15: 102.0, p50: 106.6, p85: 112.5, p97: 117.7 }
};

const girlsHeightData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 45.4, p15: 46.8, p50: 49.1, p85: 51.4, p97: 52.9 },
  1: { p3: 49.8, p15: 51.3, p50: 53.7, p85: 56.1, p97: 57.6 },
  2: { p3: 53.0, p15: 54.6, p50: 57.1, p85: 59.5, p97: 61.1 },
  3: { p3: 55.6, p15: 57.3, p50: 59.8, p85: 62.4, p97: 64.0 },
  4: { p3: 57.8, p15: 59.5, p50: 62.1, p85: 64.8, p97: 66.4 },
  5: { p3: 59.6, p15: 61.4, p50: 64.0, p85: 66.8, p97: 68.5 },
  6: { p3: 61.2, p15: 63.0, p50: 65.7, p85: 68.6, p97: 70.3 },
  9: { p3: 64.7, p15: 66.6, p50: 69.4, p85: 72.6, p97: 74.7 },
  12: { p3: 68.9, p15: 71.0, p50: 74.0, p85: 77.5, p97: 80.0 },
  15: { p3: 72.8, p15: 75.0, p50: 78.2, p85: 82.0, p97: 84.9 },
  18: { p3: 76.0, p15: 78.4, p50: 81.9, p85: 86.1, p97: 89.3 },
  24: { p3: 80.0, p15: 82.8, p50: 87.1, p85: 92.2, p97: 96.1 },
  30: { p3: 83.3, p15: 86.4, p50: 91.7, p85: 97.6, p97: 102.0 },
  36: { p3: 86.2, p15: 89.6, p50: 95.6, p85: 102.3, p97: 107.2 },
  42: { p3: 88.9, p15: 92.5, p50: 99.0, p85: 106.6, p97: 112.0 },
  48: { p3: 91.2, p15: 95.0, p50: 102.0, p85: 110.2, p97: 116.3 },
  54: { p3: 93.3, p15: 97.4, p50: 104.7, p85: 113.5, p97: 120.2 },
  60: { p3: 95.2, p15: 99.5, p50: 107.2, p85: 116.6, p97: 123.9 }
};

// WHO Head Circumference-for-Age percentile data (cm)
const boysHeadCircumferenceData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 32.6, p15: 33.9, p50: 35.8, p85: 37.6, p97: 38.9 },
  1: { p3: 35.8, p15: 37.3, p50: 39.5, p85: 41.5, p97: 42.6 },
  2: { p3: 38.3, p15: 39.8, p50: 42.0, p85: 44.2, p97: 45.5 },
  3: { p3: 40.0, p15: 41.5, p50: 43.9, p85: 46.0, p97: 47.4 },
  4: { p3: 41.2, p15: 42.8, p50: 45.2, p85: 47.4, p97: 48.9 },
  5: { p3: 42.2, p15: 43.8, p50: 46.1, p85: 48.4, p97: 50.0 },
  6: { p3: 43.0, p15: 44.6, p50: 46.9, p85: 49.2, p97: 50.8 },
  9: { p3: 44.3, p15: 45.9, p50: 48.0, p85: 50.2, p97: 51.5 },
  12: { p3: 45.2, p15: 46.6, p50: 48.6, p85: 50.7, p97: 51.9 },
  15: { p3: 45.8, p15: 47.2, p50: 49.0, p85: 51.0, p97: 52.3 },
  18: { p3: 46.2, p15: 47.6, p50: 49.4, p85: 51.4, p97: 52.6 },
  24: { p3: 46.9, p15: 48.2, p50: 49.9, p85: 51.8, p97: 53.0 },
  30: { p3: 47.3, p15: 48.6, p50: 50.2, p85: 52.0, p97: 53.1 },
  36: { p3: 47.6, p15: 48.9, p50: 50.4, p85: 52.2, p97: 53.3 },
  42: { p3: 47.8, p15: 49.0, p50: 50.6, p85: 52.3, p97: 53.4 },
  48: { p3: 47.9, p15: 49.2, p50: 50.7, p85: 52.4, p97: 53.5 },
  54: { p3: 48.1, p15: 49.3, p50: 50.8, p85: 52.5, p97: 53.6 },
  60: { p3: 48.2, p15: 49.4, p50: 50.9, p85: 52.6, p97: 53.7 }
};

const girlsHeadCircumferenceData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 32.0, p15: 33.3, p50: 35.1, p85: 36.9, p97: 38.1 },
  1: { p3: 35.0, p15: 36.5, p50: 38.4, p85: 40.3, p97: 41.5 },
  2: { p3: 37.1, p15: 38.7, p50: 40.7, p85: 42.6, p97: 43.9 },
  3: { p3: 38.7, p15: 40.3, p50: 42.2, p85: 44.2, p97: 45.6 },
  4: { p3: 39.9, p15: 41.5, p50: 43.4, p85: 45.4, p97: 46.9 },
  5: { p3: 40.8, p15: 42.5, p50: 44.3, p85: 46.4, p97: 47.9 },
  6: { p3: 41.5, p15: 43.2, p50: 45.0, p85: 47.1, p97: 48.6 },
  9: { p3: 42.8, p15: 44.5, p50: 46.2, p85: 48.2, p97: 49.6 },
  12: { p3: 43.6, p15: 45.2, p50: 46.9, p85: 48.7, p97: 50.0 },
  15: { p3: 44.2, p15: 45.8, p50: 47.4, p85: 49.2, p97: 50.4 },
  18: { p3: 44.7, p15: 46.2, p50: 47.8, p85: 49.5, p97: 50.7 },
  24: { p3: 45.3, p15: 46.8, p50: 48.4, p85: 50.0, p97: 51.1 },
  30: { p3: 45.7, p15: 47.2, p50: 48.7, p85: 50.3, p97: 51.4 },
  36: { p3: 46.0, p15: 47.4, p50: 49.0, p85: 50.5, p97: 51.6 },
  42: { p3: 46.2, p15: 47.6, p50: 49.2, p85: 50.7, p97: 51.7 },
  48: { p3: 46.4, p15: 47.8, p50: 49.3, p85: 50.8, p97: 51.8 },
  54: { p3: 46.5, p15: 47.9, p50: 49.4, p85: 50.9, p97: 51.9 },
  60: { p3: 46.6, p15: 48.0, p50: 49.5, p85: 51.0, p97: 52.0 }
};

// WHO BMI-for-Age percentile data (kg/m²)
const boysBMIData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 11.1, p15: 12.4, p50: 13.4, p85: 14.8, p97: 16.3 },
  1: { p3: 12.9, p15: 14.3, p50: 15.6, p85: 17.2, p97: 18.8 },
  2: { p3: 14.7, p15: 15.9, p50: 17.3, p85: 18.8, p97: 20.4 },
  3: { p3: 15.8, p15: 16.9, p50: 18.0, p85: 19.4, p97: 20.9 },
  4: { p3: 16.3, p15: 17.3, p50: 18.4, p85: 19.7, p97: 21.0 },
  5: { p3: 16.6, p15: 17.5, p50: 18.6, p85: 19.8, p97: 21.0 },
  6: { p3: 16.6, p15: 17.5, p50: 18.6, p85: 19.7, p97: 20.9 },
  9: { p3: 16.1, p15: 16.9, p50: 17.8, p85: 18.8, p97: 19.9 },
  12: { p3: 15.5, p15: 16.3, p50: 17.2, p85: 18.3, p97: 19.4 },
  15: { p3: 15.2, p15: 16.0, p50: 16.9, p85: 17.9, p97: 19.0 },
  18: { p3: 14.9, p15: 15.7, p50: 16.6, p85: 17.8, p97: 18.9 },
  24: { p3: 14.7, p15: 15.5, p50: 16.5, p85: 17.8, p97: 19.0 },
  30: { p3: 14.6, p15: 15.4, p50: 16.4, p85: 17.8, p97: 19.1 },
  36: { p3: 14.5, p15: 15.3, p50: 16.4, p85: 17.8, p97: 19.3 },
  42: { p3: 14.4, p15: 15.2, p50: 16.4, p85: 17.9, p97: 19.4 },
  48: { p3: 14.3, p15: 15.2, p50: 16.4, p85: 17.9, p97: 19.6 },
  54: { p3: 14.3, p15: 15.1, p50: 16.4, p85: 18.0, p97: 19.7 },
  60: { p3: 14.2, p15: 15.1, p50: 16.4, p85: 18.0, p97: 19.8 }
};

const girlsBMIData: { [month: number]: { p3: number; p15: number; p50: number; p85: number; p97: number } } = {
  0: { p3: 10.8, p15: 12.0, p50: 13.1, p85: 14.4, p97: 15.7 },
  1: { p3: 12.4, p15: 13.7, p50: 15.0, p85: 16.4, p97: 17.9 },
  2: { p3: 14.1, p15: 15.4, p50: 16.8, p85: 18.2, p97: 19.7 },
  3: { p3: 15.1, p15: 16.3, p50: 17.5, p85: 18.9, p97: 20.2 },
  4: { p3: 15.7, p15: 16.8, p50: 17.9, p85: 19.2, p97: 20.4 },
  5: { p3: 16.0, p15: 17.1, p50: 18.1, p85: 19.3, p97: 20.4 },
  6: { p3: 16.1, p15: 17.1, p50: 18.1, p85: 19.2, p97: 20.2 },
  9: { p3: 15.7, p15: 16.5, p50: 17.5, p85: 18.5, p97: 19.5 },
  12: { p3: 15.2, p15: 16.0, p50: 16.9, p85: 18.0, p97: 19.0 },
  15: { p3: 14.9, p15: 15.7, p50: 16.6, p85: 17.7, p97: 18.8 },
  18: { p3: 14.6, p15: 15.4, p50: 16.4, p85: 17.6, p97: 18.7 },
  24: { p3: 14.3, p15: 15.2, p50: 16.3, p85: 17.6, p97: 18.8 },
  30: { p3: 14.2, p15: 15.1, p50: 16.2, p85: 17.6, p97: 18.9 },
  36: { p3: 14.1, p15: 15.0, p50: 16.1, p85: 17.6, p97: 19.0 },
  42: { p3: 14.0, p15: 14.9, p50: 16.1, p85: 17.6, p97: 19.2 },
  48: { p3: 13.9, p15: 14.9, p50: 16.1, p85: 17.7, p97: 19.3 },
  54: { p3: 13.9, p15: 14.8, p50: 16.0, p85: 17.7, p97: 19.5 },
  60: { p3: 13.8, p15: 14.8, p50: 16.0, p85: 17.8, p97: 19.6 }
};

// ===== CALCULATION FUNCTIONS =====

function interpolateData(data: typeof boysWeightData, targetMonth: number): { p3: number; p15: number; p50: number; p85: number; p97: number } {
  const months = Object.keys(data).map(Number).sort((a, b) => a - b);
  
  // Find the closest months for interpolation
  let lowerMonth = months[0];
  let upperMonth = months[months.length - 1];
  
  for (let i = 0; i < months.length - 1; i++) {
    if (targetMonth >= months[i] && targetMonth <= months[i + 1]) {
      lowerMonth = months[i];
      upperMonth = months[i + 1];
      break;
    }
  }
  
  if (targetMonth <= lowerMonth) return data[lowerMonth];
  if (targetMonth >= upperMonth) return data[upperMonth];
  
  // Linear interpolation
  const ratio = (targetMonth - lowerMonth) / (upperMonth - lowerMonth);
  const lower = data[lowerMonth];
  const upper = data[upperMonth];
  
  return {
    p3: lower.p3 + (upper.p3 - lower.p3) * ratio,
    p15: lower.p15 + (upper.p15 - lower.p15) * ratio,
    p50: lower.p50 + (upper.p50 - lower.p50) * ratio,
    p85: lower.p85 + (upper.p85 - lower.p85) * ratio,
    p97: lower.p97 + (upper.p97 - lower.p97) * ratio,
  };
}

function calculatePercentile(weight: number, percentileData: { p3: number; p15: number; p50: number; p85: number; p97: number }): number {
  const { p3, p15, p50, p85, p97 } = percentileData;
  
  if (weight <= p3) return 3;
  if (weight <= p15) return 3 + ((weight - p3) / (p15 - p3)) * 12; // 3-15th percentile
  if (weight <= p50) return 15 + ((weight - p15) / (p50 - p15)) * 35; // 15-50th percentile
  if (weight <= p85) return 50 + ((weight - p50) / (p85 - p50)) * 35; // 50-85th percentile
  if (weight <= p97) return 85 + ((weight - p85) / (p97 - p85)) * 12; // 85-97th percentile
  return 97;
}

function calculateWeightPercentile(age: number, gender: string, actualWeight: number): WeightResult {
  const data = gender === 'male' ? boysWeightData : girlsWeightData;
  const percentileData = interpolateData(data, age);
  const percentile = calculatePercentile(actualWeight, percentileData);
  
  // Determine weight category based on percentile
  let weightCategory: 'severely_underweight' | 'underweight' | 'healthy' | 'overweight' | 'severely_overweight';
  if (percentile < 3) {
    weightCategory = 'severely_underweight';
  } else if (percentile < 15) {
    weightCategory = 'underweight';
  } else if (percentile <= 85) {
    weightCategory = 'healthy';
  } else if (percentile <= 97) {
    weightCategory = 'overweight';
  } else {
    weightCategory = 'severely_overweight';
  }
  
  // Generate recommendation
  const childGender = gender === 'male' ? 'boy' : 'girl';
  const ageYears = Math.floor(age / 12);
  const ageMonths = age % 12;
  const ageString = ageYears > 0 ? `${ageYears} year${ageYears > 1 ? 's' : ''} ${ageMonths > 0 ? `${ageMonths} month${ageMonths > 1 ? 's' : ''}` : ''}` : `${age} month${age > 1 ? 's' : ''}`;
  
  let recommendation: string;
  switch (weightCategory) {
    case 'severely_underweight':
      recommendation = `Your ${ageString.trim()}-old ${childGender} weighs ${actualWeight} kg, which is below the 3rd percentile (${percentile.toFixed(1)}th percentile). This indicates severe underweight. Please consult your pediatrician immediately for proper evaluation and guidance.`;
      break;
    case 'underweight':
      recommendation = `Your ${ageString.trim()}-old ${childGender} weighs ${actualWeight} kg, which is in the ${percentile.toFixed(1)}th percentile. This indicates mild underweight. Consider discussing nutrition and growth with your pediatrician.`;
      break;
    case 'healthy':
      recommendation = `Great news! Your ${ageString.trim()}-old ${childGender} weighs ${actualWeight} kg, which is in the ${percentile.toFixed(1)}th percentile - perfectly within the healthy range. Keep up the good work with balanced nutrition and healthy habits!`;
      break;
    case 'overweight':
      recommendation = `Your ${ageString.trim()}-old ${childGender} weighs ${actualWeight} kg, which is in the ${percentile.toFixed(1)}th percentile. This indicates overweight. Consider discussing healthy diet and activity options with your pediatrician.`;
      break;
    case 'severely_overweight':
      recommendation = `Your ${ageString.trim()}-old ${childGender} weighs ${actualWeight} kg, which is above the 97th percentile (${percentile.toFixed(1)}th percentile). This indicates severe overweight. Please consult your pediatrician for comprehensive evaluation and guidance.`;
      break;
  }
  
  return {
    actualWeight,
    percentile: Math.round(percentile * 10) / 10,
    weightCategory,
    recommendation,
    percentileRanges: percentileData,
  };
}

function calculateGrowthPercentiles(
  age: number, 
  gender: string, 
  measurements: { weight?: number; height?: number; headCircumference?: number }
): GrowthResult {
  const childGender = gender === 'male' ? 'boy' : 'girl';
  const ageYears = Math.floor(age / 12);
  const ageMonths = age % 12;
  const ageString = ageYears > 0 ? `${ageYears} year${ageYears > 1 ? 's' : ''} ${ageMonths > 0 ? `${ageMonths} month${ageMonths > 1 ? 's' : ''}` : ''}` : `${age} month${age > 1 ? 's' : ''}`;

  const result: GrowthResult = {
    measurements: {},
    overallAssessment: '',
    recommendations: [],
    concernLevel: 'none'
  };

  let concernFlags: string[] = [];
  let healthyFlags: string[] = [];

  // Calculate weight percentile if provided
  if (measurements.weight) {
    const weightData = gender === 'male' ? boysWeightData : girlsWeightData;
    const weightPercentileData = interpolateData(weightData, age);
    const weightPercentile = calculatePercentile(measurements.weight, weightPercentileData);
    
    let weightCategory: 'severely_low' | 'low' | 'normal' | 'high' | 'severely_high';
    if (weightPercentile < 3) {
      weightCategory = 'severely_low';
      concernFlags.push('severely underweight');
    } else if (weightPercentile < 15) {
      weightCategory = 'low';
      concernFlags.push('underweight');
    } else if (weightPercentile <= 85) {
      weightCategory = 'normal';
      healthyFlags.push('healthy weight');
    } else if (weightPercentile <= 97) {
      weightCategory = 'high';
      concernFlags.push('overweight');
    } else {
      weightCategory = 'severely_high';
      concernFlags.push('severely overweight');
    }

    result.measurements.weight = {
      value: measurements.weight,
      percentile: Math.round(weightPercentile * 10) / 10,
      category: weightCategory
    };
  }

  // Calculate height percentile if provided
  if (measurements.height) {
    const heightData = gender === 'male' ? boysHeightData : girlsHeightData;
    const heightPercentileData = interpolateData(heightData, age);
    const heightPercentile = calculatePercentile(measurements.height, heightPercentileData);
    
    let heightCategory: 'severely_low' | 'low' | 'normal' | 'high' | 'severely_high';
    if (heightPercentile < 3) {
      heightCategory = 'severely_low';
      concernFlags.push('very short height');
    } else if (heightPercentile < 15) {
      heightCategory = 'low';
      concernFlags.push('short height');
    } else if (heightPercentile <= 85) {
      heightCategory = 'normal';
      healthyFlags.push('normal height');
    } else if (heightPercentile <= 97) {
      heightCategory = 'high';
      healthyFlags.push('tall height');
    } else {
      heightCategory = 'severely_high';
      healthyFlags.push('very tall height');
    }

    result.measurements.height = {
      value: measurements.height,
      percentile: Math.round(heightPercentile * 10) / 10,
      category: heightCategory
    };
  }

  // Calculate head circumference percentile if provided
  if (measurements.headCircumference) {
    const headData = gender === 'male' ? boysHeadCircumferenceData : girlsHeadCircumferenceData;
    const headPercentileData = interpolateData(headData, age);
    const headPercentile = calculatePercentile(measurements.headCircumference, headPercentileData);
    
    let headCategory: 'severely_low' | 'low' | 'normal' | 'high' | 'severely_high';
    if (headPercentile < 3) {
      headCategory = 'severely_low';
      concernFlags.push('very small head circumference');
    } else if (headPercentile < 15) {
      headCategory = 'low';
      concernFlags.push('small head circumference');
    } else if (headPercentile <= 85) {
      headCategory = 'normal';
      healthyFlags.push('normal head circumference');
    } else if (headPercentile <= 97) {
      headCategory = 'high';
      healthyFlags.push('large head circumference');
    } else {
      headCategory = 'severely_high';
      concernFlags.push('very large head circumference');
    }

    result.measurements.headCircumference = {
      value: measurements.headCircumference,
      percentile: Math.round(headPercentile * 10) / 10,
      category: headCategory
    };
  }

  // Calculate BMI if both weight and height are provided
  if (measurements.weight && measurements.height) {
    const bmi = measurements.weight / Math.pow(measurements.height / 100, 2);
    const bmiData = gender === 'male' ? boysBMIData : girlsBMIData;
    const bmiPercentileData = interpolateData(bmiData, age);
    const bmiPercentile = calculatePercentile(bmi, bmiPercentileData);
    
    let bmiCategory: 'severely_low' | 'low' | 'normal' | 'high' | 'severely_high';
    if (bmiPercentile < 3) {
      bmiCategory = 'severely_low';
    } else if (bmiPercentile < 15) {
      bmiCategory = 'low';
    } else if (bmiPercentile <= 85) {
      bmiCategory = 'normal';
    } else if (bmiPercentile <= 97) {
      bmiCategory = 'high';
    } else {
      bmiCategory = 'severely_high';
    }

    result.measurements.bmi = {
      value: Math.round(bmi * 10) / 10,
      percentile: Math.round(bmiPercentile * 10) / 10,
      category: bmiCategory
    };
  }

  // Determine overall concern level
  if (concernFlags.some(flag => flag.includes('severely'))) {
    result.concernLevel = 'high';
  } else if (concernFlags.length > 1) {
    result.concernLevel = 'moderate';
  } else if (concernFlags.length === 1) {
    result.concernLevel = 'mild';
  } else {
    result.concernLevel = 'none';
  }

  // Generate overall assessment
  if (healthyFlags.length > 0 && concernFlags.length === 0) {
    result.overallAssessment = `Excellent! Your ${ageString.trim()}-old ${childGender} shows ${healthyFlags.join(', ')}. All measured growth parameters are within healthy ranges according to WHO standards.`;
  } else if (concernFlags.length > 0) {
    result.overallAssessment = `Your ${ageString.trim()}-old ${childGender} shows ${concernFlags.join(', ')}. ${healthyFlags.length > 0 ? `However, ${healthyFlags.join(', ')} are normal. ` : ''}Consider discussing these results with your pediatrician.`;
  } else {
    result.overallAssessment = `Growth assessment completed for your ${ageString.trim()}-old ${childGender}.`;
  }

  // Generate recommendations
  if (result.concernLevel === 'high') {
    result.recommendations.push('Schedule an immediate consultation with your pediatrician for comprehensive evaluation');
    result.recommendations.push('Bring these growth measurements to discuss detailed care plan');
  } else if (result.concernLevel === 'moderate') {
    result.recommendations.push('Schedule a pediatric consultation within the next few weeks');
    result.recommendations.push('Monitor growth closely and track changes over time');
  } else if (result.concernLevel === 'mild') {
    result.recommendations.push('Discuss these results at your next pediatric checkup');
    result.recommendations.push('Continue monitoring growth with regular measurements');
  } else {
    result.recommendations.push('Continue with regular pediatric checkups and healthy lifestyle');
    result.recommendations.push('Keep tracking growth to ensure continued healthy development');
  }

  result.recommendations.push('Remember that children grow at different rates - these are general guidelines');
  result.recommendations.push('Always consult healthcare professionals for personalized medical advice');

  return result;
}
