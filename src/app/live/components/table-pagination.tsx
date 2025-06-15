import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';

import { Attendee } from '../types';

interface TablePaginationProps {
  table: Table<Attendee>;
}

export function TablePagination({ table }: TablePaginationProps) {
  return (
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
  );
}
