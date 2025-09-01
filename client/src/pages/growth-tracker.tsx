import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Heart, Baby, Cake, Star, Shield, RotateCcw, Sparkles, Ruler, Users, Brain, BookOpen, FileText, Syringe, TrendingUp } from "lucide-react";
import { Link } from "wouter";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { growthCheckSchema, type GrowthCheckRequest, type GrowthResult } from "@shared/schema";
import { trackEvent } from "../../lib/analytics";

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

export default function GrowthTracker() {
  const [results, setResults] = useState<GrowthResult | null>(null);
  const [measurementType, setMeasurementType] = useState<'comprehensive' | 'weight' | 'height' | 'head'>('comprehensive');
  const { toast } = useToast();

  const form = useForm<GrowthCheckRequest>({
    resolver: zodResolver(growthCheckSchema),
    mode: 'onSubmit', // Only validate on submit to avoid premature errors
    reValidateMode: 'onChange', // Revalidate after first submit when user changes input
    defaultValues: {
      gender: 'male' as 'male' | 'female',
    }
  });

  const calculateGrowthMutation = useMutation({
    mutationFn: async (data: GrowthCheckRequest) => {
      const response = await apiRequest("POST", "/api/calculate-growth", data);
      return response.json() as Promise<GrowthResult>;
    },
    onSuccess: (data) => {
      setResults(data);
      
      // Track successful growth analysis
      const measurements = Object.keys(data.measurements).filter(key => 
        data.measurements[key as keyof typeof data.measurements]
      );
      trackEvent('growth_analysis_completed', 'health', `measurements_${measurements.length}`, measurements.length);
      trackEvent('concern_level_detected', 'health', data.concernLevel);
      
      setTimeout(() => {
        document.getElementById('growth-results-section')?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100);
      toast({
        title: "Growth Assessment Complete! 🌟",
        description: "Scroll down to see your comprehensive growth analysis.",
      });
    },
    onError: (error) => {
      toast({
        title: "Oops! Something went wrong",
        description: error.message || "Please check your input and try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: GrowthCheckRequest) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', form.formState.errors);
    console.log('Form is valid:', form.formState.isValid);
    
    // Track form submission attempt
    trackEvent('growth_analysis_started', 'health', measurementType);
    
    // Clear any previous errors
    form.clearErrors();
    
    // Filter out undefined values based on measurement type
    const filteredData: GrowthCheckRequest = {
      age: data.age,
      gender: data.gender,
    };

    if (measurementType === 'comprehensive') {
      if (data.weight) filteredData.weight = data.weight;
      if (data.height) filteredData.height = data.height;
      if (data.headCircumference) filteredData.headCircumference = data.headCircumference;
    } else if (measurementType === 'weight' && data.weight) {
      filteredData.weight = data.weight;
    } else if (measurementType === 'height' && data.height) {
      filteredData.height = data.height;
    } else if (measurementType === 'head' && data.headCircumference) {
      filteredData.headCircumference = data.headCircumference;
    }

    console.log('Filtered data for API:', filteredData);
    calculateGrowthMutation.mutate(filteredData);
  };

  const handleReset = () => {
    // Clear all errors and reset form
    form.clearErrors();
    form.reset({
      gender: 'male' as 'male' | 'female',
      age: undefined,
      weight: undefined,
      height: undefined,
      headCircumference: undefined
    });
    setResults(null);
    setMeasurementType('comprehensive');
    
    // Clear any mutation errors
    calculateGrowthMutation.reset();
    
    // Track reset action
    trackEvent('form_reset', 'interaction', 'growth_tracker');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'severely_low': return 'text-red-600 bg-red-50';
      case 'low': return 'text-orange-600 bg-orange-50';
      case 'normal': return 'text-green-600 bg-green-50';
      case 'high': return 'text-blue-600 bg-blue-50';
      case 'severely_high': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryLabel = (category: string, measurementName: string) => {
    switch (category) {
      case 'severely_low': return `Very Low ${measurementName}`;
      case 'low': return `Below Average ${measurementName}`;
      case 'normal': return `Normal ${measurementName}`;
      case 'high': return `Above Average ${measurementName}`;
      case 'severely_high': return `Very High ${measurementName}`;
      default: return category;
    }
  };

  const renderMeasurementResult = (measurement: any, name: string, unit: string, icon: React.ReactNode) => {
    if (!measurement) return null;

    return (
      <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {icon}
            <span className="text-lg font-semibold text-text-primary ml-2">{name}</span>
          </div>
          <span className="text-2xl font-bold text-kid-purple">{measurement.value}{unit}</span>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-text-secondary">Percentile:</span>
            <span className="font-bold text-lg text-kid-blue">{measurement.percentile}th</span>
          </div>
          
          <div className={`px-3 py-2 rounded-full text-center font-medium ${getCategoryColor(measurement.category)}`}>
            {getCategoryLabel(measurement.category, name)}
          </div>
          
          {/* Visual percentile bar */}
          <div className="relative w-full bg-gray-200 rounded-full h-3">
            <div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-kid-blue to-kid-purple rounded-full transition-all duration-500"
              style={{ width: `${measurement.percentile}%` }}
            />
            <div 
              className="absolute top-0 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-kid-purple rounded-full shadow-lg"
              style={{ left: `${measurement.percentile}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-text-secondary">
            <span>3rd</span>
            <span>15th</span>
            <span>50th</span>
            <span>85th</span>
            <span>97th</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/10 via-kid-purple/5 to-kid-pink/10 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-20 left-10 w-20 h-12 text-kid-blue/20" />
        <StarDoodle className="absolute top-40 right-20 w-8 h-8 text-kid-yellow/30 animate-pulse" />
        <HeartDoodle className="absolute bottom-40 left-20 w-6 h-6 text-kid-pink/20" />
        <CloudDoodle className="absolute bottom-20 right-10 w-16 h-10 text-kid-green/20" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        {/* Header Card */}
        <Card className="bg-gradient-to-br from-kid-purple/20 to-kid-pink/20 border-kid-purple/30 rounded-3xl relative overflow-hidden shadow-lg">
          <div className="absolute top-4 right-4">
            <StarDoodle className="w-8 h-8 text-kid-yellow wiggle" />
          </div>
          <div className="absolute bottom-4 left-4">
            <CloudDoodle className="w-12 h-8 text-kid-blue" />
          </div>
          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-kid-purple to-kid-pink bg-clip-text text-transparent">
              🌟 Child Growth Tracker 🌟
            </CardTitle>
            <p className="text-text-secondary text-base sm:text-lg mt-3 px-2">
              Track your child's weight, height, head circumference & BMI using WHO standards! 👶
            </p>
          </CardHeader>
        </Card>

        {/* Measurement Type Selector */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-blue/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center text-text-primary">
              Choose What to Measure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { key: 'comprehensive', label: 'All Measurements', icon: '📊', color: 'kid-purple' },
                { key: 'weight', label: 'Weight Only', icon: '⚖️', color: 'kid-green' },
                { key: 'height', label: 'Height Only', icon: '📏', color: 'kid-blue' },
                { key: 'head', label: 'Head Circumference', icon: '🧠', color: 'kid-orange' }
              ].map((type) => (
                <button
                  key={type.key}
                  onClick={() => setMeasurementType(type.key as any)}
                  className={`p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 text-center touch-manipulation ${
                    measurementType === type.key
                      ? 'border-kid-purple bg-kid-purple/20 text-kid-purple shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">{type.icon}</div>
                  <div className="font-medium text-xs sm:text-sm leading-tight">{type.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Comprehensive Growth Form */}
        <Card className="bg-white/90 backdrop-blur-sm border-kid-blue/30 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-center text-text-primary flex items-center justify-center">
              <Baby className="text-kid-green mr-3 h-6 w-6" />
              {measurementType === 'comprehensive' && 'Complete Growth Assessment'}
              {measurementType === 'weight' && 'Weight Assessment'}
              {measurementType === 'height' && 'Height Assessment'}
              {measurementType === 'head' && 'Head Circumference Assessment'}
              <HeartDoodle className="w-5 h-5 text-kid-pink ml-3 bounce-gentle" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {/* Age Input - smaller section */}
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="age" className="text-text-primary font-medium">
                    Age (in months) <Cake className="inline w-4 h-4 ml-1 text-kid-orange" />
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    min="0"
                    max="60"
                    placeholder="e.g., 18"
                    className="border-kid-blue/30 rounded-2xl h-12 text-lg focus:border-kid-purple focus:ring-kid-purple/20 placeholder:text-gray-400"
                    {...form.register("age", { 
                      setValueAs: (value) => {
                        if (value === '' || value === null) return undefined;
                        const num = parseFloat(value);
                        return isNaN(num) ? undefined : num;
                      },
                      onChange: () => {
                        if (form.formState.errors.age) {
                          form.clearErrors("age");
                        }
                      }
                    })}
                  />
                  {form.formState.errors.age && (
                    <p className="text-red-500 text-sm">Age must be between 0-60 months</p>
                  )}
                </div>

                {/* Gender Selection - bigger section */}
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-text-primary font-medium">
                    Gender <Users className="inline w-4 h-4 ml-1 text-kid-blue" />
                  </Label>
                  <div className="flex space-x-6 sm:space-x-8">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="male"
                        className="text-kid-blue focus:ring-kid-blue/20 w-4 h-4"
                        {...form.register("gender")}
                      />
                      <span className="text-text-primary text-lg">Boy 👦</span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        value="female"
                        className="text-kid-pink focus:ring-kid-pink/20 w-4 h-4"
                        {...form.register("gender")}
                      />
                      <span className="text-text-primary text-lg">Girl 👧</span>
                    </label>
                  </div>
                  {form.formState.errors.gender && (
                    <p className="text-red-500 text-sm">{form.formState.errors.gender.message}</p>
                  )}
                </div>
              </div>

              {/* Measurements based on selected type */}
              <div className={`grid gap-4 sm:gap-6 ${
                measurementType === 'comprehensive' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
              }`}>
                {(measurementType === 'comprehensive' || measurementType === 'weight') && (
                  <div className="space-y-2">
                    <Label htmlFor="weight" className="text-text-primary font-medium">
                      Weight (kg) <Shield className="inline w-4 h-4 ml-1 text-kid-green" />
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      step="0.1"
                      min="1"
                      max="50"
                      placeholder="e.g., 12.5"
                      className="border-kid-blue/30 rounded-2xl h-12 text-lg focus:border-kid-purple focus:ring-kid-purple/20 placeholder:text-gray-400"
                      {...form.register("weight", { 
                        setValueAs: (value) => {
                          if (value === '' || value === null) return undefined;
                          const num = parseFloat(value);
                          return isNaN(num) ? undefined : num;
                        },
                        onChange: () => {
                          // Clear any previous errors when user starts typing
                          if (form.formState.errors.weight) {
                            form.clearErrors("weight");
                          }
                        }
                      })}
                    />
                    {form.formState.errors.weight && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.weight.message || "Weight must be between 1-50 kg"}
                      </p>
                    )}
                  </div>
                )}

                {(measurementType === 'comprehensive' || measurementType === 'height') && (
                  <div className="space-y-2">
                    <Label htmlFor="height" className="text-text-primary font-medium">
                      Height (cm) <Ruler className="inline w-4 h-4 ml-1 text-kid-blue" />
                    </Label>
                    <Input
                      id="height"
                      type="number"
                      step="0.1"
                      min="45"
                      max="120"
                      placeholder="e.g., 85.5"
                      className="border-kid-blue/30 rounded-2xl h-12 text-lg focus:border-kid-purple focus:ring-kid-purple/20 placeholder:text-gray-400"
                      {...form.register("height", { 
                        setValueAs: (value) => {
                          if (value === '' || value === null) return undefined;
                          const num = parseFloat(value);
                          return isNaN(num) ? undefined : num;
                        },
                        onChange: () => {
                          if (form.formState.errors.height) {
                            form.clearErrors("height");
                          }
                        }
                      })}
                    />
                    {form.formState.errors.height && (
                      <p className="text-red-500 text-sm">Height must be between 45-120 cm</p>
                    )}
                  </div>
                )}

                {(measurementType === 'comprehensive' || measurementType === 'head') && (
                  <div className="space-y-2">
                    <Label htmlFor="headCircumference" className="text-text-primary font-medium">
                      Head Circumference (cm) <Brain className="inline w-4 h-4 ml-1 text-kid-orange" />
                    </Label>
                    <Input
                      id="headCircumference"
                      type="number"
                      step="0.1"
                      min="30"
                      max="55"
                      placeholder="e.g., 48.2"
                      className="border-kid-blue/30 rounded-2xl h-12 text-lg focus:border-kid-purple focus:ring-kid-purple/20 placeholder:text-gray-400"
                      {...form.register("headCircumference", { 
                        setValueAs: (value) => {
                          if (value === '' || value === null) return undefined;
                          const num = parseFloat(value);
                          return isNaN(num) ? undefined : num;
                        },
                        onChange: () => {
                          if (form.formState.errors.headCircumference) {
                            form.clearErrors("headCircumference");
                          }
                        }
                      })}
                    />
                    {form.formState.errors.headCircumference && (
                      <p className="text-red-500 text-sm">Head circumference must be between 30-55 cm</p>
                    )}
                  </div>
                )}
              </div>

              {measurementType === 'comprehensive' && (
                <div className="bg-kid-blue/10 p-4 rounded-2xl">
                  <p className="text-sm text-text-secondary text-center">
                    💡 You can fill in any combination of measurements. BMI will be calculated automatically if both weight and height are provided.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={calculateGrowthMutation.isPending}
                  className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-kid-purple to-kid-pink hover:from-kid-purple/80 hover:to-kid-pink/80 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  {calculateGrowthMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </div>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Analyze Growth! 🌟
                    </>
                  )}
                </Button>
                
                <Button
                  type="button"
                  onClick={handleReset}
                  variant="outline"
                  className="h-12 text-lg font-semibold border-kid-blue/30 text-kid-blue hover:bg-kid-blue/10 rounded-2xl"
                >
                  <RotateCcw className="mr-2 h-5 w-5" />
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div id="growth-results-section" className="space-y-6">
            <Card className="bg-gradient-to-br from-kid-green/20 to-kid-blue/20 border-kid-green/30 rounded-3xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center text-text-primary flex items-center justify-center">
                  <Star className="text-kid-yellow mr-3 h-8 w-8" />
                  Growth Assessment Results
                  <Heart className="text-kid-pink ml-3 h-8 w-8" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Overall Assessment */}
                <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-kid-purple mb-4 flex items-center">
                    <Star className="mr-2 h-6 w-6" />
                    Overall Assessment
                  </h3>
                  <p className="text-text-primary text-lg leading-relaxed mb-4">
                    {results.overallAssessment}
                  </p>
                  <div className={`px-4 py-3 rounded-2xl font-semibold text-center ${
                    results.concernLevel === 'none' ? 'bg-green-100 text-green-800' :
                    results.concernLevel === 'mild' ? 'bg-yellow-100 text-yellow-800' :
                    results.concernLevel === 'moderate' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Concern Level: {results.concernLevel.charAt(0).toUpperCase() + results.concernLevel.slice(1)}
                  </div>
                </div>

                {/* Individual Measurements */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {renderMeasurementResult(
                    results.measurements.weight,
                    'Weight',
                    ' kg',
                    <Shield className="h-6 w-6 text-kid-green" />
                  )}
                  
                  {renderMeasurementResult(
                    results.measurements.height,
                    'Height',
                    ' cm',
                    <Ruler className="h-6 w-6 text-kid-blue" />
                  )}
                  
                  {renderMeasurementResult(
                    results.measurements.headCircumference,
                    'Head Circumference',
                    ' cm',
                    <Brain className="h-6 w-6 text-kid-orange" />
                  )}
                  
                  {renderMeasurementResult(
                    results.measurements.bmi,
                    'BMI',
                    ' kg/m²',
                    <Heart className="h-6 w-6 text-kid-pink" />
                  )}
                </div>

                {/* Recommendations */}
                <div className="bg-white/80 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-kid-purple mb-4 flex items-center">
                    <Heart className="mr-2 h-6 w-6" />
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start text-text-primary">
                        <div className="w-2 h-2 bg-kid-purple rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span className="leading-relaxed">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* SEO Footer - subtle navigation to additional content */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm text-gray-500">
            <Link href="/guide" className="flex items-center hover:text-kid-blue transition-colors">
              <BookOpen className="w-4 h-4 mr-2" />
              Parent's Growth Guide
            </Link>
            <Link href="/who-data" className="flex items-center hover:text-kid-blue transition-colors">
              <FileText className="w-4 h-4 mr-2" />
              WHO Data Reference
            </Link>
            <Link href="/vaccination" className="flex items-center hover:text-kid-blue transition-colors">
              <Syringe className="w-4 h-4 mr-2" />
              Vaccination Schedule
            </Link>
          </div>
          <div className="text-center mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl border border-blue-200">
            <p className="text-sm text-blue-700 mb-2">
              💰 <strong>Investment Planning for Your Child's Future</strong>
            </p>
            <p className="text-xs text-gray-600 mb-3">
              Start planning your child's education and future with smart investment calculations
            </p>
            <a 
              href="https://investcalc.pro/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              SIP Calculator & Investment Tools
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-4">
            Child Growth Tracker • Based on WHO Growth Standards • For informational purposes only
          </p>
        </div>
      </div>
    </div>
  );
}