'use strict';
function num(v, d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function scoreBid(a){
  const eligible = Boolean(a.eligibility_pass);
  const total = Math.max(1, num(a.mandatory_total,1));
  const covered = clamp(num(a.mandatory_covered),0,total);
  const compliance = covered/total*100;
  const critical = Math.max(0, Math.floor(num(a.critical_gaps)));
  const strategic = clamp(num(a.strategic_fit),0,100);
  const delivery = clamp(num(a.delivery_fit),0,100);
  const evidence = clamp(num(a.evidence_readiness),0,100);
  const hours = Math.max(0,num(a.estimated_response_hours));
  const days = Math.max(0.25,num(a.days_to_deadline,0.25));
  const availableHours = days*8;
  const workloadFit = clamp(100 - Math.max(0,(hours/availableHours-0.6))*100,0,100);
  let score = compliance*0.35 + strategic*0.20 + delivery*0.20 + evidence*0.15 + workloadFit*0.10 - critical*12;
  if(!eligible) score = Math.min(score,20);
  score = Math.round(clamp(score,0,100));
  let recommendation = score>=75?'BID':score>=55?'CONDITIONAL_BID':'NO_BID';
  if(!eligible) recommendation='NO_BID';
  const reasons=[];
  if(!eligible) reasons.push('A stated eligibility gate is not met.');
  if(compliance<85) reasons.push(`Mandatory requirement coverage is ${Math.round(compliance)}%.`);
  if(critical>0) reasons.push(`${critical} critical gap${critical===1?'':'s'} remain.`);
  if(workloadFit<50) reasons.push('Response workload is high relative to the time remaining.');
  if(strategic>=80) reasons.push('Strategic fit is strong.');
  if(evidence>=80) reasons.push('Evidence readiness is strong.');
  return {
    score,
    recommendation,
    eligibility_pass: eligible,
    compliance_percent: Math.round(compliance),
    workload_fit: Math.round(workloadFit),
    reasons,
    note:'Decision support only. Re-check every mandatory requirement against the authoritative tender documents before submission.'
  };
}
module.exports={scoreBid};
