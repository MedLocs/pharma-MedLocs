
import React from 'react';
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
import { Eye, Filter, Search } from 'lucide-react';

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
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Gestion des ordonnances</h1>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher une ordonnance..."
              className="w-full pl-8"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtres
            </Button>
            <Select defaultValue="all">
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
              {prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell className="font-medium">{prescription.id}</TableCell>
                  <TableCell>{prescription.patient}</TableCell>
                  <TableCell>{prescription.date}</TableCell>
                  <TableCell>{prescription.doctor}</TableCell>
                  <TableCell>{prescription.items}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusStyles[prescription.status]}>
                      {statusLabels[prescription.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Prescriptions;
