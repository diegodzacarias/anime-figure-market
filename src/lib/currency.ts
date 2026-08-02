// Tasas aproximadas para comparar precios en una sola divisa en pantallas admin que no tienen
// conversion en vivo desde el backend (a diferencia del price-ranking de figure-source-listings).
const APPROX_RATES_TO_USD: Record<string, number> = {
  USD: 1,
  JPY: 1 / 150,
};

export const convertApproxPrice = (
  price: number | null | undefined,
  fromCurrency: string | null | undefined,
  toCurrency: string
): number | null => {
  if (price === null || price === undefined || !fromCurrency || !toCurrency) return null;
  if (fromCurrency === toCurrency) return price;

  const fromRate = APPROX_RATES_TO_USD[fromCurrency];
  const toRate = APPROX_RATES_TO_USD[toCurrency];
  if (!fromRate || !toRate) return null;

  return (price * fromRate) / toRate;
};
