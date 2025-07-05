import { Task } from '@talentra/types/task';

import * as React from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@talentra/ui/components/table';
import { Button } from '@talentra/ui/components/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@talentra/ui/components/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@talentra/ui/components/tooltip';
import { Label } from '@talentra/ui/components/label';
import { Badge } from '@talentra/ui/components/badge';
import dayjs from 'dayjs';

interface Props {
  tasks: Task[];
}

export default function EmployeeTaskTable({ tasks }: Readonly<Props>) {
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginatedData = React.useMemo(() => {
    const start = pagination.pageIndex * pagination.pageSize;
    const end = start + pagination.pageSize;
    return tasks.slice(start, end);
  }, [tasks, pagination]);

  const totalPages = Math.ceil(tasks.length / pagination.pageSize);
  const currentPage = pagination.pageIndex + 1;

  const table = useReactTable({
    data: paginatedData,
    columns: taskColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getRowId: row => row._id,
  });

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
      onClick: () =>
        setPagination({
          ...pagination,
          pageIndex: pagination.pageIndex + 1,
        }),
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

  const hasData = table.getRowModel().rows.length > 0;

  return (
    <>
      <div className='w-full rounded-lg border border-border overflow-hidden mb-4'>
        <div className=' overflow-y-auto'>
          <Table>
            <TableHeader className='bg-layer2 sticky top-0 z-10'>
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
              {hasData ? (
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
                    colSpan={taskColumns.length}
                    className='h-24 text-center'
                  >
                    No tasks found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {hasData && (
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
                onValueChange={value =>
                  setPagination({ ...pagination, pageSize: Number(value) })
                }
              >
                <SelectTrigger size='sm' className='w-20' id='rows-per-page'>
                  <SelectValue placeholder={pagination.pageSize.toString()} />
                </SelectTrigger>
                <SelectContent side='top'>
                  {[5, 10, 15, 20].map(pageSize => (
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
                      onClick={button.onClick}
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
      )}
    </>
  );
}

const taskColumns: ColumnDef<Task>[] = [
  {
    id: 'index',
    header: () => <span className='pl-4'>No.</span>,
    cell: ({ row }) => <span className='pl-4'>{row.index + 1}</span>,
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => (
      <div className='max-w-[302px] truncate' title={row.original.title}>
        {row.original.title}
      </div>
    ),
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;

      switch (status) {
        case 'completed':
          break;
        case 'in-progress':
          break;
        case 'cancelled':
          break;
        case 'pending':
          break;
      }

      const statusColorMap = {
        completed: 'bg-green-100 text-green-800',
        'in-progress': 'bg-yellow-100 text-yellow-800',
        cancelled: 'bg-red-100 text-red-800',
        pending: 'bg-gray-100 text-gray-800',
        overdue: 'bg-orange-100 text-orange-800',
      };

      return (
        <Badge
          className={
            statusColorMap[status as keyof typeof statusColorMap] ??
            'bg-gray-100 text-gray-800'
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'day',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.day ?? '');
      return <span>{dayjs(date).format('DD MMM YYYY')}</span>;
    },
  },
  {
    id: 'timeRange',
    header: 'Time Range',
    cell: ({ row }) => {
      const day = row.original.day;
      const startSlot = row.original.startSlot ?? 0;
      const slotCount = row.original.slotCount ?? 0;

      if (!day) return <span>-</span>;

      const from = dayjs(day).add(startSlot * 5, 'minute');
      const to = dayjs(day).add((startSlot + slotCount) * 5, 'minute');

      return (
        <span>
          {from.format('hh:mm A')} - {to.format('hh:mm A')}
        </span>
      );
    },
  },

  {
    accessorKey: 'totalHours',
    header: 'Duration',
    cell: ({ row }) => {
      const slotCount = row.original.slotCount ?? 0;
      const totalMinutes = slotCount * 5;
      const totalHours = (totalMinutes / 60).toFixed(2);

      return <span>{totalHours} hrs</span>;
    },
  },
];
