import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Checkbox } from '@talentra/ui/components/checkbox';
import { Button } from '@talentra/ui/components/button';

import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
} from '@tabler/icons-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@talentra/ui/components/dropdown-menu';
import { Input } from '@talentra/ui/components/input';
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@talentra/ui/components/table';
import { Label } from '@talentra/ui/components/label';
import { useGetPaginatedEmployeesQuery } from '@/modules/employee/stores/api/employee.api';
import { Employee } from '@talentra/types/employee';

export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export function DataTable() {
  // const columns = [
  //   {
  //     id: 'select',
  //     header: ({ table }) => (
  //       <div className='flex items-center justify-center'>
  //         <Checkbox
  //           checked={
  //             table.getIsAllPageRowsSelected() ||
  //             (table.getIsSomePageRowsSelected() && 'indeterminate')
  //           }
  //           onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
  //           aria-label='Select all'
  //         />
  //       </div>
  //     ),
  //     cell: ({ row }) => (
  //       <div className='flex items-center justify-center'>
  //         <Checkbox
  //           checked={row.getIsSelected()}
  //           onCheckedChange={value => row.toggleSelected(!!value)}
  //           aria-label='Select row'
  //         />
  //       </div>
  //     ),
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: 'name',
  //     header: 'Name',
  //     cell: ({ row }) => {
  //       return (
  //         <Button
  //           variant='link'
  //           className='text-foreground w-fit px-0 text-left'
  //         >
  //           {row.original.name}
  //         </Button>
  //       );
  //     },
  //     enableHiding: false,
  //   },
  //   {
  //     accessorKey: 'email',
  //     header: 'Email',
  //     cell: ({ row }) => (
  //       <p className='text-muted-foreground'>{row.original.email}</p>
  //     ),
  //   },
  //   {
  //     accessorKey: 'phone',
  //     header: 'Phone',
  //     cell: ({ row }) => (
  //       <p className='text-muted-foreground'>{row.original.phone}</p>
  //     ),
  //   },
  //   {
  //     accessorKey: 'position',
  //     header: () => <div className='w-full'>Position</div>,
  //     cell: ({ row }) => (
  //       <form
  //         onSubmit={e => {
  //           e.preventDefault();
  //         }}
  //       >
  //         <Label htmlFor={`${row.original._id}-target`} className='sr-only'>
  //           Target
  //         </Label>
  //         <Input
  //           className='hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent shadow-none focus-visible:border dark:bg-transparent'
  //           defaultValue={row.original.position}
  //           id={`${row.original._id}-target`}
  //         />
  //       </form>
  //     ),
  //   },

  //   {
  //     accessorKey: 'role',
  //     header: 'Role',
  //     cell: ({ row }) => {
  //       const isAssigned = row.original.role !== 'Assign role';
  //       if (isAssigned) {
  //         return row.original.role;
  //       }
  //       return (
  //         <>
  //           <Label htmlFor={`${row.original._id}-role`} className='sr-only'>
  //             Role
  //           </Label>
  //         </>
  //       );
  //     },
  //   },
  //   {
  //     id: 'actions',
  //     cell: () => (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button
  //             variant='ghost'
  //             className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
  //             size='icon'
  //           >
  //             <IconDotsVertical />
  //             <span className='sr-only'>Open menu</span>
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent>
  //           <DropdownMenuLabel>Edit</DropdownMenuLabel>
  //           <DropdownMenuItem>Make a copy</DropdownMenuItem>
  //           <DropdownMenuItem>Favorite</DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     ),
  //   },
  // ];
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // const { data: employees } = useGetPaginatedEmployeesQuery({
  //   limit: pagination.pageSize,
  //   page: pagination.pageIndex + 1,
  //   search: '',
  // });

  console.log('render');

  // const table = useReactTable({
  //   data: [],
  //   columns,
  //   // state: {
  //   //   sorting,
  //   //   columnVisibility,
  //   //   rowSelection,
  //   //   columnFilters,
  //   //   pagination,
  //   // },
  //   getRowId: row => row._id.toString(),
  //   // enableRowSelection: true,
  //   // onRowSelectionChange: setRowSelection,
  //   // onSortingChange: setSorting,
  //   // onColumnFiltersChange: setColumnFilters,
  //   // onColumnVisibilityChange: setColumnVisibility,
  //   // onPaginationChange: setPagination,
  //   getCoreRowModel: getCoreRowModel(),
  //   // getFilteredRowModel: getFilteredRowModel(),
  //   // getPaginationRowModel: getPaginationRowModel(),
  //   // getSortedRowModel: getSortedRowModel(),
  //   // getFacetedRowModel: getFacetedRowModel(),
  //   // getFacetedUniqueValues: getFacetedUniqueValues(),
  // });

  return (
    <>
      <div className='w-full rounded-lg overflow-hidden border border-border'>
        {/* <Table>
          <TableHeader className='bg-muted sticky top-0 z-10'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className='**:data-[slot=table-cell]:first:w-8'>
            {table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map(row => (
                  <DraggableRow key={row.id} row={row} />
                ))}
              </>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table> */}
      </div>
      {/* <div className='flex items-center justify-between px-4 mt-4'>
        <div className='text-muted-foreground hidden flex-1 text-sm lg:flex'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {employees?.pagination?.totalCount} row(s) selected.
        </div>
        <div className='flex w-full items-center gap-8 lg:w-fit'>
          <div className='hidden items-center gap-2 lg:flex'>
            <Label htmlFor='rows-per-page' className='text-sm font-medium'>
              Rows per page
            </Label>
          </div>
          <div className='flex w-fit items-center justify-center text-sm font-medium'>
            Page {employees?.pagination?.currentPage} of{' '}
            {employees?.pagination?.totalPages}
          </div>
          <div className='ml-auto flex items-center gap-2 lg:ml-0'>
            <Button
              variant='outline'
              className='hidden h-8 w-8 p-0 lg:flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant='outline'
              className='size-8'
              size='icon'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant='outline'
              className='hidden size-8 lg:flex'
              size='icon'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
}
function DraggableRow({ row }: { row: Row<Employee> }) {
  return (
    <TableRow className='relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80'>
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
