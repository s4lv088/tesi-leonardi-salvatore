import { Row } from '@tanstack/react-table';
import { CURRENCY_FORMATTER, DATETIME_FORMATTER, DATE_FORMATTER } from './formatters';

export function formatRowCellToDate<T>(key: string) {
    return ({ row }: { row: Row<T> }) => {
        const val = row.getValue(key);
        if (!val) return '';
        return DATE_FORMATTER.format(new Date(row.getValue(key)));
    };
}

export function formatRowCelltoDatetime<T>(key: string) {
    return ({ row }: { row: Row<T> }) => {
        const val = row.getValue(key);
        if (!val) return '';
        return DATETIME_FORMATTER.format(new Date(row.getValue(key)));
    };
}
export function formatRowCelltoAmount<T>(key: string) {
    return ({ row }: { row: Row<T> }) => {
        const val = row.getValue(key);
        if (val === undefined) return '';
        return CURRENCY_FORMATTER.format(row.getValue(key));
    };
}
