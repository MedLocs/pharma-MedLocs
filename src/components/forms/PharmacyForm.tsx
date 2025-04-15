
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface PharmacyFormProps {
  pharmacy?: {
    id?: number;
    name: string;
    address: string;
    phone: string;
    email: string;
    manager: string;
    openingHours: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit être valide",
  }),
  phone: z.string().min(5, {
    message: "Le numéro de téléphone doit être valide",
  }),
  email: z.string().email({
    message: "L'adresse email doit être valide",
  }),
  manager: z.string().min(2, {
    message: "Le nom du gérant doit contenir au moins 2 caractères",
  }),
  openingHours: z.string().min(2, {
    message: "Les horaires d'ouverture doivent être spécifiés",
  }),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
  notes: z.string().optional(),
});

export function PharmacyForm({ pharmacy, onClose }: PharmacyFormProps) {
  const { toast } = useToast();
  const isEditing = !!pharmacy?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: pharmacy?.name || "",
      address: pharmacy?.address || "",
      phone: pharmacy?.phone || "",
      email: pharmacy?.email || "",
      manager: pharmacy?.manager || "",
      openingHours: pharmacy?.openingHours || "",
      latitude: pharmacy?.coordinates?.lat?.toString() || "",
      longitude: pharmacy?.coordinates?.lng?.toString() || "",
      notes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: isEditing ? "Pharmacie modifiée" : "Pharmacie ajoutée",
      description: `${values.name} a été ${isEditing ? 'modifiée' : 'ajoutée'} avec succès.`,
    });
    
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Modifier la pharmacie" : "Ajouter une nouvelle pharmacie"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Mettez à jour les informations de la pharmacie ci-dessous."
            : "Remplissez les informations pour ajouter une nouvelle pharmacie au réseau."
          }
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de la pharmacie</FormLabel>
                <FormControl>
                  <Input placeholder="Pharmacie Centrale" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="10 Rue de la République, 75001 Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input placeholder="+33 1 23 45 67 89" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="contact@pharmacie.fr" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="manager"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gérant / Responsable</FormLabel>
                  <FormControl>
                    <Input placeholder="Sophie Laurent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="openingHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horaires d'ouverture</FormLabel>
                  <FormControl>
                    <Input placeholder="Lun-Sam: 8h30-19h30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="48.8566" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude (optionnel)</FormLabel>
                  <FormControl>
                    <Input placeholder="2.3522" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (optionnel)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informations supplémentaires sur cette pharmacie..." 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">
              {isEditing ? "Mettre à jour" : "Ajouter la pharmacie"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
