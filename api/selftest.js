module.exports=(req,res)=>{
  const {priceScope}=require('../lib/scopeguard');
  const {scoreBid}=require('../lib/bidready');
  const {assessRefund}=require('../lib/refundradar');
  const {assessCollection}=require('../lib/invoicechaser');
  const {scoreGrant}=require('../lib/grantfit');
  const {normalizeVendorQuote}=require('../lib/vendorguard');
  const {evaluateDeal}=require('../lib/dealdesk');
  const {assessRenewal}=require('../lib/renewalradar');
  const {summarizeDisruption}=require('../lib/travelclaim');
  const {classifySpend}=require('../lib/cashleak');

  const results={
    scopeguard:priceScope({currency:'USD',rate_amount:100,rate_unit:'hour',lean_effort:10,expected_effort:12,protected_effort:15,overhead_percent:10,contingency_percent:10}),
    bidready:scoreBid({eligibility_pass:true,mandatory_covered:19,mandatory_total:20,critical_gaps:0,strategic_fit:90,delivery_fit:90,evidence_readiness:90,estimated_response_hours:24,days_to_deadline:10}),
    refundradar:assessRefund({purchase_age_days:10,return_window_days:30}),
    invoicechaser:assessCollection({invoice_amount:1000,amount_paid:250,days_overdue:20,reminders_sent:1}),
    grantfit:scoreGrant({eligibility_pass:true,mandatory_covered:9,mandatory_total:10,strategic_fit:90,evidence_readiness:90,cofunding_readiness:90,estimated_application_hours:20,days_to_deadline:14,critical_gaps:0}),
    vendorguard:normalizeVendorQuote({term_months:12,one_time_fee:1000,monthly_fee:500}),
    dealdesk:evaluateDeal({list_price:10000,proposed_price:9000,cost_to_serve:6000,target_margin_percent:25}),
    renewalradar:assessRenewal({annualized_spend:12000,days_to_renewal:20,notice_period_days:30,utilization_percent:30,overlap_score:80,criticality:20,auto_renews:true}),
    travelclaim:summarizeDisruption({arrival_delay_minutes:300}),
    cashleak:classifySpend({monthly_cost:1000,utilization_percent:10,overlap_score:90,price_increase_percent:10,owner_known:false,essentiality:10})
  };
  const ok=
    results.scopeguard.expected_price===1452 &&
    results.bidready.recommendation==='BID' &&
    results.refundradar.route==='STANDARD_RETURN' &&
    results.invoicechaser.outstanding_amount===750 &&
    results.grantfit.recommendation==='APPLY' &&
    results.vendorguard.total_cost_of_ownership===7000 &&
    results.dealdesk.meets_target===true &&
    results.renewalradar.action==='NOTICE_WINDOW_AT_RISK' &&
    results.travelclaim.disruption_level==='MAJOR' &&
    results.cashleak.action==='CUT_OR_RENEGOTIATE';
  return res.status(ok?200:500).json({ok,products:Object.keys(results),results});
};
