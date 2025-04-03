
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Mail, Phone, FileText, Calendar, Clock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Customers = () => {
  const customers = [
    { 
      id: 1, 
      name: 'Anne Dupont', 
      email: 'anne.dupont@example.com', 
      phone: '06 12 34 56 78', 
      lastVisit: '03/04/2025',
      status: 'active',
      prescriptions: 12,
      totalSpent: 458.75,
      avatar: 'AD'
    },
    { 
      id: 2, 
      name: 'Thomas Martin', 
      email: 'thomas.martin@example.com', 
      phone: '06 23 45 67 89', 
      lastVisit: '01/04/2025',
      status: 'active',
      prescriptions: 5,
      totalSpent: 237.20,
      avatar: 'TM'
    },
    { 
      id: 3, 
      name: 'Sophie Petit', 
      email: 'sophie.petit@example.com', 
      phone: '06 34 56 78 90', 
      lastVisit: '28/03/2025',
      status: 'inactive',
      prescriptions: 3,
      totalSpent: 152.30,
      avatar: 'SP'
    },
    { 
      id: 4, 
      name: 'Michel Durand', 
      email: 'michel.durand@example.com', 
      phone: '06 45 67 89 01', 
      lastVisit: '25/03/2025',
      status: 'active',
      prescriptions: 8,
      totalSpent: 321.45,
      avatar: 'MD'
    },
    { 
      id: 5, 
      name: 'Julie Leroy', 
      email: 'julie.leroy@example.com', 
      phone: '06 56 78 90 12', 
      lastVisit: '22/03/2025',
      status: 'active',
      prescriptions: 4,
      totalSpent: 178.60,
      avatar: 'JL'
    },
    { 
      id: 6, 
      name: 'Nicolas Bernard', 
      email: 'nicolas.bernard@example.com', 
      phone: '06 67 89 01 23', 
      lastVisit: '18/03/2025',
      status: 'inactive',
      prescriptions: 2,
      totalSpent: 87.95,
      avatar: 'NB'
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des clients</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un client
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-primary" />
                Clients actifs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">548</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Ordonnances actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">76</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-amber-500" />
                Visites cette semaine
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">124</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des clients</CardTitle>
            <div className="flex items-center space-x-2 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="text" placeholder="Rechercher un client..." className="pl-8" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline">Exporter</Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="active">Actifs</TabsTrigger>
                <TabsTrigger value="inactive">Inactifs</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="" alt={customer.name} />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.prescriptions}</TableCell>
                        <TableCell>{customer.lastVisit}</TableCell>
                        <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                        <TableCell>
                          <Badge variant={customer.status === 'active' ? 'default' : 'outline'}>
                            {customer.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Profil</Button>
                            <Button variant="outline" size="sm">Historique</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="active">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.filter(c => c.status === 'active').map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="" alt={customer.name} />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.prescriptions}</TableCell>
                        <TableCell>{customer.lastVisit}</TableCell>
                        <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Profil</Button>
                            <Button variant="outline" size="sm">Historique</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="inactive">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Ordonnances</TableHead>
                      <TableHead>Dernière visite</TableHead>
                      <TableHead>Total dépensé</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customers.filter(c => c.status === 'inactive').map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src="" alt={customer.name} />
                              <AvatarFallback>{customer.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{customer.name}</p>
                              <p className="text-sm text-muted-foreground">ID: #{customer.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.email}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                              <span className="text-sm">{customer.phone}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{customer.prescriptions}</TableCell>
                        <TableCell>{customer.lastVisit}</TableCell>
                        <TableCell>{customer.totalSpent.toFixed(2)} €</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Profil</Button>
                            <Button variant="outline" size="sm">Historique</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Customers;
