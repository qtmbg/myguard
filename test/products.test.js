const test=require('node:test');
const assert=require('node:assert/strict');

const {priceScope,priceScopeChange}=require('../lib/scopeguard');
const {scoreBid}=require('../lib/bidready');
const {assessRefund,recoveryAmount}=require('../lib/refundradar');
const {assessCollection}=require('../lib/invoicechaser');
const {scoreGrant}=require('../lib/grantfit');
const {normalizeVendorQuote}=require('../lib/vendorguard');
const {evaluateDeal}=require('../lib/dealdesk');
const {assessRenewal}=require('../lib/renewalradar');
const {summarizeDisruption,calcExpenses}=require('../lib/travelclaim');
const {classifySpend}=require('../lib/cashleak');

test('ScopeGuard prices three bands',()=>{const r=priceScope({currency:'USD',rate_amount:100,rate_unit:'hour',lean_effort:10,expected_effort:12,protected_effort:15,overhead_percent:10,contingency_percent:10});assert.equal(r.lean_price,1210);assert.equal(r.expected_price,1452);assert.equal(r.protected_price,1815)});
test('ScopeGuard change price',()=>{const r=priceScopeChange({incremental_effort:4,rate_amount:100,rate_unit:'hour'});assert.equal(r.incremental_price,400)});
test('BidReady blocks failed eligibility',()=>{const r=scoreBid({eligibility_pass:false,mandatory_covered:10,mandatory_total:10,critical_gaps:0,strategic_fit:100,delivery_fit:100,evidence_readiness:100,estimated_response_hours:4,days_to_deadline:10});assert.equal(r.recommendation,'NO_BID');assert.ok(r.score<=20)});
test('BidReady strong opportunity',()=>{const r=scoreBid({eligibility_pass:true,mandatory_covered:19,mandatory_total:20,critical_gaps:0,strategic_fit:90,delivery_fit:90,evidence_readiness:90,estimated_response_hours:24,days_to_deadline:10});assert.equal(r.recommendation,'BID')});
test('RefundRadar detects standard return',()=>{const r=assessRefund({purchase_age_days:10,return_window_days:30});assert.equal(r.route,'STANDARD_RETURN')});
test('RefundRadar recovery arithmetic',()=>{assert.equal(recoveryAmount({base_amount:100,refundable_fees:12,additional_credits:3}).potential_recovery,115)});

test('InvoiceChaser calculates outstanding amount',()=>{const r=assessCollection({invoice_amount:1000,amount_paid:250,days_overdue:20,reminders_sent:1});assert.equal(r.outstanding_amount,750);assert.equal(r.stage,'FIRM_REMINDER')});
test('InvoiceChaser pauses collection escalation on dispute',()=>{const r=assessCollection({invoice_amount:1000,days_overdue:50,disputed:true,reminders_sent:4});assert.equal(r.stage,'RESOLVE_DISPUTE')});

test('GrantFit blocks failed eligibility',()=>{const r=scoreGrant({eligibility_pass:false,mandatory_covered:10,mandatory_total:10,strategic_fit:100,evidence_readiness:100,cofunding_readiness:100,estimated_application_hours:10,days_to_deadline:20,critical_gaps:0});assert.equal(r.recommendation,'NO_GO')});
test('GrantFit approves strong fit',()=>{const r=scoreGrant({eligibility_pass:true,mandatory_covered:9,mandatory_total:10,strategic_fit:90,evidence_readiness:90,cofunding_readiness:90,estimated_application_hours:20,days_to_deadline:14,critical_gaps:0});assert.equal(r.recommendation,'APPLY')});

test('VendorGuard normalizes TCO',()=>{const r=normalizeVendorQuote({term_months:12,one_time_fee:1000,monthly_fee:500});assert.equal(r.total_cost_of_ownership,7000);assert.equal(r.effective_monthly_cost,583.33)});
test('VendorGuard compounds annual increase',()=>{const r=normalizeVendorQuote({term_months:24,monthly_fee:100,annual_price_increase_percent:10});assert.equal(r.total_cost_of_ownership,2520)});

test('DealDesk detects margin miss',()=>{const r=evaluateDeal({list_price:10000,proposed_price:8000,cost_to_serve:6000,target_margin_percent:30});assert.equal(r.meets_target,false);assert.equal(r.discount_percent,20)});
test('DealDesk calculates floor price',()=>{const r=evaluateDeal({list_price:10000,proposed_price:9000,cost_to_serve:6000,target_margin_percent:25});assert.equal(r.minimum_price_for_target,8000)});

test('RenewalRadar surfaces notice-window risk',()=>{const r=assessRenewal({annualized_spend:12000,days_to_renewal:20,notice_period_days:30,utilization_percent:30,overlap_score:80,criticality:20,auto_renews:true});assert.equal(r.action,'NOTICE_WINDOW_AT_RISK');assert.equal(r.days_until_notice_deadline,-10)});
test('RenewalRadar estimates under-use',()=>{const r=assessRenewal({annualized_spend:12000,days_to_renewal:90,notice_period_days:30,utilization_percent:50,overlap_score:0,criticality:50});assert.equal(r.estimated_underutilized_spend,6000)});

test('TravelClaim classifies major disruption',()=>{const r=summarizeDisruption({arrival_delay_minutes:300});assert.equal(r.disruption_level,'MAJOR');assert.equal(r.policy_check_required,true)});
test('TravelClaim totals documented expenses',()=>{const r=calcExpenses({items:[{label:'hotel',amount:100},{label:'meal',amount:25}]});assert.equal(r.total_documented_expenses,125)});

test('CashLeak flags severe under-use',()=>{const r=classifySpend({monthly_cost:1000,utilization_percent:10,overlap_score:90,price_increase_percent:10,owner_known:false,essentiality:10});assert.equal(r.action,'CUT_OR_RENEGOTIATE');assert.equal(r.estimated_underutilized_spend,10800)});
