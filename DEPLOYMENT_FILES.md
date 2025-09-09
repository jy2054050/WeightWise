# Essential Files for Vercel Deployment

## 1. vercel.json (Root Directory)
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api"
    }
  ]
}
```

## 2. api/index.js (Serverless Function)
```javascript
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

    // Legacy weight calculation endpoint (backwards compatibility)
    if (url === '/api/calculate-weight' && method === 'POST') {
      const result = calculateGrowthPercentiles(req.body);
      res.status(200).json(result);
      return;
    }

    // 404 for unmatched routes
    res.status(404).json({ 
      error: 'Not Found',
      message: 'API endpoint not found',
      availableEndpoints: ['/api/health', '/api/calculate-growth', '/api/calculate-weight']
    });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: 'An error occurred processing your request'
    });
  }
};
```

## 3. api/package.json
```json
{
  "name": "growth-tracker-api",
  "version": "1.0.0",
  "main": "index.js",
  "dependencies": {}
}
```

## 4. Vercel Environment Variables
Set these in Vercel Dashboard > Project Settings > Environment Variables:
```
NODE_ENV=production
VITE_GA_MEASUREMENT_ID=G-79C3SK7LZP
```

## 5. Vercel Dashboard Settings
- **Framework Preset**: Other
- **Build Command**: (leave empty)
- **Output Directory**: public
- **Install Command**: (leave empty)
- **Node.js Version**: 22.x

## 6. Directory Structure Needed
```
your-project/
├── api/
│   ├── index.js
│   ├── package.json
│   └── growth-calculations.js
├── public/
│   ├── index.html
│   ├── assets/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
└── vercel.json
```

## 7. Next Steps
1. Create new project on Vercel
2. Connect your GitHub repository  
3. Use the settings above
4. Deploy

The public/ folder should contain your built React app files (you already have these built in dist/public/).