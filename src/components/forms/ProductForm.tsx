
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface ProductFormProps {
  onClose: () => void;
}

export function ProductForm({ onClose }: ProductFormProps) {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [alertThreshold, setAlertThreshold] = useState('10');

  const categoryOptions = [
    'Analgésique',
    'Antibiotique',
    'Anti-inflammatoire',
    'Hormone',
    'Bronchodilatateur',
    'Antispasmodique',
    'Dermatologie',
    'Para-pharmacie',
    'Autre'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!name || !category || !stock || !price) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    const stockNumber = parseInt(stock);
    const priceNumber = parseFloat(price);
    const alertNumber = parseInt(alertThreshold);

    if (isNaN(stockNumber) || stockNumber < 0) {
      toast({
        title: "Erreur de validation",
        description: "Le stock doit être un nombre positif.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(priceNumber) || priceNumber <= 0) {
      toast({
        title: "Erreur de validation",
        description: "Le prix doit être un nombre positif.",
        variant: "destructive"
      });
      return;
    }

    // Simuler l'ajout d'un nouveau produit
    const newProduct = {
      id: Math.floor(Math.random() * 1000),
      name,
      category,
      stock: stockNumber,
      price: priceNumber,
      alert: stockNumber <= alertNumber
    };

    console.log('Nouveau produit:', newProduct);
    
    toast({
      title: "Produit ajouté",
      description: `${name} a été ajouté à l'inventaire.`,
    });

    onClose();
  };

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Ajouter un produit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Ex: Paracétamol 500mg" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger id="category">
                <SelectValue placeholder="Sélectionner une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock initial</Label>
              <Input 
                id="stock" 
                type="number" 
                min="0" 
                value={stock} 
                onChange={(e) => setStock(e.target.value)} 
                placeholder="Quantité" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input 
                id="price" 
                type="number" 
                min="0.01" 
                step="0.01" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="0.00" 
                required 
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="alertThreshold">Seuil d'alerte</Label>
            <Input 
              id="alertThreshold" 
              type="number" 
              min="1" 
              value={alertThreshold} 
              onChange={(e) => setAlertThreshold(e.target.value)} 
              required 
            />
            <p className="text-sm text-muted-foreground">
              Une alerte sera générée lorsque le stock sera inférieur ou égal à cette valeur.
            </p>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Ajouter le produit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
