
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentPrescriptions } from '@/components/dashboard/RecentPrescriptions';
import { LowStockAlerts } from '@/components/dashboard/LowStockAlerts';
import { Clipboard, Package, CreditCard, Users } from 'lucide-react';

const Index = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">{t('dashboard')}</h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title={t('prescriptions')} 
          value="127" 
          icon={<Clipboard className="h-6 w-6" />} 
          description={t('pending_prescriptions')} 
          change={12}
        />
        <StatCard 
          title={t('stock')} 
          value="1,432" 
          icon={<Package className="h-6 w-6" />} 
          description={t('5_low_stock')} 
          change={-3}
        />
        <StatCard 
          title={t('sales')} 
          value="€8,521" 
          icon={<CreditCard className="h-6 w-6" />} 
          description={t('current_month')} 
          change={8}
        />
        <StatCard 
          title={t('clients')} 
          value="487" 
          icon={<Users className="h-6 w-6" />} 
          description={t('new_this_month')} 
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
