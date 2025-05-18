'use client';

import { Clock, UserCheck, Users, UserX } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { SessionStats } from '../types';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ElementType;
  iconColor: string;
  change?: number;
}

function StatCard({ title, value, description, icon: Icon, iconColor, change }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-semibold">{value}</h4>
              {change !== undefined && (
                <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {change >= 0 ? '+' : ''}
                  {change}%
                </p>
              )}
            </div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className={`flex h-12 w-12 items-center justify-center rounded-full ${iconColor}`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface SessionStatsProps {
  stats: SessionStats;
}

export function SessionStatsCards({ stats }: SessionStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Students" value={stats.total} icon={Users} iconColor="bg-blue-500" />
      <StatCard
        title="Present"
        value={stats.present}
        description={`${((stats.present / stats.total) * 100).toFixed(1)}% of total`}
        icon={UserCheck}
        iconColor="bg-green-500"
      />
      <StatCard
        title="Absent"
        value={stats.absent}
        description={`${((stats.absent / stats.total) * 100).toFixed(1)}% of total`}
        icon={UserX}
        iconColor="bg-red-500"
      />
      <StatCard
        title="Late"
        value={stats.late}
        description={`${((stats.late / stats.total) * 100).toFixed(1)}% of total`}
        icon={Clock}
        iconColor="bg-yellow-500"
      />
    </div>
  );
}
