---
name: find-recurring-business-waste
description: Review recurring business spend such as SaaS, agencies, subscriptions, vendors, retainers, licenses, or services to identify under-use, overlap, ownership gaps, price increases, and high-value items to cut or renegotiate. Use for "where are we wasting money?", "what should we cancel?", or "find the biggest leaks in our stack".
---

# CashLeak

1. Build a spend inventory with vendor, category, monthly/annual cost, usage, overlap, price change, owner, criticality, renewal date, and switching constraints when available.
2. Do not equate low usage with zero value. Separate utilization from business criticality.
3. Call `classify_spend_leak` for each meaningful recurring spend item.
4. Rank by recoverable economic opportunity and practical actionability, not by cost alone.
5. Lead with annualized spend reviewed, estimated under-utilized spend, highest-priority items, and the next three actions.
6. Distinguish Cut, Renegotiate, Consolidate, Keep, and Investigate.
7. Confirm contractual commitments and business dependencies before recommending cancellation. This is not accounting or tax advice.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
