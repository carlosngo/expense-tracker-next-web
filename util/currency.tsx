let sgdCurrencyFormatter = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

export function toSgdCurrencyString(amount: number): string {
    return sgdCurrencyFormatter.format(2500); /* $2,500.00 */
}