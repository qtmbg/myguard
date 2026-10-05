---
name: protect-deal-margin
description: Evaluate a proposed B2B price, discount, quote, or commercial concession against cost-to-serve and target margin. Use for "can I give this discount?", "what is the lowest price we can accept?", "what margin is left?", or "should we approve this deal?".
---

# DealDesk

1. Extract list price, proposed price, cost-to-serve, variable delivery cost, support cost, sales commission, target margin, and any non-price concessions.
2. Never invent economics. If a key cost is unknown, state it as unknown and show how it affects the result.
3. Call `evaluate_deal_economics`.
4. Lead with discount %, gross profit, gross margin, whether the target margin is met, and minimum price for the target.
5. Then surface non-price risks: custom work, payment terms, onboarding, support, service credits, implementation burden, renewal caps, and precedent-setting concessions.
6. Separate calculated economics from strategic judgment.
7. Do not present the output as accounting, tax, or legal advice.
