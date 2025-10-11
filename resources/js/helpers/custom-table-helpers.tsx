
// Safe nested property getter (e.g. deepGet(row, 'customer.user.name'))
export function deepGet(obj: any, path: string) {
    // Uses optional chaining on the accumulator (acc)
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

// Handles ->formatters like ->toFixed(2), ->formatDate(YYYY-MM-DD)
export function formatValue(value: any, formatter?: string) {
    if (!formatter) return value;

    // Splits 'toFixed(2)' into ['toFixed', '2']
    const [fn, arg] = formatter
        .split(/\((.*)\)/)
        .map((v) => v.trim())
        .filter(Boolean);

    switch (fn) {
        case 'toFixed':
            // Handles missing or non-numeric values gracefully
            const numValue = Number(value);
            return isNaN(numValue) ? value : numValue.toFixed(Number(arg || 2));
        case 'toString':
            return String(value);
        case 'dash':
            return value ?? '-'; // Use nullish coalescing for cleaner fallback
        case 'formatDate':
            try {
                const date = new Date(value);
                if (isNaN(date.getTime())) return value;
                const fmt = arg || 'YYYY-MM-DD';
                return fmt
                    .replace('DD', String(date.getDate()).padStart(2, '0'))
                    .replace('MM', String(date.getMonth() + 1).padStart(2, '0'))
                    .replace('YYYY', String(date.getFullYear()));
            } catch {
                return value; // Return original value on error
            }
        default:
            return value;
    }
}

// Get formatted + fallback-safe value (handles || and ->)
export function getValue(obj: any, columnPath: string) {
    const [mainPart, fallback] = columnPath.split('||').map((s) => s.trim());
    const [path, ...formatters] = mainPart.split('->').map((s) => s.trim());

    let value = deepGet(obj, path);
    for (const f of formatters) value = formatValue(value, f);

    return value ?? fallback ?? 'N/A';
}
