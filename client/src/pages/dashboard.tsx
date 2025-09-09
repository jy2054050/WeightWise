import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Syringe, Ruler, Star, Heart, ArrowRight, Plane, FileText, Gift } from "lucide-react";
import { trackEvent } from "../../lib/analytics";

// SVG Doodles (reusing from growth tracker)
const CloudDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none">
    <path d="M25 45c-8 0-15-7-15-15 0-5 3-9 7-12 2-8 9-14 18-14 7 0 13 4 16 10 1 0 3 0 4 0 8 0 15 7 15 15 0 8-7 15-15 15H25z" 
          fill="currentColor" opacity="0.1"/>
  </svg>
);

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

export default function Dashboard() {
  const handleFeatureClick = (feature: string) => {
    trackEvent('feature_accessed', 'navigation', feature);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/5 via-kid-green/5 to-kid-purple/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-10 left-10 w-20 h-12 text-kid-blue/20 animate-float" />
        <StarDoodle className="absolute top-20 right-20 w-8 h-8 text-kid-yellow/30 bounce-gentle" />
        <HeartDoodle className="absolute bottom-32 left-16 w-6 h-6 text-kid-pink/30 wiggle" />
        <CloudDoodle className="absolute bottom-20 right-32 w-16 h-10 text-kid-green/20" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4 bg-gradient-to-r from-kid-purple to-kid-pink bg-clip-text text-transparent">
            Child Health Tracker
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto">
            Comprehensive health tracking tools for your child's growth, vaccinations, and development
          </p>
          <div className="flex items-center justify-center mt-4">
            <StarDoodle className="w-5 h-5 text-kid-yellow mr-2" />
            <span className="text-sm text-text-secondary">Trusted by thousands of parents worldwide</span>
            <HeartDoodle className="w-5 h-5 text-kid-pink ml-2" />
          </div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Growth Tracker - Main Feature */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-kid-purple/10 to-kid-pink/10 border-kid-purple/20 hover:border-kid-purple/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <div className="absolute top-4 right-4">
              <div className="bg-kid-purple/20 text-kid-purple px-2 py-1 rounded-full text-xs font-semibold">
                FEATURED
              </div>
            </div>
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-kid-purple to-kid-pink rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-text-primary">
                Growth Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-text-secondary mb-6 leading-relaxed text-lg">
                Track your child's weight, height, head circumference, and BMI using authentic WHO growth charts
              </p>
              <div className="space-y-3 mb-8 text-sm text-text-secondary">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-kid-purple rounded-full mr-3"></div>
                  WHO-based percentile analysis
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-kid-pink rounded-full mr-3"></div>
                  Professional health insights
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-kid-purple rounded-full mr-3"></div>
                  Ages 0-60 months supported
                </div>
              </div>
              <Link href="/growth-tracker">
                <Button 
                  onClick={() => handleFeatureClick('growth-tracker')}
                  className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-kid-purple to-kid-pink hover:from-kid-purple/80 hover:to-kid-pink/80 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Track Growth
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Height Predictor */}
          <Card className="relative overflow-hidden bg-gradient-to-br from-kid-green/10 to-emerald-100/50 border-kid-green/20 hover:border-kid-green/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            <CardHeader className="text-center pb-4">
              <div className="w-20 h-20 mx-auto bg-gradient-to-r from-kid-green to-emerald-500 rounded-full flex items-center justify-center mb-4">
                <Ruler className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-text-primary">
                Height Predictor
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-text-secondary mb-6 leading-relaxed text-lg">
                Predict your child's adult height using the scientifically-proven Khamis-Roche method
              </p>
              <div className="space-y-3 mb-8 text-sm text-text-secondary">
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-kid-green rounded-full mr-3"></div>
                  Khamis-Roche method
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                  Parent height analysis
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-2 h-2 bg-kid-green rounded-full mr-3"></div>
                  Confidence intervals
                </div>
              </div>
              <Link href="/height-predictor">
                <Button 
                  onClick={() => handleFeatureClick('height-predictor')}
                  className="w-full h-14 text-xl font-semibold bg-gradient-to-r from-kid-green to-emerald-500 hover:from-kid-green/80 hover:to-emerald-500/80 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Calculate Height
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Health Information Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-text-primary mb-2">Health Information & Guides</h2>
            <p className="text-text-secondary">Educational resources to support your child's health journey</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Vaccination Schedule - Info */}
            <Card className="bg-gradient-to-br from-kid-blue/5 to-sky-50/30 border-kid-blue/15 hover:border-kid-blue/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-blue/80 to-sky-400/80 rounded-full flex items-center justify-center mb-3">
                  <Syringe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  Vaccination Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Complete immunization timeline and guidelines for your child's protection
                </p>
                <Link href="/vaccination">
                  <Button 
                    onClick={() => handleFeatureClick('vaccination')}
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-blue/30 text-kid-blue hover:bg-kid-blue/10 rounded-xl"
                  >
                    View Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Parent's Guide */}
            <Card className="bg-gradient-to-br from-kid-purple/5 to-kid-pink/5 border-kid-purple/15 hover:border-kid-purple/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-purple/80 to-kid-pink/80 rounded-full flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  Parent's Guide
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Understanding growth patterns, percentiles, and when to consult healthcare providers
                </p>
                <Link href="/guide">
                  <Button 
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-purple/30 text-kid-purple hover:bg-kid-purple/10 rounded-xl"
                  >
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Travel Medicine Guide */}
            <Card className="bg-gradient-to-br from-kid-blue/5 to-cyan-50/30 border-kid-blue/15 hover:border-kid-blue/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-blue/80 to-cyan-400/80 rounded-full flex items-center justify-center mb-3">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  Travel Medicine
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Essential medicines to carry while traveling with children, with proper dosages
                </p>
                <Link href="/travel-medicine">
                  <Button 
                    onClick={() => handleFeatureClick('travel-medicine')}
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-blue/30 text-kid-blue hover:bg-kid-blue/10 rounded-xl"
                  >
                    View Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Indian Documents Guide */}
            <Card className="bg-gradient-to-br from-kid-orange/5 to-yellow-50/30 border-kid-orange/15 hover:border-kid-orange/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-orange/80 to-yellow-500/80 rounded-full flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  Indian Documents
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Complete checklist of important documents needed for children in India
                </p>
                <Link href="/indian-documents">
                  <Button 
                    onClick={() => handleFeatureClick('indian-documents')}
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-orange/30 text-kid-orange hover:bg-kid-orange/10 rounded-xl"
                  >
                    View Checklist
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Gift Ideas */}
            <Card className="bg-gradient-to-br from-kid-pink/5 to-purple-50/30 border-kid-pink/15 hover:border-kid-pink/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-pink/80 to-kid-purple/80 rounded-full flex items-center justify-center mb-3">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  Gift Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Curated educational and developmental gift recommendations for children
                </p>
                <Link href="/gift-ideas">
                  <Button 
                    onClick={() => handleFeatureClick('gift-ideas')}
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-pink/30 text-kid-pink hover:bg-kid-pink/10 rounded-xl"
                  >
                    Browse Gifts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* WHO Data Reference */}
            <Card className="bg-gradient-to-br from-kid-yellow/5 to-orange-50/30 border-kid-yellow/15 hover:border-kid-yellow/30 transition-all duration-300 hover:shadow-md">
              <CardHeader className="text-center pb-3">
                <div className="w-12 h-12 mx-auto bg-gradient-to-r from-kid-yellow/80 to-orange-400/80 rounded-full flex items-center justify-center mb-3">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-text-primary">
                  WHO Data Reference
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-text-secondary mb-4 text-sm leading-relaxed">
                  Official WHO growth charts and percentile reference data for professional use
                </p>
                <Link href="/who-data">
                  <Button 
                    variant="outline"
                    className="w-full h-10 text-sm font-medium border-kid-yellow/40 text-orange-600 hover:bg-kid-yellow/10 rounded-xl"
                  >
                    View Data
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-text-secondary text-sm">
            All tools are based on medical standards and professional guidelines
          </p>
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Link href="/guide">
              <Button variant="outline" size="sm" className="text-kid-blue hover:bg-kid-blue/10">
                Parent's Guide
              </Button>
            </Link>
            <Link href="/who-data">
              <Button variant="outline" size="sm" className="text-kid-purple hover:bg-kid-purple/10">
                WHO Data Reference
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}