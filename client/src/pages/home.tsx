import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Heart, Baby, Cake, Star, Shield, RotateCcw, Sparkles, HelpCircle, BookOpen, Ruler, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { weightCheckSchema, growthCheckSchema, type WeightCheckRequest, type WeightResult, type GrowthCheckRequest, type GrowthResult } from "@shared/schema";

const COLORS = {
  underweight: 'hsl(4 86% 70%)',    // Soft red
  healthy: 'hsl(142 76% 60%)',      // Kid green
  overweight: 'hsl(39 100% 65%)'    // Kid orange
};

// SVG Doodles components
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

export default function Home() {
  const [results, setResults] = useState<WeightResult | null>(null);
  const [growthResults, setGrowthResults] = useState<GrowthResult | null>(null);
  const [activeSection, setActiveSection] = useState<'checker' | 'faq' | 'theory'>('checker');
  const [measurementType, setMeasurementType] = useState<'weight' | 'height' | 'head' | 'comprehensive'>('comprehensive');
  const { toast } = useToast();

  const growthForm = useForm<GrowthCheckRequest>({
    resolver: zodResolver(growthCheckSchema),
    defaultValues: {
      age: 12,
      gender: 'male' as 'male' | 'female',
    }
  });

  const form = useForm<WeightCheckRequest>({
    resolver: zodResolver(weightCheckSchema),
    defaultValues: {
      age: undefined,
      gender: undefined,
      weight: undefined,
    },
  });

  const calculateMutation = useMutation({
    mutationFn: async (data: WeightCheckRequest) => {
      const response = await apiRequest("POST", "/api/calculate-weight", data);
      return response.json() as Promise<WeightResult>;
    },
    onSuccess: (data) => {
      setResults(data);
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    },
    onError: (error) => {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  const calculateGrowthMutation = useMutation({
    mutationFn: async (data: GrowthCheckRequest) => {
      const response = await apiRequest("POST", "/api/calculate-growth", data);
      return response.json() as Promise<GrowthResult>;
    },
    onSuccess: (data) => {
      setGrowthResults(data);
      setTimeout(() => {
        document.getElementById('growth-results-section')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
    },
    onError: (error) => {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WeightCheckRequest) => {
    calculateMutation.mutate(data);
  };

  const onGrowthSubmit = (data: GrowthCheckRequest) => {
    calculateGrowthMutation.mutate(data);
  };

  const handleReset = () => {
    form.reset();
    growthForm.reset();
    setResults(null);
    setGrowthResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const renderContent = () => {
    switch (activeSection) {
      case 'faq':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-kid-purple/20 to-kid-pink/20 border-kid-purple/30 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-text-primary flex items-center justify-center">
                  <HelpCircle className="text-kid-purple mr-3 h-8 w-8" />
                  Frequently Asked Questions
                  <StarDoodle className="w-6 h-6 text-kid-yellow ml-3 wiggle" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-blue mb-2">Is this tool accurate?</h3>
                  <p className="text-text-secondary">Our tool uses WHO growth standards to provide estimates. Always consult your pediatrician for professional medical advice about your child's health.</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-green mb-2">What age range does this cover?</h3>
                  <p className="text-text-secondary">This tool is designed for children from 1 to 60 months old (birth to 5 years). For older children, please consult your healthcare provider.</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-orange mb-2">How often should I check my child's weight?</h3>
                  <p className="text-text-secondary">Regular pediatric check-ups typically include weight monitoring. For healthy children, checking weight every 3-6 months is usually sufficient.</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-purple mb-2">What if my child is outside the healthy range?</h3>
                  <p className="text-text-secondary">Don't worry! Children grow at different rates. If you have concerns, speak with your pediatrician who can provide personalized guidance.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'theory':
        return (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-kid-blue/20 to-kid-green/20 border-kid-blue/30 rounded-3xl">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-text-primary flex items-center justify-center">
                  <BookOpen className="text-kid-blue mr-3 h-8 w-8" />
                  Understanding Child Growth
                  <HeartDoodle className="w-6 h-6 text-kid-pink ml-3 bounce-gentle" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-blue mb-2">WHO Growth Standards</h3>
                  <p className="text-text-secondary mb-3">The World Health Organization (WHO) has established global standards for how children should grow. These standards are based on data from healthy children around the world.</p>
                  <p className="text-text-secondary">Our tool uses these internationally recognized standards to help you understand where your child fits within normal growth patterns.</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-green mb-2">Healthy Weight Ranges</h3>
                  <p className="text-text-secondary mb-3">Children's weight is considered healthy when it falls within a certain range relative to their height and age. This range accounts for natural variation in body types and growth patterns.</p>
                  <p className="text-text-secondary">Remember, every child is unique and grows at their own pace!</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-orange mb-2">Factors Affecting Growth</h3>
                  <p className="text-text-secondary">Many factors influence a child's growth including genetics, nutrition, physical activity, sleep, and overall health. A pediatrician can help assess all these factors together.</p>
                </div>
                <div className="bg-white/70 p-4 rounded-2xl">
                  <h3 className="font-semibold text-lg text-kid-purple mb-2">When to Seek Professional Advice</h3>
                  <p className="text-text-secondary">If you have any concerns about your child's growth or development, don't hesitate to contact your healthcare provider. They can provide personalized assessment and guidance.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      default:
        return (
          <>
            {/* Main Checker Form */}
            <Card className="bg-gradient-to-br from-kid-blue/10 to-kid-purple/10 border-kid-blue/30 rounded-3xl shadow-xl">
              <CardContent className="p-8">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Age Input */}
                  <div className="relative">
                    <Label htmlFor="age" className="block text-lg font-bold text-text-primary mb-3 flex items-center">
                      <Cake className="text-kid-pink mr-3 h-6 w-6" />
                      How old is your little one?
                    </Label>
                    <div className="relative">
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter age"
                        min="1"
                        max="60"
                        className="w-full px-6 py-4 pr-20 text-lg border-2 border-kid-blue/30 rounded-2xl focus:ring-2 focus:ring-kid-blue focus:border-kid-blue bg-white/80 text-center font-semibold"
                        {...form.register("age", { valueAsNumber: true })}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-kid-purple font-bold pointer-events-none">
                        months
                      </span>
                    </div>
                    <p className="text-sm text-kid-blue mt-2 text-center">Ages 1-60 months (0-5 years)</p>
                    {form.formState.errors.age && (
                      <p className="text-sm text-red-500 mt-1 text-center">{form.formState.errors.age.message}</p>
                    )}
                    <StarDoodle className="absolute -top-2 -right-2 w-8 h-8 text-kid-yellow bounce-gentle" />
                  </div>

                  {/* Gender Selection */}
                  <div className="relative">
                    <Label className="block text-lg font-bold text-text-primary mb-4 flex items-center">
                      <Baby className="text-kid-green mr-3 h-6 w-6" />
                      Is your child a boy or girl?
                    </Label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          value="male"
                          className="sr-only peer"
                          {...form.register("gender")}
                        />
                        <div className="p-6 border-3 border-kid-blue/30 rounded-3xl text-center transition-all duration-300 peer-checked:border-kid-blue peer-checked:bg-kid-blue/10 hover:scale-105 bg-white/80">
                          <div className="text-4xl mb-3">👦</div>
                          <div className="text-lg font-bold text-kid-blue">Boy</div>
                        </div>
                      </label>
                      <label className="relative cursor-pointer group">
                        <input
                          type="radio"
                          value="female"
                          className="sr-only peer"
                          {...form.register("gender")}
                        />
                        <div className="p-6 border-3 border-kid-pink/30 rounded-3xl text-center transition-all duration-300 peer-checked:border-kid-pink peer-checked:bg-kid-pink/10 hover:scale-105 bg-white/80">
                          <div className="text-4xl mb-3">👧</div>
                          <div className="text-lg font-bold text-kid-pink">Girl</div>
                        </div>
                      </label>
                    </div>
                    {form.formState.errors.gender && (
                      <p className="text-sm text-red-500 mt-2 text-center">{form.formState.errors.gender.message}</p>
                    )}
                    <HeartDoodle className="absolute -top-2 -left-2 w-8 h-8 text-kid-pink wiggle" />
                  </div>

                  {/* Weight Input */}
                  <div className="relative">
                    <Label htmlFor="weight" className="block text-lg font-bold text-text-primary mb-3 flex items-center">
                      <Heart className="text-kid-orange mr-3 h-6 w-6" />
                      What does your child weigh?
                    </Label>
                    <div className="relative">
                      <Input
                        id="weight"
                        type="number"
                        placeholder="Enter weight"
                        min="1"
                        max="50"
                        step="0.1"
                        className="w-full px-6 py-4 pr-16 text-lg border-2 border-kid-orange/30 rounded-2xl focus:ring-2 focus:ring-kid-orange focus:border-kid-orange bg-white/80 text-center font-semibold"
                        {...form.register("weight", { valueAsNumber: true })}
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-kid-orange font-bold pointer-events-none">
                        kg
                      </span>
                    </div>
                    <p className="text-sm text-kid-orange mt-2 text-center">Weight range: 1-50 kg</p>
                    {form.formState.errors.weight && (
                      <p className="text-sm text-red-500 mt-1 text-center">{form.formState.errors.weight.message}</p>
                    )}
                    <StarDoodle className="absolute -top-2 -left-2 w-8 h-8 text-kid-yellow wiggle" />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={calculateMutation.isPending}
                    className="w-full bg-gradient-to-r from-kid-blue to-kid-purple text-white py-6 rounded-3xl font-bold text-xl transition-all duration-300 hover:scale-105 focus:ring-4 focus:ring-kid-blue/30 disabled:opacity-50 shadow-lg"
                  >
                    {calculateMutation.isPending ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                        Checking...
                      </div>
                    ) : (
                      <>
                        <Sparkles className="mr-3 h-6 w-6" />
                        Check My Child's Weight!
                        <Heart className="ml-3 h-6 w-6" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Results Section */}
            {results && (
              <div id="results-section" className="space-y-6">
                {/* Chart Container */}
                <Card className="bg-gradient-to-br from-kid-yellow/20 to-kid-orange/20 border-kid-yellow/30 rounded-3xl shadow-xl">
                  <CardContent className="p-8">
                    <h2 className="text-3xl font-bold text-text-primary mb-8 text-center flex items-center justify-center">
                      Your Child's Weight Percentile
                      <Star className="text-kid-yellow ml-3 h-8 w-8 bounce-gentle" />
                    </h2>

                    {/* Current Weight and Percentile Display */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center px-8 py-6 bg-white rounded-2xl shadow-lg border-2 border-kid-blue/30">
                        <div className="text-4xl mr-4">📏</div>
                        <div>
                          <div className="text-xl font-bold text-text-primary">Your Child's Weight</div>
                          <div className="text-3xl font-bold text-kid-blue">{results.actualWeight} kg</div>
                          <div className="text-lg font-semibold text-kid-purple">{results.percentile}th Percentile</div>
                        </div>
                      </div>
                    </div>

                    {/* Percentile Line Chart */}
                    <div className="mb-8">
                      <div className="bg-gradient-to-r from-red-100 via-green-100 to-orange-100 p-6 rounded-2xl border-2 border-kid-blue/20">
                        <h3 className="text-xl font-bold text-text-primary mb-4 text-center">WHO Growth Chart Position</h3>
                        
                        {/* Percentile Scale */}
                        <div className="relative">
                          {/* Background line */}
                          <div className="h-4 bg-gradient-to-r from-red-300 via-green-300 to-orange-300 rounded-full mb-4"></div>
                          
                          {/* Percentile markers */}
                          <div className="relative -mt-8 mb-4">
                            {[3, 15, 50, 85, 97].map((percentile) => (
                              <div
                                key={percentile}
                                className="absolute flex flex-col items-center"
                                style={{ left: `${(percentile / 100) * 100}%`, transform: 'translateX(-50%)' }}
                              >
                                <div className="w-2 h-8 bg-gray-600 rounded"></div>
                                <span className="text-xs font-bold text-gray-600 mt-1">{percentile}th</span>
                              </div>
                            ))}
                          </div>
                          
                          {/* Child's position indicator */}
                          <div
                            className="absolute flex flex-col items-center -mt-12"
                            style={{ 
                              left: `${Math.min(97, Math.max(3, results.percentile))}%`, 
                              transform: 'translateX(-50%)' 
                            }}
                          >
                            <div className="animate-bounce">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center shadow-lg ${
                                results.weightCategory === 'severely_underweight' || results.weightCategory === 'underweight' ? 'bg-red-500' :
                                results.weightCategory === 'healthy' ? 'bg-green-500' : 'bg-orange-500'
                              }`}>
                                <span className="text-white text-xs">👶</span>
                              </div>
                            </div>
                            <div className={`text-sm font-bold mt-2 px-2 py-1 rounded-full text-white ${
                              results.weightCategory === 'severely_underweight' || results.weightCategory === 'underweight' ? 'bg-red-500' :
                              results.weightCategory === 'healthy' ? 'bg-green-500' : 'bg-orange-500'
                            }`}>
                              {results.percentile}th
                            </div>
                          </div>
                        </div>
                        
                        {/* Scale labels */}
                        <div className="flex justify-between text-sm font-semibold mt-8">
                          <span className="text-red-600">Underweight</span>
                          <span className="text-green-600">Healthy</span>
                          <span className="text-orange-600">Overweight</span>
                        </div>
                      </div>
                    </div>

                    {/* Weight Category Info */}
                    <div className="grid grid-cols-1 gap-4">
                      <div className={`p-6 rounded-2xl border-2 transition-all ${
                        results.weightCategory === 'severely_underweight' || results.weightCategory === 'underweight'
                          ? 'bg-red-200 border-red-400 shadow-lg scale-105' 
                          : 'bg-red-100 border-red-200'
                      }`}>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-2">
                              {results.weightCategory === 'severely_underweight' ? '😰' : '😟'}
                            </div>
                            <div className="text-lg font-bold text-text-primary">
                              {results.weightCategory === 'severely_underweight' ? 'Severely Underweight' : 'Underweight'}
                            </div>
                            <div className="text-sm text-red-600 mt-1">Below 15th percentile</div>
                            {(results.weightCategory === 'severely_underweight' || results.weightCategory === 'underweight') && 
                              <div className="text-red-600 font-bold mt-2">← Your child is here</div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className={`p-6 rounded-2xl border-2 transition-all ${
                        results.weightCategory === 'healthy'
                          ? 'bg-green-200 border-green-400 shadow-lg scale-105' 
                          : 'bg-green-100 border-green-200'
                      }`}>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-2">😊</div>
                            <div className="text-lg font-bold text-text-primary">Healthy Weight</div>
                            <div className="text-sm text-green-600 mt-1">15th - 85th percentile</div>
                            {results.weightCategory === 'healthy' && 
                              <div className="text-green-600 font-bold mt-2">← Your child is here</div>
                            }
                          </div>
                        </div>
                      </div>

                      <div className={`p-6 rounded-2xl border-2 transition-all ${
                        results.weightCategory === 'overweight' || results.weightCategory === 'severely_overweight'
                          ? 'bg-orange-200 border-orange-400 shadow-lg scale-105' 
                          : 'bg-orange-100 border-orange-200'
                      }`}>
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-2">
                              {results.weightCategory === 'severely_overweight' ? '😨' : '😐'}
                            </div>
                            <div className="text-lg font-bold text-text-primary">
                              {results.weightCategory === 'severely_overweight' ? 'Severely Overweight' : 'Overweight'}
                            </div>
                            <div className="text-sm text-orange-600 mt-1">Above 85th percentile</div>
                            {(results.weightCategory === 'overweight' || results.weightCategory === 'severely_overweight') && 
                              <div className="text-orange-600 font-bold mt-2">← Your child is here</div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendation Card */}
                <Card className="bg-gradient-to-br from-kid-green/20 to-kid-blue/20 border-kid-green/30 rounded-3xl shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-kid-green/20 rounded-full flex items-center justify-center mr-6 flex-shrink-0">
                        <div className="text-3xl">👩‍⚕️</div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-text-primary mb-3 flex items-center">
                          What This Means
                          <Sparkles className="text-kid-green ml-2 h-5 w-5" />
                        </h3>
                        <p className="text-text-secondary text-lg leading-relaxed">
                          {results.recommendation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reset Button */}
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="w-full bg-gradient-to-r from-kid-purple/20 to-kid-pink/20 text-text-primary py-4 rounded-3xl font-bold text-lg transition-all duration-300 hover:scale-105 border-2 border-kid-purple/30"
                >
                  <RotateCcw className="mr-3 h-6 w-6" />
                  Check Another Child 
                  <Baby className="ml-3 h-6 w-6" />
                </Button>
              </div>
            )}
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-system relative overflow-hidden">
      {/* Background Decorations */}
      <div className="fixed inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-10 left-5 w-20 h-12 text-kid-blue/20" />
        <StarDoodle className="absolute top-20 right-10 w-8 h-8 text-kid-yellow/30 bounce-gentle" />
        <HeartDoodle className="absolute top-40 left-10 w-6 h-6 text-kid-pink/30 wiggle" />
        <CloudDoodle className="absolute bottom-20 right-5 w-16 h-10 text-kid-purple/20" />
        <StarDoodle className="absolute bottom-40 left-8 w-6 h-6 text-kid-green/30 bounce-gentle" />
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-kid-blue to-kid-purple shadow-lg relative z-10">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg bounce-gentle">
              <div className="text-4xl">👶</div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Kid Weight Checker
            </h1>
            <p className="text-kid-yellow text-lg font-semibold">
              Is your little one growing healthy? 🌟
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-20">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-center space-x-1 py-2">
            <Button
              onClick={() => setActiveSection('checker')}
              variant={activeSection === 'checker' ? 'default' : 'ghost'}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                activeSection === 'checker' 
                  ? 'bg-kid-blue text-white' 
                  : 'text-kid-blue hover:bg-kid-blue/10'
              }`}
            >
              <Baby className="mr-2 h-4 w-4" />
              Checker
            </Button>
            <Button
              onClick={() => setActiveSection('faq')}
              variant={activeSection === 'faq' ? 'default' : 'ghost'}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                activeSection === 'faq' 
                  ? 'bg-kid-purple text-white' 
                  : 'text-kid-purple hover:bg-kid-purple/10'
              }`}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              FAQ
            </Button>
            <Button
              onClick={() => setActiveSection('theory')}
              variant={activeSection === 'theory' ? 'default' : 'ghost'}
              className={`px-4 py-2 rounded-2xl font-semibold text-sm transition-all ${
                activeSection === 'theory' 
                  ? 'bg-kid-green text-white' 
                  : 'text-kid-green hover:bg-kid-green/10'
              }`}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Learn
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-md mx-auto w-full px-4 py-6 relative z-10">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t-2 border-kid-blue/20 py-6 relative z-10">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="text-sm text-text-secondary space-y-3">
            <p className="flex items-center justify-center">
              <Shield className="mr-2 h-5 w-5 text-kid-green" />
              Based on WHO Growth Standards
            </p>
            <p className="flex items-center justify-center text-xs">
              <Heart className="mr-2 h-4 w-4 text-kid-pink" />
              Made with love for healthy kids everywhere
            </p>
            <p className="text-xs text-text-secondary/70">
              This tool provides estimates only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}