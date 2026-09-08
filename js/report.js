(function () {
  const main = document.querySelector('main');
  const session = window.RevelectStorage.readSession();
  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  const formatSavedAt = (value) => new Intl.DateTimeFormat(undefined, { dateStyle: 'long', timeStyle: 'short' }).format(new Date(value));

  window.RevelectEngine.loadContent().then(({ questions, dimensions }) => {
    const requiredQuestions = questions.filter((question) => question.type !== 'text');
    const complete = requiredQuestions.every((question) => session.answers[question.id] !== undefined);
    if (!complete) {
      main.innerHTML = `<div class="shell empty"><p class="eyebrow">Reflection in progress</p><h1>Your report is waiting for your completed reflection.</h1><p class="lead">Return when each prompt has been answered to see what your responses bring forward.</p><div class="actions"><a class="button" href="reflection.html">Continue reflection</a></div></div>`;
      return;
    }
    const report = window.RevelectEngine.createReport(questions, dimensions, session.answers);
    const finalNote = String(session.answers[25] || '').trim();
    const savedAt = session.completedAt || session.updatedAt;
    main.innerHTML = `<div class="shell"><nav class="nav"><a class="logo" href="index.html">REVELECT</a><a href="reflection.html">Reflect again</a></nav><section class="card report-card"><p class="eyebrow">Your reflection report</p><h1>What surfaced today</h1><p class="lead">${report.surfaced}</p><div class="report-narrative"><article><p class="eyebrow">What seems to ask for your attention</p><h2>${report.attention}</h2></article><article><p class="eyebrow">Maybe worth exploring</p><p>${report.nextStep}</p></article><article><p class="eyebrow">Mirror Question</p><h2>${report.mirrorQuestion}</h2></article></div>${finalNote ? `<article class="mirror-moment"><p class="eyebrow">A note to yourself</p><blockquote>${escapeHtml(finalNote)}</blockquote><time datetime="${escapeHtml(savedAt || '')}">Saved ${escapeHtml(savedAt ? formatSavedAt(savedAt) : 'today')}</time><div class="actions"><button class="button button--light" id="save-note">Save note</button><button class="button button--light" id="share-note">Share</button></div></article>` : ''}<div class="actions"><button class="button button--ghost" id="reset">Clear saved reflection</button></div></section></div>`;
    main.querySelector('#reset').addEventListener('click', () => { window.RevelectStorage.clearSession(); window.location.href = 'index.html'; });
    main.querySelector('#save-note')?.addEventListener('click', () => { const blob = new Blob([finalNote], { type: 'text/plain' }); const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'revelect-note.txt'; link.click(); URL.revokeObjectURL(link.href); });
    main.querySelector('#share-note')?.addEventListener('click', async () => { if (navigator.share) await navigator.share({ title: 'A note to yourself', text: finalNote }); else await navigator.clipboard?.writeText(finalNote); });
  }).catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
