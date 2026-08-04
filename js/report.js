(function () {
  const main = document.querySelector('main');
  const session = window.RevelectStorage.readSession();

  function narrativeFor(score) {
    if (score.band === 'high') return 'This theme speaks clearly in today’s reflection, asking to be trusted as part of the story.';
    if (score.band === 'medium') return 'This theme is present in softer focus, offering a place to return with patience.';
    return 'This theme remains quiet today, perhaps asking for gentler attention over time.';
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
          <nav class="nav"><a class="logo" href="index.html">REVELECT</a><a href="reflection.html">Reflect again</a></nav>
          <section class="card report-article">
            <p class="eyebrow">Your reflection report</p>
            <h1>What surfaced today</h1>
            <div class="chapter-line" aria-hidden="true"></div><p class="lead">This is not a diagnosis or a scorecard. It is a mirror for the themes present in your answers — a quiet reading of what asked to be noticed.</p>
            <div class="report-grid">${scores.map((score) => `<article class="metric"><span>${score.name}</span><br><b>${score.percent}%</b><p>${narrativeFor(score)}</p></article>`).join('')}</div>
            ${finalNote ? `<article class="mirror"><span class="quote-mark" aria-hidden="true">“</span><p class="eyebrow">Mirror Moment</p><h2>${finalNote}</h2><p>Let this sentence remain unfinished in the best way: alive enough to meet you again later.</p></article><article class="step"><strong>Closing Question</strong><span>What would change if you let this be enough for today?</span></article>` : ''}
            <div class="actions"><button class="button button--ghost" id="reset">Clear saved reflection</button></div>
          </section>
        </div>`;
      main.querySelector('#reset').addEventListener('click', () => { window.RevelectStorage.clearSession(); window.location.href = 'index.html'; });
    })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
