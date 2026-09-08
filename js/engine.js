(function (global) {
  async function loadJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
    return response.json();
  }

  async function loadContent() {
    const [questions, dimensions, narratives] = await Promise.all([
      loadJson('content/questions.json'),
      loadJson('content/dimensions.json'),
      loadJson('content/narratives.json'),
    ]);
    return { questions, dimensions, narratives };
  }

  function answerScore(question, answer) {
    if (question.type === 'scale') return Number(answer) || 0;
    if (question.type === 'choice') return answer === 0 ? 3 : 5;
    return answer && String(answer).trim() ? 5 : 0;
  }

  function calculateScores(questions, dimensions, answers) {
    return dimensions.map((dimension) => {
      const dimensionQuestions = questions.filter((question) => question.dimension === dimension.id);
      const total = dimensionQuestions.reduce((sum, question) => sum + answerScore(question, answers[question.id]), 0);
      const possible = dimensionQuestions.reduce((sum, question) => sum + (question.type === 'text' ? 0 : 5), 0);
      const ratio = possible ? total / possible : 0;
      return { ...dimension, total, possible, band: ratio >= 0.7 ? 'high' : ratio >= 0.4 ? 'medium' : 'low' };
    });
  }

  function createReport(questions, dimensions, answers) {
    const scores = calculateScores(questions, dimensions, answers);
    const ordered = [...scores].sort((a, b) => a.total - b.total || a.id.localeCompare(b.id));
    const attention = ordered[0];
    const surfaced = [...scores].sort((a, b) => b.total - a.total || a.id.localeCompare(b.id))[0];
    const labels = { awareness: 'awareness', emotion: 'emotional honesty', patterns: 'recurring patterns', agency: 'your sense of agency', direction: 'the direction ahead' };
    const nextSteps = {
      awareness: 'Pause once today and name what you need before moving to the next thing.',
      emotion: 'Give one feeling a little more room before deciding what to do with it.',
      patterns: 'Notice one familiar reaction without asking yourself to solve it yet.',
      agency: 'Choose one small action that sounds more like your own voice.',
      direction: 'Make space for one small sign of the direction that feels alive to you.'
    };
    const mirrorQuestions = {
      awareness: 'What might become clearer if I stayed with myself for one more quiet moment?',
      emotion: 'What feeling deserves to be met with a little more kindness?',
      patterns: 'What pattern am I beginning to recognize without needing to judge it?',
      agency: 'Where could I let my own voice lead the next small choice?',
      direction: 'What direction feels worth listening to, even before I know the whole way?'
    };
    return {
      scores,
      surfaced: `Your answers suggest that ${labels[surfaced.id]} is especially present in your reflection today.`,
      attention: `${labels[attention.id].charAt(0).toUpperCase() + labels[attention.id].slice(1)} seems to be asking for a slower, gentler kind of attention.`,
      nextStep: nextSteps[attention.id],
      mirrorQuestion: mirrorQuestions[attention.id],
    };
  }

  global.RevelectEngine = { loadContent, calculateScores, createReport };
})(window);
