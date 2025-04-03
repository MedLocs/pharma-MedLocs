
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, AlertTriangle } from 'lucide-react';

const Inventory = () => {
  const medicationItems = [
    { id: 1, name: 'Paracétamol 500mg', category: 'Analgésique', stock: 120, price: 2.99, alert: false },
    { id: 2, name: 'Amoxicilline 1g', category: 'Antibiotique', stock: 45, price: 8.50, alert: false },
    { id: 3, name: 'Ibuprofène 400mg', category: 'Anti-inflammatoire', stock: 78, price: 3.75, alert: false },
    { id: 4, name: 'Doliprane 1000mg', category: 'Analgésique', stock: 10, price: 4.25, alert: true },
    { id: 5, name: 'Levothyrox 100µg', category: 'Hormone', stock: 60, price: 5.80, alert: false },
    { id: 6, name: 'Ventoline', category: 'Bronchodilatateur', stock: 8, price: 7.20, alert: true },
    { id: 7, name: 'Aspégic 1000mg', category: 'Analgésique', stock: 90, price: 3.10, alert: false },
    { id: 8, name: 'Spasfon', category: 'Antispasmodique', stock: 65, price: 4.50, alert: false },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un produit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total des produits</CardTitle>
              <CardDescription>Nombre de produits en stock</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">458</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Produits en alerte</CardTitle>
              <CardDescription>Stock faible à commander</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">12</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Valeur du stock</CardTitle>
              <CardDescription>Valeur totale de l'inventaire</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5 238,75 €</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des médicaments</CardTitle>
            <CardDescription>Gérez votre inventaire de médicaments et autres produits</CardDescription>
            <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
              <Input type="text" placeholder="Rechercher un produit..." />
              <Button type="submit" variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Prix</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {medicationItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {item.alert && <AlertTriangle className="h-4 w-4 text-amber-500 inline mr-2" />}
                      {item.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{item.category}</Badge>
                    </TableCell>
                    <TableCell className={item.stock <= 10 ? "text-amber-500 font-medium" : ""}>
                      {item.stock} unités
                    </TableCell>
                    <TableCell>{item.price.toFixed(2)} €</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Modifier</Button>
                        <Button variant="outline" size="sm">Réapprovisionner</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Inventory;
