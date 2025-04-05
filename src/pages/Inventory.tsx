
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { 
  Search, 
  Plus, 
  AlertTriangle, 
  Upload, 
  Download, 
  Edit, 
  RefreshCw, 
  Trash 
} from 'lucide-react';
import { ProductForm } from '@/components/forms/ProductForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';
import { useToast } from '@/components/ui/use-toast';

const Inventory = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showEditForm, setShowEditForm] = useState(false);

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

  // Filtrage des produits
  const filteredProducts = medicationItems.filter(item => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        item.name.toLowerCase().includes(searchLower) ||
        item.category.toLowerCase().includes(searchLower)
      );
    }
    return true;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Recherche effectuée",
      description: `Résultats pour "${searchTerm}"`,
    });
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setShowEditForm(true);
  };

  const handleDeleteProduct = (product: any) => {
    toast({
      title: "Produit supprimé",
      description: `${product.name} a été supprimé de l'inventaire.`,
    });
  };

  const handleRestock = (product: any) => {
    toast({
      title: "Réapprovisionnement",
      description: `Une commande de réapprovisionnement a été créée pour ${product.name}.`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion de l'inventaire</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowImportModal(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>
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
            <div className="flex justify-between items-center mt-4">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm">
                <Input 
                  type="text" 
                  placeholder="Rechercher un produit..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
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
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
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
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(item)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleRestock(item)}>
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleDeleteProduct(item)}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                      Aucun produit trouvé pour les critères spécifiés.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal pour ajouter un produit */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-xl">
          <ProductForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal pour éditer un produit */}
      <Dialog open={showEditForm} onOpenChange={setShowEditForm}>
        <DialogContent className="sm:max-w-xl">
          <ProductForm onClose={() => setShowEditForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal d'importation de données */}
      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="inventory" 
      />
    </Layout>
  );
};

export default Inventory;
