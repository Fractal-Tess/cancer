import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">My Insurances</h1>
        <p className="text-lg text-gray-600">
          View and manage all your insurance policies in one place.
        </p>
      </div>
      
      <div className="mb-6">
        <Button variant="outline" className="gap-2">
          <Car className="h-4 w-4" />
          Add New Vehicle
        </Button>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Policies</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {mockInsurances.map((insurance) => (
            <Card key={insurance.id} className="overflow-hidden">
              <CardHeader className="border-b bg-gray-50/50">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">{insurance.vehicleName}</CardTitle>
                    <CardDescription>
                      Policy #{insurance.policyNumber} • {insurance.coverageType}
                    </CardDescription>
                  </div>
                  <Badge variant={insurance.status === 'active' ? 'default' : 'secondary'}>
                    {insurance.status === 'active' ? (
                      <Check className="mr-1 h-3 w-3" />
                    ) : (
                      <Clock className="mr-1 h-3 w-3" />
                    )}
                    {insurance.status.charAt(0).toUpperCase() + insurance.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">License Plate</p>
                    <p className="text-lg">{insurance.licensePlate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Year</p>
                    <p className="text-lg">{insurance.year}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Coverage Period</p>
                    <p className="text-lg">
                      {new Date(insurance.startDate).toLocaleDateString()} - {new Date(insurance.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Monthly Premium</p>
                    <p className="text-lg font-semibold text-insurance-blue">${insurance.premium}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-gray-50/50 p-4">
                <div className="flex w-full items-center justify-between">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                  {insurance.status === 'active' && (
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel Policy
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {mockInsurances
            .filter(insurance => insurance.status === 'active')
            .map((insurance) => (
              <Card key={insurance.id} className="overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{insurance.vehicleName}</CardTitle>
                      <CardDescription>
                        Policy #{insurance.policyNumber} • {insurance.coverageType}
                      </CardDescription>
                    </div>
                    <Badge>
                      <Check className="mr-1 h-3 w-3" />
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">License Plate</p>
                      <p className="text-lg">{insurance.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="text-lg">{insurance.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Coverage Period</p>
                      <p className="text-lg">
                        {new Date(insurance.startDate).toLocaleDateString()} - {new Date(insurance.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monthly Premium</p>
                      <p className="text-lg font-semibold text-insurance-blue">${insurance.premium}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50/50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel Policy
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {mockInsurances
            .filter(insurance => insurance.status === 'expired')
            .map((insurance) => (
              <Card key={insurance.id} className="overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{insurance.vehicleName}</CardTitle>
                      <CardDescription>
                        Policy #{insurance.policyNumber} • {insurance.coverageType}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary">
                      <Clock className="mr-1 h-3 w-3" />
                      Expired
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">License Plate</p>
                      <p className="text-lg">{insurance.licensePlate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Year</p>
                      <p className="text-lg">{insurance.year}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Coverage Period</p>
                      <p className="text-lg">
                        {new Date(insurance.startDate).toLocaleDateString()} - {new Date(insurance.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Monthly Premium</p>
                      <p className="text-lg font-semibold text-insurance-blue">${insurance.premium}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50/50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <Button variant="ghost" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Renew Policy
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InsurancesPage;
