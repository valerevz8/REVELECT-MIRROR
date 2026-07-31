(function () {
  const main = document.querySelector('main');
  const state = { questions: [], dimensions: [], narratives: {}, index: 0, started: false, session: window.RevelectStorage.readSession() };

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  }

  function currentQuestion() { return state.questions[state.index]; }
  function dimensionName(id) { return (state.dimensions.find((item) => item.id === id) || {}).name || id; }
  function isAnswered(question) { const value = state.session.answers[question.id]; return value !== undefined && value !== null && String(value).trim() !== ''; }

  function saveSession(extra) { state.session = window.RevelectStorage.writeSession({ ...state.session, ...extra }); }
  function saveAnswer(value) {
    const question = currentQuestion();
    saveSession({ answers: { ...state.session.answers, [question.id]: value }, currentIndex: state.index });
  }

  function fade(render) { main.classList.remove('fade-in'); render(); requestAnimationFrame(() => main.classList.add('fade-in')); }

  function startReflection() {
    state.started = true;
    const answeredCount = Object.keys(state.session.answers || {}).length;
    state.index = Math.min(state.questions.length - 1, state.session.currentIndex || Math.max(0, answeredCount - 1));
    fade(renderQuestion);
  }

  function goNext() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      saveSession({ currentIndex: state.index });
      fade(renderQuestion);
    } else {
      const report = window.RevelectEngine.generateReport({ questions: state.questions, dimensions: state.dimensions, narratives: state.narratives }, state.session);
      const saved = window.RevelectStorage.saveCompleted(report);
      window.location.href = `report.html?id=${encodeURIComponent(saved.id)}`;
    }
  }

  function renderIntro() {
    const answered = Object.keys(state.session.answers || {}).length;
    main.innerHTML = `
      <div class="shell fade-in">
        <nav class="nav" aria-label="Primary"><a class="logo" href="index.html">REVELECT</a><a href="report.html">History</a></nav>
        <section class="card intro" aria-labelledby="intro-title">
          <p class="eyebrow">Before question 1</p>
          <h1 id="intro-title">Arrive before you answer.</h1>
          <p class="lead">There are no right or wrong answers here. You are not being graded, diagnosed, or reduced to a result. Move honestly, skip perfection, and let each response be a small mirror for today.</p>
          <div class="intro__notes" aria-label="Reflection notes">
            <span>25 prompts</span><span>Autosaved after every answer</span><span>You can return if interrupted</span>
          </div>
          <div class="actions"><button class="button" id="start">${answered ? 'Resume unfinished reflection' : 'Begin question 1'}</button></div>
        </section>
      </div>`;
    main.querySelector('#start').addEventListener('click', startReflection);
  }

  function renderInput(question) {
    const saved = state.session.answers[question.id];
    if (question.type === 'choice') {
      return `<div class="choice-list">${question.options.id.map((option, index) => `<button class="option ${Number(saved) === index ? 'is-selected' : ''}" data-choice="${index}" aria-pressed="${Number(saved) === index}">${option}</button>`).join('')}</div>`;
    }
    if (question.type === 'text') {
      return `<label class="sr-only" for="text-answer">Your answer</label><textarea id="text-answer" placeholder="${question.placeholder.id}">${escapeHtml(saved)}</textarea>`;
    }
    return `<div class="scale" role="group" aria-label="Scale from 1 to 5">${[1, 2, 3, 4, 5].map((value) => `<button data-scale="${value}" class="${Number(saved) === value ? 'is-selected' : ''}" aria-pressed="${Number(saved) === value}"><span>${value}</span></button>`).join('')}</div><div class="scale-labels" aria-hidden="true"><span>Less true</span><span>Very true</span></div>`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    const progress = Math.round(((state.index + 1) / state.questions.length) * 100);
    const canContinue = isAnswered(question);
    main.innerHTML = `
      <div class="shell fade-in">
        <nav class="nav" aria-label="Reflection"><a class="logo" href="index.html">REVELECT</a><span class="nav__meta" aria-live="polite">${state.index + 1} / ${state.questions.length}</span></nav>
        <section class="card question" aria-labelledby="question-title">
          <p class="eyebrow">${dimensionName(question.dimension)}</p>
          <div class="progress" aria-hidden="true"><div class="progress__bar" style="width:${progress}%"></div></div>
          <h1 id="question-title">${question.text.id}</h1>
          ${renderInput(question)}
          <p class="autosave" role="status">Saved automatically</p>
          <div class="controls">
            <button class="button button--ghost" id="back" ${state.index === 0 ? 'disabled' : ''}>Previous</button>
            <button class="button" id="next" ${canContinue ? '' : 'disabled'}>${state.index === state.questions.length - 1 ? 'Complete reflection' : 'Next'}</button>
          </div>
        </section>
      </div>`;
    main.querySelector('#back').addEventListener('click', () => { state.index -= 1; saveSession({ currentIndex: state.index }); fade(renderQuestion); });
    main.querySelector('#next').addEventListener('click', goNext);
    main.querySelectorAll('[data-scale]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.scale)); goNext(); }));
    main.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.choice)); goNext(); }));
    main.querySelector('#text-answer')?.addEventListener('input', (event) => { saveAnswer(event.target.value); main.querySelector('#next').disabled = !event.target.value.trim(); });
  }

  window.RevelectEngine.loadContent()
    .then((content) => { state.questions = content.questions; state.dimensions = content.dimensions; state.narratives = content.narratives; renderIntro(); })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load the reflection.</h1><p>${error.message}</p></div>`; });
})();
