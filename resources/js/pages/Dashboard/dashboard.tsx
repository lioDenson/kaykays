import CustomToaster from '@/components/custom/custom-toaster';
import {
    AlertCard,
    CompactActivityItem,
    DebtorItem,
    EventCard,
    FeedbackItem,
    GradientActionButton,
    GradientMetricCard,
    PerformanceMetric,
    TopItem
} from '@/components/custom/dashboard/components';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { formatTime } from '@/helpers/custom-time-format';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    Award,
    BarChart3,
    Calendar,
    Clock,
    CreditCard,
    MessageCircle,
    Package,
    Star,
    TrendingUp,
    Truck,
    Users,
    UserX,
    Zap
} from 'lucide-react';
import { lowStock, RecentSale, SaleStatistics, TopSales } from './types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard'
    }
];

export default function Dashboard({
    recentSales,
    customerCount,
    discoveredCustomers,
    lowStock,
    stockCount,
    saleStatistics,
    topSales,
    topDebtors,
}: {
    recentSales: RecentSale[];
    customerCount: number;
    discoveredCustomers: number;
    lowStock: lowStock[];
    stockCount: number;
    saleStatistics: SaleStatistics;
    topSales: TopSales[],
}) {
    const { flash } = usePage().props as any;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <CustomToaster flash={flash} />

            <div className="flex h-full flex-1 flex-col gap-4 p-4 lg:p-6">
                {/* Header with Welcome & Stats */}
                <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
                        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-3 dark:from-blue-900/20 dark:to-cyan-900/20">
                        <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <div className="text-sm">
                            <span className="font-medium text-blue-900 dark:text-blue-100">Live Updates</span>
                            <span className="ml-2 text-blue-700 dark:text-blue-300">• Active</span>
                        </div>
                    </div>
                </div>

                {/* Compact KPI Grid - Improved gradient backgrounds */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4">
                    <GradientMetricCard
                        title="Today's Sales"
                        value={saleStatistics.salesValue}
                        subtitle="KSH"
                        trend={saleStatistics.percentageDiff > 0 ? `+${saleStatistics.percentageDiff.toString()} %` : `${saleStatistics.percentageDiff.toString()} %`}
                        trendType={saleStatistics.percentageDiff > 0 ? 'up' : 'down'}
                        icon={<CreditCard className="h-4 w-4" />}
                        gradient="from-green-500/10 to-emerald-500/10"
                        darkGradient="from-green-900/20 to-emerald-900/20"
                    />
                    <GradientMetricCard
                        title="Deliveries"
                        value="8"
                        subtitle="Pending"
                        trend="3 Urgent"
                        trendType="warning"
                        icon={<Truck className="h-4 w-4" />}
                        gradient="from-orange-500/10 to-amber-500/10"
                        darkGradient="from-orange-900/20 to-amber-900/20"
                    />
                    <GradientMetricCard
                        title="Products"
                        value={stockCount.toString()}
                        subtitle="Active"
                        trend={lowStock.length > 0 ? lowStock.length.toString() + ' Products remain Below 15%' : 'All Above 15% balance'}
                        trendType={lowStock.length > 0 ? 'down' : 'up'}
                        icon={<Package className="h-4 w-4" />}
                        gradient="from-blue-500/10 to-cyan-500/10"
                        darkGradient="from-blue-900/20 to-cyan-900/20"
                    />
                    <GradientMetricCard
                        title="Customers"
                        value={customerCount.toString()}
                        subtitle="Total"
                        trend={`+ ${discoveredCustomers.toString()} New User`}
                        trendType="up"
                        icon={<Users className="h-4 w-4" />}
                        gradient="from-purple-500/10 to-violet-500/10"
                        darkGradient="from-purple-900/20 to-violet-900/20"
                    />
                </div>

                {/* Main Content Grid - Optimized layout */}
                <div className="grid gap-4 lg:grid-cols-7">
                    {/* Left Column - Charts & Top Performers */}
                    <div className="space-y-4 lg:col-span-4">
                        {/* Top Row - Charts */}
                        <div className="grid gap-4 md:grid-cols-1">
                            {/* Sales Chart */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-gray-50/50 p-4 shadow-xs dark:from-gray-900 dark:to-gray-800/50">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        <BarChart3 className="h-4 w-4 text-green-500" />
                                        Sales Trend
                                    </h3>
                                    <select className="border-0 bg-transparent text-xs text-gray-500 focus:ring-0">
                                        <option>7 Days</option>
                                        <option>30 Days</option>
                                    </select>
                                </div>
                                <div className="relative aspect-[4/2] overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <PlaceholderPattern className="absolute inset-0 size-full stroke-gray-300 dark:stroke-gray-600" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Sales Chart</span>
                                    </div>
                                </div>
                            </div>

                            {/* Top Sales */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-amber-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-amber-900/10">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        <Award className="h-4 w-4 text-amber-500" />
                                        Top Sales
                                    </h3>
                                    <Star className="h-4 w-4 text-amber-500" />
                                </div>
                                <div className="space-y-3">
                                    {
                                        topSales && topSales.map((sale, index) => {
                                            return (
                                                <TopItem key={index} rank={index + 1} name={sale.customer} value={`${sale.total.toString()} KSH`} />
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        {/* Middle Row - Recent Activity & Top Debtors */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Recent Sales */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-blue-900/10">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Sales</h3>
                                    <span className="text-xs text-gray-500">View All</span>
                                </div>
                                <div className="space-y-2">
                                    {recentSales &&
                                        recentSales.map((sale, index) => {
                                            return (
                                                <CompactActivityItem
                                                    key={index}
                                                    title={sale.invoice_number}
                                                    amount={sale.total_cost}
                                                    time={formatTime(sale.date)}
                                                />
                                            );
                                        })}
                                    {/* <CompactActivityItem title="Sale #2845" amount="2,450 KSH" time="2m ago" />
                                    <CompactActivityItem title="Sale #2844" amount="1,890 KSH" time="15m ago" />
                                    <CompactActivityItem title="Sale #2843" amount="3,210 KSH" time="1h ago" />
                                    <CompactActivityItem title="Sale #2842" amount="4,150 KSH" time="2h ago" /> */}
                                </div>
                            </div>

                            {/* Top Debtors */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-red-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-red-900/10">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        <UserX className="h-4 w-4 text-red-500" />
                                        Top Debtors
                                    </h3>
                                    <AlertTriangle className="h-4 w-4 text-red-500" />
                                </div>
                                <div className="space-y-3">
                                    <DebtorItem name="Robert Brown" amount="15,200 KSH" days={45} />
                                    <DebtorItem name="Lisa Anderson" amount="12,800 KSH" days={32} />
                                    <DebtorItem name="David Miller" amount="9,500 KSH" days={28} />
                                    <DebtorItem name="Emma Davis" amount="7,200 KSH" days={21} />
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row - Quick Actions */}
                        <div className="rounded-xl bg-gradient-to-br from-white to-purple-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-purple-900/10">
                            <h3 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <GradientActionButton
                                    label="New Sale"
                                    href="/sales/create"
                                    icon={<CreditCard className="h-4 w-4" />}
                                    gradient="from-green-500 to-emerald-500"
                                />
                                <GradientActionButton
                                    label="Products"
                                    href="/products"
                                    icon={<Package className="h-4 w-4" />}
                                    gradient="from-blue-500 to-cyan-500"
                                />
                                <GradientActionButton
                                    label="Deliveries"
                                    href="/deliveries"
                                    icon={<Truck className="h-4 w-4" />}
                                    gradient="from-orange-500 to-amber-500"
                                />
                                <GradientActionButton
                                    label="Customers"
                                    href="/customers"
                                    icon={<Users className="h-4 w-4" />}
                                    gradient="from-purple-500 to-violet-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Performance, Feedback & Alerts */}
                    <div className="space-y-4 lg:col-span-3">
                        {/* Performance Metrics */}
                        <div className="rounded-xl bg-gradient-to-br from-white to-green-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-green-900/10">
                            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                <TrendingUp className="h-4 w-4 text-green-500" />
                                Performance Metrics
                            </h3>
                            <div className="space-y-3">
                                <PerformanceMetric label="Conversion Rate" value="68%" change="+5.2%" changeType="positive" />
                                <PerformanceMetric label="Avg. Order Value" value="2,845 KSH" change="+12.3%" changeType="positive" />
                                <PerformanceMetric label="Delivery Time" value="45 min" change="-8.1%" changeType="negative" />
                                <PerformanceMetric label="Customer Satisfaction" value="94%" change="+2.1%" changeType="positive" />
                            </div>
                        </div>

                        {/* Suggestions & Complaints */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-4">
                            {/* Suggestions */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-blue-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-blue-900/10">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        <MessageCircle className="h-4 w-4 text-blue-500" />
                                        Suggestions
                                    </h3>
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                                        3 New
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <FeedbackItem type="suggestion" text="Add more payment options" author="Customer" time="2h ago" />
                                    <FeedbackItem type="suggestion" text="Extend delivery hours" author="Mike J." time="1d ago" />
                                    <FeedbackItem type="suggestion" text="Improve product search" author="Sarah W." time="2d ago" />
                                </div>
                            </div>

                            {/* Complaints */}
                            <div className="rounded-xl bg-gradient-to-br from-white to-red-50/30 p-4 shadow-xs dark:from-gray-900 dark:to-red-900/10">
                                <div className="mb-3 flex items-center justify-between">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                                        <AlertTriangle className="h-4 w-4 text-red-500" />
                                        Complaints
                                    </h3>
                                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-900/50 dark:text-red-300">
                                        2 New
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <FeedbackItem type="complaint" text="Late delivery yesterday" author="John D." time="5h ago" urgent />
                                    <FeedbackItem type="complaint" text="Wrong item received" author="Lisa M." time="1d ago " />
                                    <FeedbackItem type="complaint" text="Poor packaging quality" author="Robert B." time="3d ago" />
                                </div>
                            </div>
                        </div>

                        {/* Alerts Stack */}
                        {/* Alerts & Today's Events - 2 Column Layout */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {/* Alerts Column */}
                            <div className="space-y-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <AlertTriangle className="h-4 w-4 text-orange-500" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">System Alerts</h3>
                                </div>
                                <AlertCard
                                    icon={<Package className="h-4 w-4" />}
                                    title="Low Stock Alert"
                                    message="12 products need restocking"
                                    type="warning"
                                />
                                <AlertCard
                                    icon={<Clock className="h-4 w-4" />}
                                    title="Pending Actions"
                                    message="3 deliveries need attention"
                                    type="info"
                                />
                                <AlertCard
                                    icon={<TrendingUp className="h-4 w-4" />}
                                    title="Revenue Milestone"
                                    message="12% increase today"
                                    type="success"
                                />
                            </div>

                            {/* Today's Events Column */}
                            <div className="space-y-3">
                                <div className="mb-2 flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Today's Events</h3>
                                </div>
                                <EventCard
                                    icon={<Truck className="h-4 w-4" />}
                                    title="Delivery Schedule"
                                    events={[{ time: '09:00 AM', description: 'Morning deliveries dispatch' }]}
                                    type="schedule"
                                />

                                <EventCard
                                    icon={<CreditCard className="h-4 w-4" />}
                                    title="Financial Reminders"
                                    events={[
                                        { time: '11:00 AM', description: 'Bank deposit deadline' },
                                        { time: '04:00 PM', description: 'Daily sales report' }
                                    ]}
                                    type="reminder"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

// Improved Components with Gradients
