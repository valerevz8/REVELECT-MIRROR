# REVELECT — Design Bible v1.1

## Visual Refinement & Reflection Experience

> **Source of truth for the REVELECT Visual Refinement v1.1.**
>
> This version refines the existing MVP. It does not redefine the product or authorize a rebuild.

---

## 1. Product North Star

REVELECT is a **guided self-reflection experience**.

The product helps people see themselves more honestly through carefully written reflection prompts and a calm editorial experience.

REVELECT is **not**:
- a personality test
- a diagnostic tool
- a therapy app
- a productivity dashboard
- an AI chatbot

### Core feeling
> **A quiet editorial space for self-reflection.**

---

## 2. Product Principles

### Reflection over evaluation
The user should feel invited to notice, not judged.

### Narrative over numbers
Internal scoring may exist, but user-facing reports should communicate meaning through language rather than percentages.

### Calm over stimulation
Use generous whitespace, restrained motion, subtle borders, and minimal UI.

### Personal artifact over dashboard
The report should feel like something the user can keep, revisit, and share.

### Consistency over novelty
Do not add features simply because they are technically possible.

---

## 3. Visual Direction

Use the reference-inspired visual language as a **family resemblance, not a copy**.

### Visual keywords
- warm ivory
- charcoal
- muted taupe
- muted terracotta / bronze
- editorial
- premium
- quiet
- spacious
- tactile

### Color direction
- Background: warm ivory, approximately `#F5F1E8`
- Primary text: soft charcoal, approximately `#292722`
- Accent: muted bronze / warm terracotta
- Do not introduce saturated colors.

### Typography
- UI/body: clean sans-serif
- Reflection question text: **Calibri**
- Display/editorial moments: elegant serif such as **Cormorant Garamond**, consistent with the existing brand direction

### Components
- Large comfortable spacing
- Subtle borders
- Almost no visible shadow
- Soft, restrained corner radius
- Minimal iconography

### Motion
Motion should be slow and subtle.

Avoid:
- flashy transitions
- gradients
- glassmorphism
- excessive blur
- highly animated UI

---

## 4. Landing Page

Keep the existing core structure and functionality.

Make the landing page more minimal and Apple-like through **reduction, not addition**.

### Hierarchy
1. Eyebrow
2. **See Clearly.**
3. Concise supporting line
4. Primary CTA

### Hero copy direction
Remove or substantially reduce long explanatory copy in the hero. The design should communicate the concept without a paragraph-heavy introduction.

Keep the existing:
- `ONE REFLECTION. ONE INSIGHT.`
- `See Clearly.`
- `A different way of seeing yourself.`

### Today's Mirror
Keep the **Today's Mirror** concept if it remains visually useful, but make it feel like an editorial artifact rather than a dashboard widget.

### Do not add
- feature grids
- testimonials
- pricing sections
- social proof
- unrelated marketing sections

---

## 5. Reflection Experience

Keep:
- one prompt per screen
- the existing 25-prompt journey
- minimal progress presentation

### Question typography
Reflection question text **must use Calibri** for a calmer, more intimate reading experience.

### Scale interaction — required behavior
Initial state:
- all five scale points are empty
- no answer is selected
- no value is prefilled

After explicit click:
- only the clicked point becomes visually active
- the selected state may use a restrained animation

Validation:
- advancing requires an explicit selection
- no default value may satisfy validation

### Choice interaction
Retain the existing stacked-card interaction. It fits the editorial direction and should not be unnecessarily redesigned.

### Progress
Keep progress quiet and minimal, e.g.:

`1 / 25`

A restrained progress indicator is acceptable.

### Do not add
- gamification
- streaks
- badges
- confetti
- distracting feedback

---

## 6. Report Experience

### Remove from user-facing UI
- visible percentages
- numerical scores
- dimension score cards

Internal scoring may remain if required by the deterministic narrative engine.

### Report hierarchy
The report should feel editorial and reflective:

1. **What surfaced today**
2. Narrative insight
3. **What seems to ask for your attention**
4. Optional exploration / reflection
5. User's own note / Mirror Moment
6. Final Mirror Question

