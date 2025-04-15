
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Prescriptions from "./pages/Prescriptions";
import NotFound from "./pages/NotFound";
import Inventory from "./pages/Inventory";
import Payments from "./pages/Payments";
import Promotions from "./pages/Promotions";
import Analytics from "./pages/Analytics";
import Customers from "./pages/Customers";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Suppliers from "./pages/Suppliers";
import Pharmacies from "./pages/Pharmacies";
import Sync from "./pages/Sync";
import Backup from "./pages/Backup";
import Security from "./pages/Security";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prescriptions" element={<Prescriptions />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/pharmacies" element={<Pharmacies />} />
          <Route path="/sync" element={<Sync />} />
          <Route path="/backup" element={<Backup />} />
          <Route path="/security" element={<Security />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
        <Sonner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
