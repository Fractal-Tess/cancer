import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Car, Check, Clock, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Insurance {
  id: number;
  vehicleName: string;
  year: number;
  policyNumber: string;
  startDate: string;
  endDate: string;
  premium: number;
  status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
  coverageType: string;
  licensePlate: string;
}

const InsurancesPage = () => {
  const { toast } = useToast();
  const [insurances, setInsurances] = useState<Insurance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInsurances();
  }, []);

  const fetchInsurances = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/insurance/list`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setInsurances(data);
      } else {
        throw new Error('Failed to fetch insurances');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your insurance policies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPolicy = async (policyId: number) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/insurance/${policyId}/cancel`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Policy cancelled successfully.",
        });
        fetchInsurances(); // Refresh the list
      } else {
        throw new Error('Failed to cancel policy');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel policy. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="mb-4 text-2xl text-gray-500">Loading your policies...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">My Insurances</h1>
        <p className="text-lg text-gray-600">
          View and manage all your insurance policies in one place.
        </p>
      </div>
      
      <div className="mb-6">
        <Button variant="outline" className="gap-2" onClick={() => window.location.href = '/calculator'}>
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
          {insurances.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No insurance policies found.</p>
            </div>
          ) : (
            insurances.map((insurance) => (
              <Card key={insurance.id} className="overflow-hidden">
                <CardHeader className="border-b bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{insurance.vehicleName}</CardTitle>
                      <CardDescription>
                        Policy #{insurance.policyNumber} • {insurance.coverageType}
                      </CardDescription>
                    </div>
                    <Badge variant={insurance.status === 'ACTIVE' ? 'default' : 'secondary'}>
                      {insurance.status === 'ACTIVE' ? (
                        <Check className="mr-1 h-3 w-3" />
                      ) : (
                        <Clock className="mr-1 h-3 w-3" />
                      )}
                      {insurance.status.charAt(0) + insurance.status.slice(1).toLowerCase()}
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
                    {insurance.status === 'ACTIVE' && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleCancelPolicy(insurance.id)}
                      >
                        Cancel Policy
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {insurances
            .filter(insurance => insurance.status === 'ACTIVE')
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleCancelPolicy(insurance.id)}
                    >
                      Cancel Policy
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          {insurances
            .filter(insurance => insurance.status === 'EXPIRED' || insurance.status === 'CANCELLED')
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
                      {insurance.status === 'EXPIRED' ? (
                        <Clock className="mr-1 h-3 w-3" />
                      ) : (
                        <Shield className="mr-1 h-3 w-3" />
                      )}
                      {insurance.status.charAt(0) + insurance.status.slice(1).toLowerCase()}
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
                    <Button variant="ghost" size="sm" className="text-insurance-blue hover:text-insurance-blue/80">
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
