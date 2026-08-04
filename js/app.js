(function () {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="shell">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html">REVELECT</a>
        <div class="nav__links"><a href="reflection.html">Reflection</a><a href="report.html">Report</a></div>
      </nav>
      <section class="hero">
        <div>
          <p class="eyebrow">Revelect Bible</p>
          <h1>We don’t help people become someone else.</h1>
          <p class="lead">We help people see themselves more clearly — one reflection at a time.</p>
          <div class="actions">
            <a class="button" href="reflection.html">Start your reflection</a>
            <a class="button button--ghost" href="report.html">View saved report</a>
          </div>
        </div>
        <aside class="card hero-card" aria-label="Reflection preview">
          <p class="eyebrow">Our Mission</p>
          <h2>To help people see themselves more clearly, so they can live more intentionally.</h2>
          <p>No quick fixes. No labels. Only a carefully paced reflection that returns you to your own language.</p>
        </aside>
      </section>
      <section class="steps" aria-label="How it works">
        <div class="step"><strong>01</strong><span>Guided, not generic — every reflection is structured to go deeper, not broader.</span></div>
        <div class="step"><strong>02</strong><span>Narrative over data — the report helps you understand the story behind the pattern.</span></div>
        <div class="step"><strong>03</strong><span>Designed for real change — from insight to action, with clarity and restraint.</span></div>
      </section>
    </div>`;
})();
