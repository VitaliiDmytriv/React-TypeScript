export function getDate(milliseconds: number) {
    const date = new Date(milliseconds);
    return Intl.DateTimeFormat('uk-UA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
    }).format(date);
}
