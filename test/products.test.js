const test=require('node:test');
const assert=require('node:assert/strict');
const {priceScope,priceScopeChange}=require('../lib/scopeguard');
const {scoreBid}=require('../lib/bidready');
const {assessRefund,recoveryAmount}=require('../lib/refundradar');

test('ScopeGuard prices three bands',()=>{const r=priceScope({currency:'USD',rate_amount:100,rate_unit:'hour',lean_effort:10,expected_effort:12,protected_effort:15,overhead_percent:10,contingency_percent:10});assert.equal(r.lean_price,1210);assert.equal(r.expected_price,1452);assert.equal(r.protected_price,1815)});
test('ScopeGuard change price',()=>{const r=priceScopeChange({incremental_effort:4,rate_amount:100,rate_unit:'hour'});assert.equal(r.incremental_price,400)});
test('BidReady blocks failed eligibility',()=>{const r=scoreBid({eligibility_pass:false,mandatory_covered:10,mandatory_total:10,critical_gaps:0,strategic_fit:100,delivery_fit:100,evidence_readiness:100,estimated_response_hours:4,days_to_deadline:10});assert.equal(r.recommendation,'NO_BID');assert.ok(r.score<=20)});
test('BidReady strong opportunity',()=>{const r=scoreBid({eligibility_pass:true,mandatory_covered:19,mandatory_total:20,critical_gaps:0,strategic_fit:90,delivery_fit:90,evidence_readiness:90,estimated_response_hours:24,days_to_deadline:10});assert.equal(r.recommendation,'BID')});
test('RefundRadar detects standard return',()=>{const r=assessRefund({purchase_age_days:10,return_window_days:30});assert.equal(r.route,'STANDARD_RETURN')});
test('RefundRadar recovery arithmetic',()=>{assert.equal(recoveryAmount({base_amount:100,refundable_fees:12,additional_credits:3}).potential_recovery,115)});
