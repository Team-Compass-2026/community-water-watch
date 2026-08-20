# WaterWatch — Clickable Prototype Plan

A demo prototype for a community-powered WASH (water, sanitation, hygiene) risk platform in Yangon. Fictional demo data, scripted so one story runs across every screen: **small observations from many people reveal a bigger problem.**

## 1. Prototype structure

Two sides, one shared demo dataset, one linear story.

```text
Landing (choose side)
   |
   +-- CITIZEN  : Home/Risk -> Map -> Report (3 steps) -> Report detail/verify -> Alert
   |                                                                      |
   +-- ORG      : Dashboard -> Township drill-down -> Report evidence <---+
```

The pivot point is a single report the user files themselves. Filing it flips the neighborhood's risk level, triggers the citizen alert, and appears as the newest evidence in the org hotspot. Everything is client-side demo state — no backend, no live data.

Total: 8 screens (7 real + 1 landing).

## 2. Screens & flow

### 0. Landing / Role switch
- Purpose: set expectations, choose a side. Also a persistent top-right switcher so a judge can jump sides mid-demo.
- Content: product line, one-sentence explainer, two large cards ("I'm a resident" / "I'm an organization"), a small "demo data" disclaimer.
- CTA: Enter as Resident.

### 1. Citizen Home — "Your area today"
- Purpose: current WASH risk where I live.
- Header: location chip (Hlaing Tharyar, Ward 12) + alert bell.
- Main: large risk status card (Moderate, amber) with a plain-language reason ("14 reports in 7 days, mostly drainage + water colour"), a 14-day sparkline, 3 recommended actions, and a "Nearby reports" preview list.
- CTA: Report a problem. Secondary: View map, tap any nearby report.
- Clickable: risk card -> map, report items -> detail, CTA -> report flow.

### 2. Community Map
- Purpose: see the neighborhood as a pattern, not a list.
- Layout: map left (~65%), list panel right.
- Graphic: map with report pins by category + soft risk shading per ward.
- Content: category filters (water quality / sanitation / flooding / supply), time filter (7/30 days), selected-pin card with photo, verify count, status.
- CTA: Report a problem here. Clickable: pins, filters, list rows, "Report here" from a map tap.

### 3. Report a Problem (3 short steps, single screen with stepper)
- Step 1 Category: 4 big icon tiles.
- Step 2 Details: severity, short description, photo (pre-filled demo photo option), duration ("3 days").
- Step 3 Location: map pin, auto-detected address, confirm.
- CTA: Submit report. Secondary: back, "Your identity stays private".

### 4. Report Submitted / Confirmation
- Purpose: show what happens after you speak up — the verification concept.
- Main: success state, the report card as others will see it, "0 of 3 verifications", and a short "What happens next" 3-step strip (neighbors verify -> WaterWatch checks patterns -> alerts issued if risk rises).
- CTA: See it on the map. Hidden demo affordance: "Simulate neighbors verifying" (or auto-advance after ~2s) which moves it to Verified and bumps ward risk Moderate -> High.

### 5. Report Detail / Verification
- Purpose: show trust mechanics.
- Content: photo, category, time, location, verification meter (3/3 verified), "5 similar reports within 300m this week", status timeline (Submitted -> Verified -> Contributing to risk signal).
- CTA: Verify this report ("I've seen this too") / Dispute.

### 6. Citizen Alert
- Purpose: payoff of the story for the citizen.
- Presented as an in-app alert screen (arrived via bell badge or auto toast after verification).
- Content: "Elevated WASH risk in your ward", why it changed (report cluster + rainfall), what to do (boil/treat water, avoid floodwater contact, where the nearest clean water point is), and an explicit "This is a water & sanitation risk signal, not a medical diagnosis" note.
- CTA: See details on map. Secondary: share alert.

### 7. Organization Dashboard — Yangon overview
- Purpose: the analytical view.
- Layout: KPI row (active reports, verified %, wards at high risk, reports 7d change), choropleth map of Yangon townships left, ranked hotspot table right.
- Content: risk trend chart over 30 days, category breakdown, "New hotspot detected" banner for our ward.
- CTA: Investigate hotspot. Clickable: townships on the map, table rows, time-range toggle.

### 8. Township Drill-down / Hotspot Investigation
- Purpose: answer "why is this high risk?" and close the loop to citizen reports.
- Layout: left = ward map + risk score breakdown (report density, verification rate, category mix, rainfall, repeat locations, each with its weight); right = evidence feed of contributing reports, newest first — the user's own report sits at the top.
- Content: trend chart with an annotated spike, recommendation panel ("Field verification recommended: Ward 12 water points").
- CTA: Flag for investigation (changes status to Under investigation). Secondary: export brief, open any report -> screen 5.

## 3. Demo scenario

**Hlaing Tharyar Township, Ward 12 — late monsoon week.**

Over 8 days residents report blocked drains after heavy rain, standing water near the market, then discoloured/smelly tap water on two streets. Reports cluster within ~400m of one water point. The user is resident *Thiri*, who reports "brown water from the street tap, 3 days" — the 15th report in the cluster. Verification by neighbors pushes the ward from Moderate to High; an alert goes to Ward 12 residents; on the org side Ward 12 appears as Yangon's fastest-rising hotspot, with the cluster traced to one supply point. Framing stays at WASH risk signals, never disease diagnosis.

## 4. Essential interactions

- Role switch between citizen and org, any time.
- Map: pin select, filter by category/time, ward hover -> tooltip.
- Multi-step report form with real state, photo pick, pin drop.
- The verification beat (auto or button) that visibly changes risk Moderate -> High.
- Alert badge appearing on the bell, then the alert screen.
- Org table row / township click -> drill-down.
- Risk-score breakdown that expands to show contributing factors.
- Time-range toggle that visibly changes the trend chart.
- A subtle "restart demo" control so the story can be replayed.

## 5. Visual direction

Civic-tech / environmental monitoring, not clinical.
- Calm deep teal-to-slate base, cool neutral surfaces, generous whitespace; light mode primary.
- Risk scale as a deliberate 4-step ramp (low teal / moderate amber / high orange / severe deep red) used consistently on maps, badges, and charts — the only saturated color in the UI.
- Typography: a geometric-humanist sans for headings, a highly legible sans for data; tabular figures in tables.
- Cards with hairline borders and soft, low shadows; small map/chart-first layouts; data-ink over decoration.
- Citizen side: larger type, mobile-width layout, friendly plain language. Org side: denser desktop grid, same tokens, more tables and charts.
- Motion: restrained — count-ups, risk-badge transitions, pin drop.

Exact palette and fonts will be chosen from design directions before building.

## 6. Technical notes

- TanStack Start routes: `/` (landing), `/citizen`, `/citizen/map`, `/citizen/report`, `/citizen/report/:id`, `/citizen/alert`, `/org`, `/org/township/:id`.
- All demo data in a single typed module (`src/data/demo.ts`): wards, reports, risk history, alerts.
- Demo state (submitted report, verification, risk level, alert seen) in one client store persisted to localStorage, with a reset action; no backend needed.
- Maps: lightweight SVG/positioned-pin approach for the ward view and a simplified Yangon township shape map — avoids map-library keys and keeps it deterministic for demos.
- Charts via Recharts; shadcn components; semantic tokens in `src/styles.css`.
- Each route gets its own head() metadata.

## Open questions

- Citizen side mobile-framed inside the desktop page, or plain responsive?
- Should the verification beat be automatic (cleaner for a live demo) or a button the presenter clicks?
