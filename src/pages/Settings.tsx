
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Building, User, Bell, Lock, Clock, Smartphone, CreditCard, Globe, Upload, Save
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Settings = () => {
  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Paramètres</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            <TabsTrigger value="profile" className="flex gap-2 items-center">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="pharmacy" className="flex gap-2 items-center">
              <Building className="h-4 w-4" />
              <span className="hidden md:inline">Pharmacie</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden md:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex gap-2 items-center">
              <Lock className="h-4 w-4" />
              <span className="hidden md:inline">Sécurité</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex gap-2 items-center">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Facturation</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Informations du profil</CardTitle>
                <CardDescription>
                  Gérez vos informations personnelles et vos préférences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-8">
                  <div className="flex flex-col items-center gap-1.5">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="" alt="Photo de profil" />
                      <AvatarFallback>PH</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Changer
                    </Button>
                  </div>
                  <div className="grid flex-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Prénom</Label>
                      <Input id="first-name" placeholder="Jean" defaultValue="Jean" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nom</Label>
                      <Input id="last-name" placeholder="Dupont" defaultValue="Dupont" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adresse e-mail</Label>
                      <Input id="email" type="email" placeholder="jean.dupont@example.com" defaultValue="jean.dupont@pharmacy.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numéro de téléphone</Label>
                      <Input id="phone" type="tel" placeholder="06 12 34 56 78" defaultValue="06 12 34 56 78" />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="bio">Biographie</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Quelques mots à propos de vous..." 
                    defaultValue="Pharmacien depuis 15 ans, spécialisé en phytothérapie et pharmacie clinique."
                  />
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="pharmacy">
            <Card>
              <CardHeader>
                <CardTitle>Informations de la pharmacie</CardTitle>
                <CardDescription>
                  Gérez les informations de votre établissement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-name">Nom de la pharmacie</Label>
                    <Input id="pharmacy-name" placeholder="Pharmacie Centrale" defaultValue="PharmaNexus" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-number">Numéro RPPS</Label>
                    <Input id="pharmacy-number" placeholder="12345678" defaultValue="20231234" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-address">Adresse</Label>
                    <Input id="pharmacy-address" placeholder="123 rue Exemple" defaultValue="45 Avenue des Pharmaciens" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-city">Ville</Label>
                    <Input id="pharmacy-city" placeholder="Paris" defaultValue="Lyon" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-zip">Code postal</Label>
                    <Input id="pharmacy-zip" placeholder="75000" defaultValue="69002" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pharmacy-country">Pays</Label>
                    <Select defaultValue="france">
                      <SelectTrigger id="pharmacy-country">
                        <SelectValue placeholder="Sélectionner un pays" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="belgium">Belgique</SelectItem>
                        <SelectItem value="switzerland">Suisse</SelectItem>
                        <SelectItem value="luxembourg">Luxembourg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Horaires d'ouverture</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="open-monday">Lundi</Label>
                      <div className="flex gap-2">
                        <Input id="open-monday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-monday" placeholder="19:00" defaultValue="19:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="open-tuesday">Mardi</Label>
                      <div className="flex gap-2">
                        <Input id="open-tuesday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-tuesday" placeholder="19:00" defaultValue="19:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="open-wednesday">Mercredi</Label>
                      <div className="flex gap-2">
                        <Input id="open-wednesday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-wednesday" placeholder="19:00" defaultValue="19:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="open-thursday">Jeudi</Label>
                      <div className="flex gap-2">
                        <Input id="open-thursday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-thursday" placeholder="19:00" defaultValue="19:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="open-friday">Vendredi</Label>
                      <div className="flex gap-2">
                        <Input id="open-friday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-friday" placeholder="19:00" defaultValue="19:00" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="open-saturday">Samedi</Label>
                      <div className="flex gap-2">
                        <Input id="open-saturday" placeholder="09:00" defaultValue="09:00" />
                        <span className="flex items-center">-</span>
                        <Input id="close-saturday" placeholder="13:00" defaultValue="13:00" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les modifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Paramètres de notification</CardTitle>
                <CardDescription>
                  Configurez comment et quand vous recevez des notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications par e-mail</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Nouvelles ordonnances</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez un e-mail quand une nouvelle ordonnance est reçue
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Alertes de stock</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez un e-mail quand un produit est en rupture de stock
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Récapitulatif quotidien</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez un récapitulatif quotidien des activités
                        </p>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications push</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Nouveaux messages</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez une notification quand un client vous envoie un message
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Commandes préparées</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez une notification quand une commande est prête
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Rappels de tâches</Label>
                        <p className="text-sm text-muted-foreground">
                          Recevez des rappels pour les tâches programmées
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer les préférences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Sécurité du compte</CardTitle>
                <CardDescription>
                  Gérez les paramètres de sécurité de votre compte
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Modifier le mot de passe</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Mot de passe actuel</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="md:col-span-2">
                      <Separator />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">Nouveau mot de passe</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button>Mettre à jour le mot de passe</Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Authentification à deux facteurs</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Activer l'authentification à deux facteurs</Label>
                      <p className="text-sm text-muted-foreground">
                        Protégez votre compte avec un second niveau de sécurité
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sessions actives</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">iPhone 13 - Paris, France</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Dernière activité: il y a 5 minutes
                        </p>
                      </div>
                      <Badge>Actuel</Badge>
                    </div>
                    <div className="flex items-center justify-between border p-4 rounded-md">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <Globe className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">Chrome - Windows</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Dernière activité: il y a 2 jours
                        </p>
                      </div>
                      <Button variant="outline" size="sm">Déconnecter</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="billing">
            <Card>
              <CardHeader>
                <CardTitle>Facturation et abonnement</CardTitle>
                <CardDescription>
                  Gérez vos informations de paiement et votre abonnement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Plan actuel</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-xl">Plan Premium</p>
                        <p className="text-sm text-muted-foreground">
                          49,99 € / mois
                        </p>
                        <ul className="mt-3 space-y-1 text-sm">
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4 text-green-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Gestion illimitée des ordonnances
                          </li>
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4 text-green-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Rapports analytiques avancés
                          </li>
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4 text-green-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Support prioritaire
                          </li>
                          <li className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="h-4 w-4 text-green-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Personnalisation complète
                          </li>
                        </ul>
                      </div>
                      <Badge variant="secondary">Actuel</Badge>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline">Changer de plan</Button>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Historique de paiement</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted">
                          <th className="text-left p-2 font-medium">Date</th>
                          <th className="text-left p-2 font-medium">Montant</th>
                          <th className="text-left p-2 font-medium">Statut</th>
                          <th className="text-left p-2 font-medium">Facture</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t">
                          <td className="p-2">01/04/2025</td>
                          <td className="p-2">49,99 €</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                              Payé
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">Télécharger</Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">01/03/2025</td>
                          <td className="p-2">49,99 €</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                              Payé
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">Télécharger</Button>
                          </td>
                        </tr>
                        <tr className="border-t">
                          <td className="p-2">01/02/2025</td>
                          <td className="p-2">49,99 €</td>
                          <td className="p-2">
                            <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800">
                              Payé
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button variant="ghost" size="sm">Télécharger</Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Méthodes de paiement</h3>
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">Visa se terminant par 4242</p>
                          <p className="text-sm text-muted-foreground">Expire le 09/2026</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Modifier</Button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Ajouter une nouvelle méthode
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
