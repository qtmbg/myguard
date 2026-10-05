'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function clamp(v,min,max){return Math.min(max,Math.max(min,v));}
function scoreGrant(a){
  const eligible=Boolean(a.eligibility_pass);
  const total=Math.max(1,num(a.mandatory_total,1));
  const covered=clamp(num(a.mandatory_covered),0,total);
  const compliance=covered/total*100;
  const strategic=clamp(num(a.strategic_fit),0,100);
  const evidence=clamp(num(a.evidence_readiness),0,100);
  const cofund=clamp(num(a.cofunding_readiness),0,100);
  const hours=Math.max(0,num(a.estimated_application_hours));
  const days=Math.max(0.25,num(a.days_to_deadline,0.25));
  const capacity=clamp(100-Math.max(0,(hours/(days*8)-0.6))*100,0,100);
  const critical=Math.max(0,Math.floor(num(a.critical_gaps)));
  let score=compliance*.30+strategic*.25+evidence*.20+cofund*.15+capacity*.10-critical*12;
  if(!eligible) score=Math.min(score,20);
  score=Math.round(clamp(score,0,100));
  const recommendation=!eligible?'NO_GO':score>=75?'APPLY':score>=55?'CONDITIONAL_APPLY':'NO_GO';
  return {score,recommendation,eligibility_pass:eligible,mandatory_coverage_percent:Math.round(compliance),application_capacity:Math.round(capacity),critical_gaps:critical,note:'Decision support only. Re-check eligibility, deadlines, co-funding, and submission requirements against the current official grant documents.'};
}
module.exports={scoreGrant};
