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
import { ArrowUpDown, BoxSelectIcon, Filter, LucideIcon, MoreHorizontal, Search, Smartphone, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getValue } from '@/helpers/custom-table-helpers';
import { ColumnDefinition, Pagination } from '@/types/app-types';

import { useIsMobile } from '@/hooks/use-mobile';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import CustomActionToaster, { ActionsProps } from './custom-action-toaster';
import CustomActionsButtons from './custom-actions-buttons';
import CustomPagination from './custom-pagination';
import CustomToaster, { FlashMessage } from './custom-toaster';

// -------------------------------------------------
// TYPES
// -------------------------------------------------

interface HeaderProps {
    title: string;
    description?: string;
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
    emptyText = 'No data found.',
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
    const [activeView, setActiveView] = useState<'table' | 'cards'>('table');
    const [deleting] = useState(Utils?.deleting || false);

    const title = Header?.title || 'Page Title';
    const description = Header?.description || 'Manage your data efficiently';

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
                    return (
                        <div className="flex items-center justify-center">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white shadow-sm">
                                {no + row.index}
                            </div>
                        </div>
                    );
                },
                enableSorting: true,
                size: 70
            }
        ];

        const dataColumns = Columns.map((col): ColumnDef<TData> => {
            if (col.isActions) {
                return {
                    id: 'actions',
                    header: () => <div className="text-right">Actions</div>,
                    cell: ({ row }) => (
                        <div className="flex justify-end space-x-2">
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
                                compact
                                glass
                            />
                        </div>
                    ),
                    enableSorting: false,
                    enableHiding: true,
                    size: 140
                };
            }

            const columnDef: ColumnDef<TData> = {
                id: col.id || col.accessorKey || col.header,
                header: col.sortable
                    ? ({ column }) => (
                          <Button
                              variant="ghost"
                              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                              className="flex w-full items-center justify-start gap-2 px-4 hover:bg-blue-50 active:bg-blue-100 dark:hover:bg-blue-950 dark:active:bg-blue-900"
                          >
                              <span className="truncate text-xs font-semibold sm:text-sm">{col.header}</span>
                              <ArrowUpDown className="h-3 w-3 flex-shrink-0" />
                          </Button>
                      )
                    : () => <div className="truncate px-4 text-xs font-semibold sm:text-sm">{col.header}</div>,
                enableSorting: !!col.sortable,
                minSize: 100,
                size: col.accessorKey?.includes('name') || col.accessorKey?.includes('title') ? 220 : 140
            };

            if (col.accessorFn) {
                columnDef.accessorFn = col.accessorFn;
            } else if (col.accessorKey) {
                columnDef.accessorKey = col.accessorKey;
            }

            if (col.cell) {
                columnDef.cell = ({ row }) => col.cell!(row.original);
            } else {
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

                    if (Array.isArray(value)) {
                        return (
                            <div className="flex flex-wrap gap-1 px-4">
                                {value.slice(0, 2).map((v, i) => (
                                    <div
                                        key={i}
                                        className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs text-white shadow-xs"
                                    >
                                        {v.name || String(v)}
                                    </div>
                                ))}
                                {value.length > 2 && (
                                    <div className="rounded-full bg-gray-500 px-2 py-1 text-xs text-white shadow-xs">+{value.length - 2}</div>
                                )}
                            </div>
                        );
                    }

                    return (
                        <div className="px-4">
                            <span className="block truncate text-sm font-medium">{String(value ?? '')}</span>
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
            minSize: 100,
            size: 160,
            maxSize: 400
        }
    });

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

    // Mobile Card View Component - Touch Optimized
    const MobileCardView = () => (
        <div className="space-y-4">
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                    <div
                        key={row.id}
                        className="touch-pan-y rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/30 p-4 shadow-lg active:scale-95 active:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-blue-950/20"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-bold text-white shadow-sm">
                                    {(paginate?.from || 1) + index}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{`Row No ${index + 1}`}</h3>
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="rounded-full bg-white shadow-sm active:bg-gray-100 dark:bg-gray-700 dark:active:bg-gray-600"
                                    >
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="shadow-xl">
                                    <CustomActionsButtons
                                        infoBtn={{
                                            label: 'View Details',
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
                                        vertical
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="mt-3 space-y-2">
                            {Columns.filter((col) => !col.isActions && col.accessorKey)
                                .slice(0, 5)
                                .map((col) => {
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                                        {getValue(row.original, 'name') || getValue(row.original, 'title') || `Item ${index + 1}`}
                                    </h3>;
                                    const value = col.accessorFn ? col.accessorFn(row.original) : getValue(row.original, col.accessorKey!);
                                    return value ? (
                                        <div key={col.id} className="flex justify-between text-sm">
                                            <span className="font-medium text-gray-600 dark:text-gray-400">{col.header}:</span>
                                            <span className="font-semibold text-gray-900 dark:text-white">{String(value)}</span>
                                        </div>
                                    ) : null;
                                })}
                        </div>
                    </div>
                ))
            ) : (
                <div className="flex h-40 items-center justify-center rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50/50 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-gray-700/50">
                    <div className="text-center">
                        <BoxSelectIcon className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-gray-600 dark:text-gray-400">{emptyText}</p>
                    </div>
                </div>
            )}
        </div>
    );

    // -------------------------------------------------
    // RENDER
    // -------------------------------------------------
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 px-4 py-6 sm:px-6 dark:from-gray-900 dark:via-blue-950/20 dark:to-cyan-950/10">
            {actionsData && <CustomActionToaster actions={actionsData} />}
            {flashData && <CustomToaster flash={flashData} />}

            {/* Header Section with Solid Design */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/50 p-6 shadow-xl dark:border-gray-700 dark:from-gray-800 dark:to-blue-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 p-2 shadow-lg">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                                {description && <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        {Header?.button && (
                            <Button
                                onClick={Header.button.onClick}
                                className="gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg active:from-blue-600 active:to-cyan-600 active:shadow-md"
                                size="sm"
                            >
                                {Header.button.icon && <Header.button.icon className="h-4 w-4" />}
                                {Header.button.label}
                            </Button>
                        )}
                        {Header?.children}
                    </div>
                </div>
            </div>

            {/* Controls Bar with Solid Design */}
            <div className="mb-6 rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50/30 p-6 shadow-lg dark:border-gray-700 dark:from-gray-800 dark:to-blue-950/20">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {/* Search with Clear Design */}
                    <div className="relative flex-1 sm:max-w-md">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            placeholder="Search records..."
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="border-gray-300 bg-white pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                        />
                    </div>

                    {/* View Toggle & Controls */}
                    <div className="flex items-center gap-3">
                        {/* View Toggle - Only show on mobile */}
                        {isMobile && (
                            <Tabs value={activeView} onValueChange={(v) => setActiveView(v as any)} className="w-full">
                                <TabsList className="grid w-full grid-cols-2 gap-1 rounded-lg bg-gray-100 p-1 dark:bg-gray-700">
                                    <TabsTrigger
                                        value="table"
                                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white data-[state=active]:shadow-sm"
                                    >
                                        <BoxSelectIcon className="h-4 w-4" />
                                        Table
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="cards"
                                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-700/95 data-[state=active]:text-white data-[state=active]:shadow-sm"
                                    >
                                        <Smartphone className="h-4 w-4" />
                                        Cards
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        )}

                        {/* Column Toggle */}

                        {activeView === 'table' && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 border-gray-300 bg-white shadow-sm active:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:active:bg-gray-600"
                                    >
                                        <Filter className="h-4 w-4" />
                                        <span className="hidden sm:inline">Columns</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="shadow-xl">
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
                                                {col.id.replace('_', ' ')}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>
                </div>
            </div>

            {/* Data Display */}
            {isMobile && activeView === 'cards' ? (
                <MobileCardView />
            ) : (
                /* Table View with Solid Design */
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800">
                    <ScrollArea className="w-full">
                        <div className="overflow-auto">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow
                                            key={headerGroup.id}
                                            className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30"
                                        >
                                            {headerGroup.headers.map((header) => (
                                                <TableHead
                                                    key={header.id}
                                                    className="px-4 py-4 text-xs font-bold tracking-wider whitespace-nowrap text-gray-700 uppercase sm:text-sm dark:text-gray-300"
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
                                            <TableRow
                                                key={row.id}
                                                className="border-gray-200 transition-colors even:bg-gray-50/50 hover:bg-blue-50/30 active:bg-blue-100 dark:border-gray-700 dark:even:bg-gray-700/50 dark:hover:bg-blue-950/30 dark:active:bg-blue-900/50"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className="px-4 py-4 text-sm"
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
                                            <TableCell colSpan={Columns.length + 1} className="h-40 text-center">
                                                <div className="flex flex-col items-center gap-3 text-gray-500 dark:text-gray-400">
                                                    <div className="rounded-full bg-gradient-to-br from-gray-200 to-gray-300 p-4 shadow-sm dark:from-gray-600 dark:to-gray-700">
                                                        <BoxSelectIcon className="h-8 w-8" />
                                                    </div>
                                                    <p className="text-lg font-medium">{emptyText}</p>
                                                    <p className="text-sm">Try adjusting your search or filters</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            )}

            {/* Pagination & Info with Solid Design */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                {paginate && paginate.total > 0 && (
                    <div className="text-center text-sm text-gray-600 sm:text-left dark:text-gray-400">
                        Showing{' '}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            {paginate.from}-{paginate.to}
                        </span>{' '}
                        of <span className="font-semibold text-gray-900 dark:text-white">{paginate.total}</span> results
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
