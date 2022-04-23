import dayjs from 'dayjs';

export function toReadableDateString(date: Date): string {
    const d = dayjs(date);
    return d.format('DD MMM YYYY');
}