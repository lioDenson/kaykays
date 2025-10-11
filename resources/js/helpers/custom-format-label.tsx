export function CustomFormatLabel(str?: string | null): string {
    if (typeof str !== 'string' || !str.trim()) {
        return '';
    }

    return str
        .replace(/[-._]/g, ' ') // replace -, ., _ with space
        .split(' ') // split into words
        .filter(Boolean) // remove empty strings
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}
