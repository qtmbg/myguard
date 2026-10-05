'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function normalizeVendorQuote(a){
  const months=Math.max(1,Math.floor(num(a.term_months,12)));
  const oneTime=Math.max(0,num(a.one_time_fee))+Math.max(0,num(a.implementation_fee))+Math.max(0,num(a.migration_fee));
  const monthly=Math.max(0,num(a.monthly_fee))+Math.max(0,num(a.estimated_monthly_usage_fee))+Math.max(0,num(a.monthly_support_fee));
  const increase=Math.max(0,num(a.annual_price_increase_percent))/100;
  let recurring=0;
  for(let m=1;m<=months;m++){
    const year=Math.floor((m-1)/12);
    recurring += monthly*Math.pow(1+increase,year);
  }
  const exit=Math.max(0,num(a.expected_exit_cost));
  const total=oneTime+recurring+exit;
  return {currency:String(a.currency||'USD').toUpperCase(),term_months:months,one_time_cost:Math.round(oneTime*100)/100,recurring_cost:Math.round(recurring*100)/100,expected_exit_cost:Math.round(exit*100)/100,total_cost_of_ownership:Math.round(total*100)/100,effective_monthly_cost:Math.round(total/months*100)/100,note:'TCO uses only the supplied commercial assumptions. Compare scope coverage, service levels, exclusions, renewal terms, usage caps, and lock-in separately.'};
}
module.exports={normalizeVendorQuote};
