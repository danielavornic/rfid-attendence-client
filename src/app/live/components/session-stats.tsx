'use client';

import { Clock, UserCheck, Users, UserX } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

import { SessionStats } from '../types';

interface StatCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon: React.ElementType;
  iconColor: string;
  iconBgColor: string;
  change?: number;
  percentage?: number;
}

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  change,
  percentage,
}: StatCardProps) {
  const cardDescription = description || 'Total enrolled students';

  return (
    <Card className="overflow-hidden shadow-none transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-3xl font-semibold">{value}</h4>
              {change !== undefined && (
                <p className={`text-xs ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {change >= 0 ? '+' : ''}
                  {change}%
                </p>
              )}
            </div>
            <p className="text-xs text-muted-foreground">{cardDescription}</p>

            <div className="mt-2 h-[24px] w-48 space-y-1">
              {percentage !== undefined ? (
                <>
                  <Progress value={percentage} className="h-1.5" />
                  <p className="text-right text-xs text-muted-foreground">
                    {percentage.toFixed(1)}%
                  </p>
                </>
              ) : null}
            </div>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconBgColor} transition-transform duration-300 hover:scale-110`}
          >
            <Icon className={`h-6 w-6 ${iconColor}`} />
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
  const presentPercentage = (stats.present / stats.total) * 100;
  const absentPercentage = (stats.absent / stats.total) * 100;
  const latePercentage = (stats.late / stats.total) * 100;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value={stats.total}
        icon={Users}
        iconColor="text-blue-500"
        iconBgColor="bg-blue-100 dark:bg-blue-950/50"
      />
      <StatCard
        title="Present"
        value={stats.present}
        description="Students who checked in on time"
        icon={UserCheck}
        iconColor="text-green-500"
        iconBgColor="bg-green-100 dark:bg-green-950/50"
        percentage={presentPercentage}
      />
      <StatCard
        title="Late"
        value={stats.late}
        description="Students who were late"
        icon={Clock}
        iconColor="text-yellow-500"
        iconBgColor="bg-yellow-100 dark:bg-yellow-950/50"
        percentage={latePercentage}
      />
      <StatCard
        title="Absent"
        value={stats.absent}
        description="Students who haven't checked in"
        icon={UserX}
        iconColor="text-red-500"
        iconBgColor="bg-red-100 dark:bg-red-950/50"
        percentage={absentPercentage}
      />
    </div>
  );
}
