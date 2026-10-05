module.exports=(req,res)=>{
  const {priceScope}=require('../lib/scopeguard');
  const {scoreBid}=require('../lib/bidready');
  const {assessRefund}=require('../lib/refundradar');
  const scope=priceScope({currency:'USD',rate_amount:100,rate_unit:'hour',lean_effort:10,expected_effort:12,protected_effort:15,overhead_percent:10,contingency_percent:10});
  const bid=scoreBid({eligibility_pass:true,mandatory_covered:19,mandatory_total:20,critical_gaps:0,strategic_fit:90,delivery_fit:90,evidence_readiness:90,estimated_response_hours:24,days_to_deadline:10});
  const refund=assessRefund({purchase_age_days:10,return_window_days:30});
  const ok=scope.expected_price===1452 && bid.recommendation==='BID' && refund.route==='STANDARD_RETURN';
  return res.status(ok?200:500).json({ok,scope,bid,refund});
};
