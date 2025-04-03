
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download, CreditCard, Banknote, PieChart } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Payments = () => {
  const payments = [
    { id: 1, reference: 'PAY-2023-001', client: 'Martin Dupont', amount: 42.75, date: '03/04/2025', status: 'Payé', method: 'Carte' },
    { id: 2, reference: 'PAY-2023-002', client: 'Sophie Martin', amount: 78.50, date: '03/04/2025', status: 'Payé', method: 'Espèces' },
    { id: 3, reference: 'PAY-2023-003', client: 'Jean Durand', amount: 127.30, date: '02/04/2025', status: 'En attente', method: 'En ligne' },
    { id: 4, reference: 'PAY-2023-004', client: 'Élise Petit', amount: 56.20, date: '02/04/2025', status: 'Payé', method: 'Carte' },
    { id: 5, reference: 'PAY-2023-005', client: 'Thomas Leroy', amount: 92.15, date: '01/04/2025', status: 'Remboursé', method: 'Carte' },
    { id: 6, reference: 'PAY-2023-006', client: 'Camille Richard', amount: 45.60, date: '01/04/2025', status: 'Payé', method: 'Espèces' },
    { id: 7, reference: 'PAY-2023-007', client: 'Lucas Bernard', amount: 103.75, date: '31/03/2025', status: 'Payé', method: 'En ligne' },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des paiements</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" /> Exporter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Total du jour</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">278,95 €</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Paiements par carte</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <CreditCard className="h-6 w-6 mr-2 text-blue-500" />
              <p className="text-3xl font-bold">177,45 €</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Espèces</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center">
              <Banknote className="h-6 w-6 mr-2 text-green-500" />
              <p className="text-3xl font-bold">101,50 €</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>En attente</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-500">127,30 €</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <Tabs defaultValue="all">
              <div className="flex items-center justify-between">
                <CardTitle>Historique des paiements</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">Tous</TabsTrigger>
                  <TabsTrigger value="card">Carte</TabsTrigger>
                  <TabsTrigger value="cash">Espèces</TabsTrigger>
                  <TabsTrigger value="online">En ligne</TabsTrigger>
                </TabsList>
              </div>
              <div className="flex w-full max-w-sm items-center space-x-2 mt-4">
                <Input type="text" placeholder="Rechercher un paiement..." />
                <Button type="submit" variant="outline" size="icon">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent>
            <TabsContent value="all" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Méthode</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.method}</TableCell>
                      <TableCell>
                        <Badge variant={
                          payment.status === 'Payé' ? 'default' : 
                          payment.status === 'En attente' ? 'outline' :
                          'destructive'
                        }>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Détails</Button>
                          <Button variant="outline" size="sm">Facture</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="card" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.method === 'Carte').map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          payment.status === 'Payé' ? 'default' : 
                          payment.status === 'En attente' ? 'outline' :
                          'destructive'
                        }>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Détails</Button>
                          <Button variant="outline" size="sm">Facture</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="cash" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.method === 'Espèces').map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          payment.status === 'Payé' ? 'default' : 
                          payment.status === 'En attente' ? 'outline' :
                          'destructive'
                        }>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Détails</Button>
                          <Button variant="outline" size="sm">Facture</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="online" className="m-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Référence</TableHead>
                    <TableHead>Client</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.filter(p => p.method === 'En ligne').map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.reference}</TableCell>
                      <TableCell>{payment.client}</TableCell>
                      <TableCell>{payment.amount.toFixed(2)} €</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          payment.status === 'Payé' ? 'default' : 
                          payment.status === 'En attente' ? 'outline' :
                          'destructive'
                        }>
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Détails</Button>
                          <Button variant="outline" size="sm">Facture</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Payments;
