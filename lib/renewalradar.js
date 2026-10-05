'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function assessRenewal(a){
  const annual=Math.max(0,num(a.annualized_spend));
  const days=Math.floor(num(a.days_to_renewal,999));
  const notice=Math.max(0,Math.floor(num(a.notice_period_days)));
  const util=clamp(num(a.utilization_percent,100),0,100);
  const increase=Math.max(0,num(a.price_increase_percent));
  const overlap=clamp(num(a.overlap_score),0,100);
  const critical=clamp(num(a.criticality),0,100);
  const auto=Boolean(a.auto_renews);
  const underused=annual*(1-util/100);
  const window=days-notice;
  let priority=(100-util)*.35+overlap*.25+increase*.8+(auto&&window<=30?25:0)+(annual>10000?10:0)-critical*.15;
  priority=Math.round(clamp(priority,0,100));
  let action='REVIEW';
  if(days<0) action='RENEWED_OR_EXPIRED';
  else if(auto && window<=0) action='NOTICE_WINDOW_AT_RISK';
  else if(priority>=70) action='RENEGOTIATE_OR_CANCEL';
  else if(priority>=45) action='REVIEW_BEFORE_RENEWAL';
  else action='LIKELY_RENEW';
  return {annualized_spend:Math.round(annual*100)/100,currency:String(a.currency||'USD').toUpperCase(),days_to_renewal:days,notice_period_days:notice,days_until_notice_deadline:window,estimated_underutilized_spend:Math.round(underused*100)/100,priority_score:priority,action,note:'Review current contract terms before acting. This does not determine legal termination rights or whether a notice is valid.'};
}
module.exports={assessRenewal};
