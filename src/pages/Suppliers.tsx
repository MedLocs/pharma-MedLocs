
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Search, Plus, Edit, Phone, Mail, Download, Upload, Star, Truck } from 'lucide-react';
import { SupplierForm } from '@/components/forms/SupplierForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Suppliers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Exemple de données de fournisseurs
  const suppliersData = [
    { 
      id: 1, 
      name: 'PharmaPro Supplies', 
      contact: 'Jean Dupont', 
      email: 'contact@pharmapro.com', 
      phone: '+33 1 23 45 67 89', 
      address: '15 Rue de la Pharmacie, Paris', 
      products: [12, 24, 35], 
      rating: 4.8,
      status: 'active',
      category: 'Médicaments'
    },
    { 
      id: 2, 
      name: 'MediStock France', 
      contact: 'Marie Laurent', 
      email: 'info@medistock.fr', 
      phone: '+33 1 98 76 54 32', 
      address: '8 Avenue des Médicaments, Lyon', 
      products: [5, 18, 27], 
      rating: 4.2,
      status: 'active',
      category: 'Équipement'
    },
    { 
      id: 3, 
      name: 'Santé Distributeurs', 
      contact: 'Pierre Lefèvre', 
      email: 'contact@santedistrib.fr', 
      phone: '+33 4 56 78 90 12', 
      address: '22 Boulevard de la Santé, Marseille', 
      products: [3, 9, 14], 
      rating: 3.9,
      status: 'inactive',
      category: 'Parapharmacie'
    },
    { 
      id: 4, 
      name: 'BioMed Solutions', 
      contact: 'Sophie Mercier', 
      email: 'info@biomed.fr', 
      phone: '+33 5 67 89 01 23', 
      address: '5 Rue des Laboratoires, Bordeaux', 
      products: [7, 19, 31], 
      rating: 4.5,
      status: 'active',
      category: 'Médicaments'
    },
    { 
      id: 5, 
      name: 'Pharma Express', 
      contact: 'Lucas Martin', 
      email: 'contact@pharmaexpress.com', 
      phone: '+33 3 45 67 89 01', 
      address: '17 Avenue des Livraisons, Lille', 
      products: [2, 11, 26], 
      rating: 4.0,
      status: 'active',
      category: 'Logistique'
    },
  ];

  // Filtrage des fournisseurs
  const filteredSuppliers = suppliersData.filter(supplier => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.category.toLowerCase().includes(searchLower) ||
        supplier.contact.toLowerCase().includes(searchLower) ||
        supplier.email.toLowerCase().includes(searchLower)
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

  const handleExportData = () => {
    toast({
      title: "Export réussi",
      description: "La liste des fournisseurs a été exportée au format Excel",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des fournisseurs</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowImportModal(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un fournisseur
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total fournisseurs</CardTitle>
              <CardDescription>Nombre de fournisseurs actifs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">24</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Catégories</CardTitle>
              <CardDescription>Types de fournisseurs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Commandes en attente</CardTitle>
              <CardDescription>Commandes à traiter</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des fournisseurs</CardTitle>
            <CardDescription>Gérez vos fournisseurs et leurs coordonnées</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm">
                <Input 
                  type="text" 
                  placeholder="Rechercher un fournisseur..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Évaluation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length > 0 ? (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                              {supplier.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.phone}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-1">{supplier.rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={supplier.status === 'active' ? 'default' : 'secondary'}>
                              {supplier.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Commande
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          Aucun fournisseur trouvé pour les critères spécifiés.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="active">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Évaluation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.filter(s => s.status === 'active').length > 0 ? (
                      filteredSuppliers.filter(s => s.status === 'active').map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                              {supplier.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.phone}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-1">{supplier.rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge>Actif</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                Commande
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          Aucun fournisseur actif trouvé.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="inactive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Évaluation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.filter(s => s.status === 'inactive').length > 0 ? (
                      filteredSuppliers.filter(s => s.status === 'inactive').map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
                              {supplier.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.phone}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">{supplier.email}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <span className="mr-1">{supplier.rating}</span>
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Inactif</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="default" size="sm">
                                Activer
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          Aucun fournisseur inactif trouvé.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Modal pour ajouter un fournisseur */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-xl">
          <SupplierForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal d'importation de données */}
      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="suppliers" 
      />
    </Layout>
  );
};

export default Suppliers;
