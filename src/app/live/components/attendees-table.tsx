'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';
import { Check, ChevronDown, MoreHorizontal, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { AttendanceStatus, Attendee, STATUS_OPTIONS } from '../types';
import { StatusBadge } from './status-badge';

interface AttendeesTableProps {
  data: Attendee[];
}

export function AttendeesTable({ data: initialData }: AttendeesTableProps) {
  const [data, setData] = useState<Attendee[]>(initialData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const updateStudentStatus = (studentId: string, newStatus: AttendanceStatus) => {
    setData((currentData) =>
      currentData.map((student) =>
        student.id === studentId
          ? {
              ...student,
              status: newStatus,
              checkInTime:
                (newStatus === 'present' || newStatus === 'late') && !student.checkInTime
                  ? new Date().toISOString()
                  : student.checkInTime,
            }
          : student
      )
    );

    toast.success('Status updated');
  };

  const columns: ColumnDef<Attendee>[] = [
    {
      accessorKey: 'studentId',
      header: 'Student ID',
      cell: ({ row }) => <div className="font-medium">{row.getValue('studentId')}</div>,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
    },
    {
      accessorKey: 'groupCode',
      header: 'Group',
      cell: ({ row }) => (
        <span className="rounded bg-secondary/30 px-2 py-1 text-xs font-medium">
          {row.getValue('groupCode')}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as AttendanceStatus;
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
                <DropdownMenuSeparator />
                {STATUS_OPTIONS.map((statusOption) => (
                  <DropdownMenuItem
                    key={statusOption}
                    onClick={() => updateStudentStatus(row.original.id, statusOption)}
                    className="gap-2"
                  >
                    <StatusBadge status={statusOption} />
                    {status === statusOption && <Check className="h-4 w-4" />}
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
      accessorKey: 'checkInTime',
      header: 'Check-in Time',
      cell: ({ row }) => {
        const checkInTime = row.getValue('checkInTime') as string | undefined;
        return checkInTime ? (
          <span className="font-mono text-xs">{format(new Date(checkInTime), 'HH:mm:ss')}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-lg font-semibold">Student Attendance</h2>
        <div className="flex w-full flex-col items-end gap-2 sm:w-auto sm:flex-row">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 pl-8"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-9 gap-1">
                Status <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              {STATUS_OPTIONS.map((status) => (
                <DropdownMenuCheckboxItem
                  key={status}
                  checked={
                    (table.getColumn('status')?.getFilterValue() as string[]) === undefined
                      ? false
                      : (table.getColumn('status')?.getFilterValue() as string[]).includes(status)
                  }
                  onCheckedChange={(checked) => {
                    const filterValues =
                      (table.getColumn('status')?.getFilterValue() as string[]) || [];
                    if (checked) {
                      table.getColumn('status')?.setFilterValue([...filterValues, status]);
                    } else {
                      table
                        .getColumn('status')
                        ?.setFilterValue(filterValues.filter((value) => value !== status));
                    }
                  }}
                >
                  <StatusBadge status={status} />
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-muted/40">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 pt-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
