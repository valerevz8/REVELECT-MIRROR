(function () {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="shell landing-shell">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html">REVELECT</a>
        <div class="nav__links"><a href="reflection.html">Reflection</a><a href="report.html">Report</a></div>
      </nav>
      <section class="landing-composition" aria-labelledby="landing-title">
        <div class="landing-hero">
          <p class="eyebrow">One reflection. One insight.</p>
          <h1 id="landing-title">See Clearly.</h1>
          <p class="landing-kicker">A different way of seeing yourself.</p>
          <p class="lead">REVELECT is a quiet reflection experience designed to help you notice patterns, emotions, awareness, and direction with greater clarity.</p>
          <div class="actions landing-actions">
            <a class="button" href="reflection.html">Begin reflection</a>
            <a class="button button--ghost" href="report.html">Return to your report</a>
          </div>
        </div>
        <aside class="card preview-card" aria-label="Reflection preview">
          <p class="eyebrow">Today’s mirror</p>
          <strong>Awareness begins quietly.</strong>
          <div class="preview-card__rule"></div>
          <p>A short sequence of considered prompts, held in a calm space, reveals the shape of what is already present.</p>
        </aside>
      </section>
      <section class="editorial-strip" aria-label="Reflection rhythm">
        <article><span>01</span><strong>Read slowly</strong><p>Each prompt is written to invite attention rather than performance.</p></article>
        <article><span>02</span><strong>Answer honestly</strong><p>Choose the point that feels closest, or leave a final note in your own words.</p></article>
        <article><span>03</span><strong>Notice the pattern</strong><p>Your report keeps the experience simple: themes, signals, and one thing to remember.</p></article>
      </section>
    </div>`;
})();