Use narrative language rather than labels such as:
- `high awareness`
- `92% emotion`
- `100% agency`

The user should encounter meaning, not a performance score.

---

## 7. Personal Reminder Artifact

Turn the user's final note / **Mirror Moment** into a beautiful saved artifact.

### Suggested label
> **A note to yourself**

### Rules
- Preserve the user's exact text.
- Show date/time metadata.
- Provide Save and Share actions where compatible with the current static architecture.
- The artifact should feel worth screenshotting and keeping.
- It should not look like a generic dashboard widget.

### Preferred visual treatment
A high-contrast charcoal/dark card with warm light text is the primary direction.

Keep the treatment restrained and editorial.

---

## 8. History Foundation

REVELECT should eventually become a mirror that gets clearer over time.

Prepare the UI/data model for reflection history **without turning the MVP into a dashboard**.

Think in:
- monthly reflection moments
- quarterly reflection moments

Avoid daily productivity tracking.

### Future comparison language
Comparisons should be narrative, not score-based.

Example:

> **Then:** You were trying to understand what you felt.
>
> **Now:** You're beginning to understand why you respond the way you do.

For v1.1, create only the minimum foundation needed. Do not build a full analytics/history system unless it is already naturally supported by the current architecture.

---

## 9. Content Architecture

Keep the existing JSON/content architecture.

### Core IP
The **25 reflection prompts** remain unchanged.

### Internal journeys
1. Notice Yourself
2. Notice Your Feelings
3. Notice Your Patterns
4. Notice Your Choices
5. Notice Your Direction

These are internal narrative structure and should **not** become visible chapter navigation unless explicitly approved.

### Supported Alpha interaction types
- `scale`
- `choice`
- `text`
- final `Mirror Moment`

Do not add AI-generated interpretations as a replacement for the deterministic narrative system.

---

## 10. Engineering Guardrails

This is a **refinement pass, not a rebuild**.

### Preserve
- working functionality
- current static architecture
- current framework/stack
- existing navigation architecture
- existing JSON/content structure
- internal scoring/narrative logic

### Do not change
- the 25 reflection prompts
- prompt wording
- prompt order
- product positioning
- internal scoring logic unless strictly required for the approved UI
- navigation architecture

### Implementation style
- Make the smallest clean changes necessary.
- Reuse existing CSS/JS patterns where possible.
- Avoid unnecessary dependencies.
- Do not introduce unrelated features.

### Workflow
1. Work on a dedicated branch.
2. Implement only approved changes.
3. Preview locally.
4. Test the full flow.
5. Review screenshots visually.
6. Merge only after approval.

---

## 11. Definition of Done

### Landing
- [ ] Hero is visibly calmer and less wordy.
- [ ] Core REVELECT hierarchy remains intact.
- [ ] No unrelated marketing sections added.

### Reflection
- [ ] Questions use Calibri.
- [ ] Scale starts completely empty.
- [ ] No default scale value exists.
- [ ] Only the explicitly clicked point becomes active.
- [ ] User cannot advance without an explicit selection.
- [ ] Existing choice-card interaction remains functional.
- [ ] All 25 prompts remain unchanged.

### Report
- [ ] No visible percentages.
- [ ] No visible numerical score cards.
- [ ] Narrative report hierarchy is preserved.
- [ ] User's exact Mirror Moment is retained.

### Personal artifact
- [ ] Mirror Moment is presented as a premium reminder card.
- [ ] Date/time is shown.
- [ ] Save action exists where technically appropriate.
- [ ] Share action exists where technically appropriate.

### Quality
- [ ] Landing → reflection → report works end-to-end.
- [ ] Desktop layout is clean.
- [ ] Mobile layout is clean.
- [ ] No console-breaking errors introduced.
- [ ] No unnecessary dependencies added.
- [ ] Branch is reviewed before merge.

---

## Final Design Principle

> **REVELECT should feel less like an app that tells you who you are, and more like a quiet place where you can finally notice yourself.**
