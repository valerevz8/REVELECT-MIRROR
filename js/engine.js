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
    if (question.type === 'scale') return Math.min(5, Math.max(0, Number(answer) || 0));
    if (question.type === 'choice') return Number(answer) === 0 ? 3 : 5;
    return answer && String(answer).trim() ? 5 : 0;
  }

  function bandFor(percent) { return percent >= 72 ? 'high' : percent >= 42 ? 'medium' : 'low'; }

  function calculateScores(questions, dimensions, answers) {
    return dimensions.map((dimension) => {
      const ids = dimension.questions || questions.filter((question) => question.dimension === dimension.id).map((question) => question.id);
      const dimensionQuestions = questions.filter((question) => ids.includes(question.id));
      const total = dimensionQuestions.reduce((sum, question) => sum + answerScore(question, answers[question.id]), 0);
      const possible = dimensionQuestions.length * 5;
      const percent = possible ? Math.round((total / possible) * 100) : 0;
      return { ...dimension, total, possible, percent, band: bandFor(percent) };
    });
  }

  function generateSignals(scores) {
    return scores.map((score) => ({
      id: score.id,
      name: score.name,
      intensity: score.band,
      text: score.band === 'high'
        ? `${score.name} is speaking clearly in this reflection.`
        : score.band === 'medium'
          ? `${score.name} is present, but still unfolding.`
          : `${score.name} may need a little more space and gentleness.`,
    }));
  }

  function generateReport(content, session) {
    const { questions, dimensions, narratives } = content;
    const scores = calculateScores(questions, dimensions, session.answers || {});
    const ranked = [...scores].sort((a, b) => b.percent - a.percent);
    const primaryTheme = ranked[0];
    const secondaryTheme = ranked[1];
    const copy = narratives.themes[primaryTheme.id][primaryTheme.band];
    const secondaryCopy = narratives.themes[secondaryTheme.id][secondaryTheme.band];
    return {
      id: session.id || global.RevelectStorage.createId(),
      answers: session.answers || {},
      createdAt: session.startedAt || new Date().toISOString(),
      completedAt: new Date().toISOString(),
      scores,
      signals: generateSignals(scores),
      primaryTheme,
      secondaryTheme,
      title: copy.title,
      summary: copy.summary,
      attention: copy.attention,
      exploration: secondaryCopy.exploration,
      mirrorMoment: copy.mirrorMoment,
      closingQuestion: narratives.closingQuestions[primaryTheme.id],
      finalNote: session.answers && session.answers[25] ? String(session.answers[25]).trim() : '',
    };
  }

  global.RevelectEngine = { loadContent, calculateScores, generateSignals, generateReport };
})(window);
