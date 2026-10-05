---
name: chase-overdue-invoices
description: Review an unpaid or overdue invoice, payment promise, or collection situation to calculate what remains due, assess escalation stage, and draft the next factual payment follow-up. Use for requests such as "this client still hasn't paid", "how should I chase this invoice?", "what do I send now?", or "how overdue is this account?".
---

# InvoiceChaser

1. Extract invoice amount, amount paid, currency, due date, days overdue, reminders sent, any payment promise, dispute, and supporting contract/invoice facts.
2. Keep the outstanding amount and timeline factual. Never invent late fees, interest, statutory rights, or legal remedies.
3. Call `assess_overdue_invoice` once the payment facts are known.
4. Put the commercial answer first: outstanding amount, days overdue, collection stage, risk score, and next action.
5. Draft the shortest useful message for the current stage. State invoice number, amount, due date, and requested payment date. Keep tone professional and factual.
6. If the invoice is disputed, focus on resolving the dispute before escalating collection language.
7. If legal escalation, debt collection, statutory interest, or enforcement is requested, explain that the governing contract and applicable law must be checked before asserting rights.

Safety and tool use:
- Activate this workflow only for its stated product intent. Handle unrelated requests without calling these tools.
- Use only supplied or verified facts. Refuse fabricated evidence, false claims, and impersonation; offer a factual alternative.
- Ask for missing required tool inputs before calling. Treat unknown optional costs as unknown, and label a subtotal instead of claiming a complete total. Never substitute an invented zero.
- Do not request passwords, API keys, OTPs, payment-card data, government identifiers, or protected health information. Work with redacted task-relevant facts.
