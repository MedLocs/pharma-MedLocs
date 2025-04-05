
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Plus, Search, Filter, Mail, Phone, FileText, Calendar, Clock, Upload, Download, Eye, Edit, Trash } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerForm } from '@/components/forms/CustomerForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';
import { useToast } from '@/components/ui/use-toast';

const Customers = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);

  const customers = [
    { 
      id: 1, 
      name: 'Anne Dupont', 
      email: 'anne.dupont@example.com', 
      phone: '06 12 34 56 78', 
      lastVisit: '03/04/2025',
      status: 'active',
      prescriptions: 12,
      totalSpent: 458.75,
      avatar: 'AD'
    },
    { 
      id: 2, 
      name: 'Thomas Martin', 
      email: 'thomas.martin@example.com', 
      phone: '06 23 45 67 89', 
      lastVisit: '01/04/2025',
      status: 'active',
      prescriptions: 5,
      totalSpent: 237.20,
      avatar: 'TM'
    },
    { 
      id: 3, 
      name: 'Sophie Petit', 
      email: 'sophie.petit@example.com', 
      phone: '06 34 56 78 90', 
      lastVisit: '28/03/2025',
      status: 'inactive',
      prescriptions: 3,
      totalSpent: 152.30,
      avatar: 'SP'
    },
    { 
      id: 4, 
      name: 'Michel Durand', 
      email: 'michel.durand@example.com', 
      phone: '06 45 67 89 01', 
      lastVisit: '25/03/2025',
      status: 'active',
      prescriptions: 8,
      totalSpent: 321.45,
      avatar: 'MD'
    },
    { 
      id: 5, 
      name: 'Julie Leroy', 
      email: 'julie.leroy@example.com', 
      phone: '06 56 78 90 12', 
      lastVisit: '22/03/2025',
      status: 'active',
      prescriptions: 4,
      totalSpent: 178.60,
      avatar: 'JL'
    },
    { 
      id: 6, 
      name: 'Nicolas Bernard', 
      email: 'nicolas.bernard@example.com', 
      phone: '06 67 89 01 23', 
      lastVisit: '18/03/2025',
      status: 'inactive',
      prescriptions: 2,
      totalSpent: 87.95,
      avatar: 'NB'
    },
  ];

  // Filtrage des clients
  const filteredCustomers = customers.filter(customer => {
    // Filtrer par statut
    if (activeTab !== 'all' && customer.status !== activeTab) {
      return false;
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.phone.includes(searchLower)
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

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setShowCustomerDetails(true);
  };

  const handleEditCustomer = (customer: any) => {
    toast({
      title: "Modification client",
      description: `Modification des informations de ${customer.name}.`,
    });
  };

  const handleDeleteCustomer = (customer: any) => {
    toast({
      title: "Client supprimé",
      description: `${customer.name} a été supprimé de la base de clients.`,
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des clients</h1>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setShowImportModal(true)}>
              <Upload className="mr-2 h-4 w-4" />
              Importer
            </Button>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un client
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Clients actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{customers.filter(c => c.status === 'active').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Ordonnances actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">76</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-amber-500" />
                Visites cette semaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">124</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
            <div className="flex justify-between items-center mt-4">
              <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Rechercher un client..." 
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </form>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="" alt={customer.name} />
                                <AvatarFallback>{customer.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.prescriptions}</TableCell>
                          <TableCell>{customer.lastVisit}</TableCell>
                          <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                          <TableCell>
                            <Badge variant={customer.status === 'active' ? 'default' : 'outline'}>
                              {customer.status === 'active' ? 'Actif' : 'Inactif'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => handleViewCustomer(customer)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => handleEditCustomer(customer)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDeleteCustomer(customer)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucun client trouvé pour les critères spécifiés.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="active">
                {/* Contenu similaire pour les clients actifs, réutilisant le même code avec le filtre appliqué */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="" alt={customer.name} />
                                <AvatarFallback>{customer.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.prescriptions}</TableCell>
                          <TableCell>{customer.lastVisit}</TableCell>
                          <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Profil</Button>
                              <Button variant="outline" size="sm">Historique</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          Aucun client actif trouvé pour les critères spécifiés.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="inactive">
                {/* Contenu similaire pour les clients inactifs */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.length > 0 ? (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src="" alt={customer.name} />
                                <AvatarFallback>{customer.avatar}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                <span className="text-sm">{customer.phone}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{customer.prescriptions}</TableCell>
                          <TableCell>{customer.lastVisit}</TableCell>
                          <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Profil</Button>
                              <Button variant="outline" size="sm">Historique</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          Aucun client inactif trouvé pour les critères spécifiés.
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
      
      {/* Modal pour ajouter un client */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-2xl">
          <CustomerForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal d'importation de données */}
      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="customers" 
      />

      {/* Modal de détails client */}
      <Dialog open={showCustomerDetails} onOpenChange={setShowCustomerDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Profil client</DialogTitle>
            <DialogDescription>
              Détails du client et historique des interactions
            </DialogDescription>
          </DialogHeader>
          
          {selectedCustomer && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="" alt={selectedCustomer.name} />
                  <AvatarFallback className="text-lg">{selectedCustomer.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedCustomer.name}</h3>
                  <Badge variant={selectedCustomer.status === 'active' ? 'default' : 'outline'}>
                    {selectedCustomer.status === 'active' ? 'Actif' : 'Inactif'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{selectedCustomer.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Téléphone</p>
                  <p>{selectedCustomer.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Dernière visite</p>
                  <p>{selectedCustomer.lastVisit}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total dépensé</p>
                  <p>{selectedCustomer.totalSpent.toFixed(2)} €</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Ordonnances</p>
                <p>{selectedCustomer.prescriptions} ordonnance(s) au total</p>
              </div>
            </div>
          )}
          
          <DialogFooter className="gap-2">
            <Button variant="outline">Voir l'historique</Button>
            <Button>Créer une ordonnance</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Customers;
