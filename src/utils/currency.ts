import { CurrencyCode } from '../types/invoice';

export const CURRENCY_OPTIONS: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: 'USD', label: 'US Dollar (USD)', symbol: '$' },
  { code: 'PKR', label: 'Pakistani Rupee (PKR)', symbol: '₨' },
  { code: 'EUR', label: 'Euro (EUR)', symbol: '€' },
  { code: 'GBP', label: 'British Pound (GBP)', symbol: '£' },
  { code: 'AED', label: 'UAE Dirham (AED)', symbol: 'د.إ' },
];

export function getCurrencySymbol(code: CurrencyCode): string {
  const found = CURRENCY_OPTIONS.find((c) => c.code === code);
  return found ? found.symbol : CURRENCY_OPTIONS[0].symbol;
}

export function formatCurrency(amount: number, currency: CurrencyCode): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${amount.toFixed(2)}`;
}


