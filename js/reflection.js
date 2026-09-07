(function () {
  const main = document.querySelector('main');
  const state = { questions: [], index: 0, session: window.RevelectStorage.readSession() };

  function currentQuestion() { return state.questions[state.index]; }

  function saveAnswer(value) {
    const question = currentQuestion();
    state.session = window.RevelectStorage.writeSession({
      ...state.session,
      answers: { ...state.session.answers, [question.id]: value },
    });
  }

  function goNext() {
    if (state.index < state.questions.length - 1) {
      state.index += 1;
      renderQuestion();
    } else {
      window.location.href = 'report.html';
    }
  }

  function renderInput(question) {
    const saved = state.session.answers[question.id];
    if (question.type === 'choice') {
      return `<div class="choice-list">${question.options.id.map((option, index) => `<button class="option choice-card" data-choice="${index}"><span>0${index + 1}</span>${option}</button>`).join('')}</div>`;
    }
    if (question.type === 'text') {
      return `<textarea id="text-answer" placeholder="${question.placeholder.id}">${saved || ''}</textarea>`;
    }
    const selected = Number(saved) || 0;
    return `<div class="editorial-scale" role="radiogroup" aria-label="Less like me to more like me"><span class="scale-label">Less like me</span><div class="scale-track">${[1, 2, 3, 4, 5].map((value) => `<button class="scale-point ${selected === value ? 'is-filled' : ''}" type="button" data-scale="${value}" role="radio" aria-label="${value} out of 5" aria-checked="${selected === value}"><span></span></button>`).join('')}</div><span class="scale-label">More like me</span></div>`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    const progress = Math.round(((state.index + 1) / state.questions.length) * 100);
    main.innerHTML = `
      <div class="shell">
        <nav class="nav"><a class="logo" href="index.html">REVELECT</a><span class="question-count">${state.index + 1} / ${state.questions.length}</span></nav>
        <section class="card question reflection-card">
          <p class="eyebrow">${question.dimension}</p>
          <div class="progress"><div class="progress__bar" style="width:${progress}%"></div></div>
          <h1>${question.text.id}</h1>
          ${renderInput(question)}
          <p class="validation-message" id="validation" role="alert"></p>
          <div class="controls">
            <button class="button button--ghost" id="back" ${state.index === 0 ? 'disabled' : ''}>Back</button>
            ${question.type === 'scale' ? `<button class="button" id="continue" ${state.session.answers[question.id] ? '' : 'disabled'}>Continue</button>` : ''}
            ${question.type === 'text' ? '<button class="button" id="continue">Finish reflection</button>' : ''}
          </div>
        </section>
      </div>`;

    main.querySelector('#back')?.addEventListener('click', () => { state.index -= 1; renderQuestion(); });
    main.querySelectorAll('[data-scale]').forEach((button) => {
      button.addEventListener('click', () => {
        const value = Number(button.dataset.scale);
        saveAnswer(value);
        main.querySelectorAll('[data-scale]').forEach((point) => {
          const isSelected = Number(point.dataset.scale) === value;
          point.classList.toggle('is-filled', isSelected);
          point.setAttribute('aria-checked', String(isSelected));
        });
        main.querySelector('#continue').disabled = false;
      });
    });
    main.querySelector('#continue')?.addEventListener('click', () => {
      const value = state.session.answers[question.id];
      if (question.type === 'scale' && !value) return;
      if (question.type === 'text' && !String(main.querySelector('#text-answer').value).trim()) {
        main.querySelector('#validation').textContent = 'Take a moment to leave a note before you continue.';
        main.querySelector('#text-answer').focus();
        return;
      }
      if (question.type === 'text') saveAnswer(main.querySelector('#text-answer').value.trim());
      goNext();
    });
    main.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.choice)); goNext(); }));
  }

  window.RevelectEngine.loadContent()
    .then(({ questions }) => { state.questions = questions; renderQuestion(); })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load the reflection.</h1><p>${error.message}</p></div>`; });
})();
