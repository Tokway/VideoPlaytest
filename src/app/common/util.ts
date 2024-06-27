export const getRandomInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) return `${interval} year${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) return `${interval} month${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) return `${interval} day${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) return `${interval} hour${interval > 1 ? 's' : ''} ago`;

    interval = Math.floor(seconds / 60);
    if (interval >= 1) return `${interval} minute${interval > 1 ? 's' : ''} ago`;

    return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
}

export function extractInitials(snakeCaseString: string): string {
    if (!snakeCaseString) return "";

    const words = snakeCaseString.split('_');
    const first = words[0]?.[0] || '';
    const second = words[1]?.[0] || '';

    return first + second;
}

function hashCode(str: string): number {
    return Array.from(str).reduce((hash, char) => {
        return (hash << 5) - hash + char.charCodeAt(0);
    }, 0);
}

export function generatePastelColorFromLetters(letters: string): string {
    const hash = hashCode(letters);
    const r = (hash & 0xFF0000) >> 16;
    const g = (hash & 0x00FF00) >> 8;
    const b = (hash & 0x0000FF);

    const pastelR = Math.floor((r + 255) / 2);
    const pastelG = Math.floor((g + 255) / 2);
    const pastelB = Math.floor((b + 255) / 2);

    return `#${pastelR.toString(16).padStart(2, '0')}${pastelG.toString(16).padStart(2, '0')}${pastelB.toString(16).padStart(2, '0')}`;
}
