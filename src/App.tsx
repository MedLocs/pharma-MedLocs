
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
import "@/lib/i18n";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
import Reservations from "./pages/Reservations";
import OrderPlatform from "./pages/OrderPlatform";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/prescriptions" element={
                <ProtectedRoute>
                  <Prescriptions />
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute>
                  <Inventory />
                </ProtectedRoute>
              } />
              <Route path="/order-platform" element={
                <ProtectedRoute>
                  <OrderPlatform />
                </ProtectedRoute>
              } />
              <Route path="/payments" element={
                <ProtectedRoute>
                  <Payments />
                </ProtectedRoute>
              } />
              <Route path="/promotions" element={
                <ProtectedRoute>
                  <Promotions />
                </ProtectedRoute>
              } />
              <Route path="/analytics" element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
              <Route path="/customers" element={
                <ProtectedRoute>
                  <Customers />
                </ProtectedRoute>
              } />
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } />
              <Route path="/suppliers" element={
                <ProtectedRoute>
                  <Suppliers />
                </ProtectedRoute>
              } />
              <Route path="/pharmacies" element={
                <ProtectedRoute>
                  <Pharmacies />
                </ProtectedRoute>
              } />
              <Route path="/sync" element={
                <ProtectedRoute>
                  <Sync />
                </ProtectedRoute>
              } />
              <Route path="/backup" element={
                <ProtectedRoute>
                  <Backup />
                </ProtectedRoute>
              } />
              <Route path="/security" element={
                <ProtectedRoute>
                  <Security />
                </ProtectedRoute>
              } />
              <Route path="/reservations" element={
                <ProtectedRoute>
                  <Reservations />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
            <Sonner />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
