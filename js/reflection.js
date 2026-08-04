(function () {
  const main = document.querySelector('main');
  const state = { questions: [], index: 0, session: window.RevelectStorage.readSession() };

  function currentQuestion() { return state.questions[state.index]; }

  function brandLogo() {
    return '<a class="logo" href="index.html" aria-label="REVELECT home"><img src="assets/revelect-logo.png" alt="REVELECT"></a>';
  }

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
    const selected = Number(saved) || 0;
    const fill = selected ? ((selected - 1) / 4) * 100 : 0;
    const anchors = ['Least like me', 'Somewhat less like me', 'Neutral', 'Somewhat more like me', 'Most like me'];
    return `<div class="reflection-scale" style="--scale-fill: ${fill}%" aria-label="Reflection spectrum from less like me to more like me">
      <span class="reflection-scale__label">Less like me</span>
      <div class="reflection-scale__track">
        ${[1, 2, 3, 4, 5].map((value) => `<button class="reflection-scale__point${selected >= value ? ' is-filled' : ''}" data-scale="${value}" aria-label="${anchors[value - 1]}" aria-pressed="${selected === value}"></button>`).join('')}
      </div>
      <span class="reflection-scale__label reflection-scale__label--end">More like me</span>
    </div>`;
  }

  function renderQuestion() {
    const question = currentQuestion();
    const progress = Math.round(((state.index + 1) / state.questions.length) * 100);
    main.innerHTML = `
      <div class="shell">
        <nav class="nav">${brandLogo()}<span>${state.index + 1} / ${state.questions.length}</span></nav>
        <section class="card question">
          <p class="eyebrow">${question.dimension}</p>
          <div class="progress"><div class="progress__bar" style="width:${progress}%"></div></div>
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
