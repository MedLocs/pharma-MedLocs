
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { LanguageSelector } from '@/components/common/LanguageSelector';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, TrendingUp, Users } from 'lucide-react';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: t('validation_error'),
        description: t('please_fill_all_fields'),
        variant: "destructive"
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t('validation_error'),
        description: t('passwords_do_not_match'),
        variant: "destructive"
      });
      return;
    }

    const success = await register(formData.email, formData.password, formData.name, formData.role);
    if (success) {
      toast({
        title: t('register'),
        description: t('account_created_successfully'),
      });
      navigate('/');
    } else {
      toast({
        title: t('registration_error'),
        description: t('error_creating_account'),
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 p-8 flex flex-col justify-center text-white">
          <div className="max-w-md mx-auto">
            <div className="flex items-center mb-8">
              <img src="/uploads/f0824aea-9430-47b8-a0da-a4784cb07566.png" alt="MedLocs" className="h-12 w-12 mr-3" />
              <h1 className="text-3xl font-bold">MedLocs</h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">{t('why_choose_medlocs')}</h2>
            <p className="text-xl opacity-90 mb-8">{t('comprehensive_solution')}</p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <TrendingUp className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('increase_efficiency')}</h3>
                  <p className="opacity-80">{t('streamline_operations')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('secure_platform')}</h3>
                  <p className="opacity-80">{t('data_protection_compliance')}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Users className="h-6 w-6 mr-4 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg">{t('trusted_by_pharmacies')}</h3>
                  <p className="opacity-80">{t('join_growing_network')}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex gap-3">
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <CheckCircle className="mr-1 h-3 w-3" />
                {t('24_7_support')}
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <CheckCircle className="mr-1 h-3 w-3" />
                {t('easy_integration')}
              </Badge>
              <Badge className="bg-white/20 text-white hover:bg-white/30">
                <CheckCircle className="mr-1 h-3 w-3" />
                {t('cost_effective')}
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="lg:w-1/2 p-8 flex items-center justify-center">
          <div className="w-full max-w-md space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{t('get_started_today')}</h2>
                <p className="text-gray-600 mt-2">{t('create_new_account')}</p>
              </div>
              <LanguageSelector />
            </div>
            
            <Card className="shadow-lg border-0">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl">{t('sign_up')}</CardTitle>
                <CardDescription>{t('join_thousands_of_pharmacies')}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('full_name')}</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="John Doe"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="john@example.com"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="role">{t('account_type')}</Label>
                    <Select value={formData.role} onValueChange={(value) => handleChange('role', value)}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder={t('select_type')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">{t('administrator')}</SelectItem>
                        <SelectItem value="pharmacy">{t('pharmacy')}</SelectItem>
                        <SelectItem value="supplier">{t('supplier')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">{t('password')}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('confirm_password')}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      placeholder="••••••••"
                      className="h-11"
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        {t('creating_account')}...
                      </div>
                    ) : (
                      t('create_account')
                    )}
                  </Button>
                  
                  <div className="text-center pt-4">
                    <span className="text-sm text-muted-foreground">{t('already_have_account')} </span>
                    <Link to="/login" className="text-sm text-primary hover:underline font-medium">
                      {t('sign_in')}
                    </Link>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            <div className="text-center text-xs text-gray-500">
              <p>{t('terms_and_privacy_notice')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
