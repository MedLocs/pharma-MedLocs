
import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Database, 
  Clock, 
  CheckCircle, 
  Calendar, 
  HardDrive, 
  Download, 
  Upload, 
  Cloud, 
  AlertOctagon, 
  Save,
  History,
  FilePlus2,
  FileArchive
} from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Backup = () => {
  const { toast } = useToast();
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [restoreInProgress, setRestoreInProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCreateBackupDialog, setShowCreateBackupDialog] = useState(false);
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);

  // Données de sauvegarde
  const backups = [
    { 
      id: 1, 
      name: 'Sauvegarde complète - Quotidienne', 
      date: '2025-04-15 03:00', 
      size: '625 MB', 
      type: 'Auto',
      location: 'Cloud',
      status: 'success'
    },
    { 
      id: 2, 
      name: 'Sauvegarde complète - Hebdomadaire', 
      date: '2025-04-14 03:00', 
      size: '615 MB', 
      type: 'Auto',
      location: 'Cloud',
      status: 'success'
    },
    { 
      id: 3, 
      name: 'Sauvegarde manuelle - Avant mise à jour', 
      date: '2025-04-13 15:25', 
      size: '610 MB', 
      type: 'Manuel',
      location: 'Local',
      status: 'success'
    },
    { 
      id: 4, 
      name: 'Sauvegarde complète - Quotidienne', 
      date: '2025-04-13 03:00', 
      size: '600 MB', 
      type: 'Auto',
      location: 'Cloud',
      status: 'success'
    },
    { 
      id: 5, 
      name: 'Sauvegarde complète - Quotidienne', 
      date: '2025-04-12 03:00', 
      size: '590 MB', 
      type: 'Auto',
      location: 'Cloud',
      status: 'warning'
    },
  ];

  const backupSchedule = [
    { id: 1, frequency: 'Quotidienne', time: '03:00', type: 'Complète', retention: '7 jours', active: true },
    { id: 2, frequency: 'Hebdomadaire', time: '03:00', type: 'Complète', retention: '4 semaines', active: true },
    { id: 3, frequency: 'Mensuelle', time: '04:00', type: 'Complète', retention: '12 mois', active: true },
  ];

  const handleCreateBackup = () => {
    setBackupInProgress(true);
    setProgress(0);
    setShowCreateBackupDialog(false);
    
    // Simulation de la progression
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setBackupInProgress(false);
          
          toast({
            title: "Sauvegarde terminée",
            description: "La sauvegarde a été créée avec succès",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 500);
  };

  const handleRestore = () => {
    setRestoreInProgress(true);
    setProgress(0);
    setShowRestoreDialog(false);
    
    // Simulation de la progression
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 10;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setRestoreInProgress(false);
          
          toast({
            title: "Restauration terminée",
            description: "Les données ont été restaurées avec succès",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 700);
  };

  const handleDownloadBackup = (backupId: number) => {
    toast({
      title: "Téléchargement démarré",
      description: "La sauvegarde est en cours de téléchargement",
    });
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Sauvegarde et Restauration</h1>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setShowRestoreDialog(true)}
              disabled={backupInProgress || restoreInProgress}
            >
              <HardDrive className="mr-2 h-4 w-4" />
              Restaurer
            </Button>
            <Button 
              onClick={() => setShowCreateBackupDialog(true)}
              disabled={backupInProgress || restoreInProgress}
            >
              <Save className="mr-2 h-4 w-4" />
              Créer une sauvegarde
            </Button>
          </div>
        </div>

        {(backupInProgress || restoreInProgress) && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>{backupInProgress ? "Sauvegarde en cours..." : "Restauration en cours..."}</CardTitle>
              <CardDescription>Veuillez patienter pendant l'opération</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Progression...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Dernière sauvegarde</CardTitle>
              <CardDescription>Création: {backups[0].date}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mt-2 mb-4">
                <CheckCircle className="h-10 w-10 text-green-500 mr-3" />
                <div>
                  <p className="text-xl font-bold">Sauvegarde réussie</p>
                  <p className="text-sm text-muted-foreground">Taille: {backups[0].size}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full text-sm">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Prochaine: aujourd'hui 03:00</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Rétention: 7 jours</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Stockage de sauvegarde</CardTitle>
              <CardDescription>Espace utilisé</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Espace cloud</span>
                <span>3.2 GB / 5 GB</span>
              </div>
              <Progress value={64} className="h-2" />
              
              <div className="flex justify-between text-sm mb-1 mt-4">
                <span>Espace local</span>
                <span>1.8 GB / 10 GB</span>
              </div>
              <Progress value={18} className="h-2" />
            </CardContent>
            <CardFooter className="border-t pt-4">
              <div className="flex justify-between w-full text-sm">
                <div className="flex items-center">
                  <Cloud className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Cloud activé</span>
                </div>
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span>Local activé</span>
                </div>
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Planification</CardTitle>
              <CardDescription>Sauvegardes programmées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {backupSchedule.map((schedule) => (
                  <div key={schedule.id} className="flex justify-between items-center p-2 border rounded-md">
                    <div>
                      <p className="font-medium">{schedule.frequency}</p>
                      <p className="text-xs text-muted-foreground">{schedule.time} - {schedule.type}</p>
                    </div>
                    <Badge variant={schedule.active ? 'default' : 'secondary'}>
                      {schedule.active ? 'Actif' : 'Inactif'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Historique des sauvegardes</CardTitle>
            <CardDescription>Liste des sauvegardes disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Taille</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((backup) => (
                  <TableRow key={backup.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Database className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{backup.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{backup.date}</TableCell>
                    <TableCell>{backup.size}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <div className="flex items-center">
                          {backup.type === 'Auto' ? (
                            <Clock className="h-3 w-3 mr-1" />
                          ) : (
                            <Save className="h-3 w-3 mr-1" />
                          )}
                          {backup.type}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {backup.status === 'success' ? (
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span>Réussie</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <AlertOctagon className="h-4 w-4 text-amber-500 mr-1" />
                          <span>Partielle</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadBackup(backup.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
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
      </div>

      {/* Modal pour créer une sauvegarde */}
      <Dialog open={showCreateBackupDialog} onOpenChange={setShowCreateBackupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer une nouvelle sauvegarde</DialogTitle>
            <DialogDescription>
              Configurez les options pour la nouvelle sauvegarde.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="backup-name" className="text-sm font-medium">Nom de la sauvegarde</label>
              <Input id="backup-name" placeholder="Sauvegarde manuelle" defaultValue="Sauvegarde manuelle" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="backup-type" className="text-sm font-medium">Type de sauvegarde</label>
              <Select defaultValue="complete">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="complete">Complète</SelectItem>
                  <SelectItem value="partial">Partielle (données récentes uniquement)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="backup-location" className="text-sm font-medium">Emplacement</label>
              <Select defaultValue="both">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez un emplacement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="local">Local uniquement</SelectItem>
                  <SelectItem value="cloud">Cloud uniquement</SelectItem>
                  <SelectItem value="both">Local et Cloud</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateBackupDialog(false)}>
              Annuler
            </Button>
            <Button onClick={handleCreateBackup}>
              <FilePlus2 className="mr-2 h-4 w-4" />
              Créer la sauvegarde
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal pour restaurer une sauvegarde */}
      <Dialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Restaurer une sauvegarde</DialogTitle>
            <DialogDescription>
              Attention: Cette opération remplacera toutes les données actuelles. Assurez-vous d'avoir créé une sauvegarde récente.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="restore-backup" className="text-sm font-medium">Sélectionner une sauvegarde</label>
              <Select defaultValue="1">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez une sauvegarde" />
                </SelectTrigger>
                <SelectContent>
                  {backups.map(backup => (
                    <SelectItem key={backup.id} value={backup.id.toString()}>
                      {backup.name} ({backup.date})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Ou importez un fichier de sauvegarde</label>
              <div className="flex items-center">
                <Input type="file" className="flex-1" />
              </div>
            </div>
            
            <div className="rounded-md bg-amber-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertOctagon className="h-5 w-5 text-amber-400" aria-hidden="true" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-amber-800">Attention</h3>
                  <div className="mt-2 text-sm text-amber-700">
                    <p>
                      La restauration remplacera toutes les données actuelles et ne peut pas être annulée.
                      Assurez-vous d'avoir sauvegardé toutes les données importantes avant de continuer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRestoreDialog(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleRestore}>
              <FileArchive className="mr-2 h-4 w-4" />
              Restaurer maintenant
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Backup;
