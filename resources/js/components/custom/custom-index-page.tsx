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
import { ArrowUpDown, BoxSelectIcon, LucideIcon } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getValue } from '@/helpers/custom-table-helpers';
import { ColumnDefinition, Pagination } from '@/types/app-types';

import { useIsMobile } from '@/hooks/use-mobile';
import { Badge } from '../ui/badge';
import CustomActionToaster, { ActionsProps } from './custom-action-toaster';
import CustomActionsButtons from './custom-actions-buttons';
import CustomHeader from './custom-header';
import CustomPagination from './custom-pagination';
import CustomSearchBar from './custom-searchbar';
import CustomToaster, { FlashMessage } from './custom-toaster';

// -------------------------------------------------
// TYPES
// -------------------------------------------------

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
    flashData?: FlashMessage;
    actionsData?: ActionsProps;
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
    const columns: ColumnDef<TData>[] = useMemo(() => {
        const baseColumns: ColumnDef<TData>[] = [
            {
                id: 'index',
                header: '#',
                cell: ({ row }: { row: Row<TData> }) => {
                    const no = (paginate && paginate.from) || 1;
                    return no + row.index;
                },
                enableSorting: false,
                size: 50
            }
        ];

        const dataColumns = Columns.map((col): ColumnDef<TData> => {
            // Handle actions column
            if (col.isActions) {
                return {
                    id: 'actions',
                    header: () => <div className="text-right">{col.header}</div>,
                    cell: ({ row }) => (
                        <div className="flex justify-end space-x-1">
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
                    enableHiding: true,
                    size: 100
                };
            }

            // Create the base column definition
            const columnDef: ColumnDef<TData> = {
                id: col.id || col.accessorKey || col.header,
                header: col.sortable
                    ? ({ column }) => (
                          <Button
                              variant="ghost"
                              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                              className="flex w-full items-center justify-start gap-1 px-2 hover:bg-accent"
                          >
                              <span className="truncate">{col.header}</span>
                              <ArrowUpDown className="h-3 w-3 flex-shrink-0 md:h-4 md:w-4" />
                          </Button>
                      )
                    : () => <div className="truncate px-2">{col.header}</div>,
                enableSorting: !!col.sortable,
                minSize: 50,
                size: col.accessorKey?.includes('name') || col.accessorKey?.includes('title') ? 150 : 100
            };

            // Set accessor based on what's provided
            if (col.accessorFn) {
                columnDef.accessorFn = col.accessorFn;
            } else if (col.accessorKey) {
                columnDef.accessorKey = col.accessorKey;
            }

            // Handle custom cell function - ADAPTED FOR YOUR COLUMN DEFINITION
            if (col.cell) {
                // Convert your cell function (which takes row data) to TanStack cell function
                columnDef.cell = ({ row }) => {
                    return col.cell!(row.original);
                };
            } else {
                // Default cell rendering
                columnDef.cell = ({ row }) => {
                    let value: any;

                    if (col.accessorFn) {
                        value = col.accessorFn(row.original);
                    } else if (col.accessorKey) {
                        value = getValue(row.original, col.accessorKey);
                        if (col.accessorKey?.includes('||')) {
                            const [path, fallback] = col.accessorKey.split('||').map((x) => x.trim());
                            value = getValue(row.original, path) || fallback.replace(/['"]/g, '');
                        }
                    }

                    // Handle arrays
                    if (Array.isArray(value)) {
                        if (value.length > 0 && typeof value[0] === 'object') {
                            return (
                                <div className="space-x-1 px-2">
                                    {value.map((v, i) => (
                                        <span key={i} className="inline-block rounded-md bg-muted px-2 py-1 text-xs">
                                            {v.name || JSON.stringify(v)}
                                        </span>
                                    ))}
                                </div>
                            );
                        }
                        return (
                            <div className="space-x-1 px-2">
                                {value.map((v, i) => (
                                    <span key={i} className="inline-block rounded-md bg-muted px-2 py-1 text-xs">
                                        {String(v)}
                                    </span>
                                ))}
                            </div>
                        );
                    }

                    // Single value
                    return (
                        <div className="px-2">
                            <span className="block truncate">{String(value ?? '')}</span>
                        </div>
                    );
                };
            }

            return columnDef;
        });

        return [...baseColumns, ...dataColumns];
    }, [Columns, deleting, handleInfo, handleEdit, handleDelete, paginate]);

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
        getPaginationRowModel: getPaginationRowModel(),
        defaultColumn: {
            minSize: 60,
            size: 150,
            maxSize: 500
        }
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

    const isMobile = useIsMobile();

    // -------------------------------------------------
    // RENDER
    // -------------------------------------------------
    return (
        <div className="flex w-full flex-col gap-3 px-1 pb-10 sm:px-2">
            {actionsData && <CustomActionToaster actions={actionsData} />}
            {flashData && <CustomToaster flash={flashData} />}

            <CustomHeader title={title} button={button}>
                {Header?.children}
            </CustomHeader>

            {/* Search + Column toggle */}
            <div className="flex items-center justify-between gap-2 py-1">
                <div className="w-">
                    <CustomSearchBar setQuery={setGlobalFilter} searching={false} disabled={deleting} value={globalFilter} />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        {<Badge className="h-8 min-w-6 hover:cursor-pointer"> {!isMobile ? 'Columns' : <BoxSelectIcon />}</Badge>}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        {table
                            .getAllColumns()
                            .filter((col) => col.getCanHide())
                            .map((col) => (
                                <DropdownMenuCheckboxItem
                                    key={col.id}
                                    className="truncate capitalize"
                                    checked={col.getIsVisible()}
                                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                                >
                                    {col.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Data Table with horizontal scroll only */}
            <div className="overflow-hidden rounded-md border">
                <ScrollArea className="w-full">
                    <div className="overflow-auto">
                        <Table className="w-full min-w-max">
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className="bg-muted/50 px-2 py-3 text-xs whitespace-nowrap sm:text-sm"
                                                style={{
                                                    width: header.getSize(),
                                                    minWidth: header.column.columnDef.minSize,
                                                    maxWidth: header.column.columnDef.maxSize
                                                }}
                                            >
                                                {flexRender(header.column.columnDef.header, header.getContext())}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>

                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} className="hover:bg-muted/50">
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell
                                                    key={cell.id}
                                                    className="truncate px-2 py-2 text-xs sm:text-sm"
                                                    style={{
                                                        width: cell.column.getSize(),
                                                        minWidth: cell.column.columnDef.minSize,
                                                        maxWidth: cell.column.columnDef.maxSize
                                                    }}
                                                >
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={Columns.length + 1} className="h-24 text-center text-xs sm:text-sm">
                                            {emptyText}
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                {paginate && (
                    <div className="text-center text-xs text-muted-foreground sm:text-left sm:text-sm">
                        Showing {paginate?.from} to {paginate?.to} of {paginate?.total} results
                    </div>
                )}
                {paginate && paginate.links.length > 3 && (
                    <div className="flex justify-center sm:justify-end">
                        <CustomPagination links={paginate.links} next_page={paginate.next_page_url} prev_page={paginate.prev_page_url} />
                    </div>
                )}
            </div>

            {children}
        </div>
    );
}
