import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Attendee, STATUS_OPTIONS } from '../types';
import { StatusBadge } from './status-badge';

interface StatusFilterProps {
  table: Table<Attendee>;
}

export function StatusFilter({ table }: StatusFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={
            table.getColumn('status')?.getFilterValue() &&
            (table.getColumn('status')?.getFilterValue() as string[])?.length > 0
              ? 'secondary'
              : 'outline'
          }
          className="h-9 gap-1"
        >
          Status
          {(table.getColumn('status')?.getFilterValue() as string[])?.length > 0 && (
            <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] text-primary-foreground">
              {(table.getColumn('status')?.getFilterValue() as string[])?.length}
            </span>
          )}
          <ChevronDown className="h-4 w-4" />
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
              const filterValues = (table.getColumn('status')?.getFilterValue() as string[]) || [];
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
  );
}
