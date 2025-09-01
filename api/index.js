const { calculateGrowthPercentiles } = require('./growth-calculations');

// Serverless function handler for Vercel
module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  try {
    // Health check endpoint
    if (url === '/api/health' && method === 'GET') {
      res.status(200).json({ 
        status: 'OK', 
        message: 'Child Growth Tracker API is running',
        timestamp: new Date().toISOString()
      });
      return;
    }

    // Growth calculation endpoint
    if (url === '/api/calculate-growth' && method === 'POST') {
      const result = calculateGrowthPercentiles(req.body);
      res.status(200).json(result);
      return;
    }

    // Legacy weight calculation endpoint for backward compatibility
    if (url === '/api/calculate-weight' && method === 'POST') {
      const { age, gender, weight } = req.body;
      const growthData = { age, gender, weight };
      
      const result = calculateGrowthPercentiles(growthData);
      
      // Return in legacy format
      const weightResult = result.measurements.weight;
      if (weightResult) {
        res.status(200).json({
          actualWeight: weightResult.value,
          percentile: weightResult.percentile,
          weightCategory: weightResult.category,
          recommendation: result.overallAssessment,
          percentileRanges: {
            p3: 0, p15: 0, p50: 0, p85: 0, p97: 0 // Simplified for legacy compatibility
          }
        });
      } else {
        res.status(400).json({ error: 'Weight calculation failed' });
      }
      return;
    }

    // Default response for unknown endpoints
    res.status(404).json({ 
      error: 'Endpoint not found',
      availableEndpoints: [
        'GET /api/health',
        'POST /api/calculate-growth',
        'POST /api/calculate-weight'
      ]
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
};