
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
}

// Sample data
const lowStockItems: StockItem[] = [
  { id: '1', name: 'Paracétamol 500mg', currentStock: 15, minStock: 30 },
  { id: '2', name: 'Ibuprofène 200mg', currentStock: 8, minStock: 25 },
  { id: '3', name: 'Amoxicilline 500mg', currentStock: 5, minStock: 20 },
  { id: '4', name: 'Loratadine 10mg', currentStock: 3, minStock: 15 },
  { id: '5', name: 'Oméprazole 20mg', currentStock: 12, minStock: 25 },
];

const chartData = lowStockItems.map(item => ({
  name: item.name.length > 15 ? `${item.name.substring(0, 15)}...` : item.name,
  stock: item.currentStock,
  min: item.minStock,
}));

export const LowStockAlerts = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Alertes de stock</CardTitle>
        <CardDescription>Produits nécessitant un réapprovisionnement</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
            barGap={0}
            barCategoryGap="20%"
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={70} 
              tick={{ fontSize: 12 }} 
            />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="stock" fill="hsl(var(--destructive))" name="Stock actuel" />
            <Bar dataKey="min" fill="hsl(var(--muted))" name="Stock minimum" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
