
import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Clipboard, 
  Package, 
  CreditCard, 
  BarChart, 
  Users, 
  MessageSquare, 
  Settings, 
  Home,
  Tag,
  Truck,
  Store,
  ShieldCheck,
  Database,
  Wifi,
  WifiOff,
  ShoppingBag,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Sidebar as SidebarComponent, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarTrigger,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel
} from '@/components/ui/sidebar';

export const Sidebar = () => {
  const { t } = useTranslation();

  return (
    <SidebarComponent>
      <SidebarHeader className="border-b border-border/50 py-4">
        <div className="flex items-center gap-2 px-4">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-md">
            <img src="/uploads/f0824aea-9430-47b8-a0da-a4784cb07566.png" alt="MedLocs" className="h-10 w-10" />
          </div>
          <div className="font-bold text-xl text-primary">MedLocs</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('dashboard')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className={linkClass} data-active={true}>
                    <Home className="h-5 w-5" />
                    <span>{t('dashboard')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/prescriptions" className={linkClass}>
                    <Clipboard className="h-5 w-5" />
                    <span>{t('prescriptions')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/reservations" className={linkClass}>
                    <Calendar className="h-5 w-5" />
                    <span>{t('reservations')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/order-platform" className={linkClass}>
                    <ShoppingBag className="h-5 w-5" />
                    <span>{t('order_platform')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t('inventory')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/inventory" className={linkClass}>
                    <Package className="h-5 w-5" />
                    <span>{t('products')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/suppliers" className={linkClass}>
                    <Truck className="h-5 w-5" />
                    <span>{t('suppliers')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/pharmacies" className={linkClass}>
                    <Store className="h-5 w-5" />
                    <span>{t('pharmacies')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t('orders')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/payments" className={linkClass}>
                    <CreditCard className="h-5 w-5" />
                    <span>{t('payments')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/promotions" className={linkClass}>
                    <Tag className="h-5 w-5" />
                    <span>{t('promotions')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t('analytics')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/analytics" className={linkClass}>
                    <BarChart className="h-5 w-5" />
                    <span>{t('analytics')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/backup" className={linkClass}>
                    <Database className="h-5 w-5" />
                    <span>{t('backup')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t('customers')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/customers" className={linkClass}>
                    <Users className="h-5 w-5" />
                    <span>{t('customers')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/messages" className={linkClass}>
                    <MessageSquare className="h-5 w-5" />
                    <span>{t('messages')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>{t('settings')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className={linkClass}>
                    <Settings className="h-5 w-5" />
                    <span>{t('settings')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/security" className={linkClass}>
                    <ShieldCheck className="h-5 w-5" />
                    <span>{t('security')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/sync" className={linkClass}>
                    <div className="flex items-center">
                      <Wifi className="h-5 w-5 text-green-500" />
                      <WifiOff className="h-5 w-5 ml-1 text-muted-foreground" />
                    </div>
                    <span>{t('synchronization')}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SidebarComponent>
  );
};

const linkClass = cn(
  "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-all hover:text-primary"
);
