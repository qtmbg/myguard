---
name: scope-and-price-client-work
description: Analyze a client brief, email, request, proposal, statement of work, or change request to expose hidden work, estimate effort, calculate pricing from the user's own economics, and identify scope creep. Use for requests such as "what should I charge?", "scope this project", "turn this into a proposal", "how long will this take?", or "is this included in the original scope?".
---

# ScopeGuard workflow

Use this workflow for commercial scoping of service work.

1. Extract stated deliverables, quantities, channels, stakeholders, deadlines, dependencies, review cycles, approvals, handoff requirements, travel, research, meetings, project management, QA, production, implementation, training, reporting, and post-launch support.
2. Separate facts from assumptions. Never turn an assumption into a fact.
3. Surface invisible work that is necessary to deliver the stated outcome.
4. Identify missing information. Ask no more than three blocking questions. When a reasonable assumption can be made safely, state the assumption and continue instead of interrogating the user.
5. Estimate Lean, Expected, and Protected effort in hours or days. Do not create false precision; round to commercially useful ranges.
6. If the user supplied a rate, minimum fee, overhead, or contingency, call `price_scope`. Never invent a market rate. If no economics are available, provide effort bands and ask for the user's rate only if pricing is required.
7. For a new client request against an existing baseline, classify each item as Already included, Ambiguous, or New scope. For the incremental effort of Ambiguous/New items, call `price_scope_change` when the user's rate is known.
8. Put the commercial answer first. Then show scope, hidden work, assumptions, exclusions, effort, price, risk, and a proposal-ready or change-order-ready wording.

Important limits:
- This is commercial scoping, not legal, tax, or accounting advice.
- Never guarantee profitability.
- Never invent a client's budget, a market rate, or an accepted baseline.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
