
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus,
  Package,
  Store,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock
} from 'lucide-react';

type ViewState = 'catalog' | 'checkout' | 'success';

const OrderPlatform = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { addToCart, items, totalItems, totalPrice } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [currentView, setCurrentView] = useState<ViewState>('catalog');
  const [orderNumber, setOrderNumber] = useState('');

  const products = [
    { id: '1', name: 'Paracetamol 500mg', category: t('analgesic'), price: 2.99, stock: 120, supplier: 'PharmaDistri', featured: true },
    { id: '2', name: 'Amoxicillin 1g', category: t('antibiotic'), price: 8.50, stock: 45, supplier: 'MediPlus', featured: false },
    { id: '3', name: 'Ibuprofen 400mg', category: t('anti_inflammatory'), price: 3.75, stock: 78, supplier: 'LaboPharma', featured: true },
    { id: '4', name: 'Doliprane 1000mg', category: t('analgesic'), price: 4.25, stock: 10, supplier: 'PharmaDistri', featured: false },
    { id: '5', name: 'Levothyrox 100µg', category: t('hormone'), price: 5.80, stock: 60, supplier: 'PharmaPro', featured: false },
    { id: '6', name: 'Ventolin Inhaler', category: t('bronchodilator'), price: 7.20, stock: 8, supplier: 'MediPlus', featured: true },
    { id: '7', name: 'Aspirin 1000mg', category: t('analgesic'), price: 3.10, stock: 90, supplier: 'LaboPharma', featured: false },
    { id: '8', name: 'Spasfon', category: t('antispasmodic'), price: 4.50, stock: 65, supplier: 'PharmaDistri', featured: false },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredProducts = products.filter(product => product.featured);

  const updateQuantity = (productId: string, change: number) => {
    const currentQty = quantities[productId] || 1;
    const newQty = Math.max(1, currentQty + change);
    setQuantities(prev => ({ ...prev, [productId]: newQty }));
  };

  const handleAddToCart = (product: any) => {
    const quantity = quantities[product.id] || 1;
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    }, quantity);
    
    toast({
      title: t('add_to_cart'),
      description: `${quantity}x ${product.name} ${t('added_to_cart')}`,
    });
  };

  const handleOrderComplete = (orderNum: string) => {
    setOrderNumber(orderNum);
    setCurrentView('success');
  };

  if (currentView === 'success') {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="mb-8">
            <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">{t('order_placed_successfully')}</h1>
            <p className="text-xl text-muted-foreground mb-4">
              {t('your_order_number')} <strong>{orderNumber}</strong>
            </p>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t('order_confirmation_message')}
            </p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => setCurrentView('catalog')}>
              {t('continue_shopping')}
            </Button>
            <Button variant="outline" onClick={() => window.print()}>
              {t('print_receipt')}
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  if (currentView === 'checkout') {
    return (
      <Layout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setCurrentView('catalog')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back_to_catalog')}
            </Button>
            <h1 className="text-3xl font-bold">{t('checkout')}</h1>
          </div>
          <CheckoutForm onOrderComplete={handleOrderComplete} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">{t('order_platform')}</h1>
              <p className="text-xl opacity-90">{t('trusted_by_pharmacies')}</p>
              <div className="flex items-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span className="text-sm">{t('secure_platform')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span className="text-sm">{t('24_7_support')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm">{t('real_time_inventory')}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="flex items-center gap-2 text-lg">
                  <ShoppingCart className="h-5 w-5" />
                  <span>{totalItems} {t('products')}</span>
                </div>
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  ${totalPrice.toFixed(2)}
                </Badge>
              </div>
              {totalItems > 0 && (
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => setCurrentView('checkout')}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {t('proceed_to_checkout')}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('available_products')}</CardTitle>
              <CardDescription>{t('ready_to_order')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-600">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('active_suppliers')}</CardTitle>
              <CardDescription>{t('verified_partners')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('orders_today')}</CardTitle>
              <CardDescription>{t('processed_successfully')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-purple-600">47</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{t('average_delivery')}</CardTitle>
              <CardDescription>{t('business_days')}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">2-3</p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('featured_products')}</CardTitle>
            <CardDescription>{t('most_popular_items')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Card key={product.id} className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 mr-2 text-blue-600" />
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-600">{t('featured')}</Badge>
                    </div>
                    
                    <div className="flex items-center mb-3">
                      <Store className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">{product.supplier}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                      <Badge variant={product.stock <= 10 ? "destructive" : "outline"}>
                        {product.stock} {t('units')}
                      </Badge>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      {t('add_to_cart')}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Product Catalog */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{t('product_catalog')}</CardTitle>
            <CardDescription>{t('browse_all_available_products')}</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <div className="flex w-full max-w-sm">
                <Input 
                  type="text" 
                  placeholder={t('search_product')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                    <Badge variant={product.stock <= 10 ? "destructive" : "outline"}>
                      {product.stock} {t('units')}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Store className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{product.supplier}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{quantities[product.id] || 1}</span>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {t('add_to_cart')}
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderPlatform;
