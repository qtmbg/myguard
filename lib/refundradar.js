'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function assessRefund(a){
  const age=Math.max(0,num(a.purchase_age_days));
  const window=a.return_window_days===null||a.return_window_days===undefined?null:Math.max(0,num(a.return_window_days));
  const signals=[];
  let confidence=0;
  let route='REQUEST_POLICY_REVIEW';
  if(window!==null){
    if(age<=window){signals.push('Purchase appears to be inside the stated return window.');confidence+=35;route='STANDARD_RETURN';}
    else {signals.push('Purchase appears to be outside the stated standard return window.');confidence+=10;}
  }
  if(a.item_defective){signals.push('A defect may create a warranty, merchant-policy, or statutory-remedy route.');confidence+=20;route='DEFECT_OR_WARRANTY';}
  if(a.service_not_delivered){signals.push('The paid service was reportedly not delivered.');confidence+=25;route='NON_DELIVERY';}
  if(a.duplicate_charge){signals.push('A duplicate charge is reported.');confidence+=30;route='DUPLICATE_CHARGE';}
  if(a.unauthorized_charge){signals.push('An unauthorized charge is reported.');confidence+=30;route='UNAUTHORIZED_CHARGE';}
  if(a.auto_renewal_days_ago!==null&&a.auto_renewal_days_ago!==undefined){
    const d=Math.max(0,num(a.auto_renewal_days_ago));
    signals.push(`Auto-renewal was reported ${d} day${d===1?'':'s'} ago; current cancellation/refund terms should be checked.`);
    confidence+=d<=7?20:10;
    if(route==='REQUEST_POLICY_REVIEW') route='AUTO_RENEWAL';
  }
  if(a.cancellation_requested_before_renewal){signals.push('User reports requesting cancellation before renewal.');confidence+=15;}
  if(a.policy_allows_exception){signals.push('The supplied merchant policy appears to include a relevant exception.');confidence+=20;}
  confidence=Math.min(95,Math.round(confidence));
  return {
    route,
    policy_signal: confidence>=65?'STRONG':confidence>=35?'POSSIBLE':'UNCLEAR',
    confidence,
    signals,
    next_step:'Verify the current merchant/provider policy and any applicable local consumer rules from an authoritative source, then prepare the claim with evidence.',
    note:'This is policy-based decision support, not legal advice and not a guarantee of a refund.'
  };
}
function recoveryAmount(a){
  const base=Math.max(0,num(a.base_amount));
  const fees=Math.max(0,num(a.refundable_fees));
  const credits=Math.max(0,num(a.additional_credits));
  return {currency:String(a.currency||'USD').toUpperCase(),potential_recovery:Math.round((base+fees+credits)*100)/100};
}
module.exports={assessRefund,recoveryAmount};
