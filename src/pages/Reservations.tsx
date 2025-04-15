
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
  Filter, 
  Download, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Calendar,
  Package,
  User,
  Store,
  RefreshCw
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ReservationForm } from '@/components/forms/ReservationForm';
import { type Reservation } from '@/features/inventory/types';

const Reservations = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [showDetailsSheet, setShowDetailsSheet] = useState(false);

  // Données d'exemple pour les réservations
  const reservationsData: Reservation[] = [
    {
      id: 1,
      productId: 1,
      productName: 'Paracétamol 500mg',
      quantity: 3,
      customerId: 101,
      customerName: 'Martin Dubois',
      pharmacyId: 1,
      pharmacyName: 'Pharmacie Centrale',
      status: 'pending',
      createdAt: '2025-04-15 09:30',
      expiresAt: '2025-04-17 18:00',
      reservedBy: 'application',
      notificationSent: true
    },
    {
      id: 2,
      productId: 3,
      productName: 'Ibuprofène 400mg',
      quantity: 2,
      customerId: 102,
      customerName: 'Sophie Laurent',
      pharmacyId: 1,
      pharmacyName: 'Pharmacie Centrale',
      status: 'approved',
      createdAt: '2025-04-14 14:45',
      expiresAt: '2025-04-16 18:00',
      pickupCode: 'RES-7845',
      reservedBy: 'téléphone',
      notificationSent: true
    },
    {
      id: 3,
      productId: 6,
      productName: 'Ventoline',
      quantity: 1,
      customerId: 103,
      customerName: 'Pierre Moreau',
      pharmacyId: 2,
      pharmacyName: 'Pharmacie du Parc',
      status: 'ready',
      createdAt: '2025-04-14 11:20',
      expiresAt: '2025-04-16 18:00',
      pickupCode: 'RES-3621',
      prescription: true,
      reservedBy: 'application',
      notificationSent: true
    },
    {
      id: 4,
      productId: 2,
      productName: 'Amoxicilline 1g',
      quantity: 1,
      customerId: 104,
      customerName: 'Julie Petit',
      pharmacyId: 3,
      pharmacyName: 'Pharmacie Maritime',
      status: 'completed',
      createdAt: '2025-04-13 10:15',
      expiresAt: '2025-04-15 18:00',
      prescription: true,
      notes: 'Cliente fidèle, préparer pour 16h',
      reservedBy: 'téléphone',
      notificationSent: true
    },
    {
      id: 5,
      productId: 4,
      productName: 'Doliprane 1000mg',
      quantity: 2,
      customerId: 105,
      customerName: 'Thomas Bernard',
      pharmacyId: 1,
      pharmacyName: 'Pharmacie Centrale',
      status: 'cancelled',
      createdAt: '2025-04-12 16:30',
      expiresAt: '2025-04-14 18:00',
      notes: 'Annulé par le client',
      reservedBy: 'application',
      notificationSent: true
    }
  ];

  // Filtrage des réservations
  const filteredReservations = reservationsData.filter(reservation => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        reservation.productName.toLowerCase().includes(searchLower) ||
        reservation.customerName.toLowerCase().includes(searchLower) ||
        reservation.pharmacyName.toLowerCase().includes(searchLower) ||
        reservation.status.toLowerCase().includes(searchLower)
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

  const handleViewDetails = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setShowDetailsSheet(true);
  };

  const handleUpdateStatus = (id: number, newStatus: Reservation['status']) => {
    toast({
      title: "Statut mis à jour",
      description: `La réservation #${id} est maintenant ${getStatusLabel(newStatus)}`,
    });
  };

  const getStatusLabel = (status: Reservation['status']) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'approved': return 'Approuvée';
      case 'ready': return 'Prête';
      case 'completed': return 'Complétée';
      case 'cancelled': return 'Annulée';
      default: return status;
    }
  };

  const getStatusBadge = (status: Reservation['status']) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3 mr-1" />
            En attente
          </Badge>
        );
      case 'approved':
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approuvée
          </Badge>
        );
      case 'ready':
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800">
            <Package className="h-3 w-3 mr-1" />
            Prête
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            Complétée
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Annulée
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Réservations de médicaments</h1>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle réservation
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total</CardTitle>
              <CardDescription>Toutes réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{reservationsData.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>En attente</CardTitle>
              <CardDescription>À traiter</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">
                {reservationsData.filter(r => r.status === 'pending').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Prêtes</CardTitle>
              <CardDescription>À récupérer</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-500">
                {reservationsData.filter(r => r.status === 'ready').length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Aujourd'hui</CardTitle>
              <CardDescription>Nouvelles réservations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-500">
                {reservationsData.filter(r => r.createdAt.startsWith('2025-04-15')).length}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des réservations</CardTitle>
            <CardDescription>Gérez les réservations de médicaments</CardDescription>
            <div className="flex justify-between items-center mt-4">
              <form onSubmit={handleSearch} className="flex w-full max-w-sm">
                <Input 
                  type="text" 
                  placeholder="Rechercher..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button type="submit" variant="outline" size="icon" className="ml-2">
                  <Search className="h-4 w-4" />
                </Button>
              </form>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrer
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">Toutes</TabsTrigger>
                <TabsTrigger value="pending">En attente</TabsTrigger>
                <TabsTrigger value="ready">Prêtes</TabsTrigger>
                <TabsTrigger value="completed">Complétées</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Médicament</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Pharmacie</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.length > 0 ? (
                      filteredReservations.map((reservation) => (
                        <TableRow key={reservation.id}>
                          <TableCell className="font-medium">#{reservation.id}</TableCell>
                          <TableCell>
                            {reservation.prescription && 
                              <AlertTriangle className="h-4 w-4 text-amber-500 inline mr-1" />
                            }
                            {reservation.productName} (x{reservation.quantity})
                          </TableCell>
                          <TableCell>{reservation.customerName}</TableCell>
                          <TableCell>{reservation.pharmacyName}</TableCell>
                          <TableCell>{reservation.createdAt}</TableCell>
                          <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewDetails(reservation)}
                              >
                                Détails
                              </Button>
                              {reservation.status === 'pending' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'approved')}
                                >
                                  Approuver
                                </Button>
                              )}
                              {reservation.status === 'approved' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-blue-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'ready')}
                                >
                                  Prête
                                </Button>
                              )}
                              {reservation.status === 'ready' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'completed')}
                                >
                                  Compléter
                                </Button>
                              )}
                              {(reservation.status === 'pending' || reservation.status === 'approved') && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                                >
                                  Annuler
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucune réservation trouvée pour les critères spécifiés.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Médicament</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Pharmacie</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.filter(r => r.status === 'pending').length > 0 ? (
                      filteredReservations
                        .filter(r => r.status === 'pending')
                        .map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">#{reservation.id}</TableCell>
                            <TableCell>
                              {reservation.prescription && 
                                <AlertTriangle className="h-4 w-4 text-amber-500 inline mr-1" />
                              }
                              {reservation.productName} (x{reservation.quantity})
                            </TableCell>
                            <TableCell>{reservation.customerName}</TableCell>
                            <TableCell>{reservation.pharmacyName}</TableCell>
                            <TableCell>{reservation.createdAt}</TableCell>
                            <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(reservation)}
                                >
                                  Détails
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'approved')}
                                >
                                  Approuver
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'cancelled')}
                                >
                                  Annuler
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucune réservation en attente.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="ready">
                {/* Contenu similaire pour les réservations prêtes */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Médicament</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Code</TableHead>
                      <TableHead>Date d'expiration</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.filter(r => r.status === 'ready').length > 0 ? (
                      filteredReservations
                        .filter(r => r.status === 'ready')
                        .map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">#{reservation.id}</TableCell>
                            <TableCell>
                              {reservation.prescription && 
                                <AlertTriangle className="h-4 w-4 text-amber-500 inline mr-1" />
                              }
                              {reservation.productName} (x{reservation.quantity})
                            </TableCell>
                            <TableCell>{reservation.customerName}</TableCell>
                            <TableCell>
                              <Badge variant="secondary">{reservation.pickupCode}</Badge>
                            </TableCell>
                            <TableCell>{reservation.expiresAt}</TableCell>
                            <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => handleViewDetails(reservation)}
                                >
                                  Détails
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-green-600"
                                  onClick={() => handleUpdateStatus(reservation.id, 'completed')}
                                >
                                  Compléter
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucune réservation prête à récupérer.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="completed">
                {/* Contenu similaire pour les réservations complétées */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Médicament</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Pharmacie</TableHead>
                      <TableHead>Date de complétion</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReservations.filter(r => r.status === 'completed' || r.status === 'cancelled').length > 0 ? (
                      filteredReservations
                        .filter(r => r.status === 'completed' || r.status === 'cancelled')
                        .map((reservation) => (
                          <TableRow key={reservation.id}>
                            <TableCell className="font-medium">#{reservation.id}</TableCell>
                            <TableCell>
                              {reservation.prescription && 
                                <AlertTriangle className="h-4 w-4 text-amber-500 inline mr-1" />
                              }
                              {reservation.productName} (x{reservation.quantity})
                            </TableCell>
                            <TableCell>{reservation.customerName}</TableCell>
                            <TableCell>{reservation.pharmacyName}</TableCell>
                            <TableCell>{reservation.createdAt}</TableCell>
                            <TableCell>{getStatusBadge(reservation.status)}</TableCell>
                            <TableCell>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleViewDetails(reservation)}
                              >
                                Détails
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                          Aucune réservation complétée.
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

      {/* Formulaire d'ajout de réservation */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-xl">
          <CardHeader>
            <CardTitle>Nouvelle réservation</CardTitle>
            <CardDescription>Créer une nouvelle réservation de médicament</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground my-8">
              Formulaire de réservation - Implémentation à venir
            </p>
          </CardContent>
        </DialogContent>
      </Dialog>

      {/* Feuille latérale pour les détails */}
      <Sheet open={showDetailsSheet} onOpenChange={setShowDetailsSheet}>
        <SheetContent className="sm:max-w-md">
          {selectedReservation && (
            <>
              <SheetHeader>
                <SheetTitle>Détails de la réservation #{selectedReservation.id}</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Statut</h3>
                    {getStatusBadge(selectedReservation.status)}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Produit</h3>
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedReservation.productName}</p>
                        <p className="text-sm text-muted-foreground">Quantité: {selectedReservation.quantity}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Client</h3>
                    <div className="flex items-center">
                      <User className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedReservation.customerName}</p>
                        <p className="text-sm text-muted-foreground">ID: {selectedReservation.customerId}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Pharmacie</h3>
                    <div className="flex items-center">
                      <Store className="h-5 w-5 mr-2 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{selectedReservation.pharmacyName}</p>
                        <p className="text-sm text-muted-foreground">ID: {selectedReservation.pharmacyId}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Dates</h3>
                    <div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="text-sm">Créée le: {selectedReservation.createdAt}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <p className="text-sm">Expire le: {selectedReservation.expiresAt}</p>
                      </div>
                    </div>
                  </div>
                  
                  {selectedReservation.pickupCode && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Code de récupération</h3>
                      <Badge className="text-lg p-2">{selectedReservation.pickupCode}</Badge>
                    </div>
                  )}
                  
                  {selectedReservation.notes && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                      <p className="text-sm border rounded-md p-2">{selectedReservation.notes}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Informations supplémentaires</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm">Réservée via: <span className="font-medium">{selectedReservation.reservedBy}</span></div>
                      <div className="text-sm">Notification: <span className="font-medium">{selectedReservation.notificationSent ? 'Envoyée' : 'Non envoyée'}</span></div>
                      <div className="text-sm">Ordonnance: <span className="font-medium">{selectedReservation.prescription ? 'Oui' : 'Non'}</span></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    {(selectedReservation.status === 'pending' || selectedReservation.status === 'approved') && (
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          handleUpdateStatus(selectedReservation.id, 'cancelled');
                          setShowDetailsSheet(false);
                        }}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Annuler
                      </Button>
                    )}
                    
                    {selectedReservation.status === 'pending' && (
                      <Button 
                        onClick={() => {
                          handleUpdateStatus(selectedReservation.id, 'approved');
                          setShowDetailsSheet(false);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approuver
                      </Button>
                    )}
                    
                    {selectedReservation.status === 'approved' && (
                      <Button 
                        onClick={() => {
                          handleUpdateStatus(selectedReservation.id, 'ready');
                          setShowDetailsSheet(false);
                        }}
                      >
                        <Package className="mr-2 h-4 w-4" />
                        Marquer comme prête
                      </Button>
                    )}
                    
                    {selectedReservation.status === 'ready' && (
                      <Button 
                        onClick={() => {
                          handleUpdateStatus(selectedReservation.id, 'completed');
                          setShowDetailsSheet(false);
                        }}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Compléter
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Layout>
  );
};

export default Reservations;
