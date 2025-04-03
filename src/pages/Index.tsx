
import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentPrescriptions } from '@/components/dashboard/RecentPrescriptions';
import { LowStockAlerts } from '@/components/dashboard/LowStockAlerts';
import { Clipboard, Package, CreditCard, Users } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Ordonnances" 
          value="127" 
          icon={<Clipboard className="h-6 w-6" />} 
          description="23 en attente de traitement" 
          change={12}
        />
        <StatCard 
          title="Stock" 
          value="1,432" 
          icon={<Package className="h-6 w-6" />} 
          description="5 produits en stock faible" 
          change={-3}
        />
        <StatCard 
          title="Ventes" 
          value="€8,521" 
          icon={<CreditCard className="h-6 w-6" />} 
          description="Pour le mois en cours" 
          change={8}
        />
        <StatCard 
          title="Clients" 
          value="487" 
          icon={<Users className="h-6 w-6" />} 
          description="32 nouveaux ce mois-ci" 
          change={15}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-7">
        <SalesChart />
        <div className="grid grid-cols-1 gap-6 lg:col-span-3">
          <RecentPrescriptions />
          <LowStockAlerts />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
