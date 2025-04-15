
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { 
  Search, 
  Plus, 
  MapPin, 
  Phone, 
  Mail, 
  Download, 
  Upload, 
  Edit, 
  RefreshCw, 
  Trash,
  Star,
  Calendar,
  ShoppingBag,
  Truck
} from 'lucide-react';
import { SupplierForm } from '@/components/forms/SupplierForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';

const Suppliers = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  const suppliersData = [
    { 
      id: 1, 
      name: 'PharmaDistri', 
      contact: 'Jean Dupont', 
      email: 'contact@pharmadistri.com', 
      phone: '01 23 45 67 89', 
      address: '15 rue des Médicaments, 75001 Paris', 
      products: [1, 2, 5, 8], 
      rating: 4.8,
      lastOrder: '2025-04-10',
      paymentTerms: '30 jours',
      notes: 'Fournisseur principal de médicaments génériques',
      status: 'active' as const,
      category: 'Médicaments génériques'
    },
    { 
      id: 2, 
      name: 'MediPlus', 
      contact: 'Marie Laurent', 
      email: 'marie@mediplus.fr', 
      phone: '01 98 76 54 32', 
      address: '8 avenue de la Santé, 69002 Lyon', 
      products: [3, 6], 
      rating: 4.2,
      lastOrder: '2025-04-05',
      paymentTerms: '45 jours',
      notes: 'Spécialiste des médicaments respiratoires',
      status: 'active' as const,
      category: 'Médicaments spécialisés'
    },
    { 
      id: 3, 
      name: 'LaboPharma', 
      contact: 'Pierre Martin', 
      email: 'p.martin@labopharma.com', 
      phone: '03 45 67 89 10', 
      address: '25 boulevard des Sciences, 44000 Nantes', 
      products: [4, 7], 
      rating: 3.9,
      lastOrder: '2025-03-28',
      paymentTerms: '60 jours',
      notes: 'Grand laboratoire pharmaceutique national',
      status: 'active' as const,
      category: 'Produits pharmaceutiques'
    },
    { 
      id: 4, 
      name: 'SantéSupply', 
      contact: 'Sophie Blanc', 
      email: 'contact@santesupply.fr', 
      phone: '04 56 78 91 23', 
      address: '12 rue de l\'Hôpital, 13008 Marseille', 
      products: [], 
      rating: 4.5,
      lastOrder: '2025-02-15',
      paymentTerms: '30 jours',
      notes: 'Fournisseur d\'équipements médicaux',
      status: 'inactive' as const,
      category: 'Équipement médical'
    },
    { 
      id: 5, 
      name: 'PharmaPro', 
      contact: 'Thomas Petit', 
      email: 'thomas@pharmapro.com', 
      phone: '02 34 56 78 90', 
      address: '5 allée des Pharmaciens, 59000 Lille', 
      products: [1, 3, 5], 
      rating: 4.1,
      lastOrder: '2025-04-12',
      paymentTerms: '15 jours',
      notes: 'Fournisseur de produits biologiques',
      status: 'active' as const,
      category: 'Produits biologiques'
    },
  ];

  const filteredSuppliers = suppliersData.filter(supplier => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        supplier.name.toLowerCase().includes(searchLower) ||
        supplier.contact.toLowerCase().includes(searchLower) ||
        supplier.category.toLowerCase().includes(searchLower)
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
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un fournisseur
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Fournisseurs actifs</CardTitle>
              <CardDescription>Total fournisseurs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{suppliersData.filter(s => s.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Commandes récentes</CardTitle>
              <CardDescription>30 derniers jours</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Montant total</CardTitle>
              <CardDescription>Achats ce mois</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12 425,60 €</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>En attente</CardTitle>
              <CardDescription>Livraisons à recevoir</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des fournisseurs</CardTitle>
            <CardDescription>Gérez vos fournisseurs et commandes</CardDescription>
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
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="list">
              <TabsList>
                <TabsTrigger value="list">Liste</TabsTrigger>
                <TabsTrigger value="cards">Fiches</TabsTrigger>
                <TabsTrigger value="orders">Commandes</TabsTrigger>
                <TabsTrigger value="stats">Statistiques</TabsTrigger>
              </TabsList>

              <TabsContent value="list">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom</TableHead>
                      <TableHead>Catégorie</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Téléphone</TableHead>
                      <TableHead>Dernière commande</TableHead>
                      <TableHead>Note</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSuppliers.length > 0 ? (
                      filteredSuppliers.map((supplier) => (
                        <TableRow key={supplier.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              {supplier.status === 'inactive' && (
                                <Badge variant="outline" className="mr-2 bg-red-100 text-red-800">Inactif</Badge>
                              )}
                              {supplier.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{supplier.category}</Badge>
                          </TableCell>
                          <TableCell>{supplier.contact}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                              {supplier.phone}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              {supplier.lastOrder || 'Jamais'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 mr-1 text-amber-500" />
                              {supplier.rating.toFixed(1)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Truck className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucun fournisseur trouvé pour les critères spécifiés.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSuppliers.length > 0 ? (
                    filteredSuppliers.map((supplier) => (
                      <Card key={supplier.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{supplier.name}</CardTitle>
                              <CardDescription>{supplier.category}</CardDescription>
                            </div>
                            {supplier.status === 'inactive' ? (
                              <Badge variant="outline" className="bg-red-100 text-red-800">Inactif</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-green-100 text-green-800">Actif</Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{supplier.address}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{supplier.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{supplier.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 mr-2 text-amber-500" />
                            <span className="text-sm">Note: {supplier.rating.toFixed(1)}/5</span>
                          </div>
                          <div className="flex items-center">
                            <ShoppingBag className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{supplier.products.length} produits</span>
                          </div>
                          <div className="flex items-center">
                            <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">Paiement: {supplier.paymentTerms}</span>
                          </div>
                          {supplier.notes && (
                            <p className="text-sm italic border-l-2 pl-2 mt-2">{supplier.notes}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="col-span-3 text-center py-4 text-muted-foreground">
                      Aucun fournisseur trouvé pour les critères spécifiés.
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="orders">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commande</TableHead>
                      <TableHead>Fournisseur</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Montant</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">#ORD-2025-045</TableCell>
                      <TableCell>PharmaDistri</TableCell>
                      <TableCell>15/04/2025</TableCell>
                      <TableCell>2 450,80 €</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800">En transit</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#ORD-2025-044</TableCell>
                      <TableCell>PharmaPro</TableCell>
                      <TableCell>12/04/2025</TableCell>
                      <TableCell>1 876,25 €</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Livré</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">#ORD-2025-043</TableCell>
                      <TableCell>MediPlus</TableCell>
                      <TableCell>10/04/2025</TableCell>
                      <TableCell>3 562,40 €</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Livré</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="stats">
                <div className="space-y-4">
                  <p className="text-center text-muted-foreground my-8">
                    Les statistiques détaillées des fournisseurs seront disponibles prochainement.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-xl">
          <SupplierForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="suppliers" 
      />
    </Layout>
  );
};

export default Suppliers;
