
import { cn } from '@/lib/utils';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  change?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  change,
  className,
}) => {
  return (
    <div className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between space-x-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          
          {description && (
            <p className="mt-2 text-xs text-muted-foreground">{description}</p>
          )}
          
          {typeof change !== 'undefined' && (
            <p className={cn("mt-1 text-xs font-medium", 
              change >= 0 ? "text-emerald-500" : "text-rose-500"
            )}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% par rapport à la semaine dernière
            </p>
          )}
        </div>
        <div className="rounded-md bg-primary/10 p-2 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};
