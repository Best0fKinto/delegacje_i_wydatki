export const getCurrencyName = (currencyId: number): string => {
    const currencies: Record<number, string> = {
      1: 'PLN',
      2: 'EUR',
      3: 'USD',
      4: 'GBP',
    };
    return currencies[currencyId] || 'PLN';
  };