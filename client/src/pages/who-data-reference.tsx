import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Ruler, Brain, Shield, TrendingUp, ArrowLeft, Home } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

// Import WHO chart images
import BMIBoysChart from "@assets/BMI-boys_1754822472508.png";
import BMIGirlsChart from "@assets/BMI-girls_1754822472513.png";
import WeightBoysChart from "@assets/weight-boys_1754822476988.png";
import WeightGirlsChart from "@assets/weight-girls_1754822476989.png";
import HeadBoysChart from "@assets/head-circumference-boys_1754822472514.png";
import HeadGirlsChart from "@assets/head-circumference-girls_1754822472514.png";
import HeightBoysChart from "@assets/height-boys_1754822472514.png";
import HeightGirlsChart from "@assets/height-girls_1754822472515.png";

// SVG Doodles
const CloudDoodle = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 100 60" fill="none">
    <path d="M25 45c-8 0-15-7-15-15 0-5 3-9 7-12 2-8 9-14 18-14 7 0 13 4 16 10 1 0 3 0 4 0 8 0 15 7 15 15 0 8-7 15-15 15H25z" 
          fill="currentColor" opacity="0.1"/>
  </svg>
);

export default function WHODataReference() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sampleWeightData = [
    { age: 0, p3: 2.5, p15: 2.9, p50: 3.3, p85: 3.8, p97: 4.4 },
    { age: 1, p3: 3.4, p15: 3.9, p50: 4.5, p85: 5.1, p97: 5.8 },
    { age: 2, p3: 4.3, p15: 4.9, p50: 5.6, p85: 6.3, p97: 7.1 },
    { age: 3, p3: 5.0, p15: 5.7, p50: 6.4, p85: 7.2, p97: 8.0 },
    { age: 6, p3: 6.7, p15: 7.5, p50: 8.5, p85: 9.5, p97: 10.6 },
    { age: 12, p3: 8.7, p15: 9.6, p50: 10.8, p85: 12.0, p97: 13.3 },
    { age: 24, p3: 10.8, p15: 11.8, p50: 13.0, p85: 14.3, p97: 15.7 },
    { age: 36, p3: 12.3, p15: 13.4, p50: 14.7, p85: 16.2, p97: 17.8 },
    { age: 48, p3: 13.7, p15: 14.9, p50: 16.4, p85: 18.0, p97: 19.8 },
    { age: 60, p3: 15.0, p15: 16.3, p50: 18.0, p85: 19.8, p97: 21.8 }
  ];

  const sampleHeightData = [
    { age: 0, p3: 46.1, p15: 47.5, p50: 49.9, p85: 52.3, p97: 53.7 },
    { age: 1, p3: 50.8, p15: 52.3, p50: 54.7, p85: 57.1, p97: 58.6 },
    { age: 2, p3: 54.4, p15: 56.0, p50: 58.4, p85: 60.8, p97: 62.4 },
    { age: 3, p3: 57.3, p15: 59.0, p50: 61.4, p85: 63.8, p97: 65.5 },
    { age: 6, p3: 63.3, p15: 65.1, p50: 67.6, p85: 70.1, p97: 71.9 },
    { age: 12, p3: 71.0, p15: 73.0, p50: 75.7, p85: 78.4, p97: 80.5 },
    { age: 24, p3: 81.7, p15: 84.1, p50: 87.1, p85: 90.2, p97: 92.9 },
    { age: 36, p3: 88.7, p15: 91.4, p50: 94.9, p85: 98.4, p97: 101.5 },
    { age: 48, p3: 94.9, p15: 97.8, p50: 101.6, p85: 105.4, p97: 108.7 },
    { age: 60, p3: 100.7, p15: 103.8, p50: 107.9, p85: 112.0, p97: 115.7 }
  ];

  const sampleHeadData = [
    { age: 0, p3: 32.6, p15: 33.4, p50: 34.5, p85: 35.6, p97: 36.4 },
    { age: 1, p3: 35.8, p15: 36.6, p50: 37.6, p85: 38.6, p97: 39.4 },
    { age: 2, p3: 37.8, p15: 38.6, p50: 39.5, p85: 40.4, p97: 41.2 },
    { age: 3, p3: 39.1, p15: 39.9, p50: 40.7, p85: 41.6, p97: 42.4 },
    { age: 6, p3: 41.5, p15: 42.2, p50: 43.0, p85: 43.8, p97: 44.6 },
    { age: 12, p3: 44.4, p15: 45.0, p50: 45.8, p85: 46.6, p97: 47.3 },
    { age: 24, p3: 46.9, p15: 47.4, p50: 48.1, p85: 48.8, p97: 49.4 },
    { age: 36, p3: 47.8, p15: 48.3, p50: 49.0, p85: 49.6, p97: 50.2 },
    { age: 48, p3: 48.3, p15: 48.8, p50: 49.4, p85: 50.0, p97: 50.5 },
    { age: 60, p3: 48.6, p15: 49.1, p50: 49.7, p85: 50.2, p97: 50.7 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/5 via-white to-kid-purple/5">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
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
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            onClick={() => {
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Growth Tracker
          </Link>
        </div>
        
        {/* Header */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 rounded-3xl shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-blue-800">
              📊 WHO Growth Standards Reference Data 📊
            </CardTitle>
            <p className="text-blue-600 text-base sm:text-lg mt-3">
              Complete documentation of World Health Organization growth charts and data tables used in our calculations
            </p>
          </CardHeader>
        </Card>

        {/* Overview */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <FileText className="mr-3 h-6 w-6" />
              Overview of WHO Growth Standards
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              The World Health Organization (WHO) Child Growth Standards were developed to provide a single international standard that represents the best description of physiological growth for children under five years of age. These standards are based on data collected from healthy children in six countries across different regions and ethnic backgrounds.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Our Child Growth Tracker uses authentic WHO percentile data extracted from official growth charts to provide accurate assessments of your child's weight, height, head circumference, and BMI percentiles.
            </p>
          </CardContent>
        </Card>

        {/* Official WHO Growth Charts */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-green-700 flex items-center justify-center">
              <Shield className="mr-3 h-8 w-8" />
              Official WHO Growth Charts
              <Shield className="ml-3 h-8 w-8" />
            </CardTitle>
            <p className="text-green-600 text-center mt-2">
              These are visual representations of the authentic WHO percentile charts used in our calculations
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Weight-for-Age Charts */}
            <div>
              <h3 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6" />
                Weight-for-Age Percentile Charts
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-blue-800 mb-3">Boys (0-5 years)</h4>
                  <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={WeightBoysChart} 
                      alt="WHO Weight-for-Age Percentiles - Boys"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={WeightBoysChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      📥 Download Boys Weight Chart
                    </a>
                  </div>
                  <p className="text-blue-600 text-sm mt-2 text-center">WHO Weight-for-Age Percentiles - Boys</p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-pink-800 mb-3">Girls (0-5 years)</h4>
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={WeightGirlsChart} 
                      alt="WHO Weight-for-Age Percentiles - Girls"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={WeightGirlsChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 underline text-sm"
                    >
                      📥 Download Girls Weight Chart
                    </a>
                  </div>
                  <p className="text-pink-600 text-sm mt-2 text-center">WHO Weight-for-Age Percentiles - Girls</p>
                </div>
              </div>
            </div>

            {/* Height-for-Age Charts */}
            <div>
              <h3 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                <Ruler className="mr-2 h-6 w-6" />
                Height-for-Age Percentile Charts
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-blue-800 mb-3">Boys (0-5 years)</h4>
                  <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={HeightBoysChart} 
                      alt="WHO Height-for-Age Percentiles - Boys"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={HeightBoysChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      📥 Download Boys Height Chart
                    </a>
                  </div>
                  <p className="text-blue-600 text-sm mt-2 text-center">WHO Height-for-Age Percentiles - Boys</p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-pink-800 mb-3">Girls (0-5 years)</h4>
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={HeightGirlsChart} 
                      alt="WHO Height-for-Age Percentiles - Girls"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={HeightGirlsChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 underline text-sm"
                    >
                      📥 Download Girls Height Chart
                    </a>
                  </div>
                  <p className="text-pink-600 text-sm mt-2 text-center">WHO Height-for-Age Percentiles - Girls</p>
                </div>
              </div>
            </div>

            {/* Head Circumference Charts */}
            <div>
              <h3 className="text-xl font-semibold text-purple-800 mb-4 flex items-center">
                <Brain className="mr-2 h-6 w-6" />
                Head Circumference-for-Age Percentile Charts
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-blue-800 mb-3">Boys (0-5 years)</h4>
                  <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={HeadBoysChart} 
                      alt="WHO Head Circumference-for-Age Percentiles - Boys"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={HeadBoysChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      📥 Download Boys Head Circumference Chart
                    </a>
                  </div>
                  <p className="text-blue-600 text-sm mt-2 text-center">WHO Head Circumference-for-Age Percentiles - Boys</p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-pink-800 mb-3">Girls (0-5 years)</h4>
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={HeadGirlsChart} 
                      alt="WHO Head Circumference-for-Age Percentiles - Girls"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={HeadGirlsChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 underline text-sm"
                    >
                      📥 Download Girls Head Circumference Chart
                    </a>
                  </div>
                  <p className="text-pink-600 text-sm mt-2 text-center">WHO Head Circumference-for-Age Percentiles - Girls</p>
                </div>
              </div>
            </div>

            {/* BMI Charts */}
            <div>
              <h3 className="text-xl font-semibold text-orange-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-6 w-6" />
                BMI-for-Age Percentile Charts
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-blue-800 mb-3">Boys (0-5 years)</h4>
                  <div className="border-2 border-blue-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={BMIBoysChart} 
                      alt="WHO BMI-for-Age Percentiles - Boys"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={BMIBoysChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline text-sm"
                    >
                      📥 Download Boys BMI Chart
                    </a>
                  </div>
                  <p className="text-blue-600 text-sm mt-2 text-center">WHO BMI-for-Age Percentiles - Boys</p>
                </div>
                
                <div className="bg-pink-50 p-4 rounded-2xl">
                  <h4 className="font-semibold text-pink-800 mb-3">Girls (0-5 years)</h4>
                  <div className="border-2 border-pink-200 rounded-lg overflow-hidden bg-white who-chart-container">
                    <img 
                      src={BMIGirlsChart} 
                      alt="WHO BMI-for-Age Percentiles - Girls"
                    />
                  </div>
                  <div className="mt-2">
                    <a 
                      href={BMIGirlsChart} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-pink-600 hover:text-pink-800 underline text-sm"
                    >
                      📥 Download Girls BMI Chart
                    </a>
                  </div>
                  <p className="text-pink-600 text-sm mt-2 text-center">WHO BMI-for-Age Percentiles - Girls</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                About These Charts
              </h4>
              <p className="text-amber-700 text-sm leading-relaxed mb-3">
                These are the official WHO Child Growth Standards charts from which our percentile calculations are derived. Our web application extracts the precise percentile data from these charts and uses mathematical interpolation to provide accurate percentile calculations for any age and measurement within the 0-60 month range.
              </p>
              <div className="bg-blue-100 p-3 rounded-lg border border-blue-200">
                <p className="text-blue-800 text-sm font-medium mb-1">📱 Chart Display:</p>
                <p className="text-blue-700 text-xs">
                  These high-quality WHO chart images are optimized for mobile viewing. You can download the original charts or use our Growth Tracker tool which implements the exact WHO calculations for precise percentile measurements.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weight-for-Age Data */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 flex items-center">
              <Shield className="mr-3 h-6 w-6" />
              Weight-for-Age Percentiles (Boys) - Sample Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-green-50">
                    <th className="border border-gray-300 p-2 text-left">Age (months)</th>
                    <th className="border border-gray-300 p-2 text-center">3rd percentile</th>
                    <th className="border border-gray-300 p-2 text-center">15th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">50th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">85th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">97th percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleWeightData.map((row) => (
                    <tr key={row.age} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium">{row.age}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p3} kg</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p15} kg</td>
                      <td className="border border-gray-300 p-2 text-center font-medium">{row.p50} kg</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p85} kg</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p97} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Note:</strong> This table shows sample data from our weight-for-age calculations for boys. Complete data includes all ages from 0-60 months with precise interpolation between data points.
            </p>
          </CardContent>
        </Card>

        {/* Height-for-Age Data */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700 flex items-center">
              <Ruler className="mr-3 h-6 w-6" />
              Height-for-Age Percentiles (Boys) - Sample Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="border border-gray-300 p-2 text-left">Age (months)</th>
                    <th className="border border-gray-300 p-2 text-center">3rd percentile</th>
                    <th className="border border-gray-300 p-2 text-center">15th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">50th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">85th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">97th percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleHeightData.map((row) => (
                    <tr key={row.age} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium">{row.age}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p3} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p15} cm</td>
                      <td className="border border-gray-300 p-2 text-center font-medium">{row.p50} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p85} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p97} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Head Circumference Data */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-orange-700 flex items-center">
              <Brain className="mr-3 h-6 w-6" />
              Head Circumference-for-Age Percentiles (Boys) - Sample Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-orange-50">
                    <th className="border border-gray-300 p-2 text-left">Age (months)</th>
                    <th className="border border-gray-300 p-2 text-center">3rd percentile</th>
                    <th className="border border-gray-300 p-2 text-center">15th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">50th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">85th percentile</th>
                    <th className="border border-gray-300 p-2 text-center">97th percentile</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleHeadData.map((row) => (
                    <tr key={row.age} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 font-medium">{row.age}</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p3} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p15} cm</td>
                      <td className="border border-gray-300 p-2 text-center font-medium">{row.p50} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p85} cm</td>
                      <td className="border border-gray-300 p-2 text-center">{row.p97} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Chart References */}
        <Card className="bg-white border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-purple-700 flex items-center">
              <TrendingUp className="mr-3 h-6 w-6" />
              Original WHO Chart References
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-6">
              Our calculations are based on the following official WHO growth charts. These charts contain complete percentile data for ages 0-60 months:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-blue-800">Boys Charts</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-700">📊 BMI-for-Age (Boys)</p>
                    <p className="text-sm text-blue-600">Body Mass Index percentiles for boys 0-60 months</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="font-medium text-green-700">⚖️ Weight-for-Age (Boys)</p>
                    <p className="text-sm text-green-600">Weight percentiles for boys 0-60 months</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="font-medium text-purple-700">📏 Height-for-Age (Boys)</p>
                    <p className="text-sm text-purple-600">Height percentiles for boys 0-60 months</p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="font-medium text-orange-700">🧠 Head Circumference (Boys)</p>
                    <p className="text-sm text-orange-600">Head circumference percentiles for boys 0-60 months</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg text-pink-800">Girls Charts</h3>
                <div className="space-y-3">
                  <div className="bg-pink-50 p-3 rounded-lg">
                    <p className="font-medium text-pink-700">📊 BMI-for-Age (Girls)</p>
                    <p className="text-sm text-pink-600">Body Mass Index percentiles for girls 0-60 months</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="font-medium text-red-700">⚖️ Weight-for-Age (Girls)</p>
                    <p className="text-sm text-red-600">Weight percentiles for girls 0-60 months</p>
                  </div>
                  <div className="bg-indigo-50 p-3 rounded-lg">
                    <p className="font-medium text-indigo-700">📏 Height-for-Age (Girls)</p>
                    <p className="text-sm text-indigo-600">Height percentiles for girls 0-60 months</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="font-medium text-yellow-700">🧠 Head Circumference (Girls)</p>
                    <p className="text-sm text-yellow-600">Head circumference percentiles for girls 0-60 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Data Extraction and Processing</h4>
              <p className="text-sm text-gray-700">
                All percentile data has been carefully extracted from official WHO charts and implemented with precise interpolation algorithms to provide accurate percentile calculations for any age within the 0-60 month range. Our system uses mathematical interpolation to ensure smooth, accurate results between the discrete data points provided in the original charts.
              </p>
            </div>
          </CardContent>
        </Card>



        {/* Methodology */}
        <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800 flex items-center">
              <Users className="mr-3 h-6 w-6" />
              Our Calculation Methodology
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">1. Data Source Authenticity</h4>
                <p className="text-gray-700 text-sm">All calculations use official WHO growth standards extracted directly from published charts, ensuring medical-grade accuracy.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">2. Precise Interpolation</h4>
                <p className="text-gray-700 text-sm">Our algorithms perform mathematical interpolation between data points to provide accurate percentiles for any age, not just the discrete ages in the original charts.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">3. Gender-Specific Analysis</h4>
                <p className="text-gray-700 text-sm">Separate growth patterns and percentile calculations for boys and girls, reflecting biological differences in growth patterns.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">4. Comprehensive Assessment</h4>
                <p className="text-gray-700 text-sm">Multi-factor analysis considering all measured parameters together to provide holistic growth assessment and concern level evaluation.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="flex justify-center pt-8">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
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