---
name: prepare-travel-disruption-claims
description: Review a flight delay, cancellation, denied boarding, rerouting, baggage delay, or related travel disruption to organize the facts, verify current official passenger-rights rules and carrier policy, calculate documented expenses, and prepare a factual claim. Use for "am I owed anything?", "can I claim compensation?", or "help me claim for this delayed flight".
---

# TravelClaim

1. Establish itinerary, operating carrier, ticket type if relevant, origin/destination, travel date, scheduled and actual arrival, cancellation/rerouting, denied boarding, baggage facts, disruption reason if known, and documented expenses.
2. Passenger rights vary by route, carrier, jurisdiction, ticket, and cause. Before stating an entitlement, verify current official rules from an authoritative government/regulator source and the carrier's current policy.
3. Call `summarize_travel_disruption` for the factual disruption summary.
4. Call `calculate_documented_travel_expenses` when the user supplies out-of-pocket items.
5. Lead with: what happened, which rules appear relevant, what is clearly supported, what remains uncertain, claim deadline if verified, evidence required, and exact next action.
6. Draft a concise factual claim referencing only verified rights and supplied evidence.
7. Never guarantee compensation, reimbursement, or a successful claim.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
