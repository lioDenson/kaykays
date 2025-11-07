const GradientMetricCard = ({ title, value, subtitle, trend, trendType, icon, gradient, darkGradient }) => (
    <div className={`rounded-xl bg-gradient-to-br ${gradient} p-3 shadow-xs transition-all hover:shadow-sm dark:${darkGradient}`}>
        <div className="flex items-center justify-between">
            <div className="flex-1">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400">{title}</p>
                <div className="mt-1 flex items-baseline gap-1">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</span>
                </div>
                <p
                    className={`mt-1 text-xs font-medium ${
                        trendType === 'up'
                            ? 'text-green-600 dark:text-green-400'
                            : trendType === 'warning'
                              ? 'text-orange-600 dark:text-orange-400'
                              : 'text-red-600 dark:text-red-400'
                    }`}
                >
                    {trend}
                </p>
            </div>
            <div className="rounded-lg bg-white/50 p-2 backdrop-blur-sm dark:bg-black/20">{icon}</div>
        </div>
    </div>
);

const TopItem = ({ rank, name, value }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    rank === 1
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300'
                        : rank === 2
                          ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                          : 'bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300'
                }`}
            >
                {rank}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
    </div>
);

const DebtorItem = ({ name, amount, days }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-700 dark:bg-red-900/50 dark:text-red-300">
                !
            </div>
            <div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{name}</span>
                <span className="block text-xs text-red-600 dark:text-red-400">{days} days overdue</span>
            </div>
        </div>
        <span className="text-sm font-semibold text-red-700 dark:text-red-300">{amount}</span>
    </div>
);

const GradientActionButton = ({ label, href, icon, gradient }) => (
    <a
        href={href}
        className={`flex flex-col items-center gap-2 rounded-xl bg-gradient-to-r ${gradient} p-3 text-xs font-semibold text-white shadow-xs transition-all hover:scale-105 hover:shadow-sm`}
    >
        {icon}
        {label}
    </a>
);

const FeedbackItem = ({ type, text, author, time, urgent }) => (
    <div
        className={`rounded-lg p-2 ${
            type === 'complaint' ? 'bg-red-50/50 dark:bg-red-900/20' : 'bg-blue-50/50 dark:bg-blue-900/20'
        } ${urgent ? 'border border-red-200 dark:border-red-800' : ''}`}
    >
        <p className="text-sm text-gray-700 dark:text-gray-300">{text}</p>
        <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">by {author}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
        </div>
    </div>
);

const AlertCard = ({ icon, title, message, type }) => (
    <div
        className={`rounded-xl border p-3 ${
            type === 'warning'
                ? 'border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-900/20'
                : type === 'info'
                  ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20'
                  : 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20'
        }`}
    >
        <div className="flex items-start gap-2">
            {icon}
            <div className="flex-1">
                <h4
                    className={`text-sm font-semibold ${
                        type === 'warning'
                            ? 'text-orange-800 dark:text-orange-300'
                            : type === 'info'
                              ? 'text-blue-800 dark:text-blue-300'
                              : 'text-green-800 dark:text-green-300'
                    }`}
                >
                    {title}
                </h4>
                <p
                    className={`text-xs ${
                        type === 'warning'
                            ? 'text-orange-700 dark:text-orange-400'
                            : type === 'info'
                              ? 'text-blue-700 dark:text-blue-400'
                              : 'text-green-700 dark:text-green-400'
                    }`}
                >
                    {message}
                </p>
            </div>
        </div>
    </div>
);

// Keep existing components
const CompactActivityItem = ({ title, amount, time }) => (
    <div className="flex items-center justify-between rounded-lg bg-white/50 p-2 backdrop-blur-sm dark:bg-gray-800/50">
        <div>
            <p className="text-xs font-medium text-gray-900 dark:text-white">{title}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{amount}</p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">{time}</span>
    </div>
);

const PerformanceMetric = ({ label, value, change, changeType }) => (
    <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-400">{label}</span>
        <div className="text-right">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>
            <span className={`ml-1 text-xs ${changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {change}
            </span>
        </div>
    </div>
);

const EventCard = ({ icon, title, events, type }) => (
    <div
        className={`rounded-xl border p-3 ${
            type === 'schedule'
                ? 'border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-900/20'
                : type === 'meeting'
                  ? 'border-purple-200 bg-purple-50/50 dark:border-purple-800 dark:bg-purple-900/20'
                  : 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20'
        }`}
    >
        <div className="mb-3 flex items-center gap-2">
            {icon}
            <h4
                className={`text-sm font-semibold ${
                    type === 'schedule'
                        ? 'text-blue-800 dark:text-blue-300'
                        : type === 'meeting'
                          ? 'text-purple-800 dark:text-purple-300'
                          : 'text-green-800 dark:text-green-300'
                }`}
            >
                {title}
            </h4>
        </div>
        <div className="space-y-2">
            {events.map((event, index) => (
                <div key={index} className="flex items-start gap-3">
                    <div
                        className={`flex-shrink-0 rounded px-2 py-1 text-xs font-medium ${
                            type === 'schedule'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                                : type === 'meeting'
                                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
                                  : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
                        }`}
                    >
                        {event.time}
                    </div>
                    <span className="flex-1 text-xs text-gray-700 dark:text-gray-300">{event.description}</span>
                </div>
            ))}
        </div>
    </div>
);

export { AlertCard, CompactActivityItem, DebtorItem, EventCard, FeedbackItem, GradientActionButton, GradientMetricCard, PerformanceMetric, TopItem };
