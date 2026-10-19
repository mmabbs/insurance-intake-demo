# Scored Run 6066

Haiku 5.5, final scored run, no examples, retry on. Model `claude-haiku-5-5`. Run started 2026-10-19 14:53:18.319. Claude-built scoring script.

## Totals

1. **Category:** 12/12 right.
2. **Fields:** 71/72 right (6 scored fields per email).
   - urgency: 11/12
   - client_name: 12/12
   - policy_number: 12/12
   - cant_tell_policy: 12/12
   - effective_date: 12/12
   - requested_change: 12/12
3. **Tokens:** 20571 in, 8476 out, across 12 model calls.
4. **Cost:** $0.0063 for 12 emails, $0.00052 per email, at $0.1/$0.5 per million tokens in/out.

## Per Email

| Email | Category | urgency | client_name | policy_number | cant_tell_policy | effective_date | requested_change | Confidence |
|---|---|---|---|---|---|---|---|---|
| E01 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E02 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E03 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E04 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E05 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E06 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E07 | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | ✓ | low |
| E08 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | low |
| E09 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E10 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E11 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |

## Misses

- **E07 urgency:** got `Low`, want `Normal`

## The AI's Reasons

- **E01** (medium): Heather Gill reports a rear-end collision on Wednesday, October 14, 2026, on the 401 eastbound near Dixie, where the other driver did not stop. Her Tucson's rear is damaged and the hatch won't close, and she asks whether to call the brokerage or the insurer directly and whether she can get a rental car. I chose 'claim notice' because she is reporting a loss, with the date of loss as the key date and client Heather Gill as the insured.
- **E02** (high): Ryan Mercer asks Amir to add a newly purchased 2025 Toyota RAV4 Hybrid XLE to his auto policy BVA-4471829, effective when he picks it up on October 24. He also asks whether a recent roof replacement affects his home insurance rate. I chose policy change because adding a vehicle is the request that needs action on a policy, and the roof question is secondary.
- **E03** (medium): Louise Tremblay asks whether her son Marc, who moved back home about two weeks ago and drives her Corolla to work most days, needs to be added to her insurance or whether it is fine because the car is in her name. Her request needs a policy action, adding a driver, so I classed it as a policy change. Her email gives no policy number, so the policy is unconfirmed.
- **E04** (high): Daniel Okafor is asking whether his car insurance renewal premium increase from $2,140 to $2,610 (about 22%) is correct, given that he reports no tickets or claims. He also wants the policy shopped to other insurers before the November 15, 2026 renewal date. I chose the renewal question category because the email concerns the price of an upcoming renewal, and the policy and client are identified directly in the email.
- **E05** (high): Kestrel Bay underwriter Greg Sutherland is asking for proof that the above-ground fuel oil tank at 14 Ambergate Cres has been removed by a TSSA-registered contractor, or a current TSSA inspection certificate for it, by November 13, 2026. Without one of these, policy KB-HO-0551903 will not be renewed on December 1, 2026. I chose underwriter request because the insurer is asking for documents on the policy, and High urgency because the renewal itself is at risk.
- **E06** (high): Brenda Kowalski, office manager at Northshore Landscaping Ltd., asks to add a new 2026 Ford F-250 with a plow package to fleet policy BVC-7720154 effective November 2, 2026, with Kyle Duarte as driver. I chose policy change because the request adds a vehicle to an existing policy, and the client is the company that owns the fleet.
- **E07** (low): Jenna Mercer, Ryan's wife, asks for copies of the pink slips (vehicle registration) for both cars, which she lost when she threw out old receipts. This is a document request that does not change a policy, so I chose 'other' over the policy categories. I listed her as the client because she is the one asking, but the email does not name the policyholder or give a policy number.
- **E08** (low): Kev says his auto or other policy renews next month and is too expensive, and he asks the brokerage to find a better rate. I chose renewal question because the email is about an upcoming renewal's price and shopping it around. The client is unclear, since he gives only a first name and a handle and is not sure the policy is with this brokerage.
- **E09** (medium): Daniel Okafor (Unit 1407) reports water damage from a leak in the unit above, with water coming through his bathroom and hallway ceilings since Tuesday night, October 13. He asks which insurer pays for what, since the property manager suggested opening a claim on his own policy. I chose 'claim notice' because he is reporting a loss, and urgency is High because claims are always High.
- **E10** (medium): The underwriter at Birchview Assurance is asking for a copy of the winter tire invoice by November 30, 2026, or the insured loses the winter tire discount, and asks whether Marc Tremblay, a 19-year-old household member, drives the insured vehicle. If he does, the underwriter wants a driver addition submitted. I chose underwriter request because the email comes from the insurer, and the driver addition is the change that needs action on the policy.
- **E11** (medium): Daniel Okafor is moving on December 1 to a house in Hamilton and asks whether this changes his car quote. He also wants home insurance set up for the new place. I chose 'policy change' because the move requires changing the address on his auto policy, which needs action on the policy, even though his earlier message disputed his renewal premium.
- **E12** (high): Tamsin Lee, bookkeeper for Fraser & Daughters Plumbing Inc., asks to add a newly delivered 2025 Ram ProMaster 2500 service van to the commercial auto policy KB-CA-3318806, effective November 9, 2026, and to have the updated pink slips and change invoice sent to her. I chose 'policy change' because adding a vehicle and a driver is the main action needed on the policy, and the company is the client because it owns the policy and the van.

## Drafter Fields and Whole-Run Cost

Counted by Claude from the same run file, the way run 2704's were. Right Code comes from the answer key's category (policy change CHGR, renewal question RENL, claim notice FNOL, underwriter request UNDR, other MISC); right Priority is the key's urgency, with High shown as Urgent.

1. **Code, Priority, Lookup Code, Policy Number (from `Set activity fields`):** 47/48. Code 12/12, Priority 11/12, Lookup Code 12/12, Policy Number 12/12. The miss: E07 Priority `Low`, want `Normal`.
2. **Sorting (`Sort emails and pull out fields (Haiku 5.5)`):** 12 calls, 20,571 tokens in, 8,476 out, $0.0063.
3. **Drafting (`Draft activity and follow-up email (Haiku 5.5)`):** 12 calls, 35,487 tokens in, 27,199 out, $0.0171.
4. **Format repair (`Fix draft format (Haiku 5.5)`):** not used. Every draft parsed the first time.
5. **Whole run:** 56,058 tokens in, 35,675 out, $0.0234, $0.00195 per email.
6. **Retries on `Sort and pull out`:** none (one run of the node, 12 model calls).
7. **State:** `corrections` empty, so the extractor's prompt had no examples. The run was stopped at the first review email (E07's), so it wrote nothing to the tables.
