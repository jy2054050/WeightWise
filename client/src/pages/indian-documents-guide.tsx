import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, MapPin, Phone, Calendar, ArrowLeft, ExternalLink, AlertTriangle, CheckCircle } from "lucide-react";
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

export default function IndianDocumentsGuide() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const documents = [
    {
      title: "Birth Certificate",
      priority: "Essential",
      timeframe: "Within 21 days of birth",
      description: "Official proof of birth required for all other documents",
      requirements: [
        "Hospital discharge summary or birth report",
        "Parents' identification documents",
        "Marriage certificate (if applicable)",
        "Address proof"
      ],
      process: [
        "Register birth at local municipal corporation/gram panchayat",
        "Submit required documents within 21 days",
        "Pay nominal fee (usually ₹10-50)",
        "Collect certificate within 7-15 days"
      ],
      bookingInfo: {
        method: "Visit local municipal office or apply online",
        website: "respective city municipal corporation website",
        documents: "Hospital birth certificate, parent IDs, address proof"
      },
      validity: "Lifetime",
      uses: ["School admissions", "Passport applications", "Aadhar card", "All government schemes"]
    },
    {
      title: "Aadhar Card",
      priority: "Essential",
      timeframe: "Any time after birth",
      description: "Unique identification number for Indian residents",
      requirements: [
        "Birth certificate",
        "One parent's Aadhar card",
        "Address proof",
        "Recent photograph"
      ],
      process: [
        "Book appointment at Aadhar enrollment center",
        "Visit center with child and documents",
        "Biometric enrollment (for children above 5 years)",
        "Receive Aadhar number via SMS"
      ],
      bookingInfo: {
        method: "Online appointment booking",
        website: "uidai.gov.in",
        documents: "Birth certificate, parent's Aadhar, address proof"
      },
      validity: "Lifetime (biometric update required at age 5 and 15)",
      uses: ["School admissions", "Bank accounts", "Government schemes", "Travel bookings"]
    },
    {
      title: "Passport",
      priority: "Important",
      timeframe: "When required for travel",
      description: "International travel document",
      requirements: [
        "Birth certificate",
        "Aadhar card",
        "Both parents' passports/ID proof",
        "Address proof",
        "Recent photographs"
      ],
      process: [
        "Fill online application form",
        "Book appointment at Passport Seva Kendra",
        "Pay fees online (₹1,500 for 36 pages)",
        "Visit PSK with all documents",
        "Police verification (if required)"
      ],
      bookingInfo: {
        method: "Online appointment mandatory",
        website: "passportindia.gov.in",
        documents: "Birth certificate, Aadhar, parents' passports, photos"
      },
      validity: "10 years (5 years for children under 15)",
      uses: ["International travel", "Visa applications", "Age proof abroad"]
    },
    {
      title: "School Transfer Certificate (TC)",
      priority: "Educational",
      timeframe: "When changing schools",
      description: "Document required for school transfers and higher education",
      requirements: [
        "Application to current school",
        "Fee clearance certificate",
        "Library clearance",
        "Valid reason for transfer"
      ],
      process: [
        "Submit transfer request to school administration",
        "Clear all pending dues and return books",
        "Collect TC within 15 days of application",
        "Submit TC to new school within admission deadline"
      ],
      bookingInfo: {
        method: "Visit school administrative office",
        website: "Contact school directly",
        documents: "Fee receipts, library clearance, written application"
      },
      validity: "1 year for most schools",
      uses: ["School transfers", "College admissions", "Educational records"]
    },
    {
      title: "Vaccination Certificate",
      priority: "Health",
      timeframe: "As per immunization schedule",
      description: "Record of all vaccinations received",
      requirements: [
        "Immunization record book",
        "Previous vaccination certificates",
        "Doctor's prescription (if needed)"
      ],
      process: [
        "Maintain complete vaccination record",
        "Get vaccinations from authorized centers",
        "Request certificate from vaccination center",
        "Keep updated with booster doses"
      ],
      bookingInfo: {
        method: "Government health centers or private clinics",
        website: "Co-WIN portal for some vaccines",
        documents: "Previous vaccination records, child's ID proof"
      },
      validity: "As per vaccine requirements",
      uses: ["School admissions", "International travel", "Medical records"]
    },
    {
      title: "Domicile Certificate",
      priority: "Regional",
      timeframe: "When required for admissions/jobs",
      description: "Proof of residence in a particular state",
      requirements: [
        "Birth certificate",
        "Continuous residence proof (3+ years)",
        "Parent's domicile certificate",
        "School records"
      ],
      process: [
        "Apply at district collector's office",
        "Submit residence proofs",
        "Pay prescribed fees",
        "Collect certificate after verification"
      ],
      bookingInfo: {
        method: "District collector office or online portal",
        website: "State government websites",
        documents: "Birth certificate, residence proofs, school records"
      },
      validity: "3-5 years (varies by state)",
      uses: ["State quota admissions", "Government jobs", "Scholarship applications"]
    },
    {
      title: "Income Certificate",
      priority: "Financial",
      timeframe: "When required for benefits",
      description: "Proof of family income for government schemes",
      requirements: [
        "Family income details",
        "Employment certificates",
        "Bank statements",
        "Property documents"
      ],
      process: [
        "Apply at tehsildar's office",
        "Submit income proofs",
        "Pay processing fees",
        "Collect certificate after verification"
      ],
      bookingInfo: {
        method: "Tehsildar office or online application",
        website: "State revenue department portals",
        documents: "Salary certificates, bank statements, property papers"
      },
      validity: "1 year",
      uses: ["Scholarship applications", "Fee concessions", "Government schemes"]
    },
    {
      title: "Caste Certificate",
      priority: "Category-specific",
      timeframe: "When required for reservations",
      description: "Proof of caste for reservation benefits",
      requirements: [
        "Parent's caste certificate",
        "Birth certificate",
        "Address proof",
        "Community verification"
      ],
      process: [
        "Apply at district collector's office",
        "Submit lineage proofs",
        "Community verification process",
        "Collect certificate after approval"
      ],
      bookingInfo: {
        method: "District collector office",
        website: "State social welfare department portals",
        documents: "Birth certificate, parent's caste certificate, address proof"
      },
      validity: "Lifetime (renewal may be required)",
      uses: ["Educational reservations", "Job reservations", "Government schemes"]
    }
  ];

  const digitalServices = [
    {
      service: "Digilocker",
      description: "Digital wallet for storing all certificates",
      website: "digilocker.gov.in",
      benefits: ["Paperless documents", "Instant access", "Government verified"]
    },
    {
      service: "mAadhar App",
      description: "Mobile app for Aadhar card access",
      website: "Available on app stores",
      benefits: ["Offline access", "QR code sharing", "Secure storage"]
    },
    {
      service: "Umang App",
      description: "Unified government services app",
      website: "umang.gov.in",
      benefits: ["Multiple services", "Single login", "Status tracking"]
    }
  ];

  const tips = [
    {
      title: "Document Management",
      items: [
        "Keep both physical and digital copies",
        "Store originals in a safe place",
        "Create a document checklist",
        "Set renewal reminders",
        "Use Digilocker for digital storage"
      ]
    },
    {
      title: "Application Tips",
      items: [
        "Apply for documents well in advance",
        "Double-check all information before submission",
        "Keep multiple photocopies ready",
        "Follow up on application status",
        "Maintain a document file for easy access"
      ]
    },
    {
      title: "Cost Planning",
      items: [
        "Budget for application fees and travel costs",
        "Consider expedited processing if available",
        "Keep receipts for all payments",
        "Check for fee exemptions if eligible",
        "Factor in renewal costs"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Essential": return "bg-red-100 text-red-800 border-red-200";
      case "Important": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Educational": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Health": return "bg-green-100 text-green-800 border-green-200";
      case "Regional": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Financial": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Category-specific": return "bg-pink-100 text-pink-800 border-pink-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kid-orange/5 via-kid-yellow/5 to-kid-pink/5 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <CloudDoodle className="absolute top-10 left-10 w-20 h-12 text-kid-orange/20 animate-float" />
        <StarDoodle className="absolute top-20 right-20 w-8 h-8 text-kid-yellow/30 bounce-gentle" />
        <CloudDoodle className="absolute bottom-20 right-32 w-16 h-10 text-kid-orange/20" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-text-secondary hover:text-text-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            <FileText className="inline-block w-8 h-8 mr-3 text-kid-orange" />
            Indian Documents Checklist for Children
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Complete guide to essential documents required for children in India, including application processes and requirements
          </p>
        </div>

        {/* Important Notice */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm text-blue-700">
                <p className="font-semibold">Important Notes:</p>
                <p>Requirements and processes may vary by state and can change over time. Always verify current requirements from official government websites. Some documents may be available through online portals for faster processing.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents List */}
        <div className="space-y-8 mb-12">
          {documents.map((doc, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-gray-200 rounded-3xl shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-xl text-text-primary flex items-center">
                    <FileText className="text-kid-orange mr-3 h-6 w-6" />
                    {doc.title}
                  </CardTitle>
                  <div className="flex items-center space-x-3">
                    <Badge className={getPriorityColor(doc.priority)}>
                      {doc.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {doc.timeframe}
                    </Badge>
                  </div>
                </div>
                <p className="text-text-secondary mt-2">{doc.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Requirements */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      Required Documents
                    </h4>
                    <ul className="space-y-2">
                      {doc.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-start space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-kid-orange rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-text-secondary">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Process */}
                  <div>
                    <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      Application Process
                    </h4>
                    <ol className="space-y-2">
                      {doc.process.map((step, stepIndex) => (
                        <li key={stepIndex} className="flex items-start space-x-3 text-sm">
                          <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5">
                            {stepIndex + 1}
                          </div>
                          <span className="text-text-secondary">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Booking Information */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-3 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-purple-500" />
                    Where to Apply
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-text-primary">Method:</p>
                      <p className="text-text-secondary">{doc.bookingInfo.method}</p>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Website:</p>
                      <p className="text-text-secondary">{doc.bookingInfo.website}</p>
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Documents:</p>
                      <p className="text-text-secondary">{doc.bookingInfo.documents}</p>
                    </div>
                  </div>
                </div>

                {/* Validity and Uses */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="font-medium text-green-800 text-sm">Validity: {doc.validity}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="font-medium text-blue-800 text-sm">Uses: {doc.uses.join(", ")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Digital Services */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl text-text-primary flex items-center">
              <Phone className="text-purple-500 mr-3 h-6 w-6" />
              Digital Services & Apps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {digitalServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-text-primary mb-2">{service.service}</h4>
                  <p className="text-sm text-text-secondary mb-3">{service.description}</p>
                  <p className="text-xs text-purple-600 mb-3">{service.website}</p>
                  <ul className="space-y-1">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        <span className="text-text-secondary">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tips.map((section, index) => (
            <Card key={index} className="bg-white/80 border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-text-primary flex items-center">
                  <CheckCircle className="text-kid-green mr-2 h-5 w-5" />
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-kid-green rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-text-secondary">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-12 mb-8">
          <Link href="/">
            <Button 
              className="bg-kid-orange hover:bg-kid-orange/90 text-white px-8 py-3 rounded-2xl text-lg font-medium shadow-lg"
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
          <p>This information is for guidance only. Always verify requirements from official government sources.</p>
          <p className="mt-2">Last updated: January 2025 | Based on current Indian government procedures</p>
        </div>
      </div>
    </div>
  );
}