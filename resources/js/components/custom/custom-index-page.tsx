'use client';

import {
    ColumnDef,
    Row,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from '@tanstack/react-table';
import { ArrowUpDown, LucideIcon, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getValue } from '@/helpers/custom-table-helpers';
import { ColumnDefinition, Pagination } from '@/types/app-types';

import CustomActionToaster, { ActionsProps } from './custom-action-toaster';
import CustomActionsButtons from './custom-actions-buttons';
import CustomHeader from './custom-header';
import CustomPagination from './custom-pagination';
import CustomSearchBar from './custom-searchbar';
import CustomToaster, { FlashMessage } from './custom-toaster';

// -------------------------------------------------
// TYPES
// -------------------------------------------------

// export interface ColumnDefinition<TData> {
//     header: string;
//     accessorKey?: string;
//     accessorFn?: (row: TData) => unknown;
//     cell?: (row: TData) => React.ReactNode;
//     filterable?: boolean;
//     sortable?: boolean;
//     className?: string;
//     isActions?: boolean;
// }

interface HeaderProps {
    title: string;
    button?: {
        label: string;
        icon?: LucideIcon;
        className?: string;
        onClick: () => void;
    };
    children?: React.ReactNode;
}

interface CustomPageProps<TData extends { id?: string | number } = Record<string, unknown>> {
    flashData?: FlashMessage[];
    actionsData?: ActionsProps[];
    Data?: TData[];
    Columns?: ColumnDefinition<TData>[];
    emptyText?: string;
    Header?: HeaderProps;
    paginate?: Pagination;
    Utils?: { deleting: boolean };
    handleCreate?: () => void;
    handleInfo?: (data: TData) => void;
    handleEdit?: (data: TData) => void;
    handleDelete?: (data: TData) => void;
    children?: React.ReactNode;
}

// -------------------------------------------------
// COMPONENT
// -------------------------------------------------

export default function CustomIndexPage<TData extends { id?: string | number } = Record<string, unknown>>({
    flashData,
    actionsData,
    Data = [],
    Columns = [],
    Header,
    emptyText = 'No results.',
    paginate,
    Utils,
    handleCreate,
    handleInfo,
    handleEdit,
    handleDelete,
    children
}: CustomPageProps<TData>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});
    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
    const [deleting] = useState(Utils?.deleting || false);

    const title = Header?.title || 'Page Title';
    const button = Header?.button || null;

    // -------------------------------------------------
    // Columns setup
    // -------------------------------------------------
    const columns: ColumnDef<TData>[] = useMemo(
        () => [
            {
                id: 'index',
                header: '#',
                cell: ({ row }: { row: Row<TData> }) => {
                    const no = (paginate && paginate.from) || 1;
                    return no + row.index;
                },
                enableSorting: false
            },
            ...Columns.map((col) => {
                if (col.isActions) {
                    return {
                        id: 'actions',
                        header: () => <div className="text-right">{col.header}</div>,
                        cell: ({ row }) => (
                            <div className="flex justify-end">
                                <CustomActionsButtons
                                    infoBtn={{
                                        label: 'Info',
                                        disabled: deleting,
                                        onClick: () => handleInfo?.(row.original)
                                    }}
                                    editBtn={{
                                        label: 'Edit',
                                        disabled: deleting,
                                        onClick: () => handleEdit?.(row.original)
                                    }}
                                    deleteBtn={{
                                        label: 'Delete',
                                        disabled: deleting,
                                        onClick: () => handleDelete?.(row.original)
                                    }}
                                />
                            </div>
                        ),
                        enableSorting: false,
                        enableHiding: false
                    } as ColumnDef<TData>;
                }

                const accessorFn =
                    col.accessorFn ||
                    ((row: TData) => {
                        const val = col.accessorKey ? getValue(row, col.accessorKey) : undefined;
                        if (col.accessorKey?.includes('||')) {
                            const [path, fallback] = col.accessorKey.split('||').map((x) => x.trim());
                            return getValue(row, path) || fallback.replace(/['"]/g, '');
                        }
                        return val;
                    });

                return {
                    id: col.accessorKey ?? col.header,
                    accessorFn,
                    header: col.sortable
                        ? ({ column }) => (
                              <Button
                                  variant="ghost"
                                  onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                                  className="flex items-center gap-1"
                              >
                                  {col.header}
                                  <ArrowUpDown className="h-4 w-4" />
                              </Button>
                          )
                        : col.header,
                    cell: ({ row }) => (col.cell ? col.cell(row.original) : <span>{String(accessorFn(row.original) ?? '')}</span>),
                    enableSorting: !!col.sortable
                } as ColumnDef<TData>;
            })
        ],
        [Columns, deleting, handleInfo, handleEdit, handleDelete]
    );

    // -------------------------------------------------
    // Table instance
    // -------------------------------------------------
    const table = useReactTable({
        data: Data,
        columns,
        state: { sorting, globalFilter, columnVisibility },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    });

    // -------------------------------------------------
    // Filtering logic
    // -------------------------------------------------
    const filteredData = useMemo(() => {
        return Data.filter((item) =>
            Object.entries(columnFilters).every(([key, value]) =>
                !value ? true : String(getValue(item, key)).toLowerCase().includes(value.toLowerCase())
            )
        ).filter((item) =>
            !globalFilter ? true : Object.values(item).some((val) => String(val).toLowerCase().includes(globalFilter.toLowerCase()))
        );
    }, [Data, columnFilters, globalFilter]);

    useEffect(() => {
        table.setOptions((opts) => ({ ...opts, data: filteredData }));
    }, [filteredData, table]);

    // -------------------------------------------------
    // RENDER
    // -------------------------------------------------
    return (
        <div className="flex w-full flex-col gap-3 pb-10">
            <ScrollArea className="px-2">
                {actionsData && <CustomActionToaster actions={actionsData} />}
                {flashData && <CustomToaster flash={flashData} />}

                <CustomHeader title={title} button={button}>
                    {Header?.children}
                </CustomHeader>

                {/* Search + Column toggle */}
                <div className="mb-3 flex flex-col gap-2 py-1 sm:flex-row sm:items-center sm:justify-between">
                    <CustomSearchBar setQuery={setGlobalFilter} searching={false} disabled={deleting} value={globalFilter} />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">Columns</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((col) => col.getCanHide())
                                .map((col) => (
                                    <DropdownMenuCheckboxItem
                                        key={col.id}
                                        className="capitalize"
                                        checked={col.getIsVisible()}
                                        onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                    >
                                        {col.id}
                                    </DropdownMenuCheckboxItem>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Data Table */}
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={Columns.length + 1} className="h-24 text-center">
                                        {emptyText}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex items-center justify-between px-2">
                    {paginate && <div className="text-sm text-muted-foreground">
                        Showing {paginate?.from} to {paginate?.to} of {paginate?.total} results
                    </div>}
                    {paginate && <CustomPagination links={paginate.links} next_page={paginate.next_page_url} prev_page={paginate.prev_page_url} />}
                </div>

                {children}
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    );
}
