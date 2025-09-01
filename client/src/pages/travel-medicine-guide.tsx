import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plane, Heart, Shield, AlertTriangle, Thermometer, Baby, Clock, ArrowLeft } from "lucide-react";
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

export default function TravelMedicineGuide() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const medicines = [
    {
      category: "Essential Medicines",
      icon: Thermometer,
      color: "kid-pink",
      medicines: [
        {
          name: "Paracetamol (Acetaminophen)",
          ageGroups: [
            { age: "3-6 months", dosage: "2.5ml every 4-6 hours", note: "Max 4 doses/day" },
            { age: "6-24 months", dosage: "5ml every 4-6 hours", note: "Max 4 doses/day" },
            { age: "2-4 years", dosage: "7.5ml every 4-6 hours", note: "Max 4 doses/day" },
            { age: "4-6 years", dosage: "10ml every 4-6 hours", note: "Max 4 doses/day" }
          ],
          uses: ["Fever reduction", "Pain relief", "Post-vaccination comfort"],
          forms: ["Liquid suspension (120mg/5ml)", "Suppositories"],
          warnings: "Most commonly recommended by doctors. Safe and effective. Use measuring syringe."
        },
        {
          name: "Oral Rehydration Solution (ORS)",
          ageGroups: [
            { age: "Under 2 years", dosage: "50-100ml after each loose stool", note: "Small frequent sips" },
            { age: "2-5 years", dosage: "100-200ml after each loose stool", note: "Continue normal feeding" }
          ],
          uses: ["Diarrhea", "Vomiting", "Dehydration prevention"],
          forms: ["Ready-made solution", "Powder sachets"],
          warnings: "Essential for travel. Can be life-saving. Continue breastfeeding."
        },
        {
          name: "Sunscreen SPF 30+",
          ageGroups: [
            { age: "6+ months", dosage: "Apply generously 30min before sun", note: "Reapply every 2 hours" }
          ],
          uses: ["Sun protection", "Preventing sunburn"],
          forms: ["Lotion", "Stick for face"],
          warnings: "Absolutely essential for travel. Babies under 6 months should avoid direct sun."
        },
        {
          name: "Antiseptic Wipes/Cream",
          ageGroups: [
            { age: "All ages", dosage: "Apply to clean wound", note: "Clean wound first" }
          ],
          uses: ["Minor cuts", "Scrapes", "Cleaning small wounds"],
          forms: ["Antiseptic wipes", "Small tube cream"],
          warnings: "For external use only. Essential for active children while traveling."
        }
      ]
    },
    {
      category: "Nice to Have (If Space Allows)",
      icon: Heart,
      color: "kid-green",
      medicines: [
        {
          name: "Saline Nasal Drops",
          ageGroups: [
            { age: "All ages", dosage: "2-3 drops each nostril", note: "Before feeding/sleeping" }
          ],
          uses: ["Blocked nose", "Cold symptoms", "Dry nasal passages"],
          forms: ["Small bottle drops"],
          warnings: "Very safe. Helpful for airplane travel and dry climates."
        },
        {
          name: "Thermometer",
          ageGroups: [
            { age: "All ages", dosage: "Check temperature", note: "Digital ear/forehead type" }
          ],
          uses: ["Monitor fever", "Check if medicine needed"],
          forms: ["Digital thermometer"],
          warnings: "Helpful to know if paracetamol is needed. Not medicine but essential tool."
        }
      ]
    }
  ];

  const travelTips = [
    {
      title: "Packing Essentials",
      tips: [
        "Keep medicines in original packaging with labels",
        "Carry prescriptions and doctor's letter for international travel",
        "Pack extra supplies in case of delays",
        "Store temperature-sensitive medicines properly",
        "Keep emergency contact numbers handy"
      ]
    },
    {
      title: "Dosage Guidelines",
      tips: [
        "Always follow age-appropriate dosages",
        "Use proper measuring tools (syringes, spoons)",
        "Keep a medication log during travel",
        "Check expiry dates before travel",
        "Know your child's weight for accurate dosing"
      ]
    },
    {
      title: "When to Seek Help",
      tips: [
        "High fever over 38.5°C in babies under 3 months",
        "Persistent vomiting or signs of dehydration",
        "Difficulty breathing or severe allergic reactions",
        "Injuries requiring stitches",
        "Any concerning symptoms you're unsure about"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-blue/5 via-kid-purple/5 to-kid-pink/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-10 left-10 w-20 h-12 text-kid-blue/20 animate-float" />
        <StarDoodle className="absolute top-20 right-20 w-8 h-8 text-kid-yellow/30 bounce-gentle" />
        <CloudDoodle className="absolute bottom-20 right-32 w-16 h-10 text-kid-purple/20" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Button 
              variant="ghost" 
              className="mb-4 text-text-secondary hover:text-text-primary"
              onClick={() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            <Plane className="inline-block w-8 h-8 mr-3 text-kid-blue" />
            Essential Travel Medicines for Children
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Only the most essential medicines that doctors commonly recommend for traveling with young children. Keep your travel kit simple and practical.
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm text-red-700">
                <p className="font-semibold">Important Medical Disclaimer:</p>
                <p>This guide provides general information only. Always consult your pediatrician before traveling and follow their specific recommendations. In case of serious illness or emergency, seek immediate medical attention from local healthcare providers.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Medicine Categories */}
        <div className="space-y-8 mb-12">
          {medicines.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card key={categoryIndex} className="bg-white/90 backdrop-blur-sm border-gray-200 rounded-3xl shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl text-text-primary flex items-center">
                    <IconComponent className={`text-${category.color} mr-3 h-6 w-6`} />
                    {category.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.medicines.map((medicine, medicineIndex) => (
                      <div key={medicineIndex} className="border-l-4 border-gray-200 pl-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-3">{medicine.name}</h3>
                        
                        {/* Uses */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-text-secondary mb-2">Uses:</p>
                          <div className="flex flex-wrap gap-2">
                            {medicine.uses.map((use, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {use}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Age Groups & Dosage */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-text-secondary mb-3">Age-Appropriate Dosages:</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {medicine.ageGroups.map((group, index) => (
                              <div key={index} className="bg-gray-50 rounded-lg p-3">
                                <div className="font-medium text-text-primary text-sm">{group.age}</div>
                                <div className="text-sm text-kid-blue font-medium">{group.dosage}</div>
                                <div className="text-xs text-text-secondary mt-1">{group.note}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Forms */}
                        <div className="mb-4">
                          <p className="text-sm font-medium text-text-secondary mb-2">Available Forms:</p>
                          <p className="text-sm text-text-primary">{medicine.forms.join(", ")}</p>
                        </div>

                        {/* Warnings */}
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                          <div className="flex items-start space-x-2">
                            <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-yellow-800">Important:</p>
                              <p className="text-sm text-yellow-700">{medicine.warnings}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Travel Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {travelTips.map((section, index) => (
            <Card key={index} className="bg-white/80 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-text-primary flex items-center">
                  <Clock className="text-kid-green mr-2 h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-kid-green rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-text-secondary">{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contacts */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-lg text-red-700 flex items-center">
              <AlertTriangle className="text-red-500 mr-2 h-5 w-5" />
              Emergency Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold text-red-700 mb-2">Seek Immediate Medical Help For:</p>
                <ul className="space-y-1 text-red-600">
                  <li>• Difficulty breathing or chest pain</li>
                  <li>• High fever with stiff neck</li>
                  <li>• Severe dehydration</li>
                  <li>• Allergic reactions with swelling</li>
                  <li>• Head injuries or loss of consciousness</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-red-700 mb-2">Before You Travel:</p>
                <ul className="space-y-1 text-red-600">
                  <li>• Research medical facilities at destination</li>
                  <li>• Check travel insurance coverage</li>
                  <li>• Get required vaccinations</li>
                  <li>• Carry emergency contact numbers</li>
                  <li>• Know how to call emergency services</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home Button */}
        <div className="text-center mt-12 mb-8">
          <Link href="/">
            <Button 
              className="bg-kid-blue hover:bg-kid-blue/90 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-lg"
              onClick={() => {
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }}
            >
              🏠 Back to Home
            </Button>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-text-secondary">
          <p>This guide is for informational purposes only. Always consult healthcare professionals for medical advice.</p>
          <p className="mt-2">Last updated: January 2025 | Based on pediatric guidelines</p>
        </div>
      </div>
    </div>
  );
}