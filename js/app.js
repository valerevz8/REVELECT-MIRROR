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
          <p class="eyebrow">A quiet place to reflect</p>
          <h1 id="landing-title">See Clearly.</h1>
          <p class="landing-kicker">One reflection. One insight.</p>
          <div class="actions landing-actions">
            <a class="button" href="reflection.html">Begin reflection</a>
            <a class="button button--ghost" href="report.html">Return to your report</a>
          </div>
        </div>
        <aside class="card preview-card" aria-label="Reflection preview">
          <p class="eyebrow">Today’s mirror</p>
          <strong>Awareness begins quietly.</strong>
          <div class="preview-card__rule"></div>
          <p>A small pause to notice what is already present.</p>
        </aside>
      </section>
    </div>`;
})();
