(function () {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="shell landing-shell">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html">REVELECT</a>
        <div class="nav__links"><a href="reflection.html">Reflection</a><a href="report.html">Report</a></div>
      </nav>
      <section class="landing-hero" aria-labelledby="landing-title">
        <p class="eyebrow">A quiet editorial mirror</p>
        <h1 id="landing-title">Meet yourself where you are.</h1>
        <p class="lead">REVELECT turns a few considered questions into a personal reflection across awareness, emotion, patterns, agency, and direction.</p>
        <div class="actions landing-actions">
          <a class="button" href="reflection.html">Begin reflection</a>
          <a class="text-link" href="report.html">Return to your report</a>
        </div>
      </section>
      <section class="editorial-strip" aria-label="Reflection rhythm">
        <article><span>01</span><strong>Read slowly</strong><p>Each prompt is written to invite attention rather than performance.</p></article>
        <article><span>02</span><strong>Answer honestly</strong><p>Choose the point that feels closest, or leave a final note in your own words.</p></article>
        <article><span>03</span><strong>Notice the pattern</strong><p>Your report keeps the experience simple: themes, signals, and one thing to remember.</p></article>
      </section>
    </div>`;
})();
