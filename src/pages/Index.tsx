
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { SalesChart } from '@/components/dashboard/SalesChart';
import { RecentPrescriptions } from '@/components/dashboard/RecentPrescriptions';
import { LowStockAlerts } from '@/components/dashboard/LowStockAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Clipboard, 
  Package, 
  CreditCard, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  ShoppingCart,
  Calendar
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const quickActions = [
    { 
      title: t('new_order'), 
      description: t('place_new_order'), 
      icon: <ShoppingCart className="h-5 w-5" />, 
      href: '/order-platform',
      color: 'bg-blue-500'
    },
    { 
      title: t('add_product'), 
      description: t('add_to_inventory'), 
      icon: <Package className="h-5 w-5" />, 
      href: '/inventory',
      color: 'bg-green-500'
    },
    { 
      title: t('new_reservation'), 
      description: t('reserve_medication'), 
      icon: <Calendar className="h-5 w-5" />, 
      href: '/reservations',
      color: 'bg-purple-500'
    },
    { 
      title: t('view_analytics'), 
      description: t('check_performance'), 
      icon: <TrendingUp className="h-5 w-5" />, 
      href: '/analytics',
      color: 'bg-orange-500'
    }
  ];

  return (
    <Layout>
      <div className="flex flex-col gap-6">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('welcome_back')}, {user?.name || 'User'}!</h1>
              <p className="text-xl opacity-90">{t('dashboard_overview')}</p>
              <div className="flex items-center gap-4 mt-4">
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <CheckCircle className="mr-1 h-3 w-3" />
                  {t('system_operational')}
                </Badge>
                <Badge className="bg-white/20 text-white hover:bg-white/30">
                  <Clock className="mr-1 h-3 w-3" />
                  {t('last_sync')}: {t('2_minutes_ago')}
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-80">{t('today_date')}</p>
              <p className="text-2xl font-bold">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t('quick_actions')}</CardTitle>
            <CardDescription>{t('frequently_used_features')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start text-left"
                  asChild
                >
                  <a href={action.href}>
                    <div className={`${action.color} text-white p-2 rounded-md mb-2`}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">{action.description}</p>
                    </div>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title={t('prescriptions')} 
            value="127" 
            icon={<Clipboard className="h-6 w-6" />} 
            description={t('pending_prescriptions')} 
            change={12}
          />
          <StatCard 
            title={t('inventory')} 
            value="1,432" 
            icon={<Package className="h-6 w-6" />} 
            description={t('5_low_stock')} 
            change={-3}
          />
          <StatCard 
            title={t('revenue_this_month')} 
            value="$28,521" 
            icon={<CreditCard className="h-6 w-6" />} 
            description={t('current_month')} 
            change={18}
          />
          <StatCard 
            title={t('active_customers')} 
            value="487" 
            icon={<Users className="h-6 w-6" />} 
            description={t('new_this_month')} 
            change={15}
          />
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t('recent_activity')}</CardTitle>
            <CardDescription>{t('latest_system_updates')}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium">{t('order_completed')}</p>
                  <p className="text-sm text-muted-foreground">Order #ORD-2024-0156 - $245.50</p>
                </div>
                <span className="text-sm text-muted-foreground">{t('5_minutes_ago')}</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <div className="flex-1">
                  <p className="font-medium">{t('low_stock_alert')}</p>
                  <p className="text-sm text-muted-foreground">Paracetamol 500mg - 8 units remaining</p>
                </div>
                <span className="text-sm text-muted-foreground">{t('15_minutes_ago')}</span>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">{t('new_customer_registered')}</p>
                  <p className="text-sm text-muted-foreground">Sarah Johnson - Pharmacy ID: PH-789</p>
                </div>
                <span className="text-sm text-muted-foreground">{t('1_hour_ago')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
          <SalesChart />
          <div className="grid grid-cols-1 gap-6 lg:col-span-3">
            <RecentPrescriptions />
            <LowStockAlerts />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
