import { Check, Clock, X } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import { AttendanceStatus } from '../types';

interface StatusConfig {
  label: string;
  variant: 'success' | 'destructive' | 'warning' | 'outline';
  icon: React.ElementType | null;
}

// Create a unified status configuration object
const STATUS_CONFIG: Record<AttendanceStatus, StatusConfig> = {
  present: {
    label: 'Present',
    variant: 'success',
    icon: Check,
  },
  absent: {
    label: 'Absent',
    variant: 'destructive',
    icon: X,
  },
  late: {
    label: 'Late',
    variant: 'warning',
    icon: Clock,
  },
};

interface StatusBadgeProps {
  status: AttendanceStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { label, variant, icon: Icon } = STATUS_CONFIG[status];

  return (
    <Badge variant={variant} className="gap-1">
      {/* {Icon && <Icon className="h-3 w-3" />} */}
      {label}
    </Badge>
  );
}
