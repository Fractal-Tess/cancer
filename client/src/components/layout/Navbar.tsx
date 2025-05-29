import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const Navbar = () => {
  const { user, signOut } = useAuth();

  return (
    <nav className="border-b bg-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-insurance-blue">
          <Car className="h-6 w-6" />
          <span>SafeRide</span>
        </Link>
        
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="text-gray-600 hover:text-insurance-blue">Home</Link>
          <Link to="/calculator" className="text-gray-600 hover:text-insurance-blue">Calculator</Link>
          {user && (
            <Link to="/insurances" className="text-gray-600 hover:text-insurance-blue">My Insurances</Link>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link to="/insurances">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.username}
                </Button>
              </Link>
              <Button variant="ghost" onClick={signOut} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
