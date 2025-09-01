import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import { initGA } from "../lib/analytics";
import { useAnalytics } from "../hooks/use-analytics";
import Navigation from "@/components/navigation";
import Dashboard from "@/pages/dashboard";
import Home from "@/pages/home";
import GrowthTracker from "@/pages/growth-tracker";
import HeightPredictor from "@/pages/height-predictor";
import TheoryGuide from "@/pages/theory-guide";
import WHODataReference from "@/pages/who-data-reference";
import VaccinationGuide from "@/pages/vaccination-guide";
import TravelMedicineGuide from "@/pages/travel-medicine-guide";
import IndianDocumentsGuide from "@/pages/indian-documents-guide";

function Router() {
  // Track page views when routes change
  useAnalytics();
  
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/growth-tracker" component={GrowthTracker} />
        <Route path="/height-predictor" component={HeightPredictor} />
        <Route path="/vaccination" component={VaccinationGuide} />
        <Route path="/travel-medicine" component={TravelMedicineGuide} />
        <Route path="/indian-documents" component={IndianDocumentsGuide} />
        <Route path="/legacy" component={Home} />
        <Route path="/guide" component={TheoryGuide} />
        <Route path="/who-data" component={WHODataReference} />
        <Route path="*" component={Dashboard} />
      </Switch>
    </>
  );
}

function App() {
  // Initialize Google Analytics when app loads
  useEffect(() => {
    // Verify required environment variable is present
    if (!import.meta.env.VITE_GA_MEASUREMENT_ID) {
      console.warn('Missing required Google Analytics key: VITE_GA_MEASUREMENT_ID');
    } else {
      initGA();
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
