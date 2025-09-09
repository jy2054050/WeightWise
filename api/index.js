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
        
        // Product database - easily extensible for new products
        const productDatabase = {
          '79deBdP': {
            title: "Aditi Toys Gatling Bubble Gun for Kids",
            price: "₹288 (was ₹499)",
            imageUrl: "https://m.media-amazon.com/images/I/71nzHoo5C2L._SY355_.jpg",
            description: "8-hole bubble gun toy for kids above 3 years. Includes bubble solution, BIS approved, 100% safe & skin friendly. Perfect for indoor & outdoor play."
          },
          '3VnKHRB': {
            title: "Activity Binders for Kids Aged 1-4 Years",
            price: "₹849 (was ₹999)",
            imageUrl: "https://m.media-amazon.com/images/I/71j1MXXwVgL._SY466_.jpg",
            description: "Logical activity binders, Montessori books for kids. Velcro-based, round edges, laminated sheets. Develops problem-solving abilities and reasoning skills."
          },
          '5TqveSw': {
            title: "Educational Building Blocks Set",
            price: "₹399 (was ₹599)",
            imageUrl: "https://m.media-amazon.com/images/I/71F5f7XvMsL._SL1500_.jpg",
            description: "Colorful building blocks set for kids. Develops creativity, motor skills, and problem-solving abilities. Safe, non-toxic materials suitable for ages 3+."
          },
          'cYIGwoq': {
            title: "Kids Learning Activity Books",
            price: "₹299 (was ₹450)",
            imageUrl: "https://m.media-amazon.com/images/I/81QBmGdPyOL._SL1500_.jpg",
            description: "Set of educational activity books for early learning. Includes coloring, tracing, and basic concepts. Perfect for preschoolers aged 2-5 years."
          },
          'f6kPTOU': {
            title: "Musical Piano Keyboard for Kids",
            price: "₹1,299 (was ₹1,899)",
            imageUrl: "https://m.media-amazon.com/images/I/71VQ2h3NRBL._SL1500_.jpg",
            description: "37-key electronic piano keyboard with multiple sounds and rhythms. Develops musical skills and creativity. Includes microphone and demo songs."
          },
          '7MAe7Aa': {
            title: "Kids Science Experiment Kit",
            price: "₹899 (was ₹1,299)",
            imageUrl: "https://m.media-amazon.com/images/I/81fS5Q7KXRL._SL1500_.jpg",
            description: "Fun science experiment kit with 50+ activities. Encourages STEM learning and curiosity. Safe experiments for kids aged 8+ with adult supervision."
          }
        };

        // Enhanced product mapping with automatic Amazon ID extraction
        const products = links.map((link) => {
          const trimmedLink = link.trim();
          
          // Extract Amazon product ID from various URL formats
          const amazonIdMatch = trimmedLink.match(/\/d\/([A-Za-z0-9]+)/);
          const productId = amazonIdMatch ? amazonIdMatch[1] : null;
          
          // Check if we have specific product data
          if (productId && productDatabase[productId]) {
            return {
              ...productDatabase[productId],
              url: trimmedLink
            };
          }
          
          // Enhanced fallback for unknown Amazon products
          if (trimmedLink.includes('amazon.in') || trimmedLink.includes('amzn.in')) {
            return {
              title: "Educational Toy for Children",
              price: "View on Amazon for pricing",
              imageUrl: "https://m.media-amazon.com/images/G/31/img18/toys/homepage/toys-icon._CB1565799318_.png",
              url: trimmedLink,
              description: "Age-appropriate educational toy that promotes learning and development. Click to view full details, ratings, and current pricing on Amazon."
            };
          }
          
          // Generic fallback for non-Amazon links
          return {
            title: "Educational Product for Kids",
            price: "View for pricing",
            imageUrl: "https://m.media-amazon.com/images/G/31/img18/toys/homepage/toys-icon._CB1565799318_.png",
            url: trimmedLink,
            description: "Educational product recommended for child development and learning. Click to view full details and pricing."
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