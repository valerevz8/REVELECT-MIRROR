(function () {
  const main = document.querySelector('main');
  if (!main) return;

  main.innerHTML = `
    <div class="shell landing">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html">REVELECT</a>
      </nav>
      <section class="hero" aria-label="REVELECT introduction">
        <h1>See Clearly.</h1>
        <p class="lead">One reflection.<br>One insight.<br>A different way of seeing yourself.</p>
        <div class="actions">
          <a class="button" href="reflection.html">Start Your Reflection</a>
          <a class="button button--ghost" href="report.html">View Saved Report</a>
        </div>
      </section>
    </div>`;
})();
