
import React from 'react';
import { Link } from 'react-router-dom';
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
  WifiOff
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
          <SidebarGroupLabel>Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/" className={linkClass} data-active={true}>
                    <Home className="h-5 w-5" />
                    <span>Tableau de bord</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/prescriptions" className={linkClass}>
                    <Clipboard className="h-5 w-5" />
                    <span>Ordonnances</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Inventaire</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/inventory" className={linkClass}>
                    <Package className="h-5 w-5" />
                    <span>Produits</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/suppliers" className={linkClass}>
                    <Truck className="h-5 w-5" />
                    <span>Fournisseurs</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {/* <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/pharmacies" className={linkClass}>
                    <Store className="h-5 w-5" />
                    <span>Pharmacies</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem> */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Commercial</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/payments" className={linkClass}>
                    <CreditCard className="h-5 w-5" />
                    <span>Paiements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/promotions" className={linkClass}>
                    <Tag className="h-5 w-5" />
                    <span>Promotions</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Données & Analyses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/analytics" className={linkClass}>
                    <BarChart className="h-5 w-5" />
                    <span>Analytiques</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/backup" className={linkClass}>
                    <Database className="h-5 w-5" />
                    <span>Sauvegarde</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Utilisateurs</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/customers" className={linkClass}>
                    <Users className="h-5 w-5" />
                    <span>Clients</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/messages" className={linkClass}>
                    <MessageSquare className="h-5 w-5" />
                    <span>Messages</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>Système</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className={linkClass}>
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/security" className={linkClass}>
                    <ShieldCheck className="h-5 w-5" />
                    <span>Sécurité</span>
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
                    <span>Synchronisation</span>
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
