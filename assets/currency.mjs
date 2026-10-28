export function parseRates(data, now = new Date()) {
 if (data?.result !== 'success' || data?.base_code !== 'RUB' || !Number.isFinite(data?.time_last_update_unix)) return null;
 const date = new Date(data.time_last_update_unix * 1000);
 const age = now.getTime() - date.getTime();
 if (!Number.isFinite(age) || age > 7 * 86400000 || age < -86400000) return null;
 const rates = {date: date.toISOString().slice(0,10)};
 for (const code of ['USD','EUR']) {
  const value = data?.rates?.[code];
  if (!Number.isFinite(value) || value <= 0) return null;
  rates[code] = value;
 }
 return rates;
}
export function quote(amount, currency, rates) {
 if (!['USD','EUR'].includes(currency) || !Number.isFinite(rates?.[currency]) || rates[currency] <= 0) return {amount,currency:'RUB'};
 return {amount:amount*rates[currency],currency};
}
