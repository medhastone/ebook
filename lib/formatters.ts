/**
 * Indian Number and Currency Formatting Utilities
 */

export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }
  const rounded = Math.round(amount);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(rounded);
}

export function formatNumberIndian(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '0';
  }
  return new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}
