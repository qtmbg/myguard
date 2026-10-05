'use strict';
function num(v,d=0){const n=Number(v);return Number.isFinite(n)?n:d;}
function evaluateDeal(a){
  const list=Math.max(0,num(a.list_price));
  const price=Math.max(0,num(a.proposed_price));
  const fixed=Math.max(0,num(a.cost_to_serve))+Math.max(0,num(a.variable_cost))+Math.max(0,num(a.support_cost));
  const commission=Math.max(0,num(a.sales_commission_percent))/100;
  const target=Math.max(0,num(a.target_margin_percent))/100;
  const commissionCost=price*commission;
  const grossProfit=price-fixed-commissionCost;
  const margin=price>0?grossProfit/price:0;
  const discount=list>0?(list-price)/list:0;
  const denom=1-commission-target;
  const minPrice=denom>0?fixed/denom:null;
  return {currency:String(a.currency||'USD').toUpperCase(),list_price:list,proposed_price:price,discount_percent:Math.round(discount*10000)/100,gross_profit:Math.round(grossProfit*100)/100,gross_margin_percent:Math.round(margin*10000)/100,target_margin_percent:Math.round(target*10000)/100,meets_target:margin>=target,minimum_price_for_target:minPrice===null?null:Math.round(minPrice*100)/100,note:'Commercial margin math only. Taxes, financing, churn, delivery risk, rebates, and accounting treatment may change true economics.'};
}
module.exports={evaluateDeal};
