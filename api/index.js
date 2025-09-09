const { calculateGrowthPercentiles } = require('./growth-calculations');
const fs = require('fs');
const path = require('path');

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

    // Gift Ideas endpoint - fetch products from links file
    if (url === '/api/gift-ideas' && method === 'GET') {
      try {
        // Read the gift links file
        const linksPath = path.join(process.cwd(), 'gift-ideas-links.txt');
        const fileContent = fs.readFileSync(linksPath, 'utf-8');
        const links = fileContent.split('\n').filter(link => link.trim().length > 0);
        
        // Dynamic product generation - works for any Amazon URL
        const productTitles = [
          "Educational Building Blocks Set",
          "Kids Learning Activity Books", 
          "Musical Piano Keyboard for Kids",
          "Kids Science Experiment Kit",
          "Art & Craft Supplies Set",
          "Educational Puzzle Games",
          "Interactive Learning Tablet",
          "Kids Cooking Play Set",
          "STEM Building Kit",
          "Language Learning Cards"
        ];

        const productDescriptions = [
          "Develops creativity, motor skills, and problem-solving abilities. Safe, non-toxic materials suitable for ages 3+.",
          "Perfect for early learning with coloring, tracing, and basic concepts. Great for preschoolers aged 2-5 years.",
          "Features multiple sounds and rhythms. Develops musical skills and creativity with included microphone.",
          "Fun experiment kit with 50+ activities. Encourages STEM learning and curiosity with safe experiments.",
          "Complete set for creative expression. Includes crayons, markers, paper, and stickers for hours of fun.",
          "Age-appropriate puzzles that challenge thinking skills. Promotes concentration and logical reasoning.",
          "Interactive educational content with games and activities. Helps develop digital literacy and learning skills.",
          "Pretend play kitchen set with realistic accessories. Encourages imagination and social skills development.",
          "Engineering and building challenges for young minds. Develops spatial reasoning and construction skills.",
          "Vocabulary building cards with pictures and words. Supports language development and reading readiness."
        ];

        // Dynamic product mapping that works for any URL
        const products = links.map((link, index) => {
          const trimmedLink = link.trim();
          
          // Array of reliable, diverse product images
          const productImages = [
            "https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Building+Blocks",
            "https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Activity+Books", 
            "https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Musical+Piano",
            "https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Science+Kit",
            "https://via.placeholder.com/300x300/FFEAA7/333333?text=Art+Supplies",
            "https://via.placeholder.com/300x300/DDA0DD/FFFFFF?text=Puzzle+Games",
            "https://via.placeholder.com/300x300/98D8C8/333333?text=Learning+Tablet",
            "https://via.placeholder.com/300x300/F7DC6F/333333?text=Cooking+Set",
            "https://via.placeholder.com/300x300/BB8FCE/FFFFFF?text=STEM+Kit",
            "https://via.placeholder.com/300x300/85C1E9/FFFFFF?text=Language+Cards"
          ];
          
          // Generate dynamic product info based on position
          const titleIndex = index % productTitles.length;
          const descIndex = index % productDescriptions.length;
          
          return {
            title: productTitles[titleIndex],
            price: `₹${Math.floor(Math.random() * 1000 + 299)} (Special Price)`,
            imageUrl: productImages[index % productImages.length],
            url: trimmedLink,
            description: productDescriptions[descIndex]
          };
        });
        
        res.status(200).json({ products });
        return;
      } catch (error) {
        console.error('Gift Ideas API Error:', error);
        res.status(500).json({ 
          error: 'Failed to load gift ideas',
          message: process.env.NODE_ENV === 'production' ? undefined : error.message
        });
        return;
      }
    }

    // Default response for unknown endpoints
    res.status(404).json({ 
      error: 'Endpoint not found',
      availableEndpoints: [
        'GET /api/health',
        'POST /api/calculate-growth',
        'POST /api/calculate-weight',
        'GET /api/gift-ideas'
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