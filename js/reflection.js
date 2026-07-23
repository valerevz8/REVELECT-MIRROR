const QUESTIONS_URL = 'content/questions.json';
const DEFAULT_LANGUAGE = 'id';

const state = {
  questions: [],
  currentIndex: 0,
  answers: {},
};

function getLocalizedValue(value, language = DEFAULT_LANGUAGE) {
  if (typeof value === 'string') {
    return value;
  }

  if (!value || typeof value !== 'object') {
    return '';
  }

  return value[language] || value.en || value.id || '';
}

function hasAnswer(question, answers) {
  const value = answers[String(question.id)];

  if (question.type === 'text') {
    return typeof value === 'string' && value.trim().length > 0;
  }

  return value !== undefined && value !== null && value !== '';
}

function QuestionRenderer({ question, value, onAnswer }) {
  const container = document.createElement('section');
  container.className = 'question-card';

  const prompt = document.createElement('h1');
  prompt.className = 'question-text';
  prompt.textContent = getLocalizedValue(question.text);
  container.appendChild(prompt);

  const field = document.createElement('div');
  field.className = `answer-field answer-field--${question.type}`;

  if (question.type === 'scale') {
    field.appendChild(renderScaleQuestion(question, value, onAnswer));
  } else if (question.type === 'choice') {
    field.appendChild(renderChoiceQuestion(question, value, onAnswer));
  } else if (question.type === 'text') {
    field.appendChild(renderTextQuestion(question, value, onAnswer));
  } else {
    const unsupported = document.createElement('p');
    unsupported.className = 'error-message';
    unsupported.textContent = `Unsupported question type: ${question.type}`;
    field.appendChild(unsupported);
  }

  container.appendChild(field);
  return container;
}

function renderScaleQuestion(question, value, onAnswer) {
  const wrapper = document.createElement('div');
  wrapper.className = 'scale-group';

  const labels = document.createElement('div');
  labels.className = 'scale-labels';
  labels.innerHTML = '<span>Not at all</span><span>Very much</span>';

  const options = document.createElement('div');
  options.className = 'scale-options';

  for (let rating = 1; rating <= 5; rating += 1) {
    const label = document.createElement('label');
    label.className = 'scale-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${question.id}`;
    input.value = String(rating);
    input.checked = Number(value) === rating;
    input.addEventListener('change', () => onAnswer(question.id, rating));

    const text = document.createElement('span');
    text.textContent = String(rating);

    label.append(input, text);
    options.appendChild(label);
  }

  wrapper.append(options, labels);
  return wrapper;
}

function renderChoiceQuestion(question, value, onAnswer) {
  const wrapper = document.createElement('div');
  wrapper.className = 'choice-group';
  const options = getLocalizedValue(question.options);

  options.forEach((option, index) => {
    const label = document.createElement('label');
    label.className = 'choice-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question-${question.id}`;
    input.value = String(index);
    input.checked = Number(value) === index;
    input.addEventListener('change', () => onAnswer(question.id, index));

    const text = document.createElement('span');
    text.textContent = option;

    label.append(input, text);
    wrapper.appendChild(label);
  });

  return wrapper;
}

function renderTextQuestion(question, value, onAnswer) {
  const textarea = document.createElement('textarea');
  textarea.className = 'text-answer';
  textarea.rows = 7;
  textarea.value = value || '';
  textarea.placeholder = getLocalizedValue(question.placeholder);
  textarea.addEventListener('input', (event) => onAnswer(question.id, event.target.value));
  return textarea;
}

function renderApp() {
  const root = document.querySelector('main');
  root.innerHTML = '';

  if (!state.questions.length) {
    root.innerHTML = '<p class="loading-message">Loading reflection...</p>';
    return;
  }

  const currentQuestion = state.questions[state.currentIndex];
  const currentAnswer = state.answers[String(currentQuestion.id)];
  const totalQuestions = state.questions.length;
  const questionNumber = state.currentIndex + 1;

  const shell = document.createElement('div');
  shell.className = 'reflection-shell';

  const progress = document.createElement('div');
  progress.className = 'progress-block';
  progress.innerHTML = `
    <div class="progress-meta">
      <span>Question ${questionNumber} of ${totalQuestions}</span>
      <span>${Math.round((questionNumber / totalQuestions) * 100)}%</span>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width: ${(questionNumber / totalQuestions) * 100}%"></div></div>
  `;

  const questionElement = QuestionRenderer({
    question: currentQuestion,
    value: currentAnswer,
    onAnswer: (questionId, answer) => {
      state.answers[String(questionId)] = answer;
      renderApp();
    },
  });

  const nav = document.createElement('nav');
  nav.className = 'reflection-nav';

  const previousButton = document.createElement('button');
  previousButton.type = 'button';
  previousButton.textContent = 'Previous';
  previousButton.disabled = state.currentIndex === 0;
  previousButton.addEventListener('click', () => {
    state.currentIndex -= 1;
    renderApp();
  });

  const nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'primary-button';
  nextButton.textContent = state.currentIndex === totalQuestions - 1 ? 'Finish Reflection' : 'Next';
  nextButton.disabled = !hasAnswer(currentQuestion, state.answers);
  nextButton.addEventListener('click', () => {
    if (state.currentIndex === totalQuestions - 1) {
      console.log(state.answers);
      return;
    }

    state.currentIndex += 1;
    renderApp();
  });

  nav.append(previousButton, nextButton);
  shell.append(progress, questionElement, nav);
  root.appendChild(shell);
}

async function loadQuestions() {
  const response = await fetch(QUESTIONS_URL);

  if (!response.ok) {
    throw new Error(`Unable to load questions: ${response.status}`);
  }

  return response.json();
}

async function initReflection() {
  renderApp();

  try {
    state.questions = await loadQuestions();
    renderApp();
  } catch (error) {
    document.querySelector('main').innerHTML = '<p class="error-message">Unable to load reflection questions.</p>';
    console.error(error);
  }
}

document.addEventListener('DOMContentLoaded', initReflection);
