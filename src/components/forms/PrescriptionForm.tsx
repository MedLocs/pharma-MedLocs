
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Calendar as CalendarIcon, Plus, Trash } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface MedicationItem {
  id: string;
  name: string;
  quantity: number;
  instructions: string;
}

export function PrescriptionForm({ onClose }: { onClose: () => void }) {
  const { toast } = useToast();
  const [patient, setPatient] = useState('');
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [medications, setMedications] = useState<MedicationItem[]>([
    { id: '1', name: '', quantity: 1, instructions: '' }
  ]);

  const handleAddMedication = () => {
    setMedications([
      ...medications, 
      { 
        id: (medications.length + 1).toString(), 
        name: '', 
        quantity: 1, 
        instructions: '' 
      }
    ]);
  };

  const handleRemoveMedication = (id: string) => {
    if (medications.length > 1) {
      setMedications(medications.filter(med => med.id !== id));
    }
  };

  const updateMedication = (id: string, field: keyof MedicationItem, value: string | number) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!patient || !doctor || !date) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }

    if (medications.some(med => !med.name)) {
      toast({
        title: "Erreur de validation",
        description: "Veuillez spécifier tous les médicaments.",
        variant: "destructive"
      });
      return;
    }

    // Simuler l'ajout d'une nouvelle ordonnance
    toast({
      title: "Ordonnance ajoutée",
      description: `Ordonnance pour ${patient} ajoutée avec succès.`,
    });

    console.log('Nouvelle ordonnance:', { 
      patient, 
      doctor, 
      date: format(date, 'yyyy-MM-dd'),
      medications,
      status: 'pending'
    });

    onClose();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Nouvelle ordonnance</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patient">Patient</Label>
              <Input 
                id="patient" 
                value={patient} 
                onChange={(e) => setPatient(e.target.value)} 
                placeholder="Nom du patient" 
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="doctor">Médecin</Label>
              <Input 
                id="doctor" 
                value={doctor} 
                onChange={(e) => setDoctor(e.target.value)} 
                placeholder="Nom du médecin" 
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Date de l'ordonnance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP', { locale: fr }) : <span>Sélectionner une date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Médicaments</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={handleAddMedication}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un médicament
              </Button>
            </div>

            {medications.map((med, index) => (
              <div key={med.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-5 space-y-2">
                  <Label htmlFor={`med-name-${med.id}`}>Nom du médicament</Label>
                  <Input 
                    id={`med-name-${med.id}`}
                    value={med.name}
                    onChange={(e) => updateMedication(med.id, 'name', e.target.value)}
                    placeholder="Ex: Paracétamol 500mg"
                    required
                  />
                </div>
                
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor={`med-qty-${med.id}`}>Quantité</Label>
                  <Input 
                    id={`med-qty-${med.id}`}
                    type="number"
                    min="1"
                    value={med.quantity}
                    onChange={(e) => updateMedication(med.id, 'quantity', parseInt(e.target.value))}
                    required
                  />
                </div>
                
                <div className="md:col-span-4 space-y-2">
                  <Label htmlFor={`med-instr-${med.id}`}>Instructions</Label>
                  <Input 
                    id={`med-instr-${med.id}`}
                    value={med.instructions}
                    onChange={(e) => updateMedication(med.id, 'instructions', e.target.value)}
                    placeholder="Ex: 1 comprimé 3x par jour"
                  />
                </div>
                
                <div className="md:col-span-1 pt-8">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveMedication(med.id)}
                    disabled={medications.length === 1}
                  >
                    <Trash className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              Enregistrer l'ordonnance
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
