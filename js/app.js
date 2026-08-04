(function () {
  const main = document.querySelector('main');
  if (!main) return;
  const session = window.RevelectStorage.readSession();
  const history = window.RevelectStorage.readHistory();
  const answered = Object.keys(session.answers || {}).length;
  const cta = answered ? 'Resume Reflection' : 'Start Reflection';

  main.innerHTML = `
    <div class="shell shell--home fade-in">
      <nav class="nav" aria-label="Primary">
        <a class="logo" href="index.html" aria-label="REVELECT home">REVELECT</a>
        <div class="nav__links"><a href="reflection.html">Reflection</a>${history.length ? '<a href="report.html">History</a>' : ''}</div>
      </nav>
      <section class="hero hero--single" aria-labelledby="hero-title">
        <p class="eyebrow">A quiet mirror for today</p>
        <h1 id="hero-title">See yourself with more tenderness.</h1>
        <p class="lead">REVELECT guides you through 25 reflective prompts, then returns a calm editorial report about the themes, signals, and questions already present in your answers.</p>
        <div class="actions">
          <a class="button" href="reflection.html">${cta}</a>
          ${history.length ? '<a class="button button--ghost" href="report.html">Open History</a>' : ''}
        </div>
      </section>
    </div>`;
})();
