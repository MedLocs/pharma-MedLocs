
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface SupplierFormProps {
  supplier?: {
    id?: number;
    name: string;
    contact: string;
    email: string;
    phone: string;
    address: string;
    category: string;
    paymentTerms?: string;
    notes?: string;
  };
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  contact: z.string().min(2, {
    message: "Le nom du contact doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "L'adresse email doit être valide",
  }),
  phone: z.string().min(5, {
    message: "Le numéro de téléphone doit être valide",
  }),
  address: z.string().min(5, {
    message: "L'adresse doit être valide",
  }),
  category: z.string({
    required_error: "Veuillez sélectionner une catégorie",
  }),
  paymentTerms: z.string().optional(),
  notes: z.string().optional(),
});

export function SupplierForm({ supplier, onClose }: SupplierFormProps) {
  const { toast } = useToast();
  const isEditing = !!supplier?.id;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: supplier?.name || "",
      contact: supplier?.contact || "",
      email: supplier?.email || "",
      phone: supplier?.phone || "",
      address: supplier?.address || "",
      category: supplier?.category || "",
      paymentTerms: supplier?.paymentTerms || "",
      notes: supplier?.notes || "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    
    toast({
      title: isEditing ? "Fournisseur modifié" : "Fournisseur ajouté",
      description: `${values.name} a été ${isEditing ? 'modifié' : 'ajouté'} avec succès.`,
    });
    
    onClose();
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Modifier le fournisseur" : "Ajouter un nouveau fournisseur"}</DialogTitle>
        <DialogDescription>
          {isEditing 
            ? "Mettez à jour les informations du fournisseur ci-dessous."
            : "Remplissez les informations pour ajouter un nouveau fournisseur."
          }
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom du fournisseur</FormLabel>
                  <FormControl>
                    <Input placeholder="Pharma Express" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catégorie</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Médicaments">Médicaments</SelectItem>
                      <SelectItem value="Parapharmacie">Parapharmacie</SelectItem>
                      <SelectItem value="Équipement">Équipement</SelectItem>
                      <SelectItem value="Logistique">Logistique</SelectItem>
                      <SelectItem value="Laboratoire">Laboratoire</SelectItem>
                      <SelectItem value="Autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="contact"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personne à contacter</FormLabel>
                  <FormControl>
                    <Input placeholder="Jean Dupont" {...field} />
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
                    <Input type="email" placeholder="contact@fournisseur.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

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
              name="paymentTerms"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conditions de paiement</FormLabel>
                  <FormControl>
                    <Input placeholder="30 jours fin de mois" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adresse</FormLabel>
                <FormControl>
                  <Input placeholder="15 Rue de la Pharmacie, 75001 Paris" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Informations supplémentaires sur ce fournisseur..." 
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
              {isEditing ? "Mettre à jour" : "Ajouter le fournisseur"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}
