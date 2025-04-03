
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, BarChart as BarChartIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Analytics = () => {
  // Données factices pour les graphiques
  const salesData = [
    { name: 'Jan', ventes: 4000, prescriptions: 2400 },
    { name: 'Fév', ventes: 3000, prescriptions: 1398 },
    { name: 'Mar', ventes: 5000, prescriptions: 3800 },
    { name: 'Avr', ventes: 2780, prescriptions: 2908 },
    { name: 'Mai', ventes: 1890, prescriptions: 2800 },
    { name: 'Jun', ventes: 2390, prescriptions: 3300 },
    { name: 'Jul', ventes: 3490, prescriptions: 2300 },
    { name: 'Aoû', ventes: 2000, prescriptions: 1500 },
    { name: 'Sep', ventes: 2500, prescriptions: 1700 },
    { name: 'Oct', ventes: 3200, prescriptions: 2100 },
    { name: 'Nov', ventes: 4000, prescriptions: 2400 },
    { name: 'Déc', ventes: 4500, prescriptions: 3100 },
  ];

  const dailySales = [
    { name: 'Lun', ventes: 1200 },
    { name: 'Mar', ventes: 1500 },
    { name: 'Mer', ventes: 1800 },
    { name: 'Jeu', ventes: 1600 },
    { name: 'Ven', ventes: 2000 },
    { name: 'Sam', ventes: 1400 },
    { name: 'Dim', ventes: 800 },
  ];

  const categoryData = [
    { name: 'Médicaments', value: 55 },
    { name: 'Para-pharmacie', value: 20 },
    { name: 'Cosmétiques', value: 15 },
    { name: 'Autres', value: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Analytiques</h1>
          <div className="flex gap-4">
            <Select defaultValue="month">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="mr-2 h-4 w-4" /> Exporter
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Ventes Totales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">24,589 €</p>
                  <p className="text-xs text-muted-foreground">+12% depuis le mois dernier</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total des commandes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">942</p>
                  <p className="text-xs text-muted-foreground">+8% depuis le mois dernier</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Nouveaux clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">78</p>
                  <p className="text-xs text-muted-foreground">+15% depuis le mois dernier</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Panier moyen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">26,10 €</p>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <p className="text-xs text-green-500">+4% depuis le mois dernier</p>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                  <BarChartIcon className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales">
          <TabsList className="mb-4">
            <TabsTrigger value="sales">Ventes</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="customers">Clients</TabsTrigger>
          </TabsList>
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Ventes mensuelles</CardTitle>
                <CardDescription>Comparaison des ventes totales et prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={500}
                      height={300}
                      data={salesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ventes" fill="#8884d8" name="Ventes (€)" />
                      <Bar dataKey="prescriptions" fill="#82ca9d" name="Prescriptions (€)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes quotidiennes</CardTitle>
                  <CardDescription>Derniers 7 jours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        width={500}
                        height={300}
                        data={dailySales}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="ventes" stroke="#8884d8" activeDot={{ r: 8 }} name="Ventes (€)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Ventes par catégorie</CardTitle>
                  <CardDescription>Répartition des ventes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle>Performance des produits</CardTitle>
                <CardDescription>Analyse des produits les plus vendus</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12">Contenu des analyses produits à venir</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Analyse des clients</CardTitle>
                <CardDescription>Comportement et tendances des clients</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-12">Contenu des analyses clients à venir</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
