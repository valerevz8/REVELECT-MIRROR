# REVELECT — Design Bible v1.1

## Visual Refinement & Reflection Experience

> **Source of truth for the REVELECT Visual Refinement v1.1.**
>
> This version refines the existing MVP. It does not redefine the product or authorize a rebuild.

---

## 1. Product North Star

- REVELECT is a **guided self-reflection experience**.
- The product helps people see themselves more honestly through carefully written reflection prompts and a calm editorial experience.
- REVELECT is **not**:
  - a personality test
  - a diagnostic tool
  - a therapy app
  - a productivity dashboard
  - an AI chatbot
- Core feeling: a quiet editorial space for self-reflection.

---

## 2. Product Principles

- Reflection over evaluation — the user should feel invited to notice, not judged.
- Narrative over numbers — internal scoring may exist, but user-facing reports should communicate meaning through language rather than percentages.
- Calm over stimulation — generous whitespace, restrained motion, subtle borders, and minimal UI.
- Personal artifact over dashboard — the report should feel like something the user can keep, revisit, and share.
- Consistency over novelty — do not add features simply because they are technically possible.

---

## 3. Visual Direction

- Use the reference-inspired visual language as a family resemblance, not as a copy.
- Visual keywords: warm ivory, charcoal, muted taupe, muted terracotta/bronze, editorial, premium, quiet, spacious, tactile.
- Background target: warm ivory, approximately `#F5F1E8`.
- Primary text target: soft charcoal, approximately `#292722`.
- Accent target: muted bronze / warm terracotta. Do not introduce saturated colors.
- Use a clean sans-serif UI font. Reflection question text should use Calibri.
- Use an elegant serif selectively for display/editorial moments such as the hero headline.
- Cards should have large comfortable spacing, subtle borders, soft corners, and almost no visible shadow.
- Motion should be slow and subtle. Avoid flashy transitions, gradients, glassmorphism, excessive blur, or highly animated UI.

---

## 4. Landing Page

- Keep the existing core structure and functionality.
- Make the landing page more minimal and Apple-like through reduction, not addition.
- Primary hierarchy: eyebrow → `See Clearly.` → concise supporting line → CTA.
- Remove or substantially reduce long explanatory copy in the hero. The design should communicate the concept without a paragraph-heavy introduction.
- Keep the `Today's Mirror` concept if it remains visually useful, but make it feel like an editorial artifact rather than a dashboard widget.
- Do not add feature grids, testimonials, pricing, social proof, or unrelated marketing sections in this refinement.

---

## 5. Reflection Experience

- Keep one prompt per screen and the existing 25-prompt journey.
- Do not rewrite or reorder the 25 reflection prompts.
- Question text must use Calibri for a calmer, more intimate reading experience.
- Scale interaction must begin completely unselected: all five points are empty.
- No answer may be preselected or defaulted.
- When the user explicitly clicks a point, only that selected point should become visually active.
- Advancing must require an explicit answer.
- Choice questions should retain the existing stacked-card interaction because it fits the editorial direction.
- Keep progress minimal and quiet, e.g. `1 / 25` plus a restrained progress indicator.
- Do not add gamification, streaks, badges, confetti, or distracting feedback.

---

## 6. Report Experience

- Remove visible percentages, numerical scores, and dimension score cards from the user-facing report.
- Internal scoring may remain if it is required by the deterministic narrative engine.
- Report hierarchy should feel editorial: `What surfaced today` → narrative insight → `What seems to ask for your attention` → optional exploration → user's own note → final mirror question.
- Use narrative language rather than labels such as `high awareness` or `92% emotion`.
- Preserve the user's own words as the most personal element of the report.

---

## 7. Personal Reminder Card

- Turn the user's final note / Mirror Moment into a beautiful saved artifact.
- Suggested label: `A note to yourself`.
- The user's exact text should remain intact.
- Use a high-contrast charcoal card with warm light text as the primary treatment, or another restrained ivory/charcoal editorial treatment consistent with the system.
- Include date/time metadata.
- Provide Save and Share actions.
- The artifact should feel worth screenshotting and keeping, not like a generic UI card.

---

## 8. History Foundation

- REVELECT should eventually become a mirror that gets clearer over time.
- Prepare the UI/data model for reflection history without turning the MVP into a dashboard.
- Think in monthly or quarterly reflection moments rather than daily productivity tracking.
- Future comparisons should be narrative, for example: `Then: You were trying to understand what you felt.` / `Now: You're beginning to understand why you respond the way you do.`
- For this refinement, create only the minimum foundation needed; do not build a full analytics/history system unless already supported by the current architecture.

---

## 9. Content Architecture

- Keep the existing JSON/content architecture.
- 25 prompts remain the core IP.
- Internal journeys: Notice Yourself, Notice Your Feelings, Notice Your Patterns, Notice Your Choices, Notice Your Direction.
- These journeys are internal narrative structure and should not become visible chapter navigation unless explicitly approved.
- Supported Alpha interaction types: scale, choice, text, and final Mirror Moment.
- Do not add AI-generated interpretations as a replacement for the deterministic narrative system.

---

## 10. Engineering Guardrails

- Preserve working functionality.
- Do not rewrite the app or migrate frameworks.
- Do not change question wording, scoring logic, JSON structure, or navigation architecture unless a small change is strictly necessary for an approved UI fix.
- Implement only the approved visual/UX refinements.
- Keep the code maintainable and avoid unnecessary dependencies.
- Use branches and a pull request. Preview before merge.
- After implementation, test landing → reflection → report end-to-end, including scale validation and empty-state behavior.

---

## 11. Definition of Done

- Landing page is visibly calmer and less wordy.
- Reflection scale has no default selection.
- Only the clicked scale point is active.
- Scale cannot advance without explicit selection.
- Reflection questions use Calibri.
- Report contains no visible percentages/scores.
- User note is presented as a premium reminder artifact.
- Date/time is shown on the reflection artifact/report.
- Save and Share actions are present where supported by the current static architecture.
- All existing 25 prompts and core functionality remain intact.
- Desktop and mobile layouts remain clean and usable.
- Changes are reviewed visually before merge.
