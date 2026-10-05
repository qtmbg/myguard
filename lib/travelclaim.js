'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function summarizeDisruption(a){
  const delay=Math.max(0,num(a.arrival_delay_minutes));
  const bag=Math.max(0,num(a.baggage_delay_hours));
  const canceled=Boolean(a.canceled);
  const denied=Boolean(a.denied_boarding);
  const rerouted=Boolean(a.rerouted);
  const level=canceled||denied||delay>=240?'MAJOR':delay>=120||bag>=24?'SIGNIFICANT':delay>=60||bag>0?'MODERATE':'MINOR';
  return {disruption_level:level,arrival_delay_minutes:delay,canceled,denied_boarding:denied,rerouted,baggage_delay_hours:bag,policy_check_required:true,next_step:'Verify the applicable airline policy and official passenger-rights rules for the itinerary, carrier, dates, and disruption reason before claiming any entitlement.',note:'This tool summarizes facts only. It does not determine legal entitlement or compensation.'};
}
function calcExpenses(a){
  const items=Array.isArray(a.items)?a.items:[];
  const clean=items.map(x=>({label:String(x.label||'Expense'),amount:Math.max(0,num(x.amount))}));
  const total=clean.reduce((s,x)=>s+x.amount,0);
  return {currency:String(a.currency||'USD').toUpperCase(),documented_expenses:clean,total_documented_expenses:Math.round(total*100)/100,note:'Documented expense total only. Reimbursement eligibility must be verified separately.'};
}
module.exports={summarizeDisruption,calcExpenses};
