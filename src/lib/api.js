// src/lib/api.js
const BASE = 'https://utilizable-peridermal-candace.ngrok-free.app';

/** Wrapper genérico */
async function request(path, { method = 'GET', body, token, headers = {} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  // Devuelve texto si no es JSON válido
  const text = await res.text();
  let data;
  try { data = text ? JSON.parse(text) : {}; } catch { data = { raw: text }; }

  if (!res.ok) {
    const msg =
      data?.message || data?.error || data?.detail || text || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data;
}

/** === APIs específicas === */
export const authApi = {
  register: (payload) =>
    request('/api/auth/register', { method: 'POST', body: payload }),
  login: (payload) =>
    request('/api/auth/login', { method: 'POST', body: payload }),
  me: (token) => request('/api/auth/me', { token }),
};

export const instagramApi = {
  // Publicar post en Instagram
  post: (payload, token) =>
    request('/api/instagram/post', { method: 'POST', body: payload, token }),
};

export const analyticsApi = {
  screenTime: (screenName, timeSpent, token) =>
    request('/api/analytics/screen-time', {
      method: 'POST',
      body: { screenName, timeSpent },
      token,
    }),
};

// por compatibilidad si en algún sitio importabas default
export default request;
