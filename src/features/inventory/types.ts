
export interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  alert: boolean;
  supplier?: number;
  expiryDate?: string;
  barcode?: string;
  description?: string;
  minimumStock: number;
  lastRestock?: string;
  location?: string;
  status: 'available' | 'low' | 'out_of_stock';
  images?: string[];
  onlineAvailability: boolean;
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  products: number[];
  rating: number;
  lastOrder?: string;
  paymentTerms?: string;
  notes?: string;
  status: 'active' | 'inactive';
  category: string;
}

export interface Pharmacy {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  manager: string;
  openingHours: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  stockStatus: 'optimal' | 'warning' | 'critical';
  lastSyncDate: string;
  isOnline: boolean;
}

export interface SyncStatus {
  lastSync: Date;
  pendingUploads: number;
  pendingDownloads: number;
  status: 'synced' | 'syncing' | 'error' | 'offline';
}

export type StockStatus = 'optimal' | 'low' | 'critical' | 'out_of_stock';
