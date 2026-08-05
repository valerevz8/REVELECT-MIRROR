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
    return `<div class="editorial-scale" role="radiogroup" aria-label="Less like me to more like me"><span class="scale-label">Less like me</span><div class="scale-track" style="--selected:${selected}; --preview:${selected || 1};">${[1, 2, 3, 4, 5].map((value) => `<button class="scale-point ${selected >= value ? 'is-filled' : ''}" type="button" data-scale="${value}" role="radio" aria-label="${value} out of 5" aria-checked="${selected === value}"><span></span></button>`).join('')}</div><span class="scale-label">More like me</span></div>`;
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
          <div class="controls">
            <button class="button button--ghost" id="back" ${state.index === 0 ? 'disabled' : ''}>Back</button>
            ${question.type === 'text' ? '<button class="button" id="continue">Finish reflection</button>' : ''}
          </div>
        </section>
      </div>`;

    main.querySelector('#back')?.addEventListener('click', () => { state.index -= 1; renderQuestion(); });
    main.querySelectorAll('[data-scale]').forEach((button) => {
      const track = button.closest('.scale-track');
      const preview = () => {
        const value = Number(button.dataset.scale);
        track.style.setProperty('--preview', value);
        track.querySelectorAll('.scale-point').forEach((point) => point.classList.toggle('is-filled', Number(point.dataset.scale) <= value));
      };
      button.addEventListener('mouseenter', preview);
      button.addEventListener('focus', preview);
      button.addEventListener('click', () => {
        const value = Number(button.dataset.scale);
        saveAnswer(value);
        track.style.setProperty('--selected', value);
        preview();
        window.setTimeout(goNext, 240);
      });
    });
    main.querySelector('.scale-track')?.addEventListener('mouseleave', (event) => {
      const track = event.currentTarget;
      const selected = Number(track.style.getPropertyValue('--selected')) || 0;
      track.style.setProperty('--preview', selected || 1);
      track.querySelectorAll('.scale-point').forEach((point) => point.classList.toggle('is-filled', Number(point.dataset.scale) <= selected));
    });
    main.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { saveAnswer(Number(button.dataset.choice)); goNext(); }));
    main.querySelector('#continue')?.addEventListener('click', () => { saveAnswer(main.querySelector('#text-answer').value); goNext(); });
  }

  window.RevelectEngine.loadContent()
    .then(({ questions }) => { state.questions = questions; renderQuestion(); })
    .catch((error) => { main.innerHTML = `<div class="shell empty"><h1>We could not load the reflection.</h1><p>${error.message}</p></div>`; });
})();
