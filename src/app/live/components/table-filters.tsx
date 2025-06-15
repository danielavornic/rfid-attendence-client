import { Table } from '@tanstack/react-table';
import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

import { Attendee } from '../types';
import { StatusFilter } from './status-filter';

interface TableHeaderProps {
  table: Table<Attendee>;
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

export function TableFilters({ table, globalFilter, setGlobalFilter }: TableHeaderProps) {
  return (
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
        <StatusFilter table={table} />
      </div>
    </div>
  );
}
