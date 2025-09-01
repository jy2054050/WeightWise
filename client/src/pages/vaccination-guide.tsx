import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Baby, Calendar, Users, AlertTriangle, Heart, ArrowLeft, Syringe, Clock, Home } from "lucide-react";
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

export default function VaccinationGuide() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const vaccinationSchedule = [
    {
      age: "Birth",
      vaccines: ["BCG", "OPV", "Hepatitis B (1st)"],
      notes: "Given immediately after birth"
    },
    {
      age: "6 Weeks (1.5 months)",
      vaccines: ["DTaP + HiB + OPV/IPV", "Pneumococcal Vaccine (1st)", "Hepatitis B (2nd)", "Rotavirus (1st)"],
      notes: "First round of routine immunizations"
    },
    {
      age: "10 Weeks (2.5 months)", 
      vaccines: ["DTaP + HiB + OPV/IPV", "Pneumococcal Vaccine (2nd)", "Rotavirus (2nd)"],
      notes: "Second dose in the primary series"
    },
    {
      age: "14 Weeks (3.5 months)",
      vaccines: ["DTaP + HiB + OPV/IPV", "Pneumococcal Vaccine (3rd)", "Rotavirus (3rd)"],
      notes: "Completion of primary series"
    },
    {
      age: "6 Months",
      vaccines: ["Hepatitis B (3rd)", "OPV", "First Dental Check Up"],
      notes: "Mid-year boosters and dental care begins"
    },
    {
      age: "9 Months",
      vaccines: ["Measles Vaccine", "OPV"],
      notes: "Protection against measles begins"
    },
    {
      age: "12 Months",
      vaccines: ["Pneumococcal (4th Dose)", "Hepatitis A (1st)"],
      notes: "Additional protection as mobility increases"
    },
    {
      age: "15 Months",
      vaccines: ["MMR (1st)", "Chicken Pox (1st)"],
      notes: "Protection against multiple childhood diseases"
    },
    {
      age: "15-18 Months",
      vaccines: ["DTaP + OPV/IPV + HiB (1st Booster)", "Hepatitis A (2nd)"],
      notes: "Important booster doses - timing may vary"
    },
    {
      age: "2 Years",
      vaccines: ["Typhoid Vaccine"],
      notes: "Protection against typhoid fever"
    },
    {
      age: "3 Years",
      vaccines: ["MMR (2nd)", "Chicken Pox (2nd)"],
      notes: "Booster for enhanced immunity"
    },
    {
      age: "4-6 Years",
      vaccines: ["DTaP + OPV/IPV (2nd Booster)", "MMR (2nd dose if not given)", "Typhoid Vaccine"],
      notes: "Pre-school boosters before school entry"
    },
    {
      age: "6-10 Years",
      vaccines: ["Typhoid Vaccine (booster)"],
      notes: "Continued protection - timing may vary"
    },
    {
      age: "11-12 Years",
      vaccines: ["Tdap (Tetanus, Diphtheria, Pertussis booster)", "HPV (1st dose)", "Meningococcal"],
      notes: "Adolescent vaccinations"
    },
    {
      age: "13 to 26 Years",
      vaccines: ["HPV 1st Dose", "HPV 2nd Dose (2 months later)", "HPV 3rd Dose (6 months later)"],
      notes: "Protection against cervical cancer for girls"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100/50 via-blue-50/50 to-green-100/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-20 left-10 w-20 h-12 text-purple-300/40" />
        <StarDoodle className="absolute top-40 right-20 w-8 h-8 text-yellow-400/50 animate-pulse" />
        <CloudDoodle className="absolute bottom-20 right-10 w-16 h-10 text-blue-300/40" />
      </div>

      <div className="relative z-10 container mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-6 sm:space-y-8">
        
        {/* Navigation */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
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
            className="flex items-center text-purple-600 hover:text-purple-800 transition-colors bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            onClick={() => {
              setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
            }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Growth Tracker
          </Link>
        </div>
        
        {/* Header */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200 rounded-3xl relative overflow-hidden shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              💉 Complete Vaccination Schedule for Children 💉
            </CardTitle>
            <p className="text-purple-600 text-base sm:text-lg mt-3">
              A comprehensive guide to protect your child's health through proper immunization
            </p>
          </CardHeader>
        </Card>

        {/* Important Disclaimer */}
        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-amber-700 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6" />
              Important Medical Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-amber-800 font-medium">
                ⚠️ This vaccination schedule is provided as educational information from private healthcare institutions and is NOT a government mandate.
              </p>
              <p className="text-amber-700">
                Always consult with your pediatrician or healthcare provider before making vaccination decisions. This schedule may vary based on your child's health conditions, local disease prevalence, and medical recommendations.
              </p>
              <p className="text-amber-700 text-sm">
                Source: Based on recommendations from Rainbow Hospitals and private pediatric healthcare providers.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Introduction */}
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-blue-700 flex items-center">
              <Shield className="mr-3 h-6 w-6" />
              Why Vaccination Matters
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Vaccination is one of the most effective ways to protect your child from serious diseases. Vaccines work by training your child's immune system to recognize and fight specific infections, providing immunity before exposure to dangerous diseases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-2xl">
                <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Individual Protection
                </h4>
                <p className="text-green-600 text-sm">Protects your child from life-threatening diseases like polio, measles, and whooping cough.</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-2xl">
                <h4 className="font-semibold text-blue-700 mb-2 flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Community Immunity
                </h4>
                <p className="text-blue-600 text-sm">Helps protect the entire community, especially those who cannot be vaccinated due to medical conditions.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vaccination Schedule */}
        <Card className="bg-white/90 backdrop-blur-sm border-purple-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-purple-700 flex items-center">
              <Calendar className="mr-3 h-6 w-6" />
              Complete Vaccination Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vaccinationSchedule.map((schedule, index) => (
                <div key={index} className="border border-gray-200 rounded-2xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="lg:w-1/6">
                      <div className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-semibold text-center">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {schedule.age}
                      </div>
                    </div>
                    <div className="lg:w-3/5">
                      <div className="flex flex-wrap gap-2">
                        {schedule.vaccines.map((vaccine, vIndex) => (
                          <span key={vIndex} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                            <Syringe className="w-3 h-3 inline mr-1" />
                            {vaccine}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-1/4">
                      <p className="text-gray-600 text-sm italic">{schedule.notes}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Vaccine Information */}
        <Card className="bg-white/90 backdrop-blur-sm border-green-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 flex items-center">
              <Baby className="mr-3 h-6 w-6" />
              Understanding Key Vaccines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">DTaP/Tdap</h4>
                  <p className="text-blue-600 text-sm">Protects against Diphtheria, Tetanus, and Pertussis (whooping cough). DTaP for children under 7, Tdap for adolescents/adults.</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">MMR</h4>
                  <p className="text-green-600 text-sm">Protects against Measles, Mumps, and Rubella</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-700 mb-2">OPV/IPV</h4>
                  <p className="text-purple-600 text-sm">Oral/Injectable Polio Vaccine for polio prevention</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-700 mb-2">Pneumococcal</h4>
                  <p className="text-orange-600 text-sm">Protects against pneumonia and meningitis</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-red-700 mb-2">Hepatitis B</h4>
                  <p className="text-red-600 text-sm">Protects against liver infection and cancer</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-indigo-700 mb-2">HPV</h4>
                  <p className="text-indigo-600 text-sm">Protects against cervical cancer (for girls)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Important Tips */}
        <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 flex items-center">
              <Heart className="mr-3 h-6 w-6" />
              Important Tips for Parents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-800">Before Vaccination:</h4>
                <ul className="list-disc list-inside space-y-1 text-green-700 text-sm">
                  <li>Ensure your child is healthy (no fever or illness)</li>
                  <li>Bring vaccination records and any medical history</li>
                  <li>Ask questions about vaccines and side effects</li>
                  <li>Schedule appointments well in advance</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-800">After Vaccination:</h4>
                <ul className="list-disc list-inside space-y-1 text-blue-700 text-sm">
                  <li>Monitor for any side effects for 24-48 hours</li>
                  <li>Give plenty of fluids and rest</li>
                  <li>Apply cold compress if injection site is sore</li>
                  <li>Contact doctor if severe reactions occur</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultation Reminder */}
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 rounded-3xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-purple-700 flex items-center justify-center">
              <Shield className="mr-3 h-6 w-6" />
              Always Consult Your Pediatrician
              <Heart className="ml-3 h-6 w-6" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-purple-700 leading-relaxed text-center">
              This schedule is for educational purposes only. Every child is unique, and vaccination timing may need to be adjusted based on individual health conditions, travel plans, or local disease outbreaks. Always work with your healthcare provider to create the best vaccination plan for your child.
            </p>
            <div className="mt-4 p-3 bg-purple-100 rounded-lg">
              <p className="text-purple-800 text-sm text-center font-medium">
                Remember: Vaccines are one of the safest and most effective tools to protect your child's health and future.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Navigation */}
        <div className="flex justify-center pt-8">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
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