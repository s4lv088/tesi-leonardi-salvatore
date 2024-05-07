import { CalendarDate } from '@internationalized/date';
import { format } from 'date-fns';

export const DATETIME_FORMATTER = new Intl.DateTimeFormat('it', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
});

export const formatDatetime = (date: string | number | Date | undefined) => {
    if (!date) return '';
    return DATETIME_FORMATTER.format(new Date(date));
};

export const CURRENCY_FORMATTER = new Intl.NumberFormat('it', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
export const formatCurrency = (value: number | bigint) => {
    if (value === undefined || value === null) return '';
    return CURRENCY_FORMATTER.format(value);
};

export const DATE_FORMATTER = new Intl.DateTimeFormat('it', { day: '2-digit', month: '2-digit', year: 'numeric' });

export const formatDate = (date: string | number | Date | undefined) => {
    if (!date) return '';
    return DATE_FORMATTER.format(new Date(date));
};

export const formatDateHMSZero = (date: Date) => {
    const current_date = format(date, 'yyyy-MM-dd');
    const current_time = '00:00:00';
    const date_time = current_date + ' ' + current_time;
    return date_time;
};

export const formateDateValue = (date: string) => {
    const dateValue = new CalendarDate(
        new Date(date).getFullYear(),
        new Date(date).getMonth() + 1,
        new Date(date).getDate()
    );
    return dateValue;
};
