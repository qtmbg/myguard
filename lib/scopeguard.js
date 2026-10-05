'use strict';

function num(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
function money(value) { return Math.round((value + Number.EPSILON) * 100) / 100; }

function priceScope(a) {
  const rate = Math.max(0, num(a.rate_amount));
  const minimum = Math.max(0, num(a.minimum_fee));
  const overhead = clamp(num(a.overhead_percent), 0, 300) / 100;
  const contingency = clamp(num(a.contingency_percent), 0, 300) / 100;
  const multiplier = (1 + overhead) * (1 + contingency);
  const calc = effort => Math.max(minimum, Math.max(0, num(effort)) * rate * multiplier);
  const lean = calc(a.lean_effort);
  const expected = calc(a.expected_effort);
  const protectedPrice = calc(a.protected_effort);
  return {
    currency: String(a.currency || 'USD').toUpperCase(),
    rate_unit: a.rate_unit === 'day' ? 'day' : 'hour',
    rate_amount: money(rate),
    applied_overhead_percent: money(overhead * 100),
    applied_contingency_percent: money(contingency * 100),
    minimum_fee: money(minimum),
    lean_price: money(lean),
    expected_price: money(expected),
    protected_price: money(protectedPrice),
    floor_warning: expected <= minimum ? 'The minimum fee is driving the expected price.' : null,
    note: 'Pricing math only. Scope completeness and commercial judgment must come from the workflow and user-provided facts.'
  };
}

function priceScopeChange(a) {
  const effort = Math.max(0, num(a.incremental_effort));
  const rate = Math.max(0, num(a.rate_amount));
  const overhead = clamp(num(a.overhead_percent), 0, 300) / 100;
  const contingency = clamp(num(a.contingency_percent), 0, 300) / 100;
  const price = effort * rate * (1 + overhead) * (1 + contingency);
  return {
    currency: String(a.currency || 'USD').toUpperCase(),
    incremental_effort: money(effort),
    rate_unit: a.rate_unit === 'day' ? 'day' : 'hour',
    incremental_price: money(price),
    note: 'Use only after the model has classified the request as new or ambiguous scope.'
  };
}

module.exports = { priceScope, priceScopeChange };
