# QTMBG Money Plugins: remaining directory work

Status on 5 October 2026: source fixes and test evidence prepared. No OpenAI draft was created or submitted. The cloud browser explicitly reported that permission to access platform.openai.com was declined. Do not bypass that denial via another browser, API, or route.

## Verified work

- GitHub main remains the source of truth; Vercel auto-deploys it.
- 23 local regression tests pass.
- 50/50 positive fixtures executed over real production MCP HTTP calls.
- 30/30 malformed-input checks reject missing, wrong-type, or unsupported inputs.
- All 13 distinct tools discovered; initialize instructions and explicit read-only/idempotent/non-destructive/closed-world annotations inspected.
- All 10 packages pass local Agent Plugins schema, listing-length, asset, and skill-frontmatter checks. These are not official OpenAI scans.
- Structured money_plugin_tool_call event observed in production Vercel runtime logs. Host identifiers are SHA-256 pseudonyms; prompts and arguments are excluded.
- Website, ten product pages, support, privacy and terms return HTTP 200.
- Ten separate ZIPs contain plugin.json, mcp.json, skills/, assets/ at archive root, with checksums in releases/checksums.json.
- Ten MP4 walkthroughs replay actual production input/output evidence and display the pending negative conversational specifications. They do not record an installed ChatGPT UI. Each correct URL is in its manifest.

## Pending, in order

1. Resume portal UI only after permission to access it is restored: https://platform.openai.com/plugins.
2. Select the owning organization/project and inspect developer identities. Prefer verified QTMBG LLC. Do not claim the business has been verified until the portal confirms it. Owner must complete any personal verification/2FA.
3. Upload releases/<name>-v1.0.0.zip separately for each of ten products.
4. Resolve official metadata/skill scans against GitHub main and re-upload corrected ZIPs.
5. Connect the matching unauthenticated MCP URL; obtain the exact domain challenge before editing any well-known file. No challenge token or DNS value has yet been issued.
6. Domain verification now uses an exact plaintext token at https://<challenge-base-host>/.well-known/openai-apps-challenge. Never overwrite an earlier plugin token on the shared host. Inspect whether publisher-level verification is shared; if separate tokens are required, use distinct owner-controlled hosts/eligible origins through Vercel, with source and manifests updated in main. Never use vercel.app as an owner-controlled parent.
7. Run official Scan Tools/Rescan; supply annotation explanations from review/tool-annotation-justifications.json as needed. Tools use no OAuth, credentials, external actions, or persistent data.
8. Install each draft and execute all five positive and three negative prompts from its manifest. Direct-input rejection tests do not substitute for conversational refusal or activation checks. Those 30 negative tests are unexecuted; preserve that distinction.
9. Record actual installed-plugin walkthroughs showing positive and negative behavior. The current MP4s are transparent MCP evidence replays and may need replacement; they must not be represented as completed live UI recordings. Use a separate video per plugin unless the current portal explicitly permits combining them.
10. Store reviewer-accessible recordings, update each review.demo_recording_url in GitHub main, rebuild/re-upload the ZIP.
11. Stop at personally required legal/policy attestations. Show the exact text and the prepared draft to the owner. No attestations have been accepted.
12. Submit each eligible draft, verify the resulting review status and IDs, and record them in review/status.json. Publication happens after OpenAI approval and is not guaranteed.

Current official docs:
- https://developers.openai.com/plugins/deploy/submission
- https://developers.openai.com/plugins/deploy/submission-errors
- https://developers.openai.com/plugins/plugin-guidelines
- https://developers.openai.com/plugins/deploy/app-review

Commerce remains disabled. No secrets belong in packages. No invented reviewer login is needed.
