export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function timeAgo(date: Date): string {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval == 1) {
        return `${interval} year ago`;
    }
    if (interval >= 1) {
        return `${interval} years ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval == 1) {
        return `${interval} month ago`;
    }
    if (interval > 1) {
        return `${interval} months ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval == 1) {
        return `${interval} day ago`;
    }
    if (interval > 1) {
        return `${interval} days ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval == 1) {
        return `${interval} hour ago`;
    }
    if (interval > 1) {
        return `${interval} hours ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval == 1) {
        return `${interval} minute ago`;
    }
    if (interval > 1) {
        return `${interval} minutes ago`;
    }
    return `${Math.floor(seconds)} seconds ago`;
}

export function extractInitials(snakeCaseString: string): string {
    if (snakeCaseString == null) return "";

    const words = snakeCaseString.split('_');
    const first = words[0] ? words[0].substring(0, 1) : '';
    const second = words[1] ? words[1].substring(0, 1) : '';

    return first + second;
}

function hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
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
