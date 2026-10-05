---
name: compare-vendor-quotes
description: Compare vendor, agency, software, implementation, or service quotes by normalizing total cost of ownership and exposing hidden commercial differences. Use for "which quote is really cheaper?", "are we overpaying?", "compare these proposals", or "what costs are hidden here?".
---

# VendorGuard

1. Extract from each proposal: one-time fee, implementation, migration, recurring fees, usage charges, support, term, annual increases, exit costs, inclusions, exclusions, service levels, usage caps, lock-in, renewal terms, and assumptions.
2. Never invent a missing fee. Mark unknown commercial terms explicitly.
3. Call `normalize_vendor_quote` once per vendor using the same comparison horizon.
4. Compare normalized TCO alongside scope coverage, risk, service levels, flexibility, implementation burden, and exit cost.
5. Lead with the economically meaningful comparison rather than the cheapest headline number.
6. Flag where apparently cheap pricing depends on excluded work, usage assumptions, future increases, or switching costs.
7. Do not provide legal conclusions about enforceability of contract terms.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
