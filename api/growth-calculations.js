// Growth calculations for Vercel serverless deployment
// This is a simplified version focusing on core functionality

function calculateGrowthPercentiles(data) {
  const { age, gender, weight, height, headCircumference } = data;
  
  const measurements = {};
  let overallAssessment = "Growth appears normal.";
  let concernLevel = "none";
  let recommendations = [];

  // Weight calculation
  if (weight) {
    const weightPercentile = calculateWeightPercentile(age, gender, weight);
    measurements.weight = {
      value: weight,
      percentile: weightPercentile,
      category: categorizePercentile(weightPercentile)
    };
  }

  // Height calculation
  if (height) {
    const heightPercentile = calculateHeightPercentile(age, gender, height);
    measurements.height = {
      value: height,
      percentile: heightPercentile,
      category: categorizePercentile(heightPercentile)
    };
  }

  // Head circumference calculation
  if (headCircumference) {
    const headPercentile = calculateHeadPercentile(age, gender, headCircumference);
    measurements.headCircumference = {
      value: headCircumference,
      percentile: headPercentile,
      category: categorizePercentile(headPercentile)
    };
  }

  // BMI calculation (if both weight and height are provided)
  if (weight && height) {
    const bmi = weight / Math.pow(height / 100, 2);
    const bmiPercentile = calculateBMIPercentile(age, gender, bmi);
    measurements.bmi = {
      value: parseFloat(bmi.toFixed(1)),
      percentile: bmiPercentile,
      category: categorizePercentile(bmiPercentile)
    };
  }

  // Determine overall assessment and recommendations
  const categories = Object.values(measurements).map(m => m.category);
  
  if (categories.some(cat => cat === 'severely_low' || cat === 'severely_high')) {
    concernLevel = 'high';
    overallAssessment = "Some measurements show significant concern. Please consult with your pediatrician.";
    recommendations.push("Schedule an appointment with your pediatrician");
    recommendations.push("Discuss nutrition and growth patterns");
  } else if (categories.some(cat => cat === 'low' || cat === 'high')) {
    concernLevel = 'mild';
    overallAssessment = "Some measurements are outside typical ranges. Consider monitoring closely.";
    recommendations.push("Monitor growth trends over time");
    recommendations.push("Ensure balanced nutrition and adequate sleep");
  } else {
    overallAssessment = "Growth appears to be progressing normally.";
    recommendations.push("Continue current healthy lifestyle");
    recommendations.push("Regular check-ups with pediatrician");
  }

  return {
    measurements,
    overallAssessment,
    recommendations,
    concernLevel
  };
}

function calculateWeightPercentile(ageMonths, gender, weight) {
  // Simplified WHO-based calculation
  // In production, this would use actual WHO data tables
  const baseWeight = gender === 'male' ? 3.3 : 3.2;
  const growthRate = gender === 'male' ? 0.15 : 0.14;
  const expectedWeight = baseWeight + (ageMonths * growthRate);
  
  const deviation = (weight - expectedWeight) / expectedWeight;
  let percentile = 50 + (deviation * 30);
  
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

function calculateHeightPercentile(ageMonths, gender, height) {
  // Simplified WHO-based calculation
  const baseHeight = gender === 'male' ? 49.9 : 49.1;
  const growthRate = gender === 'male' ? 1.1 : 1.0;
  const expectedHeight = baseHeight + (ageMonths * growthRate);
  
  const deviation = (height - expectedHeight) / expectedHeight;
  let percentile = 50 + (deviation * 30);
  
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

function calculateHeadPercentile(ageMonths, gender, headCircumference) {
  // Simplified WHO-based calculation
  const baseHead = gender === 'male' ? 34.5 : 33.9;
  const growthRate = gender === 'male' ? 0.25 : 0.24;
  const expectedHead = baseHead + (ageMonths * growthRate);
  
  const deviation = (headCircumference - expectedHead) / expectedHead;
  let percentile = 50 + (deviation * 30);
  
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

function calculateBMIPercentile(ageMonths, gender, bmi) {
  // Simplified BMI percentile calculation
  // Assumes relatively stable BMI for young children
  const expectedBMI = 16.5; // Average for young children
  const deviation = (bmi - expectedBMI) / expectedBMI;
  let percentile = 50 + (deviation * 25);
  
  return Math.max(1, Math.min(99, Math.round(percentile)));
}

function categorizePercentile(percentile) {
  if (percentile < 3) return 'severely_low';
  if (percentile < 15) return 'low';
  if (percentile <= 85) return 'normal';
  if (percentile <= 97) return 'high';
  return 'severely_high';
}

module.exports = {
  calculateGrowthPercentiles
};