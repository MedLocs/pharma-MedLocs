
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Calendar, Percent, Tag, Users, Edit, Trash } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const Promotions = () => {
  const activePromos = [
    { 
      id: 1, 
      name: 'Soldes de printemps', 
      discount: '15%', 
      startDate: '01/04/2025', 
      endDate: '15/04/2025',
      products: 24,
      sales: 42,
      progress: 35
    },
    { 
      id: 2, 
      name: 'Vitamines & Minéraux', 
      discount: '10%', 
      startDate: '25/03/2025', 
      endDate: '10/04/2025',
      products: 12,
      sales: 28,
      progress: 65
    },
    { 
      id: 3, 
      name: 'Produits para-pharmaceutiques', 
      discount: '20%', 
      startDate: '01/04/2025', 
      endDate: '30/04/2025',
      products: 18,
      sales: 15,
      progress: 15
    },
  ];

  const upcomingPromos = [
    { 
      id: 4, 
      name: 'Soins de la peau', 
      discount: '25%', 
      startDate: '20/04/2025', 
      endDate: '05/05/2025',
      products: 15
    },
    { 
      id: 5, 
      name: 'Offre fidélité', 
      discount: '5%', 
      startDate: '01/05/2025', 
      endDate: '31/05/2025',
      products: 'Tous'
    },
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Gestion des promotions</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Créer une promotion
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Tag className="mr-2 h-5 w-5 text-primary" />
                Promotions actives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{activePromos.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-amber-500" />
                Promotions à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{upcomingPromos.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Portée des promotions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1245 clients</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Promotions actives</CardTitle>
            <CardDescription>Promotions actuellement en cours dans votre pharmacie</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activePromos.map((promo) => (
                <Card key={promo.id} className="border-2 border-primary/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 text-primary">En cours</Badge>
                      <Percent className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="mt-2">{promo.name}</CardTitle>
                    <CardDescription>
                      {promo.startDate} - {promo.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Réduction</span>
                        <span className="text-xl font-bold">{promo.discount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Produits inclus</span>
                        <span>{promo.products}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Ventes générées</span>
                        <span>{promo.sales}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progression</span>
                          <span>{promo.progress}%</span>
                        </div>
                        <Progress value={promo.progress} />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                      <Trash className="h-4 w-4 mr-2" />
                      Arrêter
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Promotions à venir</CardTitle>
            <CardDescription>Promotions planifiées pour les prochains jours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingPromos.map((promo) => (
                <Card key={promo.id} className="border-2 border-blue-500/20">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-500">À venir</Badge>
                      <Percent className="h-5 w-5 text-blue-500" />
                    </div>
                    <CardTitle className="mt-2">{promo.name}</CardTitle>
                    <CardDescription>
                      {promo.startDate} - {promo.endDate}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Réduction</span>
                        <span className="text-xl font-bold">{promo.discount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Produits inclus</span>
                        <span>{promo.products}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-2" />
                      Modifier
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Reprogrammer
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Promotions;
