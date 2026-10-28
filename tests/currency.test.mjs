import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRates, quote } from '../assets/currency.mjs';
const now = new Date('2026-10-28T10:00:00Z');
const fixture = {result:'success',base_code:'RUB',time_last_update_unix:Date.parse('2026-10-28T08:30:00Z')/1000,rates:{USD:0.0125,EUR:0.01}};
test('RUB conversion uses target units per RUB', () => {
 const rates = parseRates(fixture, now);
 assert.equal(quote(40000,'USD',rates).amount,500);
 assert.equal(quote(25000,'EUR',rates).amount,250);
 assert.equal(quote(3000,'USD',rates).amount,37.5);
});
test('missing rates preserve actual RUB amounts', () => {
 assert.deepEqual(quote(40000,'USD',null), {amount:40000,currency:'RUB'});
});
test('zero, negative, malformed and missing rates are rejected', () => {
 for (const bad of [0,-1,NaN,Infinity,'80',undefined]) {
  const data=structuredClone(fixture); data.rates.USD=bad;
  assert.equal(parseRates(data,now),null);
 }
 assert.equal(parseRates({},now),null);
});
test('stale and implausibly future dates are not represented as current', () => {
 for (const date of ['2026-10-01T00:00:00Z','2026-11-01T00:00:00Z','garbage']) {
  assert.equal(parseRates({...fixture,time_last_update_unix:Date.parse(date)/1000},now),null);
 }
});
test('rate date is preserved and valid holiday gaps accepted', () => {
 const rates=parseRates({...fixture,time_last_update_unix:Date.parse('2026-10-24T08:30:00Z')/1000},now);
 assert.equal(rates.date,'2026-10-24');
 assert.equal(quote(40000,'EUR',rates).currency,'EUR');
});
test('wrong base and provider errors are rejected',()=>{
 assert.equal(parseRates({...fixture,base_code:'USD'},now),null);
 assert.equal(parseRates({...fixture,result:'error'},now),null);
});
