# Scored Run 7

Run 2: Sonnet 5.5, schema v1. Model `claude-sonnet-5-5`. Run started 2026-10-16T19:52:55.523Z. Claude-built scoring script.

## Totals

1. **Category:** 11/12 right.
2. **Fields:** 70/72 right (6 scored fields per email).
   - urgency: 12/12
   - client_name: 11/12
   - policy_number: 12/12
   - cant_tell_policy: 12/12
   - effective_date: 11/12
   - requested_change: 12/12
3. **Tokens:** 20571 in, 4023 out, across 12 model calls.
4. **Cost:** $0.0814 for 12 emails, $0.00678 per email, at $2.0/$10.0 per million tokens in/out.

## Per Email

| Email | Category | urgency | client_name | policy_number | cant_tell_policy | effective_date | requested_change | Confidence |
|---|---|---|---|---|---|---|---|---|
| E01 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E02 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E03 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | medium |
| E04 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E05 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E06 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E07 | ✓ | ✓ | ✗ | ✓ | ✓ | ✓ | ✓ | low |
| E08 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | low |
| E09 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E10 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |
| E11 | ✗ | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | high |
| E12 | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | high |

## Misses

- **E07 client_name:** got `None`, want `Mercer, Ryan & Jenna`
- **E11 category:** got `renewal question`, want `policy change`
- **E11 effective_date:** got `2026-11-15`, want `2026-12-01`

## The AI's Reasons

- **E01** (high): Heather Gill reports that her Hyundai Tucson was rear-ended yesterday morning on the 401 eastbound near Dixie, so this is a claim notice. Claims are high urgency. She gives no policy number, so the policy can't be identified from the email. The loss date is Wednesday, October 14, 2026, which is the day before the email was received.
- **E02** (high): Ryan Mercer asks the broker to add a newly purchased 2025 Toyota RAV4 Hybrid XLE to his auto policy BVA-4471829, effective when he picks it up on Saturday, October 24, 2026. He also asks about a new roof on his house, but the vehicle addition is the request that needs action on a policy, so I categorized it as a policy change.
- **E03** (medium): Louise Tremblay asks whether her son Marc, who moved back home about two weeks ago and drives her Corolla to work most days, needs to be added to her insurance. This is a question about adding a driver to an existing policy, so I categorized it as a policy change. No policy number or specific effective date was given.
- **E04** (high): The client is asking why his auto renewal premium rose from $2,140 to $2,610 and wants the brokerage to shop the policy around before the renewal date. This is a renewal question about Kestrel Bay policy KB-AU-0098213 for Daniel Okafor, and the renewal date of November 15, 2026 appears in the quoted earlier email.
- **E05** (high): A Kestrel Bay underwriter's forwarded message says the insurer needs proof of removal of an unused fuel oil tank, or a current TSSA inspection certificate, by November 13, 2026. Without either, the home policy will not be renewed on December 1, 2026. This is an underwriter request with a coverage threat, so urgency is high. The insured is Heather Gill, and the policy number is stated in the email.
- **E06** (high): Brenda Kowalski, office manager at Northshore Landscaping Ltd., asks to add a new 2026 Ford F-250 to the fleet policy BVC-7720154 effective November 2, 2026. This is a request to change an existing policy by adding a vehicle, so the category is policy change. The client is the company rather than the sender, and the request is routine, so urgency is Normal.
- **E07** (low): Jenna Mercer, who says she is Ryan's wife, asks the brokerage to email her the pink slips (insurance ID cards) for both cars because she threw hers away. This is a document request rather than a change to a policy, a claim, a renewal question, or an insurer request, so I chose 'other'. The email gives no policy number and only a first name for the husband, so the client and policy are uncertain.
- **E08** (low): The sender asks the brokerage to find a cheaper rate for his insurance, which renews next month, so this is a renewal question about shopping the renewal. He signs only as 'Kev' with an email handle, and gives no last name or policy number. He isn't sure the policy is even with the brokerage, so the client and policy can't be identified.
- **E09** (high): Daniel Okafor reports water damage to his condo unit (1407) from a leak in the unit above, which began Tuesday night, Oct 13. He is asking for help opening a claim and understanding whose insurance pays for what. This is a loss report, so I chose claim notice with High urgency. The email gives no policy number, so the policy can't be identified.
- **E10** (high): An underwriter at Birchview Assurance is asking the brokerage for a winter tire invoice by November 30, 2026, and for confirmation of whether household member Marc Tremblay drives the insured vehicle. This is an underwriter request about policy BVA-2290471 for the insured, Louise Tremblay. It is not a client-initiated change, and the added-driver question depends on the answer. The deadline is firm, but losing the discount is not a threat to coverage, so urgency is Normal.
- **E11** (high): Daniel Okafor is asking about his auto renewal, whose premium rose from $2,140 to $2,610. He wants it shopped around before Nov 15. In a follow-up he says he is moving December 1 and asks whether that changes the car quote, and also asks for home insurance on the new house. I chose renewal question because the main request is about the car renewal, and I took the policy number from the subject line.
- **E12** (high): Tamsin Lee, bookkeeper for Fraser & Daughters Plumbing Inc., asks to add a new 2025 Ram ProMaster van to the company's commercial auto policy KB-CA-3318806 effective November 9, 2026. This is a change to an existing policy, so I chose 'policy change'. The client is the company, not the sender, and the policy number is stated in the email.
