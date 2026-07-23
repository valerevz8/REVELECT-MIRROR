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
      const possible = dimensionQuestions.length * 5;
      const percent = possible ? Math.round((total / possible) * 100) : 0;
      return { ...dimension, total, possible, percent, band: percent >= 70 ? 'high' : percent >= 40 ? 'medium' : 'low' };
    });
  }

  global.RevelectEngine = { loadContent, calculateScores };
})(window);
