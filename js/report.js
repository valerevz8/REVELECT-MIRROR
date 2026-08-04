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
      const strongestTheme = [...scores].sort((a, b) => b.percent - a.percent)[0];
      main.innerHTML = `
        <div class="shell">
          <nav class="nav"><a class="logo" href="index.html">REVELECT</a><a href="reflection.html">Reflect again</a></nav>
          <section class="report">
            <p class="eyebrow">Your reflection report</p>
            <h1>What surfaced today</h1>
            <p class="lead">A quiet mirror for the themes present in your answers.</p>
            <div class="report-list">${scores.map((score) => `<article class="metric"><span>${score.name}</span><b>${score.percent}%</b><p>${narrativeFor(score)}</p></article>`).join('')}</div>
            <article class="mirror"><strong>Mirror Moment</strong><span>Your reflection keeps returning to ${strongestTheme.name.toLowerCase()}. Let this be the place you listen first.</span></article>
            ${finalNote ? `<article class="closing"><strong>Closing Question</strong><p>What you chose to remember:</p><span>${finalNote}</span></article>` : ''}
            <div class="actions"><button class="button button--ghost" id="reset">Clear saved reflection</button></div>
          </section>
        </div>`;
      main.querySelector('#reset').addEventListener('click', () => { window.RevelectStorage.clearSession(); window.location.href = 'index.html'; });
    })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
