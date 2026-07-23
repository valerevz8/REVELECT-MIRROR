(function (global) {
  const KEY = 'revelect:reflection:v1';

  function readSession() {
    try {
      return JSON.parse(global.localStorage.getItem(KEY)) || { answers: {}, updatedAt: null };
    } catch (error) {
      console.warn('Unable to read saved REVELECT session', error);
      return { answers: {}, updatedAt: null };
    }
  }

  function writeSession(session) {
    const next = { ...session, updatedAt: new Date().toISOString() };
    global.localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }

  function clearSession() { global.localStorage.removeItem(KEY); }

  global.RevelectStorage = { readSession, writeSession, clearSession };
})(window);
