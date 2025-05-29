
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Car, Check, Clock, Shield } from "lucide-react";

// Sample insurance data
const mockInsurances = [
  {
    id: 1,
    vehicleName: "Toyota Camry",
    year: 2020,
    policyNumber: "POL-2023-78945",
    startDate: "2023-06-15",
    endDate: "2024-06-14", 
    premium: 120.50,
    status: "active",
    coverageType: "Comprehensive",
    licensePlate: "ABC1234"
  },
  {
    id: 2,
    vehicleName: "Honda Civic",
    year: 2019,
    policyNumber: "POL-2023-12385",
    startDate: "2023-04-20",
    endDate: "2024-04-19", 
    premium: 95.75,
    status: "active",
    coverageType: "Comprehensive",
    licensePlate: "XYZ7890"
  },
  {
    id: 3,
    vehicleName: "Tesla Model 3",
    year: 2022,
    policyNumber: "POL-2023-45612",
    startDate: "2023-08-10",
    endDate: "2024-08-09", 
    premium: 165.25,
    status: "active",
    coverageType: "Premium",
    licensePlate: "ELE789"
  },
  {
    id: 4,
    vehicleName: "Ford Focus",
    year: 2017,
    policyNumber: "POL-2022-98765",
    startDate: "2022-02-25",
    endDate: "2023-02-24", 
    premium: 85.30,
    status: "expired",
    coverageType: "Basic",
    licensePlate: "DEF4567"
  },
  {
    id: 5,
    vehicleName: "Mazda CX-5",
    year: 2021,
    policyNumber: "POL-2022-36547",
    startDate: "2022-09-05",
    endDate: "2023-09-04", 
    premium: 110.20,
    status: "expired",
    coverageType: "Standard",
    licensePlate: "GHI9012"
  }
];

const InsurancesPage = () => {
  const [showExpired, setShowExpired] = useState(false);
  
  // Filter for active policies
  const activeInsurances = mockInsurances.filter(insurance => insurance.status === "active");
  
  // Filter for expired policies
  const expiredInsurances = mockInsurances.filter(insurance => insurance.status === "expired");
  
  // Calculate days until expiry for an insurance policy
  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  // Format date to readable string
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">My Insurances</h1>
        <p className="text-lg text-gray-600">
          View and manage all your insurance policies in one place.
        </p>
      </div>
      
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <Button variant="outline" className="gap-2">
          <Car className="h-4 w-4" />
          Add New Vehicle
        </Button>
        
        <div className="flex items-center space-x-2">
          <Label htmlFor="show-expired">Show expired policies</Label>
          <Switch
            id="show-expired"
            checked={showExpired}
            onCheckedChange={setShowExpired}
          />
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Policies ({activeInsurances.length})</TabsTrigger>
          <TabsTrigger value="expired">Past Policies ({expiredInsurances.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-6">
          {activeInsurances.length > 0 ? (
            activeInsurances.map(insurance => {
              const daysUntilExpiry = getDaysUntilExpiry(insurance.endDate);
              const isExpiringSoon = daysUntilExpiry <= 30;
              
              return (
                <Card key={insurance.id} className="overflow-hidden transition-all hover:shadow-md">
                  <div className={`h-1 w-full ${isExpiringSoon ? 'bg-amber-500' : 'bg-green-500'}`}></div>
                  <CardHeader className="space-y-0 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-xl">{insurance.vehicleName} ({insurance.year})</CardTitle>
                        <CardDescription>Policy #{insurance.policyNumber}</CardDescription>
                      </div>
                      <Badge variant={isExpiringSoon ? "outline" : "default"} className={isExpiringSoon ? "border-amber-500 text-amber-500" : ""}>
                        {isExpiringSoon ? (
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>Expires soon</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            <span>Active</span>
                          </div>
                        )}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-xs text-gray-500">Coverage Type</p>
                        <p className="font-medium">{insurance.coverageType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium">{formatDate(insurance.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="font-medium">{formatDate(insurance.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Premium</p>
                        <p className="font-medium">${insurance.premium.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    {isExpiringSoon && (
                      <div className="mt-4 flex items-center gap-2 rounded-md bg-amber-50 p-3 text-amber-800">
                        <Bell className="h-4 w-4" />
                        <p className="text-sm">Your policy will expire in {daysUntilExpiry} days. Renew now to avoid coverage gaps.</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button size="sm">Manage Policy</Button>
                  </CardFooter>
                </Card>
              );
            })
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <Shield className="mx-auto mb-4 h-12 w-12 text-gray-300" />
              <h3 className="mb-2 text-xl font-semibold">No Active Policies</h3>
              <p className="mb-6 text-gray-500">You don't have any active insurance policies at the moment.</p>
              <Button>Get Insured Today</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="expired" className="space-y-6">
          {showExpired ? (
            expiredInsurances.length > 0 ? (
              expiredInsurances.map(insurance => (
                <Card key={insurance.id} className="overflow-hidden opacity-80 transition-all hover:opacity-100">
                  <div className="h-1 w-full bg-gray-300"></div>
                  <CardHeader className="space-y-0 pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <CardTitle className="text-xl">{insurance.vehicleName} ({insurance.year})</CardTitle>
                        <CardDescription>Policy #{insurance.policyNumber}</CardDescription>
                      </div>
                      <Badge variant="outline" className="text-gray-500">Expired</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-xs text-gray-500">Coverage Type</p>
                        <p className="font-medium">{insurance.coverageType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Start Date</p>
                        <p className="font-medium">{formatDate(insurance.startDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">End Date</p>
                        <p className="font-medium">{formatDate(insurance.endDate)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Monthly Premium</p>
                        <p className="font-medium">${insurance.premium.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline" size="sm">View History</Button>
                    <Button size="sm">Renew Policy</Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="rounded-lg border border-dashed p-12 text-center">
                <Clock className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <h3 className="mb-2 text-xl font-semibold">No Expired Policies</h3>
                <p className="text-gray-500">You don't have any expired insurance policies.</p>
              </div>
            )
          ) : (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <div className="mx-auto mb-6 flex items-center justify-center gap-2">
                <Switch
                  id="toggle-expired-view"
                  checked={showExpired}
                  onCheckedChange={setShowExpired}
                />
                <Label htmlFor="toggle-expired-view">Enable to view expired policies</Label>
              </div>
              <p className="text-gray-500">Toggle the switch above to view your expired insurance policies.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsurancesPage;
