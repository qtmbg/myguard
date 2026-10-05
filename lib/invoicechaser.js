'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function assessCollection(a){
  const invoice=Math.max(0,num(a.invoice_amount));
  const paid=clamp(num(a.amount_paid),0,invoice);
  const outstanding=Math.max(0,invoice-paid);
  const days=Math.max(0,Math.floor(num(a.days_overdue)));
  const reminders=Math.max(0,Math.floor(num(a.reminders_sent)));
  const disputed=Boolean(a.disputed);
  const missed=Boolean(a.promised_payment_date_missed);
  let risk=clamp(days*1.1 + reminders*8 + (missed?18:0) + (disputed?12:0),0,100);
  let stage='FRIENDLY_REMINDER';
  let next='Send a short factual reminder confirming invoice number, outstanding amount, due date, and payment instructions.';
  if(outstanding===0){stage='PAID';risk=0;next='No collection action needed.';}
  else if(disputed){stage='RESOLVE_DISPUTE';next='Pause escalation language and resolve the stated dispute with evidence, scope, delivery records, and the agreed payment terms.';}
  else if(days>=45 || reminders>=3 || missed){stage='FIRM_PRE_ESCALATION';next='Send a firm factual notice summarizing the payment history and asking for a concrete payment date. Avoid unsupported legal threats.';}
  else if(days>=15 || reminders>=1){stage='FIRM_REMINDER';next='Send a firm reminder, restate the overdue amount and ask for a specific payment date.';}
  return {currency:String(a.currency||'USD').toUpperCase(),invoice_amount:invoice,amount_paid:paid,outstanding_amount:outstanding,days_overdue:days,risk_score:Math.round(risk),stage,next_step:next,note:'Collection workflow support only. Contractual remedies, late fees, statutory interest, and legal escalation must be verified from the governing agreement and applicable law.'};
}
module.exports={assessCollection};
