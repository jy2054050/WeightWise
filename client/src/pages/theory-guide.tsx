import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Baby, Shield, Users, Brain, Ruler, BookOpen, TrendingUp, Star, ArrowLeft, Calculator, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// SVG Doodles
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

export default function TheoryGuide() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/10 via-kid-purple/5 to-kid-pink/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-20 left-10 w-20 h-12 text-kid-blue/20" />
        <StarDoodle className="absolute top-40 right-20 w-8 h-8 text-kid-yellow/30 animate-pulse" />
        <CloudDoodle className="absolute bottom-20 right-10 w-16 h-10 text-kid-green/20" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-kid-blue to-kid-purple hover:from-kid-purple hover:to-kid-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              <Home className="w-5 h-5 mr-2" />
              🏠 Go Back to Home
            </Button>
          </Link>
          <Link 
            href="/" 
            className="flex items-center text-kid-blue hover:text-kid-purple transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            onClick={() => {
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Growth Tracker
          </Link>
        </div>
        
        {/* Header */}
        <Card className="bg-gradient-to-br from-kid-green/20 to-kid-blue/20 border-kid-green/30 rounded-3xl relative overflow-hidden shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-kid-green to-kid-blue bg-clip-text text-transparent">
              📚 Helping Your Child Grow Healthy and Strong 📚
            </CardTitle>
            <p className="text-text-secondary text-base sm:text-lg mt-3">
              A Parent's Complete Guide to Tracking Growth
            </p>
          </CardHeader>
        </Card>

        {/* Introduction */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-blue/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-kid-purple flex items-center">
              <Heart className="mr-3 h-6 w-6" />
              Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-text-primary leading-relaxed mb-4">
              Every parent wants their child to grow healthy, active, and happy. Growth is more than just getting taller or heavier — it's a reflection of your child's overall well-being. By regularly tracking your child's height, weight, BMI, and head circumference, you can make sure they're on the right path, spot any concerns early, and support them with the right nutrition and lifestyle.
            </p>
            <p className="text-text-primary leading-relaxed">
              That's where our website comes in — offering easy-to-read growth charts, smart calculators, and helpful insights based on trusted standards. Whether you're a new parent or already experienced, our tools help you understand what the numbers mean and how to support your child's unique growth journey.
            </p>
          </CardContent>
        </Card>

        {/* Why Tracking Growth Matters */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-green/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-kid-green flex items-center">
              <TrendingUp className="mr-3 h-6 w-6" />
              Why Tracking Growth Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-kid-red/10 p-4 rounded-2xl">
              <h3 className="font-semibold text-lg text-kid-red mb-2 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Early Warning Signs
              </h3>
              <p className="text-text-primary">
                Growth patterns can reveal more than you might expect. If a child's growth slows down unexpectedly or shoots up too quickly, it could be an early sign of nutritional deficiencies, hormonal changes, or underlying health conditions.
              </p>
            </div>

            <div className="bg-kid-orange/10 p-4 rounded-2xl">
              <h3 className="font-semibold text-lg text-kid-orange mb-2 flex items-center">
                <Baby className="mr-2 h-5 w-5" />
                Personalized Nutrition
              </h3>
              <p className="text-text-primary">
                Tracking helps you and your doctor adjust your child's diet for better health. For example, a child falling behind on height for age may need more protein and calcium, while a child with low weight might benefit from calorie-dense, nutrient-rich foods.
              </p>
            </div>

            <div className="bg-kid-purple/10 p-4 rounded-2xl">
              <h3 className="font-semibold text-lg text-kid-purple mb-2 flex items-center">
                <Heart className="mr-2 h-5 w-5" />
                Peace of Mind for Parents
              </h3>
              <p className="text-text-primary">
                Knowing your child is following a healthy growth curve can be reassuring. And if there's a concern, you can address it quickly with medical guidance.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* What Makes Our Website Unique */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-purple/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-kid-purple flex items-center">
              <Star className="mr-3 h-6 w-6" />
              What Makes Our Website Unique
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-kid-blue/10 p-4 rounded-2xl">
                <h4 className="font-semibold text-kid-blue mb-2">📊 Interactive Growth Charts</h4>
                <p className="text-text-secondary text-sm">No more guessing. Just enter your child's details and instantly see where they stand.</p>
              </div>
              <div className="bg-kid-green/10 p-4 rounded-2xl">
                <h4 className="font-semibold text-kid-green mb-2">📈 Percentile Calculators</h4>
                <p className="text-text-secondary text-sm">Understand your child's growth percentile compared to healthy standards.</p>
              </div>
              <div className="bg-kid-orange/10 p-4 rounded-2xl">
                <h4 className="font-semibold text-kid-orange mb-2">📱 Mobile-Friendly Tools</h4>
                <p className="text-text-secondary text-sm">Check your child's growth on-the-go, at the clinic, or even while chatting with friends.</p>
              </div>
              <div className="bg-kid-pink/10 p-4 rounded-2xl">
                <h4 className="font-semibold text-kid-pink mb-2">🔒 Trusted & Confidential</h4>
                <p className="text-text-secondary text-sm">Your child's data stays private while you get accurate, actionable insights.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-orange/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-kid-orange flex items-center">
              <BookOpen className="mr-3 h-6 w-6" />
              Best Practices for Tracking Your Child's Growth
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg text-kid-blue mb-3 flex items-center">
                <Ruler className="mr-2 h-5 w-5" />
                Measure Consistently
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
                <li>Use the same measuring tools (scale, height chart) each time</li>
                <li>For babies, measure length lying down; for toddlers and older kids, measure standing height</li>
                <li>Try to measure at the same time of day for consistency</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-kid-green mb-3 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Record Regularly
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
                <li>For babies under 2: monthly checks are best</li>
                <li>For children 2–5 years: every 3–6 months is usually enough</li>
                <li>Keep the records — trends matter more than one-off numbers</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg text-kid-purple mb-3 flex items-center">
                <Brain className="mr-2 h-5 w-5" />
                Look at Percentiles, Not Just Numbers
              </h3>
              <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
                <li>Being in the 30th percentile is not "bad" — it just means your child is smaller than 70% of children their age</li>
                <li>Sudden jumps or drops across percentiles are worth checking with a doctor</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* When to Consult a Doctor */}
        <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-red-600 flex items-center">
              <Shield className="mr-3 h-6 w-6" />
              When to Consult a Doctor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-primary mb-4">Growth changes are normal, but see your pediatrician if:</p>
            <ul className="list-disc list-inside space-y-2 text-text-primary ml-4">
              <li>Your child's growth slows or speeds up suddenly</li>
              <li>Height or weight falls below the 3rd percentile or above the 97th percentile</li>
              <li>Developmental milestones are delayed</li>
              <li>Your child is often fatigued, sick, or shows poor appetite over weeks</li>
            </ul>
            <p className="text-text-primary mt-4 font-medium">
              Early intervention can prevent small issues from becoming big challenges.
            </p>
          </CardContent>
        </Card>

        {/* Final Takeaway */}
        <Card className="bg-gradient-to-br from-kid-purple/20 to-kid-pink/20 border-kid-purple/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-kid-purple flex items-center justify-center">
              <Heart className="mr-3 h-6 w-6" />
              Final Takeaway
              <Star className="ml-3 h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-primary leading-relaxed text-center">
              Tracking your child's growth is not about comparing them to others — it's about understanding and supporting their individual journey. With the right tools, a balanced lifestyle, and a little guidance, you can help your child thrive every step of the way.
            </p>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="flex justify-center pt-8">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-kid-blue to-kid-purple hover:from-kid-purple hover:to-kid-blue text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              onClick={() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              <Home className="w-5 h-5 mr-2" />
              🏠 Go Back to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}