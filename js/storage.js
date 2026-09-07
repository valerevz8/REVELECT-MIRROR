(function (global) {
  const KEY = 'revelect:reflection:v1';

  function readSession() {
    try {
      return JSON.parse(global.localStorage.getItem(KEY)) || { answers: {}, createdAt: null, updatedAt: null };
    } catch (error) {
      console.warn('Unable to read saved REVELECT session', error);
      return { answers: {}, createdAt: null, updatedAt: null };
    }
  }

  function writeSession(session) {
    const now = new Date().toISOString();
    const next = { ...session, createdAt: session.createdAt || now, updatedAt: now };
    global.localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }

  function clearSession() { global.localStorage.removeItem(KEY); }

  // This deliberately stores only a small reflection moment. It is a foundation
  // for a future history view, without turning the current experience into one.
  function saveReflectionMoment(session) {
    const historyKey = 'revelect:reflection-history:v1';
    const moment = {
      completedAt: session.updatedAt,
      note: session.answers && session.answers[25] ? session.answers[25] : '',
    };
    try {
      const history = JSON.parse(global.localStorage.getItem(historyKey)) || [];
      if (!history.some((entry) => entry.completedAt === moment.completedAt)) {
        global.localStorage.setItem(historyKey, JSON.stringify([...history, moment]));
      }
    } catch (error) {
      console.warn('Unable to save REVELECT reflection history', error);
    }
  }

  global.RevelectStorage = { readSession, writeSession, clearSession, saveReflectionMoment };
})(window);
