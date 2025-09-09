// Complete api/growth-calculations.js file for Vercel deployment
// Copy this entire content to your api/growth-calculations.js file

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

  // Assessment logic
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
    concernLevel,
    age,
    gender
  };
}

function calculateWeightPercentile(age, gender, weight) {
  // Simplified WHO weight percentile calculation
  const weightData = {
    male: [
      { age: 0, p50: 3.3 }, { age: 1, p50: 4.5 }, { age: 2, p50: 5.6 },
      { age: 3, p50: 6.4 }, { age: 6, p50: 7.9 }, { age: 9, p50: 8.9 },
      { age: 12, p50: 9.6 }, { age: 18, p50: 10.9 }, { age: 24, p50: 12.2 },
      { age: 36, p50: 14.3 }, { age: 48, p50: 16.3 }, { age: 60, p50: 18.3 }
    ],
    female: [
      { age: 0, p50: 3.2 }, { age: 1, p50: 4.2 }, { age: 2, p50: 5.1 },
      { age: 3, p50: 5.8 }, { age: 6, p50: 7.3 }, { age: 9, p50: 8.2 },
      { age: 12, p50: 8.9 }, { age: 18, p50: 10.1 }, { age: 24, p50: 11.5 },
      { age: 36, p50: 13.9 }, { age: 48, p50: 15.9 }, { age: 60, p50: 17.9 }
    ]
  };

  const data = weightData[gender] || weightData.male;
  const interpolated = interpolateValue(age, data);
  
  // Simple percentile calculation (normally would use z-scores)
  const ratio = weight / interpolated;
  if (ratio > 1.3) return 95;
  if (ratio > 1.15) return 85;
  if (ratio > 0.95) return 50;
  if (ratio > 0.85) return 15;
  return 5;
}

function calculateHeightPercentile(age, gender, height) {
  // Simplified WHO height percentile calculation
  const heightData = {
    male: [
      { age: 0, p50: 49.9 }, { age: 1, p50: 54.7 }, { age: 2, p50: 58.4 },
      { age: 3, p50: 61.4 }, { age: 6, p50: 67.6 }, { age: 9, p50: 72.0 },
      { age: 12, p50: 75.7 }, { age: 18, p50: 82.3 }, { age: 24, p50: 87.1 },
      { age: 36, p50: 96.1 }, { age: 48, p50: 103.3 }, { age: 60, p50: 109.2 }
    ],
    female: [
      { age: 0, p50: 49.1 }, { age: 1, p50: 53.7 }, { age: 2, p50: 57.1 },
      { age: 3, p50: 59.8 }, { age: 6, p50: 65.7 }, { age: 9, p50: 70.1 },
      { age: 12, p50: 74.0 }, { age: 18, p50: 80.7 }, { age: 24, p50: 85.7 },
      { age: 36, p50: 95.1 }, { age: 48, p50: 101.6 }, { age: 60, p50: 107.4 }
    ]
  };

  const data = heightData[gender] || heightData.male;
  const interpolated = interpolateValue(age, data);
  
  const ratio = height / interpolated;
  if (ratio > 1.06) return 95;
  if (ratio > 1.03) return 85;
  if (ratio > 0.97) return 50;
  if (ratio > 0.94) return 15;
  return 5;
}

function calculateHeadPercentile(age, gender, headCirc) {
  // Simplified WHO head circumference percentile calculation
  const headData = {
    male: [
      { age: 0, p50: 34.5 }, { age: 1, p50: 37.3 }, { age: 2, p50: 39.1 },
      { age: 3, p50: 40.5 }, { age: 6, p50: 43.3 }, { age: 9, p50: 45.0 },
      { age: 12, p50: 46.1 }, { age: 18, p50: 47.6 }, { age: 24, p50: 48.4 },
      { age: 36, p50: 49.6 }, { age: 48, p50: 50.5 }, { age: 60, p50: 51.2 }
    ],
    female: [
      { age: 0, p50: 33.9 }, { age: 1, p50: 36.5 }, { age: 2, p50: 38.3 },
      { age: 3, p50: 39.5 }, { age: 6, p50: 42.2 }, { age: 9, p50: 43.8 },
      { age: 12, p50: 44.9 }, { age: 18, p50: 46.2 }, { age: 24, p50: 47.0 },
      { age: 36, p50: 48.1 }, { age: 48, p50: 48.9 }, { age: 60, p50: 49.6 }
    ]
  };

  const data = headData[gender] || headData.male;
  const interpolated = interpolateValue(age, data);
  
  const ratio = headCirc / interpolated;
  if (ratio > 1.04) return 95;
  if (ratio > 1.02) return 85;
  if (ratio > 0.98) return 50;
  if (ratio > 0.96) return 15;
  return 5;
}

function calculateBMIPercentile(age, gender, bmi) {
  // Simplified BMI percentile calculation for children
  const bmiData = {
    male: [
      { age: 12, p50: 17.8 }, { age: 18, p50: 16.9 }, { age: 24, p50: 16.4 },
      { age: 36, p50: 15.8 }, { age: 48, p50: 15.6 }, { age: 60, p50: 15.6 }
    ],
    female: [
      { age: 12, p50: 17.3 }, { age: 18, p50: 16.5 }, { age: 24, p50: 16.0 },
      { age: 36, p50: 15.5 }, { age: 48, p50: 15.4 }, { age: 60, p50: 15.5 }
    ]
  };

  if (age < 12) return 50; // BMI not calculated for very young children
  
  const data = bmiData[gender] || bmiData.male;
  const interpolated = interpolateValue(age, data);
  
  const ratio = bmi / interpolated;
  if (ratio > 1.2) return 95;
  if (ratio > 1.1) return 85;
  if (ratio > 0.9) return 50;
  if (ratio > 0.8) return 15;
  return 5;
}

function interpolateValue(age, data) {
  // Linear interpolation for age values
  if (age <= data[0].age) return data[0].p50;
  if (age >= data[data.length - 1].age) return data[data.length - 1].p50;
  
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i + 1].age) {
      const x1 = data[i].age;
      const y1 = data[i].p50;
      const x2 = data[i + 1].age;
      const y2 = data[i + 1].p50;
      
      return y1 + ((age - x1) / (x2 - x1)) * (y2 - y1);
    }
  }
  
  return data[Math.floor(data.length / 2)].p50;
}

function categorizePercentile(percentile) {
  if (percentile < 3) return 'severely_low';
  if (percentile < 15) return 'low';
  if (percentile > 97) return 'severely_high';
  if (percentile > 85) return 'high';
  return 'normal';
}

module.exports = {
  calculateGrowthPercentiles
};