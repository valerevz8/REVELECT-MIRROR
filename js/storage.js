(function (global) {
  const SESSION_KEY = 'revelect:reflection:v2:session';
  const HISTORY_KEY = 'revelect:reflection:v2:history';
  const LEGACY_KEY = 'revelect:reflection:v1';

  function fallbackSession() {
    return { id: createId(), answers: {}, currentIndex: 0, startedAt: new Date().toISOString(), updatedAt: null, completedAt: null };
  }

  function createId() {
    if (global.crypto && global.crypto.randomUUID) return global.crypto.randomUUID();
    return `reflection-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  }

  function safeParse(value, fallback) {
    try { return value ? JSON.parse(value) : fallback; }
    catch (error) { console.warn('Unable to parse saved REVELECT data', error); return fallback; }
  }

  function normalizeSession(session) {
    return { ...fallbackSession(), ...session, answers: { ...(session && session.answers ? session.answers : {}) } };
  }

  function readSession() {
    const saved = safeParse(global.localStorage.getItem(SESSION_KEY), null);
    if (saved) return normalizeSession(saved);
    const legacy = safeParse(global.localStorage.getItem(LEGACY_KEY), null);
    return legacy ? normalizeSession(legacy) : fallbackSession();
  }

  function writeSession(session) {
    const next = normalizeSession({ ...session, updatedAt: new Date().toISOString() });
    global.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
    return next;
  }

  function clearSession() {
    global.localStorage.removeItem(SESSION_KEY);
    global.localStorage.removeItem(LEGACY_KEY);
  }

  function readHistory() {
    return safeParse(global.localStorage.getItem(HISTORY_KEY), [])
      .filter(Boolean)
      .sort((a, b) => new Date(b.completedAt || b.createdAt) - new Date(a.completedAt || a.createdAt));
  }

  function saveCompleted(report) {
    const history = readHistory().filter((item) => item.id !== report.id);
    const completed = { ...report, completedAt: report.completedAt || new Date().toISOString() };
    global.localStorage.setItem(HISTORY_KEY, JSON.stringify([completed, ...history]));
    clearSession();
    return completed;
  }

  function findReport(id) { return readHistory().find((report) => report.id === id) || null; }

  global.RevelectStorage = { readSession, writeSession, clearSession, readHistory, saveCompleted, findReport, createId };
})(window);
