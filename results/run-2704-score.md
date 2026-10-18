# Scored Run 2704

Run 4: Haiku 5.5, full pipeline with drafter v5 and auto-fix. Model `claude-haiku-5-5`. Run started 2026-10-18T20:10:41.091Z. Claude-built scoring script.

## Totals

1. **Category:** 12/12 right.
2. **Fields:** 71/72 right (6 scored fields per email).
   - urgency: 11/12
   - client_name: 12/12
   - policy_number: 12/12
   - cant_tell_policy: 12/12
   - effective_date: 12/12
   - requested_change: 12/12
3. **Tokens:** 20571 in, 8017 out, across 12 model calls.
4. **Cost:** $0.0061 for 12 emails, $0.00051 per email, at $0.1/$0.5 per million tokens in/out.

## Per Email

| Email | Category | urgency | client_name | policy_number | cant_tell_policy | effective_date | requested_change | Confidence |
|---|---|---|---|---|---|---|---|---|
| E01 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E02 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E03 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | low |
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

- **E01** (medium): Heather Gill reports that her Tucson was rear-ended on the 401 eastbound near Dixie on Wednesday, October 14, 2026, by another driver who did not stop. She asks whether to contact the brokerage or the other driver's insurer directly and whether she can get a rental, since she needs the car for work. I classified this as a claim notice because it reports a collision, with high urgency because claims are always urgent.
- **E02** (high): Ryan Mercer is asking to add his newly purchased 2025 Toyota RAV4 Hybrid XLE to his auto policy BVA-4471829, with pickup on Saturday, October 24. He also asks whether a September roof replacement affects his house insurance rate, but that is secondary. I chose 'policy change' because adding a vehicle is the action that needs work on a policy.
- **E03** (low): Louise Tremblay asks whether her son Marc, who has been living at home for about two weeks and drives her Corolla most days, needs to be on her insurance. This is a policy change request because it concerns adding a driver to an existing policy, and she is the policyholder, so she is the client. The email gives no policy number, so the policy cannot be identified from it.
- **E04** (high): Daniel Okafor is asking whether his car insurance renewal premium increase from $2,140 to $2,610 (about 22%) is correct, since he reports no tickets or claims. He also wants the brokerage to shop the policy around before the November 15 renewal date. I chose renewal question because the email concerns the price of an upcoming renewal, and I identified Okafor as the client because he is the insured named in the thread.
- **E05** (high): Kestrel Bay Insurance's underwriter is asking for either proof of removal of an out-of-use above-ground fuel oil tank by a TSSA-registered contractor or a current TSSA inspection certificate for it, by November 13, 2026. Without one of these, the insurer will issue a notice of non-renewal for the December 1, 2026 renewal. I chose underwriter request because the insurer is asking the brokerage for documents, and High urgency because the request threatens the policy's renewal.
- **E06** (high): Brenda Kowalski, office manager at Northshore Landscaping Ltd., asks to add a new 2026 Ford F-250 with plow package to fleet policy BVC-7720154, effective November 2, 2026, with Kyle Duarte as driver. I chose policy change because the request is to add a vehicle to an existing policy, and the client is the company that owns the fleet.
- **E07** (low): Jenna Mercer, who says she is Ryan's wife, asks the brokerage to email her the pink slips (vehicle titles) for both cars. She says she threw them out while cleaning the glovebox. This is not a policy change, renewal, or claim, so I chose 'other'. Client is inferred as Ryan Mercer, and the policy is unknown, so confidence is low.
- **E08** (low): The client wants the brokerage to find a lower rate before his policy renews next month, saying the current premium is too high. I chose renewal question because the email is about an upcoming renewal's price and shopping it around. The client is unnamed and gives no policy number, and he is unsure whether his policy is with this brokerage, so the client and policy are unconfirmed.
- **E09** (medium): Daniel Okafor (Unit 1407) reports water damage to his bathroom and hallway ceilings from a leak in the unit above, starting Tuesday night, October 13, and asks which insurer pays. I chose claim notice because it reports a loss, and the request turns on the date of loss. Urgency is High because claims are always High, and water damage is ongoing.
- **E10** (medium): Dana Whitfield, an underwriter at Birchview Assurance, asks for a copy of the winter tire invoice for policy BVA-2290471 by November 30, 2026, or the insured's winter tire discount will be removed. She also asks the brokerage to confirm whether Marc Tremblay, 19, who lives at the same address, drives the insured vehicle, and to submit an addition if he does. I chose underwriter request because the insurer is asking for documents and a change on the policy, and the driver addition is the action that needs work on the policy.
- **E11** (medium): Daniel Okafor is moving to a house in Hamilton on December 1 and selling his condo. He asks whether this changes his car quote and wants home insurance set up for the new place. I chose policy change because the move means updating the address on his existing car policy, which needs action before the move. The client is Daniel Okafor, and the policy number comes from the subject line.
- **E12** (high): Tamsin Lee, bookkeeper for Fraser & Daughters Plumbing Inc., asks us to add a newly delivered 2025 Ram ProMaster 2500 service van to commercial auto policy KB-CA-3318806, effective November 9, 2026. This is a policy change because it adds a vehicle to an existing policy, and the client is the company since Tamsin writes on its behalf. Urgency is Normal because the request is routine and the effective date is weeks away.
