import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Shield, CreditCard, Save, Plus } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LocationState {
  premium: number;
  carDetails: {
    brand: string;
    model: string;
    year: number;
    horsepower: number;
    mileage: number;
    greenScore: number;
    previousIncidents: number;
    coverageType: string;
  };
}

interface SavedCard {
  id: number;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
}

const COVERAGE_TYPES = [
  { value: 'basic', label: 'Basic Coverage' },
  { value: 'standard', label: 'Standard Coverage' },
  { value: 'comprehensive', label: 'Comprehensive Coverage' },
  { value: 'premium', label: 'Premium Coverage' },
];

const PurchaseInsurancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [savedCards, setSavedCards] = useState<SavedCard[]>([]);
  const [selectedCardOption, setSelectedCardOption] = useState<'saved' | 'new'>('saved');
  const [licensePlateError, setLicensePlateError] = useState<string | null>(null);

  // Get the state from navigation
  const state = location.state as LocationState;
  if (!state) {
    navigate('/calculator');
    return null;
  }

  const [formData, setFormData] = useState({
    licensePlate: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    saveCard: false,
    selectedCardId: null as number | null
  });

  useEffect(() => {
    fetchSavedCards();
  }, []);

  const fetchSavedCards = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/card`, {
        credentials: 'include',
      });
      
      if (response.ok) {
        const cards = await response.json();
        setSavedCards(cards);
        if (cards.length > 0) {
          setSelectedCardOption('saved');
          setFormData(prev => ({
            ...prev,
            selectedCardId: cards[0].id
          }));
        } else {
          setSelectedCardOption('new');
        }
      }
    } catch (error) {
      console.error('Failed to fetch saved cards:', error);
    }
  };

  const validateLicensePlate = (plate: string): boolean => {
    // Basic validation for license plate format
    // This can be adjusted based on your specific requirements
    const plateRegex = /^[A-Z0-9]{2,8}$/;
    if (!plate) {
      setLicensePlateError('License plate is required');
      return false;
    }
    if (!plateRegex.test(plate)) {
      setLicensePlateError('Please enter a valid license plate (2-8 alphanumeric characters)');
      return false;
    }
    setLicensePlateError(null);
    return true;
  };

  // Card validation helpers
  const isCardNumberValid = (num: string) => /^\d{16}$/.test(num.replace(/\s/g, ''));
  const isExpiryValid = (exp: string) => /^\d{2}\/\d{2}$/.test(exp);
  const isCVVValid = (cvv: string) => /^\d{3,4}$/.test(cvv);
  const isCardholderValid = (name: string) => name.trim().length > 0;

  const isSavedCardValid = () => {
    return (
      formData.selectedCardId !== null &&
      isCVVValid(formData.cvv)
    );
  };

  const isNewCardValid = () => {
    return (
      isCardNumberValid(formData.cardNumber) &&
      isExpiryValid(formData.expiryDate) &&
      isCVVValid(formData.cvv) &&
      isCardholderValid(formData.cardholderName)
    );
  };

  const isFormValid = () => {
    if (selectedCardOption === 'saved') return isSavedCardValid();
    if (selectedCardOption === 'new') return isNewCardValid();
    return false;
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    if (field === 'licensePlate' && typeof value === 'string') {
      const upperValue = value.toUpperCase();
      setFormData(prev => ({
        ...prev,
        [field]: upperValue
      }));
      validateLicensePlate(upperValue);
      return;
    }
    if (field === 'expiryDate' && typeof value === 'string') {
      let formatted = value.replace(/[^\d]/g, '');
      if (formatted.length > 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
      setFormData(prev => ({
        ...prev,
        [field]: formatted
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'licensePlate') {
      validateLicensePlate(value as string);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateLicensePlate(formData.licensePlate)) {
      toast({
        title: "Invalid License Plate",
        description: licensePlateError,
        variant: "destructive",
      });
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/insurance/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          premium: state.premium,
          carDetails: {
            ...state.carDetails,
            licensePlate: formData.licensePlate
          },
          cardDetails: selectedCardOption === 'new' ? {
            cardNumber: formData.cardNumber,
            expiryDate: formData.expiryDate,
            cvv: formData.cvv,
            cardholderName: formData.cardholderName,
            saveCard: formData.saveCard
          } : {
            id: formData.selectedCardId,
            cvv: formData.cvv
          }
        }),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Your insurance policy has been purchased successfully.",
        });
        navigate('/insurances');
      } else {
        throw new Error('Failed to purchase insurance');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to purchase insurance. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const getSelectedCardDetails = () => {
    if (selectedCardOption === 'saved' && formData.selectedCardId) {
      return savedCards.find(card => card.id === formData.selectedCardId);
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">
            Confirm Your Insurance Purchase
          </h1>
          <p className="text-lg text-gray-600">
            Review your insurance details and complete your purchase
          </p>
        </div>

        <div className="space-y-6">
          {/* Insurance Summary Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-insurance-blue" />
                <span>Insurance Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Vehicle</span>
                  <span className="font-medium">
                    {state.carDetails.year} {state.carDetails.brand} {state.carDetails.model}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage Type</span>
                  <span className="font-medium capitalize">
                    {state.carDetails.coverageType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Monthly Premium</span>
                  <span className="text-xl font-bold text-insurance-blue">
                    ${state.premium}
                  </span>
                </div>
                {getSelectedCardDetails() && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-medium">
                      {getSelectedCardDetails()?.cardholderName} - **** **** **** {getSelectedCardDetails()?.cardNumber.slice(-4)}
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Additional Details Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-insurance-blue" />
                <span>Additional Details</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    placeholder="Enter your license plate number"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                    required
                    className={licensePlateError ? "border-red-500" : ""}
                  />
                  {licensePlateError && (
                    <p className="text-sm text-red-500">{licensePlateError}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-insurance-blue" />
                <span>Payment Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <RadioGroup
                  value={selectedCardOption}
                  onValueChange={(value) => setSelectedCardOption(value as 'saved' | 'new')}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="saved" id="saved" disabled={savedCards.length === 0} />
                    <Label htmlFor="saved" className={savedCards.length === 0 ? 'text-gray-400' : ''}>
                      Use Saved Card
                    </Label>
                  </div>
                  {selectedCardOption === 'saved' && savedCards.length > 0 && (
                    <div className="ml-6 space-y-4">
                      <Select
                        value={formData.selectedCardId?.toString()}
                        onValueChange={(value) => handleInputChange('selectedCardId', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a saved card" />
                        </SelectTrigger>
                        <SelectContent>
                          {savedCards.map((card) => (
                            <SelectItem key={card.id} value={card.id.toString()}>
                              {card.cardholderName} - **** **** **** {card.cardNumber.slice(-4)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="new" id="new" />
                    <Label htmlFor="new">Use New Card</Label>
                  </div>
                </RadioGroup>
                {selectedCardOption === 'new' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="saveCard"
                        checked={formData.saveCard}
                        onChange={(e) => handleInputChange('saveCard', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="saveCard" className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save card for future payments
                      </Label>
                    </div>
                  </div>
                )}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={saving || !!licensePlateError || !isFormValid()}
                >
                  {saving ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PurchaseInsurancePage; 