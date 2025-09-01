import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { TrendingUp, Syringe, Ruler, Menu, X, Home, BookOpen, FileText } from "lucide-react";
import { trackEvent } from "../../lib/analytics";

const Navigation = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    { 
      path: "/", 
      label: "Dashboard", 
      icon: Home,
      description: "Overview"
    },
    { 
      path: "/growth-tracker", 
      label: "Growth Tracker", 
      icon: TrendingUp,
      description: "WHO Charts",
      featured: true
    },
    { 
      path: "/height-predictor", 
      label: "Height Predictor", 
      icon: Ruler,
      description: "Khamis-Roche"
    }
  ];

  const secondaryItems = [
    { path: "/vaccination", label: "Vaccination", icon: Syringe },
    { path: "/guide", label: "Guide", icon: BookOpen },
    { path: "/who-data", label: "WHO Data", icon: FileText }
  ];

  const handleNavClick = (path: string, label: string) => {
    trackEvent('navigation_click', 'navigation', label);
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-kid-blue/10 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center justify-between py-4">
          <Link href="/">
            <div className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-gradient-to-r from-kid-purple to-kid-pink rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-text-primary">Child Health Tracker</span>
            </div>
          </Link>

          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={active ? "default" : "ghost"}
                    onClick={() => handleNavClick(item.path, item.label)}
                    className={`relative h-auto px-4 py-3 rounded-2xl transition-all duration-200 ${
                      active 
                        ? item.featured
                          ? "bg-gradient-to-r from-kid-purple to-kid-pink text-white shadow-md"
                          : "bg-kid-blue/10 text-kid-blue"
                        : "text-text-secondary hover:text-text-primary hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <div className="flex items-center space-x-2">
                        <IconComponent className="w-4 h-4" />
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.featured && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-kid-pink rounded-full"></div>
                        )}
                      </div>
                      <span className="text-xs opacity-75">{item.description}</span>
                    </div>
                  </Button>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            {secondaryItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleNavClick(item.path, item.label)}
                    className={`text-text-secondary hover:text-text-primary ${
                      isActive(item.path) ? "text-kid-purple" : ""
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-1" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-kid-purple to-kid-pink rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold text-text-primary">Child Health</span>
              </div>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border-b border-kid-blue/10 shadow-lg">
              <div className="container mx-auto px-4 py-4">
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const IconComponent = item.icon;
                    const active = isActive(item.path);
                    
                    return (
                      <Link key={item.path} href={item.path}>
                        <Button
                          variant="ghost"
                          onClick={() => handleNavClick(item.path, item.label)}
                          className={`w-full justify-start h-auto p-4 rounded-2xl ${
                            active 
                              ? item.featured
                                ? "bg-gradient-to-r from-kid-purple to-kid-pink text-white"
                                : "bg-kid-blue/10 text-kid-blue"
                              : "text-text-secondary hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <IconComponent className="w-5 h-5" />
                            <div className="text-left">
                              <div className="font-medium">{item.label}</div>
                              <div className="text-sm opacity-75">{item.description}</div>
                            </div>
                            {item.featured && (
                              <div className="w-2 h-2 bg-kid-pink rounded-full ml-auto"></div>
                            )}
                          </div>
                        </Button>
                      </Link>
                    );
                  })}
                </div>
                
                <div className="border-t border-gray-100 mt-4 pt-4">
                  <div className="grid grid-cols-2 gap-2">
                    {secondaryItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <Link key={item.path} href={item.path}>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleNavClick(item.path, item.label)}
                            className={`w-full justify-start ${
                              isActive(item.path) ? "text-kid-purple" : "text-text-secondary"
                            }`}
                          >
                            <IconComponent className="w-4 h-4 mr-2" />
                            {item.label}
                          </Button>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;