
import React from 'react';
import { 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ReservationFormProps {
  onClose: () => void;
  editMode?: boolean;
  reservationId?: number;
}

export function ReservationForm({ onClose, editMode = false, reservationId }: ReservationFormProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>{editMode ? 'Modifier la réservation' : 'Nouvelle réservation'}</CardTitle>
        <CardDescription>
          {editMode 
            ? `Modifier les détails de la réservation #${reservationId}` 
            : 'Créer une nouvelle réservation de médicament'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Le formulaire complet sera implémenté ultérieurement */}
          <p className="text-center text-muted-foreground my-4">
            Formulaire de réservation - Implémentation à venir
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>Annuler</Button>
        <Button>Enregistrer</Button>
      </CardFooter>
    </>
  );
}
