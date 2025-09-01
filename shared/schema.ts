import { z } from "zod";

// Growth check request schema - allows optional measurements
export const growthCheckSchema = z.object({
  age: z.number().min(0).max(60), // months (0-5 years)  
  gender: z.enum(['male', 'female']),
  weight: z.number().min(1).max(50).optional(), // kg
  height: z.number().min(45).max(120).optional(), // cm
  headCircumference: z.number().min(30).max(55).optional(), // cm
}).refine((data) => {
  // At least one measurement must be provided and must be a valid number
  const hasWeight = typeof data.weight === 'number' && !isNaN(data.weight);
  const hasHeight = typeof data.height === 'number' && !isNaN(data.height);
  const hasHead = typeof data.headCircumference === 'number' && !isNaN(data.headCircumference);
  return hasWeight || hasHeight || hasHead;
}, {
  message: "Please provide at least one valid measurement",
  path: ["weight"]
});

// Individual measurement result
const measurementResultSchema = z.object({
  value: z.number(),
  percentile: z.number(),
  category: z.enum(['severely_low', 'low', 'normal', 'high', 'severely_high']),
});

// Growth check response schema
export const growthResultSchema = z.object({
  measurements: z.object({
    weight: measurementResultSchema.optional(),
    height: measurementResultSchema.optional(),
    headCircumference: measurementResultSchema.optional(),
    bmi: measurementResultSchema.optional(),
  }),
  overallAssessment: z.string(),
  recommendations: z.array(z.string()),
  concernLevel: z.enum(['none', 'mild', 'moderate', 'high']),
});

// Backward compatibility for weight-only checks
export const weightCheckSchema = z.object({
  age: z.number().min(0).max(60),
  gender: z.enum(['male', 'female']),
  weight: z.number().min(1).max(50),
});

export const weightResultSchema = z.object({
  actualWeight: z.number(),
  percentile: z.number(),
  weightCategory: z.enum(['severely_underweight', 'underweight', 'healthy', 'overweight', 'severely_overweight']),
  recommendation: z.string(),
  percentileRanges: z.object({
    p3: z.number(),
    p15: z.number(),
    p50: z.number(),
    p85: z.number(),
    p97: z.number(),
  }),
});

// Height prediction schemas
export const heightPredictionRequestSchema = z.object({
  childAgeMonths: z.number().min(6).max(210),
  childGender: z.enum(['male', 'female']),
  childCurrentHeight: z.number().min(45).max(180),
  childWeight: z.number().min(3).max(80),
  motherFeet: z.number().min(4).max(7),
  motherInches: z.number().min(0).max(11),
  fatherFeet: z.number().min(4).max(8),
  fatherInches: z.number().min(0).max(11),
});

export const predictionResultSchema = z.object({
  predictedHeight: z.number(),
  predictedHeightFeet: z.string(),
  confidenceInterval: z.object({
    lower: z.number(),
    upper: z.number(),
    lowerFeet: z.string(),
    upperFeet: z.string(),
  }),
  midParentalHeight: z.number(),
  midParentalHeightFeet: z.string(),
  motherHeightCm: z.number(),
  fatherHeightCm: z.number(),
  motherHeightFeet: z.string(),
  fatherHeightFeet: z.string(),
  methodUsed: z.string(),
  accuracy: z.string(),
});

export type GrowthCheckRequest = z.infer<typeof growthCheckSchema>;
export type GrowthResult = z.infer<typeof growthResultSchema>;
export type WeightCheckRequest = z.infer<typeof weightCheckSchema>;
export type WeightResult = z.infer<typeof weightResultSchema>;
export type HeightPredictionRequest = z.infer<typeof heightPredictionRequestSchema>;
export type PredictionResult = z.infer<typeof predictionResultSchema>;
