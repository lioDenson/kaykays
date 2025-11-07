// utils/timeFormat.ts
export function formatTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHrs = Math.floor(diffMin / 60);

    const isSameDay = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

    if (diffMin < 60) {
        return diffMin <= 1 ? 'just now' : `${diffMin} mins ago`;
    }

    if (diffHrs < 6) {
        return `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
    }

    if (isSameDay) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString();
}
