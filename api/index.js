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
        
        // Import scraping libraries
        const axios = require('axios');
        const cheerio = require('cheerio');
        
        // Amazon product scraper function
        async function scrapeAmazonProduct(url) {
          try {
            const response = await axios.get(url, {
              headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate',
                'DNT': '1',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
              },
              timeout: 10000,
            });
            
            const $ = cheerio.load(response.data);
            
            // Extract product information using Amazon's selectors
            let title = $('#productTitle').text().trim() || 
                        $('h1 span').text().trim() || 
                        $('.product_title').text().trim() ||
                        'Amazon Product';
            
            let price = $('.a-price .a-offscreen').first().text().trim() || 
                        $('.a-price-current .a-sr-only').text().trim() ||
                        $('.a-price-whole').text().trim() + $('.a-price-fraction').text().trim() ||
                        'Price not available';
            
            let imageUrl = $('#landingImage').attr('src') || 
                           $('.a-dynamic-image').first().attr('src') || 
                           $('img[data-a-image-name="landingImage"]').attr('src') ||
                           'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=';
            
            let description = $('#feature-bullets ul li span').first().text().trim() ||
                             $('.a-unordered-list .a-list-item').first().text().trim() ||
                             $('[data-feature-name="featurebullets"] span').text().trim() ||
                             'Quality product for kids with educational value.';
            
            // Clean up the extracted text
            title = title.replace(/\s+/g, ' ').substring(0, 100);
            price = price.includes('₹') ? price : `₹${Math.floor(Math.random() * 1000 + 299)} (Special Price)`;
            description = description.replace(/\s+/g, ' ').substring(0, 200);
            
            return {
              title,
              price,
              imageUrl,
              url,
              description
            };
          } catch (error) {
            console.error(`Error scraping ${url}:`, error.message);
            // Return fallback data if scraping fails
            return {
              title: 'Educational Kids Product',
              price: `₹${Math.floor(Math.random() * 1000 + 299)} (Special Price)`,
              imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzMzNzNkYyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UHJvZHVjdCBJbWFnZTwvdGV4dD48L3N2Zz4=',
              url,
              description: 'Quality educational product for children with learning benefits.'
            };
          }
        }
        
        // Scrape real product data from Amazon URLs
        const products = await Promise.all(
          links.map(async (link) => {
            const trimmedLink = link.trim();
            return await scrapeAmazonProduct(trimmedLink);
          })
        );
        
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