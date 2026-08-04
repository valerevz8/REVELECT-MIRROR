(function () {
  const main = document.querySelector('main');
  const session = window.RevelectStorage.readSession();

  function narrativeFor(score) {
    if (score.band === 'high') return 'This theme is strongly present in your reflection today.';
    if (score.band === 'medium') return 'This theme is present, with room for more gentle attention.';
    return 'This theme may be asking for slower, kinder attention.';
  }

  window.RevelectEngine.loadContent()
    .then(({ questions, dimensions }) => {
      const answered = Object.keys(session.answers || {}).length;
      if (!answered) {
        main.innerHTML = `<div class="shell empty"><p class="eyebrow">No reflection yet</p><h1>Your report is waiting for your first reflection.</h1><p class="lead">Complete the guided prompts to generate a personal snapshot.</p><div class="actions"><a class="button" href="reflection.html">Start reflection</a></div></div>`;
        return;
      }

      const scores = window.RevelectEngine.calculateScores(questions, dimensions, session.answers);
      const finalNote = session.answers[25];
      main.innerHTML = `
        <div class="shell">
          <nav class="nav"><a class="logo" href="index.html" aria-label="REVELECT home"><img src="assets/revelect-logo.png" alt="REVELECT"></a><a href="reflection.html">Reflect again</a></nav>
          <section class="card">
            <p class="eyebrow">Your reflection report</p>
            <h1>What surfaced today</h1>
            <p class="lead">This is not a diagnosis or a scorecard. It is a mirror for the themes present in your answers.</p>
            <div class="report-grid">${scores.map((score) => `<article class="metric"><span>${score.name}</span><br><b>${score.percent}%</b><p>${narrativeFor(score)}</p></article>`).join('')}</div>
            ${finalNote ? `<article class="step"><strong>A note to remember</strong><span>${finalNote}</span></article>` : ''}
            <div class="actions"><button class="button button--ghost" id="reset">Clear saved reflection</button></div>
          </section>
        </div>`;
      main.querySelector('#reset').addEventListener('click', () => { window.RevelectStorage.clearSession(); window.location.href = 'index.html'; });
    })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
