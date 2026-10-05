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
