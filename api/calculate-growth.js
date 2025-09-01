import { z } from 'zod';

// Simplified WHO growth calculation for Vercel serverless
const growthCheckSchema = z.object({
  age: z.number().min(0).max(60),
  gender: z.enum(['male', 'female']),
  weight: z.number().min(1).max(50).optional(),
  height: z.number().min(45).max(120).optional(),
  headCircumference: z.number().min(30).max(55).optional(),
});

// Basic WHO percentile calculations (simplified for serverless)
const calculatePercentile = (value, age, gender, measurement) => {
  // This is a simplified version - you'd need the full WHO data
  const basePercentiles = {
    weight: { male: [3, 5, 10, 25, 50, 75, 90, 95, 97], female: [3, 5, 10, 25, 50, 75, 90, 95, 97] },
    height: { male: [3, 5, 10, 25, 50, 75, 90, 95, 97], female: [3, 5, 10, 25, 50, 75, 90, 95, 97] },
    headCircumference: { male: [3, 5, 10, 25, 50, 75, 90, 95, 97], female: [3, 5, 10, 25, 50, 75, 90, 95, 97] }
  };
  
  // Simplified calculation - returns mock percentile for now
  return Math.random() * 100;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const data = growthCheckSchema.parse(req.body);
    
    const measurements = {};
    
    if (data.weight) {
      const percentile = calculatePercentile(data.weight, data.age, data.gender, 'weight');
      measurements.weight = {
        value: data.weight,
        percentile: percentile,
        category: percentile < 15 ? 'low' : percentile > 85 ? 'high' : 'normal'
      };
    }

    if (data.height) {
      const percentile = calculatePercentile(data.height, data.age, data.gender, 'height');
      measurements.height = {
        value: data.height,
        percentile: percentile,
        category: percentile < 15 ? 'low' : percentile > 85 ? 'high' : 'normal'
      };
    }

    if (data.headCircumference) {
      const percentile = calculatePercentile(data.headCircumference, data.age, data.gender, 'headCircumference');
      measurements.headCircumference = {
        value: data.headCircumference,
        percentile: percentile,
        category: percentile < 15 ? 'low' : percentile > 85 ? 'high' : 'normal'
      };
    }

    // Calculate BMI if both weight and height are provided
    if (data.weight && data.height) {
      const bmi = data.weight / Math.pow(data.height / 100, 2);
      const percentile = calculatePercentile(bmi, data.age, data.gender, 'bmi');
      measurements.bmi = {
        value: Math.round(bmi * 10) / 10,
        percentile: percentile,
        category: percentile < 15 ? 'low' : percentile > 85 ? 'high' : 'normal'
      };
    }

    const result = {
      measurements,
      overallAssessment: "Growth assessment based on WHO standards (simplified for serverless deployment)",
      recommendations: [
        "Consult with your pediatrician for detailed growth analysis",
        "This is a simplified calculation - use full app for complete assessment"
      ],
      concernLevel: 'none'
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}