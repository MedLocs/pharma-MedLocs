
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  FileWarning, 
  Users, 
  User, 
  RefreshCw, 
  LogOut, 
  EyeOff, 
  Clock,
  ShieldAlert,
  CheckCircle,
  History,
  UserPlus,
  Fingerprint
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Security = () => {
  const { toast } = useToast();
  const [totpEnabled, setTotpEnabled] = useState(false);
  const [passwordExpirationEnabled, setPasswordExpirationEnabled] = useState(true);
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [offlineAccessEnabled, setOfflineAccessEnabled] = useState(true);
  const [anonymizedDataEnabled, setAnonymizedDataEnabled] = useState(false);

  // Exemple de données d'activité
  const securityLogs = [
    { 
      id: 1, 
      date: '2025-04-15 10:32', 
      user: 'Sophie Laurent', 
      action: 'Connexion réussie', 
      location: 'Paris, France', 
      ip: '192.168.1.105',
      device: 'MacBook Pro / Chrome'
    },
    { 
      id: 2, 
      date: '2025-04-15 08:15', 
      user: 'Thomas Bernard', 
      action: 'Modification de mot de passe', 
      location: 'Lyon, France', 
      ip: '192.168.1.110',
      device: 'Windows PC / Firefox'
    },
    { 
      id: 3, 
      date: '2025-04-14 17:45', 
      user: 'Julie Moreau', 
      action: 'Tentative de connexion échouée', 
      location: 'Marseille, France', 
      ip: '145.87.22.56',
      device: 'iPhone / Safari'
    },
    { 
      id: 4, 
      date: '2025-04-14 14:30', 
      user: 'Marc Dupuis', 
      action: 'Accès aux données de paiement', 
      location: 'Bordeaux, France', 
      ip: '192.168.1.115',
      device: 'Windows PC / Edge'
    },
    { 
      id: 5, 
      date: '2025-04-14 09:20', 
      user: 'Émilie Blanc', 
      action: 'Export des données clients', 
      location: 'Lille, France', 
      ip: '78.92.145.67',
      device: 'Android / Chrome'
    },
  ];

  // Liste des utilisateurs
  const users = [
    { 
      id: 1, 
      name: 'Sophie Laurent', 
      email: 'sophie.laurent@medlocs.fr', 
      role: 'Administrateur', 
      lastActive: '2025-04-15 10:32',
      status: 'active',
      twoFactorEnabled: true
    },
    { 
      id: 2, 
      name: 'Thomas Bernard', 
      email: 'thomas.bernard@medlocs.fr', 
      role: 'Gestionnaire', 
      lastActive: '2025-04-15 08:15',
      status: 'active',
      twoFactorEnabled: true
    },
    { 
      id: 3, 
      name: 'Julie Moreau', 
      email: 'julie.moreau@medlocs.fr', 
      role: 'Pharmacien', 
      lastActive: '2025-04-14 17:45',
      status: 'locked',
      twoFactorEnabled: false
    },
    { 
      id: 4, 
      name: 'Marc Dupuis', 
      email: 'marc.dupuis@medlocs.fr', 
      role: 'Comptable', 
      lastActive: '2025-04-14 14:30',
      status: 'active',
      twoFactorEnabled: false
    },
    { 
      id: 5, 
      name: 'Émilie Blanc', 
      email: 'emilie.blanc@medlocs.fr', 
      role: 'Pharmacien', 
      lastActive: '2025-04-14 09:20',
      status: 'inactive',
      twoFactorEnabled: false
    },
  ];

  const handleGenerateReport = () => {
    toast({
      title: "Rapport de sécurité généré",
      description: "Le rapport a été créé et peut être téléchargé.",
    });
  };

  const handleSaveSettings = () => {
    toast({
      title: "Paramètres de sécurité enregistrés",
      description: "Les nouveaux paramètres ont été appliqués avec succès.",
    });
  };

  const handleLogoutAllSessions = () => {
    toast({
      title: "Déconnexion de toutes les sessions",
      description: "Toutes les sessions ont été déconnectées avec succès.",
    });
  };

  const handlePasswordReset = (userId: number) => {
    toast({
      title: "Email de réinitialisation envoyé",
      description: "Un lien de réinitialisation a été envoyé à l'utilisateur.",
    });
  };

  const handleUnlockAccount = (userId: number) => {
    toast({
      title: "Compte déverrouillé",
      description: "Le compte utilisateur a été déverrouillé avec succès.",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sécurité</h1>
          <Button onClick={handleGenerateReport}>
            <FileWarning className="mr-2 h-4 w-4" />
            Générer un rapport de sécurité
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Score de sécurité</CardTitle>
              <CardDescription>Niveau de protection global</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm font-medium">
                  <span>Score global</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
                
                <div className="mt-4 p-3 bg-green-50 rounded-md">
                  <div className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Sécurité optimale</p>
                      <p className="text-xs text-green-700 mt-1">
                        Votre système est bien protégé. Activez l'authentification à deux facteurs pour tous les utilisateurs afin d'atteindre un score parfait.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Authentification</CardTitle>
              <CardDescription>Paramètres d'accès</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="totp">Authentification à deux facteurs</Label>
                  </div>
                  <Switch
                    id="totp"
                    checked={totpEnabled}
                    onCheckedChange={setTotpEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="password-expiration">Expiration des mots de passe</Label>
                  </div>
                  <Switch
                    id="password-expiration"
                    checked={passwordExpirationEnabled}
                    onCheckedChange={setPasswordExpirationEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="auto-lock">Verrouillage automatique</Label>
                  </div>
                  <Switch
                    id="auto-lock"
                    checked={autoLockEnabled}
                    onCheckedChange={setAutoLockEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Protection des données</CardTitle>
              <CardDescription>Confidentialité & chiffrement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="offline-access">Accès hors ligne</Label>
                  </div>
                  <Switch
                    id="offline-access"
                    checked={offlineAccessEnabled}
                    onCheckedChange={setOfflineAccessEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="anonymized-data">Anonymisation des données</Label>
                  </div>
                  <Switch
                    id="anonymized-data"
                    checked={anonymizedDataEnabled}
                    onCheckedChange={setAnonymizedDataEnabled}
                  />
                </div>

                <div className="mt-4">
                  <Button onClick={handleSaveSettings} className="w-full">
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Enregistrer les paramètres
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users">
          <TabsList className="mb-4">
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="activity">Journal d'activité</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Gestion des utilisateurs</CardTitle>
                    <CardDescription>Gérez les accès et les permissions des utilisateurs</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleLogoutAllSessions}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnecter toutes les sessions
                    </Button>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Nouvel utilisateur
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Rôle</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Dernière activité</TableHead>
                      <TableHead>2FA</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span className="font-medium">{user.name}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          {user.status === 'active' ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Actif</Badge>
                          ) : user.status === 'locked' ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Verrouillé</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactif</Badge>
                          )}
                        </TableCell>
                        <TableCell>{user.lastActive}</TableCell>
                        <TableCell>
                          {user.twoFactorEnabled ? (
                            <div className="flex items-center">
                              <ShieldCheck className="h-4 w-4 text-green-500 mr-1" />
                              <span>Activé</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <ShieldAlert className="h-4 w-4 text-amber-500 mr-1" />
                              <span>Désactivé</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handlePasswordReset(user.id)}
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                            {user.status === 'locked' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleUnlockAccount(user.id)}
                              >
                                <Lock className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <History className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Journal d'activité</CardTitle>
                    <CardDescription>Historique des actions et des connexions</CardDescription>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="filter-user">Filtrer par utilisateur</Label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Tous les utilisateurs" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Tous les utilisateurs</SelectItem>
                          {users.map(user => (
                            <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button variant="outline">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Actualiser
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Utilisateur</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Localisation</TableHead>
                      <TableHead>Appareil</TableHead>
                      <TableHead>IP</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {securityLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{log.user}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {log.action.includes('échouée') ? (
                            <span className="text-red-500">{log.action}</span>
                          ) : (
                            log.action
                          )}
                        </TableCell>
                        <TableCell>{log.location}</TableCell>
                        <TableCell>{log.device}</TableCell>
                        <TableCell className="font-mono text-sm">{log.ip}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Security;
