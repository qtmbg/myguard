'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function classifySpend(a){
  const monthly=Math.max(0,num(a.monthly_cost));
  const util=clamp(num(a.utilization_percent,100),0,100);
  const overlap=clamp(num(a.overlap_score),0,100);
  const increase=Math.max(0,num(a.price_increase_percent));
  const essential=clamp(num(a.essentiality),0,100);
  const ownerKnown=Boolean(a.owner_known);
  const under=monthly*12*(1-util/100);
  let priority=(100-util)*.45+overlap*.25+increase*.8+(ownerKnown?0:12)-essential*.15;
  priority=Math.round(clamp(priority,0,100));
  const action=priority>=70?'CUT_OR_RENEGOTIATE':priority>=45?'REVIEW':'KEEP_MONITORED';
  return {currency:String(a.currency||'USD').toUpperCase(),annualized_cost:Math.round(monthly*12*100)/100,estimated_underutilized_spend:Math.round(under*100)/100,review_priority:priority,action,note:'This is spend triage, not accounting or tax advice. Confirm actual usage, contractual commitments, switching costs, and business criticality before canceling.'};
}
module.exports={classifySpend};
