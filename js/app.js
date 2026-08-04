(function () {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="shell">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html" aria-label="REVELECT home"><img src="assets/revelect-logo.png" alt="REVELECT"></a>
        <div class="nav__links"><a href="reflection.html">Reflection</a><a href="report.html">Report</a></div>
      </nav>
      <section class="hero">
        <div>
          <p class="eyebrow">One reflection · One insight</p>
          <h1>A different way of seeing yourself.</h1>
          <p class="lead">REVELECT is a quiet guided reflection that helps you notice awareness, emotion, patterns, agency, and direction in the life you are already living.</p>
          <div class="actions">
            <a class="button" href="reflection.html">Start your reflection</a>
            <a class="button button--ghost" href="report.html">View saved report</a>
          </div>
        </div>
        <aside class="card hero-card" aria-label="Reflection preview">
          <p class="eyebrow">Preview</p>
          <h2>Pause before the day moves on.</h2>
          <p>Answer a short set of prompts, then receive a simple snapshot of the themes that surfaced in your responses.</p>
        </aside>
      </section>
      <section class="steps" aria-label="How it works">
        <div class="step"><strong>01 · Notice</strong><span>Respond to reflective prompts without needing perfect answers.</span></div>
        <div class="step"><strong>02 · Map</strong><span>Your responses are grouped into five human-centered dimensions.</span></div>
        <div class="step"><strong>03 · Return</strong><span>Keep the final note you do not want to forget today.</span></div>
      </section>
    </div>`;
})();
