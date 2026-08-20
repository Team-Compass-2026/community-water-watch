# Community Water Watch

I want to design a clickable hackathon prototype for a product called WaterWatch.

Product Context

WaterWatch is a community-powered platform for monitoring water, sanitation, flooding, and potential waterborne-disease risks.

The basic concept is:

Citizens observe and report local problems → WaterWatch aggregates and verifies the reports → the system identifies local risk patterns → citizens receive alerts → organizations can see and investigate high-risk areas.

The platform has two sides:

1. Citizen side

Citizens should be able to:

See the WASH risk around their area

View nearby reports on a map

Report a water/sanitation/flooding problem

Add a photo and location

See whether other people have verified a report

Receive local alerts

View simple recommended actions

The citizen experience should feel simple, useful, trustworthy, and community-oriented.

2. Organization side

Organizations such as NGOs or WASH teams should be able to:

See an overview of Yangon

View WASH risk by township

Identify high-risk hotspots

See trends and changes over time

Investigate the reports contributing to a risk score

Understand why an area is considered high-risk

Identify areas that may require investigation or intervention

The organization experience should feel professional, analytical, and data-driven.

Important

WaterWatch does not diagnose cholera or any disease.

The prototype should present WASH risk signals, not medical diagnoses.

The data in the prototype can be fictional/demo data. We want it to feel realistic, but it should not pretend to be live public-health data.

What I want from you

Do not build the application yet.

I want to first have a planning discussion about the clickable prototype.

Help me determine:

1. Prototype structure

What is the simplest and most compelling structure for the prototype?

2. Screens

What screens do we actually need?

Keep the number of screens minimal. Every screen should have a clear purpose.

3. User flow

Design the ideal clickable journey.

I want the prototype to demonstrate this story:

Citizen sees local risk → discovers a problem → reports it → report gets verified → WaterWatch detects a pattern → risk changes → citizen receives an alert → organization sees the resulting hotspot.

4. Screen contents

For each recommended screen, tell me:

Screen title

Main purpose

Header

Main content

Left/right layout if relevant

Main graphic or visualization

Primary CTA

Important secondary elements

What should be clickable

Keep the descriptions relatively simple. I want to make the actual design decisions later.

5. Demo scenario

Suggest one realistic fictional scenario in Yangon that we can use throughout the prototype so that all the screens feel connected.

For example, one neighborhood experiencing several water/sanitation reports that eventually becomes a high-risk hotspot.

6. Prototype interactions

Identify the interactions that are essential for making the prototype feel genuinely clickable and convincing.

7. Visual direction

Suggest a suitable visual direction for WaterWatch.

Think:

modern civic technology + public health + environmental monitoring

It should feel trustworthy, clean, calm, and data-driven rather than looking like a generic health app.

Design principle

The prototype should communicate one simple idea:

"Small observations from many people can reveal a bigger problem."

Prioritize clarity, storytelling, and usability over having lots of features.

Let's first agree on the prototype structure and user flow before building anything.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ce3f35d2-6ca0-4ea9-a67d-0d59261a3473).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
