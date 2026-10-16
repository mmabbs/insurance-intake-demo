# Scored Run 6

Run 1: Haiku 5.5, schema v1. Model `claude-haiku-5-5`. Run started 2026-10-16T19:30:19.308Z. Claude-built scoring script.

## Totals

1. **Category:** 12/12 right.
2. **Fields:** 71/72 right (6 scored fields per email).
   - urgency: 11/12
   - client_name: 12/12
   - policy_number: 12/12
   - cant_tell_policy: 12/12
   - effective_date: 12/12
   - requested_change: 12/12
3. **Tokens:** 20571 in, 8644 out, across 12 model calls.
4. **Cost:** $0.0064 for 12 emails, $0.00053 per email, at $0.1/$0.5 per million tokens in/out.

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

- **E01** (medium): Heather Gill reports being rear-ended on the 401 eastbound near Dixie on Wednesday, October 14, 2026, around 7:45 AM. The other driver, Brian Leclerc, left the back of her Tucson damaged and the hatch won't close. She is asking whether to contact the brokerage or the insurer directly and whether she can get a rental car. I chose 'claim notice' because she is reporting a loss, and the date of loss is the key date.
- **E02** (high): Ryan Mercer is asking to add a newly purchased 2025 Toyota RAV4 Hybrid to his auto policy BVA-4471829, effective when he picks it up on October 24. He also asks, as a separate question, whether a September roof replacement affects his home insurance rate. I chose policy change because adding a vehicle is the request that requires action on a policy.
- **E03** (medium): Louise Tremblay asks whether her son Marc, who has moved back home and has been driving her Corolla to work for about two weeks, needs to be on her insurance, since it is her car and he has had a full G licence since last year. I chose policy change because the underlying request is to add an unlisted driver to her policy, even though the email is phrased as a question. The email gives no policy number, so the broker will need to locate her policy.
- **E04** (high): Daniel Okafor is asking whether his car insurance renewal premium increase from $2,140 to $2,610 (about 22%) is correct, since he reports no tickets or claims. He also wants the policy shopped around with other insurers before November 15. I chose renewal question because the email is about the price of an upcoming renewal and shopping it around, and the policy KB-AU-0098213 is the one named in the renewal notice.
- **E05** (high): Kestrel Bay Insurance's underwriter, Greg Sutherland, is asking for proof that an out-of-use above-ground fuel oil tank in the basement of 14 Ambergate Cres has been removed or inspected. Without it by November 13, 2026, he will issue a notice of non-renewal for policy KB-HO-0551903 at its December 1, 2026 renewal. I chose underwriter request because the insurer is asking for documents, and urgency is High because the request threatens the policy's renewal.
- **E06** (high): Brenda Kowalski, office manager at Northshore Landscaping Ltd., asks to add a new 2026 Ford F-250 with a plow package to fleet policy BVC-7720154, effective November 2, 2026, with Kyle Duarte as driver. She needs the pink slip before the truck goes out for the first snow event. I classified this as a policy change because it adds a vehicle and a driver to an existing policy.
- **E07** (low): Jenna Mercer, who identifies herself as Ryan's wife, asks for copies of the pink slips for both cars because she threw the originals out with old receipts. I chose 'other' because this is a request for documents rather than a change to a policy, a renewal question, or a claim. I chose Low urgency because nothing in the email suggests a coverage consequence, and I took the client to be Ryan Mercer because the email refers to his cars.
- **E08** (low): Kev says his policy renews next month and he finds the price too high, so he wants the brokerage to find a better rate. I chose renewal question because the request is about an upcoming renewal and its price. I could not identify the policy or the last name, since he only says he thinks it's with the brokerage through his old job.
- **E09** (medium): Daniel Okafor reports water damage to his ceiling, bathroom, and hallway from a leak in the unit above (1507) that began Tuesday night, October 13. He wants help understanding whose insurance covers the damage, since the property manager suggested he open a claim with his own insurer too. I chose 'claim notice' because this is a loss report, and I marked it High urgency because claims are always High.
- **E10** (medium): The underwriter at Birchview Assurance is asking for a copy of the winter tire invoice by November 30, 2026, or the winter tire discount will be removed at the next billing. She also asks whether Marc Tremblay, a 19-year-old household member, drives the insured vehicle, and if so, for a change adding him as a driver. I chose 'underwriter request' because the email comes from an insurer and asks for documents and a policy change, and the client is the insured, Louise Tremblay, named in the email.
- **E11** (medium): Daniel Okafor is moving on December 1, 2026, to a house in Hamilton and selling his condo. He asks whether this changes his car quote and wants home insurance set up for the new place. I chose policy change because the address change is the only request that requires action on an existing policy, and the email gives policy KB-AU-0098213. The renewal price question and the home insurance request are secondary.
- **E12** (high): Tamsin Lee, bookkeeper for Fraser & Daughters Plumbing Inc., asks to add a newly delivered 2025 Ram ProMaster 2500 service van to commercial auto policy KB-CA-3318806 effective November 9, 2026, and wants the updated pink slips and invoice sent to her. I chose 'policy change' because the core request is adding a vehicle to an existing policy, and the client is the company since staff wrote on its behalf.
