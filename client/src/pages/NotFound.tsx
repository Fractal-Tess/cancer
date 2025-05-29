
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-insurance-blue">404</h1>
      <h2 className="mb-6 text-2xl font-semibold text-gray-800">Page Not Found</h2>
      <p className="mb-8 max-w-md text-gray-600">
        The page you are looking for doesn't exist or has been moved to another URL.
      </p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
