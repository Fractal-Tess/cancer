import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Calculator, Car } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';

const CalculatorPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  // Car details state
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    driverAge: 30, // Default age
    horsepower: 150,
    mileage: 10000,
    greenScore: 50,
    previousIncidents: 0,
    coverageType: 'comprehensive'
  });

  const COVERAGE_TYPES = [
    { value: 'basic', label: 'Basic Coverage' },
    { value: 'standard', label: 'Standard Coverage' },
    { value: 'comprehensive', label: 'Comprehensive Coverage' },
    { value: 'premium', label: 'Premium Coverage' },
  ];

  // Premium calculation state
  const [premium, setPremium] = useState<number | null>(null);
  const [calculating, setCalculating] = useState(false);

  // Handle input changes
  const handleChange = (field: string, value: string | number) => {
    setCarDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Calculate insurance premium
  const calculatePremium = async () => {
    if (!carDetails.make || !carDetails.model) {
      setPremium(null);
      return;
    }

    setCalculating(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND}/api/calculator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          make: carDetails.make,
          model: carDetails.model,
          year: carDetails.year,
          driverAge: carDetails.driverAge,
          horsepower: carDetails.horsepower,
          mileage: carDetails.mileage,
          greenScore: carDetails.greenScore,
          previousIncidents: carDetails.previousIncidents,
          coverageType: carDetails.coverageType
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPremium(data.premium);
      } else {
        setPremium(null);
      }
    } catch (error) {
      console.error('Failed to calculate premium:', error);
      setPremium(null);
    } finally {
      setCalculating(false);
    }
  };

  // Calculate premium whenever car details change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculatePremium();
    }, 500); // Debounce calculation for 500ms

    return () => clearTimeout(timeoutId);
  }, [carDetails]);

  const handlePurchase = () => {
    navigate('/purchase-insurance', {
      state: {
        premium,
        carDetails
      }
    });
  };

  const handleSignIn = () => {
    navigate('/signin', {
      state: {
        redirectTo: '/purchase-insurance',
        redirectState: {
          premium,
          carDetails
        }
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Insurance Calculator
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">
          Get an estimate of your car insurance premium based on your vehicle's
          details and driving history.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
        {/* Calculator Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5 text-insurance-blue" />
              <span>Enter Your Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="make">Car Make</Label>
                <Input
                  id="make"
                  placeholder="e.g. Toyota"
                  value={carDetails.make}
                  onChange={(e) => handleChange('make', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Car Model</Label>
                <Input
                  id="model"
                  placeholder="e.g. Camry"
                  value={carDetails.model}
                  onChange={(e) => handleChange('model', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year of Manufacture</Label>
              <Select
                value={carDetails.year.toString()}
                onValueChange={(value) => handleChange('year', parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Year</SelectLabel>
                    {Array.from(
                      { length: 20 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="horsepower">Engine Horsepower</Label>
                <span className="text-sm font-medium">
                  {carDetails.horsepower} HP
                </span>
              </div>
              <Slider
                id="horsepower"
                min={50}
                max={500}
                step={10}
                value={[carDetails.horsepower]}
                onValueChange={(value) => handleChange('horsepower', value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="mileage">Annual Mileage</Label>
                <span className="text-sm font-medium">
                  {carDetails.mileage.toLocaleString()} miles
                </span>
              </div>
              <Slider
                id="mileage"
                min={1000}
                max={50000}
                step={1000}
                value={[carDetails.mileage]}
                onValueChange={(value) => handleChange('mileage', value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="greenScore">Environmental Rating</Label>
                <span className="text-sm font-medium">
                  {carDetails.greenScore}/100
                </span>
              </div>
              <Slider
                id="greenScore"
                min={0}
                max={100}
                step={5}
                value={[carDetails.greenScore]}
                onValueChange={(value) => handleChange('greenScore', value[0])}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverageType">Coverage Type</Label>
              <Select
                value={carDetails.coverageType}
                onValueChange={(value) => handleChange('coverageType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {COVERAGE_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="incidents">
                Previous Incidents (last 3 years)
              </Label>
              <Select
                value={carDetails.previousIncidents.toString()}
                onValueChange={(value) =>
                  handleChange('previousIncidents', parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select number of incidents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Incidents</SelectLabel>
                    {[0, 1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card className='flex flex-col'>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-insurance-blue" />
              <span>Your Estimated Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6 flex-1">
            {calculating ? (
              <div className="text-center">
                <div className="mb-4 text-3xl text-gray-500">Calculating...</div>
              </div>
            ) : premium !== null ? (
              <div className="text-center w-full">
                <div className="mb-4 text-6xl font-bold text-insurance-blue">
                  ${premium}
                </div>
                <p className="mb-6 text-lg text-gray-600">Estimated monthly premium</p>

                <div className="rounded-lg p-4 text-left">
                  <h3 className="mb-2 text-lg font-semibold">Premium Breakdown:</h3>
                  <ul className="space-y-1 text-base">
                    <li className="flex justify-between">
                      <span>Base premium:</span>
                      <span>$500.00</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Coverage type ({carDetails.coverageType}):</span>
                      <span>
                        {carDetails.coverageType === 'basic' ? '1.0x' :
                         carDetails.coverageType === 'standard' ? '1.3x' :
                         carDetails.coverageType === 'comprehensive' ? '1.6x' :
                         '2.0x'}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Horsepower adjustment:</span>
                      <span>
                        ${((carDetails.horsepower / 100) * 100).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Mileage adjustment:</span>
                      <span>
                        ${((carDetails.mileage / 5000) * 50).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Green score discount:</span>
                      <span>
                        -${(carDetails.greenScore * 2).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Previous incidents:</span>
                      <span>
                        ${(carDetails.previousIncidents * 250).toFixed(2)}
                      </span>
                    </li>
                    {carDetails.driverAge < 25 && (
                      <li className="flex justify-between">
                        <span>Age adjustment:</span>
                        <span>
                          ${((25 - carDetails.driverAge) * 5).toFixed(2)}
                        </span>
                      </li>
                    )}
                    <li className="flex justify-between">
                      <span>Vehicle age adjustment:</span>
                      <span>
                        ${((new Date().getFullYear() - carDetails.year) * 25).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-4 text-3xl text-gray-500">
                  Enter your vehicle details to see your estimated premium
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center ">
            {premium !== null && (
              user ? (
                <Button
                  onClick={handlePurchase}
                  className="w-full"
                  size="lg"
                >
                  Purchase Insurance
                </Button>
              ) : (
                <Button
                  onClick={handleSignIn}
                  className="w-full"
                  size="lg"
                >
                  Sign in to Purchase
                </Button>
              )
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage;
