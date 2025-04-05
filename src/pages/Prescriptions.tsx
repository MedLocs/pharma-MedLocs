
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Eye, Filter, Search, Plus, Download, Upload } from 'lucide-react';
import { PrescriptionForm } from '@/components/forms/PrescriptionForm';
import { ImportDataModal } from '@/components/forms/ImportDataModal';
import { toast } from '@/components/ui/use-toast';

// Sample data
const prescriptions = [
  { 
    id: 'ORD-7231', 
    patient: 'Sophie Martin', 
    date: '2023-04-02', 
    doctor: 'Dr. Leroy', 
    items: 3, 
    status: 'pending' 
  },
  { 
    id: 'ORD-7230', 
    patient: 'Pierre Durand', 
    date: '2023-04-02', 
    doctor: 'Dr. Moreau', 
    items: 5, 
    status: 'processing' 
  },
  { 
    id: 'ORD-7229', 
    patient: 'Marie Lambert', 
    date: '2023-04-01', 
    doctor: 'Dr. Bernard', 
    items: 2, 
    status: 'completed' 
  },
  { 
    id: 'ORD-7228', 
    patient: 'Jean Petit', 
    date: '2023-04-01', 
    doctor: 'Dr. Leroy', 
    items: 1, 
    status: 'completed' 
  },
  { 
    id: 'ORD-7227', 
    patient: 'Claire Dubois', 
    date: '2023-03-31', 
    doctor: 'Dr. Moreau', 
    items: 4, 
    status: 'cancelled' 
  },
  { 
    id: 'ORD-7226', 
    patient: 'Thomas Lefebvre', 
    date: '2023-03-31', 
    doctor: 'Dr. Bernard', 
    items: 2, 
    status: 'pending' 
  },
  { 
    id: 'ORD-7225', 
    patient: 'Laura Martin', 
    date: '2023-03-30', 
    doctor: 'Dr. Leroy', 
    items: 3, 
    status: 'processing' 
  },
  { 
    id: 'ORD-7224', 
    patient: 'Antoine Rousseau', 
    date: '2023-03-30', 
    doctor: 'Dr. Moreau', 
    items: 6, 
    status: 'completed' 
  },
];

const statusStyles: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  processing: 'En préparation',
  completed: 'Terminée',
  cancelled: 'Annulée',
};

const Prescriptions = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [prescriptionDetails, setPrescriptionDetails] = useState<any>(null);
  const [showPrescriptionDetails, setShowPrescriptionDetails] = useState(false);

  // Filtrage des ordonnances
  const filteredPrescriptions = prescriptions.filter(prescription => {
    // Filtrer par statut
    if (filterStatus !== 'all' && prescription.status !== filterStatus) {
      return false;
    }
    
    // Filtrer par terme de recherche
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return (
        prescription.id.toLowerCase().includes(searchLower) ||
        prescription.patient.toLowerCase().includes(searchLower) ||
        prescription.doctor.toLowerCase().includes(searchLower)
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

  const handleViewPrescription = (prescription: any) => {
    setPrescriptionDetails(prescription);
    setShowPrescriptionDetails(true);
  };

  const handleStatusChange = (prescription: any, newStatus: string) => {
    toast({
      title: "Statut mis à jour",
      description: `L'ordonnance ${prescription.id} est maintenant ${statusLabels[newStatus as keyof typeof statusLabels].toLowerCase()}.`,
    });
  };

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des ordonnances</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setShowImportModal(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle ordonnance
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <form onSubmit={handleSearch} className="flex w-full sm:w-72">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une ordonnance..."
                className="w-full pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" variant="ghost" className="ml-2">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Select 
              value={filterStatus} 
              onValueChange={setFilterStatus}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="processing">En préparation</SelectItem>
                <SelectItem value="completed">Terminées</SelectItem>
                <SelectItem value="cancelled">Annulées</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Médecin</TableHead>
                <TableHead>Produits</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrescriptions.length > 0 ? (
                filteredPrescriptions.map((prescription) => (
                  <TableRow key={prescription.id}>
                    <TableCell className="font-medium">{prescription.id}</TableCell>
                    <TableCell>{prescription.patient}</TableCell>
                    <TableCell>{prescription.date}</TableCell>
                    <TableCell>{prescription.doctor}</TableCell>
                    <TableCell>{prescription.items}</TableCell>
                    <TableCell>
                      <Select 
                        defaultValue={prescription.status}
                        onValueChange={(value) => handleStatusChange(prescription, value)}
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue>
                            <Badge variant="outline" className={statusStyles[prescription.status]}>
                              {statusLabels[prescription.status]}
                            </Badge>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">
                            <Badge variant="outline" className={statusStyles.pending}>
                              {statusLabels.pending}
                            </Badge>
                          </SelectItem>
                          <SelectItem value="processing">
                            <Badge variant="outline" className={statusStyles.processing}>
                              {statusLabels.processing}
                            </Badge>
                          </SelectItem>
                          <SelectItem value="completed">
                            <Badge variant="outline" className={statusStyles.completed}>
                              {statusLabels.completed}
                            </Badge>
                          </SelectItem>
                          <SelectItem value="cancelled">
                            <Badge variant="outline" className={statusStyles.cancelled}>
                              {statusLabels.cancelled}
                            </Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewPrescription(prescription)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4 text-muted-foreground">
                    Aucune ordonnance trouvée pour les critères spécifiés.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal pour ajouter une ordonnance */}
      <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
        <DialogContent className="sm:max-w-4xl">
          <PrescriptionForm onClose={() => setShowAddForm(false)} />
        </DialogContent>
      </Dialog>

      {/* Modal d'importation de données */}
      <ImportDataModal 
        open={showImportModal} 
        onOpenChange={setShowImportModal} 
        importType="prescriptions" 
      />

      {/* Modal de détails d'ordonnance */}
      <Dialog open={showPrescriptionDetails} onOpenChange={setShowPrescriptionDetails}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Détails de l'ordonnance {prescriptionDetails?.id}</DialogTitle>
          </DialogHeader>
          
          {prescriptionDetails && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Patient</p>
                  <p>{prescriptionDetails.patient}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Médecin</p>
                  <p>{prescriptionDetails.doctor}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p>{prescriptionDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Statut</p>
                  <Badge variant="outline" className={statusStyles[prescriptionDetails.status]}>
                    {statusLabels[prescriptionDetails.status]}
                  </Badge>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Médicaments</p>
                <div className="border rounded-md p-3 bg-muted/30">
                  <p>Cette ordonnance contient {prescriptionDetails.items} produit(s).</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Les détails spécifiques des médicaments seraient affichés ici dans une application réelle.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPrescriptionDetails(false)}>
              Fermer
            </Button>
            <Button>
              Traiter l'ordonnance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Prescriptions;
