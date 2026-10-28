import {parseRates,quote} from './currency.mjs';
const select = document.querySelector('#currency');
if (select) {
 const status = document.querySelector('#rate-status');
 status.textContent = 'Base prices in RUB. Loading current conversion rates…';
 let rates = null;
 const paint = () => {
  document.querySelectorAll('[data-rub]').forEach(el => {
   const price=quote(Number(el.dataset.rub),select.value,rates);
   el.textContent=new Intl.NumberFormat('en-US',{style:'currency',currency:price.currency,maximumFractionDigits:0}).format(price.amount);
  });
 };
 select.addEventListener('change',paint);
 const loadRates = async () => {
  const now=Date.now();
  try {
   const cached=JSON.parse(localStorage.getItem('portfolio-rates-v1'));
   if(cached && now-cached.saved>=0 && now-cached.saved<86400000 && parseRates(cached.data)) return cached.data;
  } catch { /* Storage may be disabled; continue with the network. */ }
  const controller = new AbortController();
  const timer = setTimeout(()=>controller.abort(),8000);
  try {
   const response=await fetch('https://open.er-api.com/v6/latest/RUB',{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer'});
   if(!response.ok)throw new Error('Rate service unavailable');
   const data=await response.json();
   if(!parseRates(data))throw new Error('Invalid or outdated rates');
   try {localStorage.setItem('portfolio-rates-v1',JSON.stringify({saved:now,data}));} catch {}
   return data;
  } finally {clearTimeout(timer);}
 };
 loadRates().then(data=>{
  rates=parseRates(data);
  if(!rates)throw new Error('Invalid or outdated rates');
  status.textContent=`Indicative conversion · Rate date: ${rates.date} (UTC). Final quote agreed individually.`;
  select.disabled=false;paint();
 }).catch(()=>{status.textContent='Current exchange rates are unavailable. Base prices are shown in RUB.';paint();});
}
