import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

const CalculatorPage = () => {
  // Car details state
  const [carDetails, setCarDetails] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    horsepower: 150,
    mileage: 10000,
    greenScore: 50, // 0-100 scale where higher is better for environment
    previousIncidents: 0,
  });

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
    setCalculating(true);
    try {
      const res = await fetch('/api/calculator/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          carMake: carDetails.make,
          carModel: carDetails.model,
          carYear: carDetails.year,
          driverAge: 30, // Replace with real user data if available
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setPremium(data.premium);
      } else {
        setPremium(null);
      }
    } finally {
      setCalculating(false);
    }
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

            <Button
              onClick={calculatePremium}
              className="w-full"
              disabled={calculating || !carDetails.make || !carDetails.model}
            >
              {calculating ? 'Calculating...' : 'Calculate Premium'}
            </Button>
          </CardContent>
        </Card>

        {/* Results Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5 text-insurance-blue" />
              <span>Your Estimated Premium</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-6">
            {premium !== null ? (
              <div className="text-center">
                <div className="mb-4 text-5xl font-bold text-insurance-blue">
                  ${premium}
                </div>
                <p className="mb-6 text-gray-600">Estimated monthly premium</p>

                <div className="rounded-lg bg-blue-50 p-4 text-left">
                  <h3 className="mb-2 font-semibold">Premium Breakdown:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex justify-between">
                      <span>Base premium:</span>
                      <span>$500.00</span>
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
                        -${((carDetails.greenScore / 100) * 200).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Previous incidents:</span>
                      <span>
                        ${(carDetails.previousIncidents * 250).toFixed(2)}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vehicle age adjustment:</span>
                      <span>
                        $
                        {(
                          (new Date().getFullYear() - carDetails.year) *
                          25
                        ).toFixed(2)}
                      </span>
                    </li>
                  </ul>
                </div>

                <Button className="mt-6 w-full">Save This Quote</Button>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-lg text-gray-500">
                  Enter your vehicle details and click "Calculate Premium" to
                  see your estimated insurance cost.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage;
