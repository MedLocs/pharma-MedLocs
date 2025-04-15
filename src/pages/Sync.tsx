
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  RefreshCw, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Upload, 
  Download, 
  CloudOff,
  Database,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { SyncStatus } from '@/features/inventory/types';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Sync = () => {
  const { toast } = useToast();
  const [syncInProgress, setSyncInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>({
    lastSync: new Date(Date.now() - 3600000), // Simule une heure plus tôt
    pendingUploads: 23,
    pendingDownloads: 15,
    status: 'synced'
  });

  const syncHistory = [
    { 
      id: 1, 
      date: '2025-04-15 10:30', 
      type: 'Complète', 
      status: 'success', 
      duration: '3m 25s',
      details: 'Synchronisation réussie - 342 produits, 15 fournisseurs, 8 pharmacies'
    },
    { 
      id: 2, 
      date: '2025-04-14 18:45', 
      type: 'Complète', 
      status: 'error', 
      duration: '2m 12s',
      details: 'Erreur de connexion avec Pharmacie Maritime - Opération annulée'
    },
    { 
      id: 3, 
      date: '2025-04-14 12:15', 
      type: 'Partielle', 
      status: 'success', 
      duration: '1m 45s',
      details: 'Mise à jour des stocks uniquement - 127 produits modifiés'
    },
    { 
      id: 4, 
      date: '2025-04-13 09:30', 
      type: 'Complète', 
      status: 'success', 
      duration: '3m 12s',
      details: 'Synchronisation réussie - 338 produits, 15 fournisseurs, 8 pharmacies'
    },
    { 
      id: 5, 
      date: '2025-04-12 19:45', 
      type: 'Partielle', 
      status: 'warning', 
      duration: '2m 30s',
      details: 'Synchronisation partielle - 3 pharmacies hors ligne'
    },
  ];

  const connectedDevices = [
    {
      id: 1,
      name: 'Terminal Central',
      type: 'PC',
      lastActive: '2025-04-15 11:25',
      status: 'online',
      ip: '192.168.1.105'
    },
    {
      id: 2,
      name: 'Tablette Pharmacie Centrale',
      type: 'Tablette',
      lastActive: '2025-04-15 11:20',
      status: 'online',
      ip: '192.168.1.110'
    },
    {
      id: 3,
      name: 'Smartphone Gérant',
      type: 'Mobile',
      lastActive: '2025-04-15 10:45',
      status: 'online',
      ip: '192.168.1.115'
    },
    {
      id: 4,
      name: 'Terminal Pharmacie du Parc',
      type: 'PC',
      lastActive: '2025-04-15 09:30',
      status: 'offline',
      ip: '145.87.32.221'
    },
    {
      id: 5,
      name: 'Tablette Maritime',
      type: 'Tablette',
      lastActive: '2025-04-14 18:40',
      status: 'offline',
      ip: '78.92.145.67'
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (syncInProgress) {
      interval = setInterval(() => {
        setProgress(oldProgress => {
          const newProgress = oldProgress + 10;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setSyncInProgress(false);
            setSyncStatus({
              lastSync: new Date(),
              pendingUploads: 0,
              pendingDownloads: 0,
              status: 'synced'
            });
            
            toast({
              title: "Synchronisation terminée",
              description: "Toutes les données ont été synchronisées avec succès",
            });
            
            return 100;
          }
          
          return newProgress;
        });
      }, 500);
    }
    
    return () => clearInterval(interval);
  }, [syncInProgress, toast]);

  const handleStartSync = () => {
    setSyncInProgress(true);
    setProgress(0);
    
    toast({
      title: "Synchronisation lancée",
      description: "La synchronisation des données est en cours...",
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return `il y a ${diffInSeconds} secondes`;
    }
    
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `il y a ${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''}`;
    }
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `il y a ${diffInHours} heure${diffInHours > 1 ? 's' : ''}`;
    }
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Synchronisation</h1>
          <Button 
            onClick={handleStartSync} 
            disabled={syncInProgress}
            className="flex items-center"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${syncInProgress ? 'animate-spin' : ''}`} />
            {syncInProgress ? "Synchronisation en cours..." : "Synchroniser maintenant"}
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="col-span-3 md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle>État de la synchronisation</CardTitle>
              <CardDescription>
                Dernière synchronisation: {formatTimeAgo(syncStatus.lastSync)}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {syncInProgress ? (
                <>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progression...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </>
              ) : (
                <div className="flex items-center justify-center mt-4">
                  {syncStatus.status === 'synced' ? (
                    <div className="text-center">
                      <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                      <p className="font-medium">Synchronisé</p>
                      <p className="text-sm text-muted-foreground">Toutes les données sont à jour</p>
                    </div>
                  ) : syncStatus.status === 'error' ? (
                    <div className="text-center">
                      <XCircle className="h-12 w-12 text-destructive mx-auto mb-2" />
                      <p className="font-medium">Erreur de synchronisation</p>
                      <p className="text-sm text-muted-foreground">Vérifiez votre connexion réseau</p>
                    </div>
                  ) : syncStatus.status === 'offline' ? (
                    <div className="text-center">
                      <CloudOff className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="font-medium">Mode hors-ligne</p>
                      <p className="text-sm text-muted-foreground">Les données seront synchronisées lorsque vous serez en ligne</p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Clock className="h-12 w-12 text-amber-500 mx-auto mb-2" />
                      <p className="font-medium">Synchronisation requise</p>
                      <p className="text-sm text-muted-foreground">Des modifications sont en attente</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <div className="flex items-center">
                <Upload className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">En attente d'envoi: {syncStatus.pendingUploads}</span>
              </div>
              <div className="flex items-center">
                <Download className="h-4 w-4 mr-1 text-muted-foreground" />
                <span className="text-sm">À recevoir: {syncStatus.pendingDownloads}</span>
              </div>
            </CardFooter>
          </Card>

          <Card className="col-span-3 md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle>Paramètres de synchronisation</CardTitle>
              <CardDescription>Configuration et options de synchronisation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <RefreshCw className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Synchronisation automatique</p>
                      <p className="text-sm text-muted-foreground">Toutes les 2 heures</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100">Activée</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <WifiOff className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Mode hors-ligne</p>
                      <p className="text-sm text-muted-foreground">Permet de travailler sans connexion</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100">Activé</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Stockage local</p>
                      <p className="text-sm text-muted-foreground">512 MB utilisés sur 1 GB</p>
                    </div>
                  </div>
                  <Progress value={51} className="w-20 h-2" />
                </div>
                
                <div className="flex justify-between items-center p-3 border rounded-md">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 mr-2 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Chiffrement des données</p>
                      <p className="text-sm text-muted-foreground">Sécurité renforcée</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-green-100">Activé</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="history">Historique des synchronisations</TabsTrigger>
            <TabsTrigger value="devices">Appareils connectés</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Historique de synchronisation</CardTitle>
                <CardDescription>Journal des opérations de synchronisation récentes</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date et heure</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Durée</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Détails</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {syncHistory.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{entry.type}</Badge>
                        </TableCell>
                        <TableCell>{entry.duration}</TableCell>
                        <TableCell>
                          {entry.status === 'success' ? (
                            <div className="flex items-center">
                              <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                              <span>Réussie</span>
                            </div>
                          ) : entry.status === 'error' ? (
                            <div className="flex items-center">
                              <XCircle className="h-4 w-4 text-destructive mr-1" />
                              <span>Échec</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <AlertCircle className="h-4 w-4 text-amber-500 mr-1" />
                              <span>Partielle</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md break-words">
                          {entry.details}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices">
            <Card>
              <CardHeader>
                <CardTitle>Appareils connectés</CardTitle>
                <CardDescription>Appareils synchronisés avec l'application</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de l'appareil</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Adresse IP</TableHead>
                      <TableHead>Dernière activité</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {connectedDevices.map((device) => (
                      <TableRow key={device.id}>
                        <TableCell className="font-medium">{device.name}</TableCell>
                        <TableCell>{device.type}</TableCell>
                        <TableCell>{device.ip}</TableCell>
                        <TableCell>{device.lastActive}</TableCell>
                        <TableCell>
                          {device.status === 'online' ? (
                            <div className="flex items-center">
                              <Wifi className="h-4 w-4 text-green-500 mr-1" />
                              <span>En ligne</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <WifiOff className="h-4 w-4 text-muted-foreground mr-1" />
                              <span>Hors ligne</span>
                            </div>
                          )}
                        </TableCell>
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

export default Sync;
