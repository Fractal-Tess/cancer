import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Car, Shield, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth";

const LandingPage = () => {
  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 to-white">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 animate-slide-up md:text-5xl lg:text-6xl">
              <span className="text-insurance-blue">Car insurance</span> that puts you in the driver's seat
            </h1>
            <p className="mb-8 text-xl text-gray-600 animate-slide-up">
              Ditch and forget bad insurance providers. Experience the future of car insurance with transparent pricing, 
              easy management, and timely notifications.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link to="/calculator">
                <Button size="lg" className="px-8">Calculate Your Rate</Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="px-8">Sign Up Free</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        
        {/* Wave design - moved to a separate div with better positioning */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 overflow-hidden">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 320" 
            className="absolute bottom-0 w-full"
            preserveAspectRatio="none"
          >
            <path 
              fill="#ffffff" 
              fillOpacity="1" 
              d="M0,128L80,138.7C160,149,320,171,480,160C640,149,800,107,960,101.3C1120,96,1280,128,1360,144L1440,160L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="bg-white py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-900">Why Choose SafeRide Insurance</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-lg transition-all hover:shadow-xl">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Car className="h-8 w-8 text-insurance-blue" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Tailored Coverage</h3>
                <p className="text-gray-600">
                  Our insurance plans adapt to your driving habits, vehicle details, and budget requirements.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg transition-all hover:shadow-xl">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Shield className="h-8 w-8 text-insurance-blue" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Transparent Pricing</h3>
                <p className="text-gray-600">
                  No hidden fees or surprises. See exactly what you're paying for with our detailed breakdown.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-none shadow-lg transition-all hover:shadow-xl">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 rounded-full bg-blue-100 p-3">
                  <Bell className="h-8 w-8 text-insurance-blue" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Timely Notifications</h3>
                <p className="text-gray-600">
                  Never miss an important date with renewal reminders and policy notifications.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900">Ready to experience better car insurance?</h2>
            <p className="mb-8 text-xl text-gray-600">
              Join thousands of satisfied drivers who've switched to SafeRide.
            </p>
            <Link to="/calculator">
              <Button size="lg" className="px-8">Get Started Now</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
