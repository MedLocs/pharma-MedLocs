
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/contexts/CartContext';
import { 
  Search, 
  ShoppingCart, 
  Plus, 
  Minus,
  Package,
  Store
} from 'lucide-react';

const OrderPlatform = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { addToCart, items, totalItems, totalPrice } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const products = [
    { id: '1', name: 'Paracétamol 500mg', category: t('analgesic'), price: 2.99, stock: 120, supplier: 'PharmaDistri' },
    { id: '2', name: 'Amoxicilline 1g', category: t('antibiotic'), price: 8.50, stock: 45, supplier: 'MediPlus' },
    { id: '3', name: 'Ibuprofène 400mg', category: t('anti_inflammatory'), price: 3.75, stock: 78, supplier: 'LaboPharma' },
    { id: '4', name: 'Doliprane 1000mg', category: t('analgesic'), price: 4.25, stock: 10, supplier: 'PharmaDistri' },
    { id: '5', name: 'Levothyrox 100µg', category: t('hormone'), price: 5.80, stock: 60, supplier: 'PharmaPro' },
    { id: '6', name: 'Ventoline', category: t('bronchodilator'), price: 7.20, stock: 8, supplier: 'MediPlus' },
    { id: '7', name: 'Aspégic 1000mg', category: t('analgesic'), price: 3.10, stock: 90, supplier: 'LaboPharma' },
    { id: '8', name: 'Spasfon', category: t('antispasmodic'), price: 4.50, stock: 65, supplier: 'PharmaDistri' },
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      description: `${quantity}x ${product.name} ajouté au panier`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">{t('order_platform')}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span>{totalItems} {t('products')}</span>
              <Badge variant="outline">{totalPrice.toFixed(2)} €</Badge>
            </div>
            <Button>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {t('cart')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{t('available_products')}</CardTitle>
              <CardDescription>Produits disponibles à la commande</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{products.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fournisseurs actifs</CardTitle>
              <CardDescription>Fournisseurs disponibles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Commandes en cours</CardTitle>
              <CardDescription>Vos commandes actuelles</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t('product_catalog')}</CardTitle>
            <CardDescription>{t('view_products')} et {t('place_order')}</CardDescription>
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
                <Card key={product.id} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground">{product.category}</p>
                      </div>
                    </div>
                    <Badge variant={product.stock <= 10 ? "destructive" : "outline"}>
                      {product.stock} unités
                    </Badge>
                  </div>
                  
                  <div className="flex items-center mb-3">
                    <Store className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span className="text-sm">{product.supplier}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold">{product.price.toFixed(2)} €</span>
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
