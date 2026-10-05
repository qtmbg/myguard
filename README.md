# Money Plugins

A portfolio of ten focused ChatGPT/Codex plugins built around economic moments: money protected, money won, money recovered, and money no longer wasted.

## Products

1. ScopeGuard — scope, price, and protect service work.
2. BidReady — qualify tenders and RFPs before investing response time.
3. RefundRadar — identify plausible refund and recovery routes.
4. InvoiceChaser — turn overdue invoices into a factual collection plan.
5. GrantFit — qualify grants and non-dilutive funding opportunities.
6. VendorGuard — compare the real total cost of vendor proposals.
7. DealDesk — evaluate discounts and protect target margin.
8. RenewalRadar — surface renewal deadlines, under-use, and renegotiation priorities.
9. TravelClaim — organize travel disruption claims against verified rules and policies.
10. CashLeak — identify recurring business spend worth cutting or renegotiating.

## Production

Public web: https://money-plugins-qtmbg.vercel.app

MCP endpoints follow:
`/api/<plugin-name>/mcp`

Every plugin has a portable Agent Plugins package under `plugins/<plugin-name>/`.

## Principles

- One recognizable user intent per plugin.
- Deterministic math lives in MCP tools.
- Judgment, workflow, verification, and output requirements live in skills.
- No fabricated rates, eligibility, legal rights, contract terms, certifications, or financial facts.
- Version 1.0 is stateless and does not intentionally persist user prompt or document content.
