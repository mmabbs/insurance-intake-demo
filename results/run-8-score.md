# Scored Run 8

Run 3: Haiku 5.5, schema v1, repeat of run 1. Model `claude-haiku-5-5`. Run started 2026-10-16T20:04:21.571Z. Claude-built scoring script.

## Totals

1. **Category:** 12/12 right.
2. **Fields:** 71/72 right (6 scored fields per email).
   - urgency: 11/12
   - client_name: 12/12
   - policy_number: 12/12
   - cant_tell_policy: 12/12
   - effective_date: 12/12
   - requested_change: 12/12
3. **Tokens:** 20571 in, 8140 out, across 12 model calls.
4. **Cost:** $0.0061 for 12 emails, $0.00051 per email, at $0.1/$0.5 per million tokens in/out.

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

- **E01** (medium): Heather Gill reports being rear-ended on Wednesday, October 14, 2026, on the 401 eastbound near Dixie, with damage to her Tucson that keeps the hatch from closing. She asks whether to contact the brokerage or the other driver's insurer directly and whether she can get a rental. I chose claim notice because she is reporting a loss, and the urgency is High because claims are always High.
- **E02** (high): Ryan Mercer is asking Amir to add a newly purchased 2025 Toyota RAV4 Hybrid XLE to his auto policy BVA-4471829, picking it up October 24. He also asks whether a September roof replacement changes his house insurance rate. I chose policy change because adding a vehicle is the request that needs action on a policy, and the house question is secondary.
- **E03** (medium): Louise Tremblay asks whether her son Marc, who has been living at home for about two weeks and drives her Corolla most days, needs to be on her insurance or is covered because the car is hers. I chose policy change because the underlying need is to add a driver to an existing policy, and she is the client. The email gives no policy number, so the broker will need to look it up.
- **E04** (high): Daniel Okafor is asking whether his car insurance renewal premium increase from $2,140 to $2,610 (about 22%) is correct, since he reports no tickets or claims. He also wants the policy shopped around before the November 15 renewal date. I chose renewal question because the email is about the price and terms of the upcoming renewal, and the client is Daniel Okafor because he is the insured on policy KB-AU-0098213.
- **E05** (high): Kestrel Bay's underwriter, Greg Sutherland, says the inspection of 14 Ambergate Cres found an out-of-use above-ground fuel oil tank in the basement. To keep policy KB-HO-0551903 in force past the December 1, 2026 renewal, the insured must provide proof of removal by a TSSA-registered contractor or a current TSSA inspection certificate by November 13, 2026, or the insurer will issue a non-renewal notice. I chose underwriter request because the insurer is asking for documents, and High urgency because the warning threatens the policy's renewal.
- **E06** (high): Brenda Kowalski, office manager at Northshore Landscaping Ltd., asks us to add a new 2026 Ford F-250 to fleet policy BVC-7720154 effective November 2, 2026, with Kyle Duarte as the driver. She also needs the pink slip before the truck is used for the first snow event. I chose policy change because the request adds a vehicle to an existing policy, and the client is the company because Brenda writes on its behalf.
- **E07** (low): Jenna Mercer, who says she is Ryan's wife, asks for replacement copies of the pink slips for both cars after accidentally throwing them out. I chose 'other' because this is a document request that doesn't fit the policy change, renewal, or claim categories. I chose Low urgency because nothing in the email suggests a deadline or coverage risk.
- **E08** (low): Kev is asking the brokerage to find him a lower rate because his auto policy is up for renewal next month and he finds the current price too high. He believes the policy is with this brokerage, since he got it through his old employer. I chose renewal question because the request concerns an upcoming renewal's price, and the client is null because the email gives no name and no policy number.
- **E09** (medium): Daniel Okafor (unit 1407) reports water damage to his bathroom and hallway ceilings from a leak in the unit above since Tuesday, October 13, and asks whether the condo corporation's insurance or his own should pay. I chose claim notice because he is reporting a loss, and urgency is High because claims are time-sensitive. The email gives no policy number, so cant_tell_policy is true.
- **E10** (medium): Dana Whitfield, an underwriter at Birchview Assurance, asks for a copy of a winter tire invoice by November 30, 2026, or the winter tire discount will be removed at the next billing. She also asks the brokerage to confirm whether Marc Tremblay, a 19-year-old household member, drives the insured vehicle, and to submit an add-driver change if he does. I chose underwriter request because the insurer is writing to the brokerage for documents, information, and a policy change.
- **E11** (medium): Daniel Okafor is moving to a house in Hamilton on December 1 and selling his condo. He asks whether this changes his car policy quote and wants home insurance set up for the new place. I chose policy change because updating the address on his existing car policy is the request that needs action on a policy, and the home insurance request is a new policy that the brokerage would handle separately.
- **E12** (high): Tamsin Lee, bookkeeper for Fraser & Daughters Plumbing Inc., asks us to add a newly delivered 2025 Ram ProMaster 2500 service van to commercial auto policy KB-CA-3318806 effective November 9, 2026, with Owen Fraser as the driver. I chose policy change because the request is to add a vehicle and a driver to an existing policy, which takes priority over the document request in the same email. The client is the company, since Tamsin writes on its behalf.
