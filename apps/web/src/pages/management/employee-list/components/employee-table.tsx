import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '@talentra/ui/components/button';
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  EllipsisVertical,
} from 'lucide-react';
import { Link } from 'react-router';
import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@talentra/ui/components/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@talentra/ui/components/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@talentra/ui/components/dropdown-menu';
import { useGetPaginatedEmployeesQuery } from '@/modules/employee/stores/api/employee.api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@talentra/ui/components/select';
import { Label } from '@talentra/ui/components/label';
import dayjs from 'dayjs';

export function EmployeeTable() {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data } = useGetPaginatedEmployeesQuery({
    limit: pagination.pageSize,
    page: pagination.pageIndex + 1,
    search: '',
  });

  const table = useReactTable({
    data: data?.employees ?? [],
    columns,
    getRowId: row => row._id.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const totalPages = Math.ceil(
    (data?.pagination.totalCount ?? 0) / pagination.pageSize
  );
  const currentPage = pagination.pageIndex + 1;

  const paginationButtons = [
    {
      icon: ChevronsLeft,
      label: 'Go to first page',
      onClick: () => setPagination({ ...pagination, pageIndex: 0 }),
      disabled: currentPage === 1,
    },
    {
      icon: ChevronLeft,
      label: 'Go to previous page',
      onClick: () =>
        setPagination({
          ...pagination,
          pageIndex: pagination.pageIndex - 1,
        }),
      disabled: currentPage === 1,
    },
    {
      icon: ChevronRight,
      label: 'Go to next page',
      onClick: () => {
        setPagination({
          ...pagination,
          pageIndex: pagination.pageIndex + 1,
        });
      },
      disabled: currentPage === totalPages,
    },
    {
      icon: ChevronsRight,
      label: 'Go to last page',
      onClick: () =>
        setPagination({
          ...pagination,
          pageIndex: totalPages - 1,
        }),
      disabled: currentPage === totalPages,
    },
  ];

  return (
    <>
      <div className='w-full rounded-lg overflow-hidden border border-border'>
        <Table>
          <TableHeader className='bg-muted'>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
        </Table>
      </div>

      <div className='flex items-center justify-between px-4 mt-4'>
        <div className='text-sm text-muted-foreground'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='flex items-center gap-2'>
          <div className='hidden items-center gap-2 lg:flex'>
            <Label
              htmlFor='rows-per-page'
              className='text-sm font-medium text-muted-foreground'
            >
              Rows per page
            </Label>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={value => {
                setPagination({ ...pagination, pageSize: Number(value) });
              }}
            >
              <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                <SelectValue placeholder={pagination.pageSize.toString()} />
              </SelectTrigger>
              <SelectContent side='top'>
                {[10, 15, 20, 25, 30].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <TooltipProvider>
            {paginationButtons.map((button, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Button
                    variant='outline'
                    size='sm'
                    className='h-8 w-8 p-0'
                    onClick={() => button.onClick()}
                    disabled={button.disabled}
                  >
                    <button.icon className='h-4 w-4' />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{button.label}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </>
  );
}

const columns: ColumnDef<any>[] = [
  {
    id: 'index',
    header: () => <span className='pl-4'>No.</span>,
    cell: ({ row }) => {
      return <span className='pl-4'>{row.index + 1}</span>;
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <Button
        variant='link'
        className='text-foreground w-fit px-0 text-left hover:text-foreground'
      >
        <Link to={`/employee-management/${row.original._id}`}>
          {row.original.name}
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => (
      <p className='text-muted-foreground'>{row.original.email}</p>
    ),
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => (
      <p className='text-muted-foreground'>
        {dayjs(row.original.dateOfBirth).format('DD MMM YYYY')}
      </p>
    ),
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
    cell: ({ row }) => (
      <p className='text-muted-foreground'>{row.original.phone}</p>
    ),
  },

  {
    accessorKey: 'position',
    header: 'Position',
    cell: ({ row }) => (
      <p className='text-muted-foreground'>{row.original.position}</p>
    ),
  },
  {
    accessorKey: 'country',
    header: 'Country',
    cell: ({ row }) => {
      const isAssigned = row.original.country !== 'Assign country';
      return isAssigned ? (
        row.original.country
      ) : (
        <span className='text-muted-foreground'>Assign country</span>
      );
    },
  },
  {
    id: 'actions',
    cell: () => (
      <div className='flex justify-end pr-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='data-[state=open]:bg-muted text-muted-foreground flex size-8'
              size='icon'
            >
              <EllipsisVertical />
              <span className='sr-only'>Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Edit</DropdownMenuLabel>
            <DropdownMenuItem>Make a copy</DropdownMenuItem>
            <DropdownMenuItem>Favorite</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant='destructive'>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];
