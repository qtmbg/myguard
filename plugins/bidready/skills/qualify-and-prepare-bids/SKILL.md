---
name: qualify-and-prepare-bids
description: Review an RFP, tender, procurement notice, or bid invitation to decide whether it is worth pursuing, identify eligibility gates and mandatory requirements, expose gaps, estimate response workload, and structure a compliant response plan. Use for prompts such as "should we bid?", "are we eligible?", "make a compliance matrix", or "what are we missing for this tender?".
---

# BidReady workflow

1. Treat the authoritative opportunity documents and official issuer updates as the source of truth. If the opportunity is time-sensitive and browsing is available, verify current deadline, addenda, clarifications, and eligibility rules from official sources.
2. Extract: issuer, objective, budget/value if stated, geography, deadline, eligibility gates, mandatory requirements, scoring criteria, required evidence, submission format, page or word limits, contractual obligations, financial guarantees, team requirements, references, certifications, and disqualifiers.
3. Build a compliance matrix with requirement, mandatory/optional status, evidence needed, evidence available, gap, owner, and action.
4. If the user has not provided organizational evidence, mark it Unknown rather than assuming compliance.
5. Estimate strategic fit, delivery fit, evidence readiness, critical gaps, response hours, and days remaining. Call `score_bid_opportunity`.
6. Put the decision first: BID, CONDITIONAL BID, or NO BID. Explain the top reasons, the biggest disqualifier risk, the work required to become submission-ready, and the next three actions.
7. When asked to prepare the response, draft only from supplied or verified evidence. Mark unsupported claims and missing proof clearly.

Important limits:
- BidReady is decision support and drafting assistance. It does not guarantee eligibility, compliance, scoring, or an award.
- Never fabricate references, certifications, turnover, team experience, or prior projects.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
