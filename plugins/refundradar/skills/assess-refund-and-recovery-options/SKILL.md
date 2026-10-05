---
name: assess-refund-and-recovery-options
description: Assess whether a purchase, subscription renewal, booking, defective product, duplicate charge, undelivered service, or cancellation may have a plausible refund or recovery route. Use for prompts such as "can I get my money back?", "am I still in the return window?", "they renewed me automatically", or "what should I send to get a refund?".
---

# RefundRadar workflow

1. Identify merchant/provider, product or service, purchase/renewal date, amount, payment method if relevant, location/jurisdiction if relevant, what happened, what the user already tried, and available evidence.
2. Prefer current official merchant/provider policies. If browsing is available and the policy is time-sensitive, retrieve the current official return, cancellation, warranty, refund, or compensation terms and cite them. Do not rely on stale snippets when an official policy is available.
3. Separate standard-policy eligibility from possible statutory or card-network remedies. Do not state a legal entitlement unless it is clearly supported by a current authoritative source.
4. When a return window or other concrete policy terms are known, call `assess_refund_case` with the supplied facts. When the recoverable components are known, call `calculate_potential_recovery`.
5. Put the practical answer first: likely route, potential amount if known, deadline if verified, evidence required, and exact next action.
6. Draft a concise refund/cancellation/warranty request when useful. Keep it factual and do not threaten unsupported legal action.

Important limits:
- This is policy-based decision support, not legal advice.
- Never guarantee a refund, chargeback, compensation payment, warranty outcome, or legal remedy.
- Escalate uncertainty when policies conflict, jurisdiction matters materially, or the amount/risk is high.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
