import { ColumnDef } from '@tanstack/react-table';
import { addHours, format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AttendanceStatus, Attendee, STATUS_OPTIONS } from '../types';
import { StatusBadge } from './status-badge';

export const useAttendeeColumns = (
  updateStudentStatus: (attendanceId: number, newStatus: AttendanceStatus) => void
) => {
  const columns: ColumnDef<Attendee>[] = [
    {
      accessorKey: 'student.student_id',
      header: 'Student ID',
      cell: ({ row }) => <div className="font-msedium">{row.original.student.student_id}</div>,
    },
    {
      accessorKey: 'student.name',
      header: 'Student Name',
      cell: ({ row }) => <div>{row.original.student.name}</div>,
    },
    {
      accessorKey: 'student.group.code',
      header: 'Group',
      cell: ({ row }) => (
        <span className="rounded bg-secondary/30 px-2 py-1 text-xs font-medium">
          {row.original.student.group.code}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as AttendanceStatus;
        const options = STATUS_OPTIONS.filter((option) => option !== status);
        return (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 p-0 hover:bg-transparent data-[state=open]:bg-transparent"
                >
                  <StatusBadge status={status} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                {options.map((statusOption) => (
                  <DropdownMenuItem
                    key={statusOption}
                    onClick={() => updateStudentStatus(row.original.attendance_id, statusOption)}
                    className="gap-2"
                  >
                    <StatusBadge status={statusOption} />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        if (!value.length) return true;
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'time',
      header: 'Check-in Time',
      cell: ({ row }) => {
        const checkInTime = row.getValue('time') as string | undefined;
        const status = row.getValue('status') as AttendanceStatus;
        if (!checkInTime || status === 'absent')
          return <span className="text-muted-foreground">—</span>;

        const threeHoursLater = addHours(new Date(checkInTime), 3);
        return (
          <span className="font-mono text-xs">{format(new Date(threeHoursLater), 'HH:mm:ss')}</span>
        );
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  toast('View details');
                }}
              >
                View details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
