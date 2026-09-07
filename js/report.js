(function () {
  const main = document.querySelector('main');
  const session = window.RevelectStorage.readSession();

  function escapeHtml(value) {
    const element = document.createElement('div');
    element.textContent = value;
    return element.innerHTML;
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value));
  }

  function reportCopy(scores) {
    const strongest = [...scores].sort((a, b) => b.percent - a.percent)[0];
    const gentlest = [...scores].sort((a, b) => a.percent - b.percent)[0];
    return {
      surfaced: `Your responses return often to ${strongest.name.toLowerCase()}. There is something here worth meeting with patience, rather than trying to solve all at once.`,
      attention: `${gentlest.name} may be asking for a little more room. Notice what changes when you let that part of yourself speak without needing an immediate answer.`,
    };
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
      const copy = reportCopy(scores);
      const reflectionDate = session.updatedAt || new Date().toISOString();
      if (Object.keys(session.answers).length === questions.length) window.RevelectStorage.saveReflectionMoment(session);
      main.innerHTML = `
        <div class="shell">
          <nav class="nav"><a class="logo" href="index.html">REVELECT</a><a href="reflection.html">Reflect again</a></nav>
          <section class="report">
            <p class="eyebrow">Reflection saved</p>
            <h1>What surfaced today</h1>
            <p class="report-date">${formatDate(reflectionDate)}</p>
            <p class="lead report-insight">${copy.surfaced}</p>
            <section class="report-section"><p class="eyebrow">A little closer</p><h2>What seems to ask for your attention</h2><p>${copy.attention}</p></section>
            <section class="report-section report-section--quiet"><p class="eyebrow">An optional next step</p><p>Return to this when you have a quiet moment. You do not need to do anything with it yet.</p></section>
            ${finalNote ? `<article class="note-card"><p class="eyebrow">A note to yourself</p><blockquote>${escapeHtml(finalNote)}</blockquote><time datetime="${reflectionDate}">${formatDate(reflectionDate)}</time></article>` : ''}
            <section class="mirror-question"><p class="eyebrow">One question to keep</p><h2>What would it look like to carry this clarity gently into tomorrow?</h2></section>
            <div class="actions report-actions"><button class="button" id="save">Save reflection</button><button class="button button--ghost" id="share">Share</button><button class="text-button" id="reset">Clear saved reflection</button></div>
          </section>
        </div>`;
      main.querySelector('#save').addEventListener('click', () => window.print());
      main.querySelector('#share').addEventListener('click', async () => {
        const shareText = finalNote ? `My REVELECT note: ${finalNote}` : 'A reflection from REVELECT.';
        if (navigator.share) {
          await navigator.share({ title: 'My REVELECT reflection', text: shareText });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(shareText);
          main.querySelector('#share').textContent = 'Copied';
        }
      });
      main.querySelector('#reset').addEventListener('click', () => { window.RevelectStorage.clearSession(); window.location.href = 'index.html'; });
    })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
