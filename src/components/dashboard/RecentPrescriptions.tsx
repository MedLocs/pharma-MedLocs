
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

type PrescriptionStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

interface Prescription {
  id: string;
  patientName: string;
  date: string;
  items: number;
  status: PrescriptionStatus;
}

// Sample data
const prescriptions: Prescription[] = [
  { id: 'ORD-7231', patientName: 'Sophie Martin', date: '2023-04-02', items: 3, status: 'pending' },
  { id: 'ORD-7230', patientName: 'Pierre Durand', date: '2023-04-02', items: 5, status: 'processing' },
  { id: 'ORD-7229', patientName: 'Marie Lambert', date: '2023-04-01', items: 2, status: 'completed' },
  { id: 'ORD-7228', patientName: 'Jean Petit', date: '2023-04-01', items: 1, status: 'completed' },
  { id: 'ORD-7227', patientName: 'Claire Dubois', date: '2023-03-31', items: 4, status: 'cancelled' },
];

const statusStyles: Record<PrescriptionStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  processing: 'bg-blue-100 text-blue-800 border-blue-200',
  completed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
};

const statusLabels: Record<PrescriptionStatus, string> = {
  pending: 'En attente',
  processing: 'En préparation',
  completed: 'Terminée',
  cancelled: 'Annulée',
};

export const RecentPrescriptions = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Ordonnances récentes</CardTitle>
        <CardDescription>Les 5 dernières ordonnances reçues</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prescriptions.map((prescription) => (
            <div key={prescription.id} className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-sm font-medium">{prescription.patientName}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-muted-foreground">{prescription.id}</p>
                    <p className="text-xs text-muted-foreground">•</p>
                    <p className="text-xs text-muted-foreground">{prescription.date}</p>
                    <p className="text-xs text-muted-foreground">•</p>
                    <p className="text-xs text-muted-foreground">{prescription.items} produit(s)</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className={statusStyles[prescription.status]}>
                  {statusLabels[prescription.status]}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
