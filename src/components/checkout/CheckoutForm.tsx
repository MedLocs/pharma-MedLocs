
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { CreditCard, MapPin, User, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  onOrderComplete: (orderNumber: string) => void;
}

export const CheckoutForm: React.FC<CheckoutFormProps> = ({ onOrderComplete }) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { items, totalPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate order processing
    setTimeout(() => {
      const orderNumber = `ORD-${Date.now()}`;
      clearCart();
      onOrderComplete(orderNumber);
      setIsProcessing(false);
      toast({
        title: t('order_placed_successfully'),
        description: `${t('your_order_number')} ${orderNumber}`,
      });
    }, 2000);
  };

  const isFormValid = billingInfo.fullName && billingInfo.email && billingInfo.phone && 
                    billingInfo.address && billingInfo.city && billingInfo.postalCode;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5" />
              {t('billing_information')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">{t('full_name')}</Label>
                <Input
                  id="fullName"
                  value={billingInfo.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">{t('email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={billingInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">{t('phone')}</Label>
              <Input
                id="phone"
                value={billingInfo.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              {t('shipping_address')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">{t('address')}</Label>
              <Input
                id="address"
                value={billingInfo.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">{t('city')}</Label>
                <Input
                  id="city"
                  value={billingInfo.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="New York"
                  required
                />
              </div>
              <div>
                <Label htmlFor="postalCode">{t('postal_code')}</Label>
                <Input
                  id="postalCode"
                  value={billingInfo.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  placeholder="10001"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">{t('country')}</Label>
                <Input
                  id="country"
                  value={billingInfo.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  placeholder="United States"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              {t('payment_method')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border border-dashed rounded-lg text-center text-muted-foreground">
                <CreditCard className="mx-auto h-8 w-8 mb-2" />
                <p>{t('payment_integration_placeholder')}</p>
                <p className="text-sm">Credit Card, PayPal, Bank Transfer</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('order_summary')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                    <p className="text-sm">
                      {t('quantity')}: {item.quantity} × ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
              
              <Separator />
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span>${(15.00).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('tax')}</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>{t('total')}</span>
                  <span>${(totalPrice + 15 + (totalPrice * 0.08)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <form onSubmit={handleSubmitOrder}>
          <Button 
            type="submit" 
            className="w-full h-12 text-lg" 
            disabled={!isFormValid || isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                {t('processing')}...
              </div>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                {t('place_your_order')}
              </>
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <p>{t('secure_checkout_notice')}</p>
          <div className="flex justify-center items-center mt-2 space-x-2">
            <Badge variant="outline" className="text-green-600">
              <CheckCircle className="mr-1 h-3 w-3" />
              {t('secure_platform')}
            </Badge>
            <Badge variant="outline" className="text-blue-600">
              <CheckCircle className="mr-1 h-3 w-3" />
              SSL {t('encrypted')}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
