
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
  Tag
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
          <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <span className="text-xl font-bold text-primary-foreground">P</span>
          </div>
          <div className="font-bold text-xl text-primary">PharmaNexus</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/inventory" className={linkClass}>
                    <Package className="h-5 w-5" />
                    <span>Inventaire</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link to="/settings" className={linkClass}>
                    <Settings className="h-5 w-5" />
                    <span>Paramètres</span>
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
