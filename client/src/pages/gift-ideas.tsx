import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { trackEvent } from "../../lib/analytics";

interface Product {
  title: string;
  price: string;
  imageUrl: string;
  url: string;
  description: string;
}

// SVG Doodles (reusing from other pages)
const StarDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
          fill="currentColor"/>
  </svg>
);

const HeartDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
          fill="currentColor"/>
  </svg>
);

export default function GiftIdeas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        trackEvent('page_view', 'gift-ideas', 'gift_ideas_page');
        const response = await fetch('/api/gift-ideas');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productTitle: string, url: string) => {
    trackEvent('gift_click', 'gift-ideas', productTitle);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-purple/5 via-kid-pink/5 to-kid-yellow/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <StarDoodle className="absolute top-20 right-20 w-8 h-8 text-kid-yellow/30 bounce-gentle" />
        <HeartDoodle className="absolute bottom-32 left-16 w-6 h-6 text-kid-pink/30 wiggle" />
        <StarDoodle className="absolute bottom-20 right-32 w-6 h-6 text-kid-purple/30" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto bg-gradient-to-r from-kid-purple to-kid-pink rounded-full flex items-center justify-center mb-6">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 bg-gradient-to-r from-kid-purple to-kid-pink bg-clip-text text-transparent">
            Gift Ideas for Kids
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Curated collection of age-appropriate and healthy gift ideas for children
          </p>
          <div className="flex items-center justify-center mt-4">
            <StarDoodle className="w-5 h-5 text-kid-yellow mr-2" />
            <span className="text-sm text-text-secondary">Carefully selected educational and fun products</span>
            <HeartDoodle className="w-5 h-5 text-kid-pink ml-2" />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-kid-purple mb-4" />
            <p className="text-text-secondary">Loading gift ideas...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-8 h-8 text-red-500 mb-4" />
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {products.map((product, index) => (
              <Card 
                key={index}
                className="overflow-hidden bg-white border-kid-purple/20 hover:border-kid-purple/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={product.imageUrl} 
                    alt={product.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/300x300?text=Product+Image';
                    }}
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-text-primary line-clamp-2">
                    {product.title}
                  </CardTitle>
                  {product.price && (
                    <p className="text-xl font-bold text-kid-purple">{product.price}</p>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                    {product.description}
                  </p>
                  <Button 
                    onClick={() => handleProductClick(product.title, product.url)}
                    className="w-full bg-gradient-to-r from-kid-purple to-kid-pink hover:from-kid-purple/80 hover:to-kid-pink/80 text-white rounded-xl transition-all duration-300"
                  >
                    View Product
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-text-secondary">No gift ideas available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}