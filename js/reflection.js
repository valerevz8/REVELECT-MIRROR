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
      return `<div class="scale">${question.options.id.map((option, index) => `<button class="option" data-choice="${index}">${option}</button>`).join('')}</div>`;
    }
    if (question.type === 'text') {
      return `<textarea id="text-answer" placeholder="${question.placeholder.id}">${saved || ''}</textarea>`;
    }
    return `<div class="scale" aria-label="Scale from 1 to 5">${[1, 2, 3, 4, 5].map((value) => `<button data-scale="${value}" aria-pressed="${Number(saved) === value}">${value}</button>`).join('')}</div>`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    main.innerHTML = `
      <div class="shell">
        <nav class="nav"><a class="logo" href="index.html">REVELECT</a><span class="question-count">${String(state.index + 1).padStart(2, '0')}</span></nav>
        <section class="card question">
          <p class="eyebrow">${question.dimension}</p>
          <div class="chapter-line" aria-hidden="true"></div>
          <h1>${question.text.id}</h1>
          ${renderInput(question)}
          <div class="controls">
            <button class="button button--ghost" id="back" ${state.index === 0 ? 'disabled' : ''}>Back</button>
            ${question.type === 'text' ? '<button class="button" id="continue">Finish reflection</button>' : ''}
          </div>
        </section>
      </div>`;

    main.querySelector('#back')?.addEventListener('click', () => { state.index -= 1; renderQuestion(); });
    main.querySelectorAll('[data-scale]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.scale)); goNext(); }));
    main.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.choice)); goNext(); }));
    main.querySelector('#continue')?.addEventListener('click', () => { saveAnswer(main.querySelector('#text-answer').value); goNext(); });
  }

  window.RevelectEngine.loadContent()
    .then(({ questions }) => { state.questions = questions; renderQuestion(); })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load the reflection.</h1><p>${error.message}</p></div>`; });
})();
