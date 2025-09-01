const { calculateGrowthPercentiles } = require('./growth-calculations');

// Production serverless function handler for Vercel
module.exports = async (req, res) => {
  // Production CORS configuration
  const allowedOrigins = [
    'https://growthcheck.in',
    'https://www.growthcheck.in',
    'https://child-growth-tracker.vercel.app'
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', origin || '*');
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

  // Production security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url, method } = req;

  try {
    // Health check endpoint
    if (url === '/api/health' && method === 'GET') {
      res.setHeader('Cache-Control', 'no-cache');
      res.status(200).json({ 
        status: 'OK', 
        message: 'Child Growth Tracker API - Production',
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
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
    
    // Production error handling - don't expose sensitive details
    if (process.env.NODE_ENV === 'production') {
      res.status(500).json({ 
        error: 'Internal server error',
        timestamp: new Date().toISOString()
      });
    } else {
      res.status(500).json({ 
        error: 'Internal server error',
        message: error.message,
        timestamp: new Date().toISOString()
      });
    }
  }
};