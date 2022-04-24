import dayjs from 'dayjs';

export function toReadableDateString(date: Date): string {
    const d = dayjs(date);
    return d.format('DD MMM YYYY');
}

export function getStartAndEndDateOfMonth(year: number, month: number): {startDate: Date, endDate: Date} {
    const d = dayjs(new Date(year, month));
    return {startDate: d.startOf('month').toDate(), endDate: d.endOf('month').toDate()}
}

export function areTwoDatesEqualInYearAndMonth(a: Date, b: Date): boolean {
    return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
}

export function areTwoDatesEqualWithoutTimestamp(a: Date, b: Date): boolean {
    return a.getDate() === b.getDate() && areTwoDatesEqualInYearAndMonth(a, b);
}