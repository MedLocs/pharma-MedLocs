
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
  Store,
  Wifi,
  WifiOff
} from 'lucide-react';
import { PharmacyForm } from '@/components/forms/PharmacyForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';

const Pharmacies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);

  // Exemple de données de pharmacies
  const pharmaciesData = [
    { 
      id: 1, 
      name: 'Pharmacie Centrale', 
      address: '10 Rue de la République, Paris', 
      phone: '+33 1 23 45 67 89', 
      email: 'contact@pharmaciecentrale.fr', 
      manager: 'Sophie Laurent', 
      openingHours: 'Lun-Sam: 8h30-19h30',
      stockStatus: 'optimal',
      lastSyncDate: '2025-04-15 09:30',
      isOnline: true
    },
    { 
      id: 2, 
      name: 'Pharmacie du Parc', 
      address: '25 Avenue du Parc, Lyon', 
      phone: '+33 4 56 78 90 12', 
      email: 'info@pharmacieduparc.fr', 
      manager: 'Thomas Bernard', 
      openingHours: 'Lun-Ven: 9h-19h, Sam: 9h-17h',
      stockStatus: 'warning',
      lastSyncDate: '2025-04-15 08:15',
      isOnline: true
    },
    { 
      id: 3, 
      name: 'Pharmacie Maritime', 
      address: '5 Boulevard de la Mer, Marseille', 
      phone: '+33 4 91 23 45 67', 
      email: 'contact@pharmaciemaritime.fr', 
      manager: 'Julie Moreau', 
      openingHours: 'Lun-Sam: 8h-20h, Dim: 10h-13h',
      stockStatus: 'critical',
      lastSyncDate: '2025-04-14 18:45',
      isOnline: false
    },
    { 
      id: 4, 
      name: 'Pharmacie de la Gare', 
      address: '2 Place de la Gare, Bordeaux', 
      phone: '+33 5 56 12 34 56', 
      email: 'info@pharmaciegare.fr', 
      manager: 'Marc Dupuis', 
      openingHours: 'Lun-Dim: 7h-22h',
      stockStatus: 'optimal',
      lastSyncDate: '2025-04-15 10:05',
      isOnline: true
    },
    { 
      id: 5, 
      name: 'Pharmacie du Château', 
      address: '15 Rue du Château, Lille', 
      phone: '+33 3 20 45 67 89', 
      email: 'contact@pharmaciechateau.fr', 
      manager: 'Émilie Blanc', 
      openingHours: 'Lun-Ven: 8h30-19h30, Sam: 9h-18h',
      stockStatus: 'warning',
      lastSyncDate: '2025-04-15 07:30',
      isOnline: true
    },
  ];

  // Filtrage des pharmacies
  const filteredPharmacies = pharmaciesData.filter(pharmacy => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        pharmacy.name.toLowerCase().includes(searchLower) ||
        pharmacy.address.toLowerCase().includes(searchLower) ||
        pharmacy.manager.toLowerCase().includes(searchLower)
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

  const handleSyncPharmacy = (pharmacy: any) => {
    toast({
      title: "Synchronisation lancée",
      description: `Synchronisation des données avec ${pharmacy.name}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export réussi",
      description: "La liste des pharmacies a été exportée au format Excel",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des pharmacies</h1>
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
              Ajouter une pharmacie
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total pharmacies</CardTitle>
              <CardDescription>Pharmacies dans le réseau</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">32</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Pharmacies connectées</CardTitle>
              <CardDescription>Actuellement en ligne</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <p className="text-3xl font-bold">28</p>
                <Badge variant="outline" className="ml-2 bg-green-100">
                  <span className="flex items-center">
                    <Wifi className="h-3 w-3 mr-1 text-green-500" />
                    En ligne
                  </span>
                </Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Alertes de stock</CardTitle>
              <CardDescription>Pharmacies en alerte</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">7</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des pharmacies</CardTitle>
            <CardDescription>Gérez votre réseau de pharmacies et leur inventaire</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm">
                <Input 
                  type="text" 
                  placeholder="Rechercher une pharmacie..." 
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pharmacie</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut du stock</TableHead>
                  <TableHead>Synchronisation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPharmacies.length > 0 ? (
                  filteredPharmacies.map((pharmacy) => (
                    <TableRow key={pharmacy.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <Store className="h-5 w-5 mr-2 text-muted-foreground" />
                          <div>
                            <div>{pharmacy.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {pharmacy.manager}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span className="text-sm">{pharmacy.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">{pharmacy.phone}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                            <span className="text-sm">{pharmacy.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            pharmacy.stockStatus === 'optimal' ? 'default' : 
                            pharmacy.stockStatus === 'warning' ? 'secondary' : 'destructive'
                          }
                        >
                          {
                            pharmacy.stockStatus === 'optimal' ? 'Optimal' : 
                            pharmacy.stockStatus === 'warning' ? 'À surveiller' : 'Critique'
                          }
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            {pharmacy.isOnline ? (
                              <Wifi className="h-4 w-4 mr-1 text-green-500" />
                            ) : (
                              <WifiOff className="h-4 w-4 mr-1 text-muted-foreground" />
                            )}
                            <span className="text-sm">
                              {pharmacy.isOnline ? 'En ligne' : 'Hors ligne'}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Dernière: {pharmacy.lastSyncDate}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            disabled={!pharmacy.isOnline}
                            onClick={() => handleSyncPharmacy(pharmacy)}
                          >
                            <RefreshCw className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                      Aucune pharmacie trouvée pour les critères spécifiés.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Modal pour ajouter une pharmacie */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-xl">
          <PharmacyForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal d'importation de données */}
      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="pharmacies" 
      />
    </Layout>
  );
};

export default Pharmacies;
