# Test Emails — Callander & Reid Insurance Brokers

Synthetic test data. Callander & Reid, its clients, both carriers (Birchview Assurance, Kestrel Bay Insurance), and every person, address, VIN, and policy number here are made up. Email addresses use reserved test domains (`example.com`, `.example`), and phone numbers use the 555-01xx range set aside for fiction.

The emails are sent from Yahoo disposable addresses on one free account, such as `crdemopersonas-hgill@yahoo.com`, each carrying the persona's name. Free accounts allow 3 disposable addresses at a time, so they're swapped between batches. The real From address differs from the persona address shown here. The display name matches. The answer key doesn't score the From address.

Twelve emails, numbered by ID. Only the two orders below matter; the rest can go in any order. Each subject is unique, because the scoring script matches emails to `answer-key.json` by subject. Paste each subject and body exactly as written.

**Order matters for two pairs:**

1. **E06 and E12 are the story step 4 pair.** Send E06 early. Send E12 only after the broker has corrected E06 and that correction has been fed back to the extractor (Monday's feedback loop). If the loop is cut, E12 runs as a normal test email.
2. **E11 replies on E04's thread.** Send E04 first.

| # | Persona | Subject | Category |
|---|---|---|---|
| E01 | Heather Gill | accident yesterday?? | claim notice |
| E02 | Ryan Mercer | New car + question about the house | policy change |
| E03 | Louise Tremblay | quick question | policy change |
| E04 | Daniel Okafor | RE: Your Kestrel Bay renewal - KB-AU-0098213 | renewal question |
| E05 | Greg Sutherland, Kestrel Bay underwriter | FW: RE: RE: 14 Ambergate Cres - inspection report | underwriter request |
| E06 | Brenda Kowalski, Northshore Landscaping | Add new truck to fleet | policy change |
| E07 | Jenna Mercer | pink slips | other |
| E08 | "Kev" | renewal | renewal question |
| E09 | Daniel Okafor | water coming through my ceiling | claim notice |
| E10 | Dana Whitfield, Birchview underwriter | BVA-2290471 Tremblay - info required | underwriter request |
| E11 | Daniel Okafor | RE: RE: Your Kestrel Bay renewal - KB-AU-0098213 | policy change |
| E12 | Tamsin Lee, Fraser & Daughters Plumbing | New van - please add to policy | policy change |

---

## E01

**From (persona):** Heather Gill <heather.gill@example.com>

**Subject:**

```
accident yesterday??
```

**Body:**

```
hi sorry i dont know who to email about this. somebody rear ended me yesterday morning on the 401 eastbound near dixie, stop and go traffic and he just didnt stop. nobody hurt thank god but the back of the tucson is pushed in and the hatch wont close

police told us to go to the collision reporting centre which we did. other guy is Brian Leclerc, his insurance is something with Lake in the name, i have a pic of his pink slip

do i call you guys or the insurance company directly?? and do i get a rental. i need the car for work

this was wed oct 14 around 7:45am

Heather

Sent from my iPhone
```

---

## E02

**From (persona):** Ryan Mercer <ryan.mercer@example.com>

**Subject:**

```
New car + question about the house
```

**Body:**

```
Hi Amir,

Hope you're well. Couple of things.

We finally bought the RAV4. It's a 2025 Toyota RAV4 Hybrid XLE, picking it up from the dealer on Saturday October 24. VIN is 2T3B6RFV8SW012345 (I'll double check that, the salesman wrote it by hand). Please add it to our auto policy BVA-4471829. We're keeping the CR-V and the Camry for now. Jenna's mom might take the Camry eventually but not yet. It's financed through the dealer if you need that.

Also unrelated, we had the whole roof redone in September, new asphalt shingles, about $18k. Does that change anything on the house insurance? Someone at work told me we'd get a better rate.

Thanks,
Ryan
```

---

## E03

**From (persona):** Louise Tremblay <louise.tremblay@example.com>

**Subject:**

```
quick question
```

**Body:**

```
Hello,

My son is driving my car now. Marc moved back home after school, he's been here about two weeks and he takes the Corolla to his job most days. Does he need to be on the insurance or is it fine since it's my car? He has his full G licence since last year.

Let me know what you need from me.

Merci,
Louise Tremblay
```

---

## E04

**From (persona):** Daniel Okafor <d.okafor@example.com>

**Subject:**

```
RE: Your Kestrel Bay renewal - KB-AU-0098213
```

**Body:**

```
Hi,

I got the renewal package for my car insurance and the premium went from $2,140 to $2,610. That's like 22% more and I haven't had any tickets or claims. Is this right? Can you shop it around before Nov 15?

Thanks
Daniel

On Fri, Oct 9, 2026 at 10:02 AM Callander & Reid Insurance Brokers <callanderreid.service@gmail.com> wrote:
> Dear Daniel,
>
> Your renewal documents for Kestrel Bay Insurance policy KB-AU-0098213, effective November 15, 2026, are attached. Please review them and let us know if anything has changed with your vehicle, drivers, or address.
>
> Kind regards,
> Callander & Reid Insurance Brokers
```

---

## E05

**From (persona):** Greg Sutherland <gsutherland@kestrelbay.example>

**Subject:**

```
FW: RE: RE: 14 Ambergate Cres - inspection report
```

**Body:**

```
Hi team, see below. Thx

Greg

---------- Forwarded message ---------
From: Greg Sutherland <gsutherland@kestrelbay.example>
Date: Wed, Oct 14, 2026 at 4:51 PM
Subject: RE: RE: 14 Ambergate Cres - inspection report
To: Sandra Pellegrino <callanderreid.service@gmail.com>

Hi Sandra,

Sorry for the delay, we've been buried since the hailstorm. Report is attached. Overall the property is in decent shape. The inspector flagged loose eavestroughs on the north side and a missing GFCI outlet in the kitchen, both are recommendations only, no action needed for us.

The one item we do need: the inspector noted an above-ground fuel oil tank in the basement that appears to be out of use (furnace was converted to gas). To keep policy KB-HO-0551903 in force past the December 1, 2026 renewal, we'll need either proof of removal by a TSSA-registered contractor or a current TSSA inspection certificate for the tank, by November 13, 2026. Without one of those we'll have to issue a notice of non-renewal.

Let me know if the insured has questions.

Greg Sutherland
Senior Underwriter, Personal Lines
Kestrel Bay Insurance
416-555-0187

On Tue, Oct 6, 2026 at 2:14 PM Sandra Pellegrino <callanderreid.service@gmail.com> wrote:
> Hi Greg,
>
> Just following up on the inspection for Heather Gill, 14 Ambergate Cres, Brampton. Any word on the report? Client is asking.
>
> Thanks,
> Sandra Pellegrino, CSR
> Callander & Reid Insurance Brokers
>
> On Mon, Sep 21, 2026 at 9:30 AM Greg Sutherland <gsutherland@kestrelbay.example> wrote:
>> Hi Sandra, inspection is booked for Sept 28. Will send the report when it's in.
```

---

## E06

**From (persona):** Brenda Kowalski <brenda.kowalski@northshore-landscaping.example>

**Subject:**

```
Add new truck to fleet
```

**Body:**

```
Hi Joanne,

Please add our new truck to the fleet policy BVC-7720154 effective November 2, 2026:

2026 Ford F-250 Super Duty, VIN 1FT7W2BT5TEC04471, with plow package

Driver will be Kyle Duarte (already on our driver list).

We need the pink slip before it goes out for the first snow event please.

Thanks,

Brenda Kowalski
Office Manager
Northshore Landscaping Ltd.
905-555-0142
```

---

## E07

**From (persona):** Jenna Mercer <jenna.m@example.com>

**Subject:**

```
pink slips
```

**Body:**

```
Hi! It's Jenna (Ryan's wife). Can you email me the pink slips for both cars? I cleaned out the glovebox and I think I threw them out with the old receipts 🤦‍♀️

Thank you!!
```

---

## E08

**From (persona):** kev.b1987@example.com (no display name)

**Subject:**

```
renewal
```

**Body:**

```
hey my insurance is up for renewal next month and honestly its way too expensive. can u guys get me a better rate. my policy is with you guys i think, i got it through my old work?

thx
Kev
```

---

## E09

**From (persona):** Daniel Okafor <d.okafor@example.com>

**Subject:**

```
water coming through my ceiling
```

**Body:**

```
Hi Amir,

The unit above me (1507) had a leak and water has been coming through my bathroom and hallway ceiling since Tuesday night (Oct 13). The building manager came and shut the water off. There's a big brown stain, the drywall is soft, and the laminate in the hallway is lifting.

The property manager says the condo corporation's insurance might cover some of it, but that I should "open a claim with my own insurance too"? I'm confused about whose insurance pays for what. Can you help?

Pictures attached.

Daniel Okafor
Unit 1407
```

---

## E10

**From (persona):** Dana Whitfield <dwhitfield@birchview.example>

**Subject:**

```
BVA-2290471 Tremblay - info required
```

**Body:**

```
Hi Sandra,

As part of our annual review of policy BVA-2290471 (insured: Louise Tremblay), please send a copy of the winter tire purchase or installation invoice by November 30, 2026. The insured currently receives the winter tire discount, and it will be removed at the next billing if we don't receive proof.

Also, our records show a household member at the same address, Marc Tremblay (age 19), holding an Ontario licence. Please confirm whether he operates the insured vehicle, and if so, submit a change to add him as a driver.

Thank you,

Dana Whitfield
Underwriter, Personal Auto
Birchview Assurance
```

---

## E11

**From (persona):** Daniel Okafor <d.okafor@example.com>

**Subject:**

```
RE: RE: Your Kestrel Bay renewal - KB-AU-0098213
```

**Body:**

```
Oh also forgot to mention, I'm moving December 1. Bought a house in Hamilton, so I'm selling the condo. Does that change the car quote? And I guess I need home insurance for the new place, can you set that up too?

Daniel

On Thu, Oct 15, 2026 at 8:40 AM Daniel Okafor <d.okafor@example.com> wrote:
> Hi,
>
> I got the renewal package for my car insurance and the premium went from $2,140 to $2,610. That's like 22% more and I haven't had any tickets or claims. Is this right? Can you shop it around before Nov 15?
>
> Thanks
> Daniel
```

---

## E12

**From (persona):** Tamsin Lee <tamsin.lee@fraserplumbing.example>

**Subject:**

```
New van - please add to policy
```

**Body:**

```
Hello,

We've taken delivery of a new service van and need it added to our commercial auto policy, KB-CA-3318806, as of November 9, 2026.

2025 Ram ProMaster 2500, VIN 3C6LRVDG9SE501928

It will be driven by our journeyman, Owen Fraser.

Please send the updated pink slips, and the invoice for the change, to me directly.

Regards,

Tamsin Lee
Bookkeeper
Fraser & Daughters Plumbing Inc.
```
