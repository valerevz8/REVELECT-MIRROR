(function () {
  const main = document.querySelector('main');
  const params = new URLSearchParams(window.location.search);
  const selectedId = params.get('id');

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function formatDate(value) {
    return new Intl.DateTimeFormat('en', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(value));
  }

  function renderHistory(history) {
    return `<aside class="history" aria-labelledby="history-title"><h2 id="history-title">Reflection History</h2>${history.length ? history.map((item) => `<a class="history__item" href="report.html?id=${encodeURIComponent(item.id)}"><strong>${formatDate(item.completedAt)}</strong><span>${item.title}</span></a>`).join('') : '<p>No completed reflections yet.</p>'}</aside>`;
  }

  function renderReport(report, history) {
    main.innerHTML = `
      <div class="shell fade-in">
        <nav class="nav" aria-label="Primary"><a class="logo" href="index.html">REVELECT</a><a href="reflection.html">Reflect again</a></nav>
        <div class="report-layout">
          <article class="report" aria-labelledby="report-title">
            <header class="report__hero">
              <p class="eyebrow">Reflection report · ${formatDate(report.completedAt)}</p>
              <h1 id="report-title">${report.title}</h1>
              <p class="lead">${report.summary}</p>
            </header>
            <section class="report-section"><p class="eyebrow">Attention</p><h2>What may need care</h2><p>${report.attention}</p></section>
            <section class="report-section"><p class="eyebrow">Exploration</p><h2>A second thread</h2><p>${report.exploration}</p></section>
            <section class="report-section"><p class="eyebrow">Reflection Map</p><div class="report-grid">${report.scores.map((score) => `<article class="metric"><span>${score.name}</span><b>${score.percent}%</b><p>${report.signals.find((signal) => signal.id === score.id).text}</p></article>`).join('')}</div></section>
            <section class="quote"><p class="eyebrow">Mirror Moment</p><blockquote>${report.mirrorMoment}</blockquote></section>
            ${report.finalNote ? `<section class="report-section"><p class="eyebrow">A note you kept</p><p>${escapeHtml(report.finalNote)}</p></section>` : ''}
            <section class="closing"><p class="eyebrow">Closing Question</p><h2>${report.closingQuestion}</h2></section>
          </article>
          ${renderHistory(history)}
        </div>
      </div>`;
  }

  window.RevelectEngine.loadContent()
    .then((content) => {
      const history = window.RevelectStorage.readHistory();
      let report = selectedId ? window.RevelectStorage.findReport(selectedId) : history[0];
      const session = window.RevelectStorage.readSession();
      const answered = Object.keys(session.answers || {}).length;
      if (!report && answered >= content.questions.length) report = window.RevelectStorage.saveCompleted(window.RevelectEngine.generateReport(content, session));
      if (!report) {
        main.innerHTML = `<div class="shell empty fade-in"><p class="eyebrow">No completed reflection yet</p><h1>Your report is waiting.</h1><p class="lead">Complete all 25 prompts to save a reflection report you can revisit later.</p><div class="actions"><a class="button" href="reflection.html">Start reflection</a></div>${renderHistory(history)}</div>`;
        return;
      }
      renderReport(report, history);
    })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load your report.</h1><p>${error.message}</p></div>`; });
})();
