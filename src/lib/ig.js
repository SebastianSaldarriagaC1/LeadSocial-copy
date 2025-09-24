// src/lib/ig.js

// Guarda tokens en LocalStorage y Cookie con nombres consistentes
export function saveInstagramTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    localStorage.setItem('ig_access', accessToken);
    document.cookie = `ig_access=${encodeURIComponent(accessToken)}; path=/; SameSite=Lax`;
  }
  if (refreshToken) {
    localStorage.setItem('ig_refresh', refreshToken);
    document.cookie = `ig_refresh=${encodeURIComponent(refreshToken)}; path=/; SameSite=Lax`;
  }
}

// Intenta leer el access token de varias llaves (por si antes usaste otros nombres)
export function getInstagramAccessToken() {
  const fromLS =
    localStorage.getItem('ig_access') ||
    localStorage.getItem('instagram_access_token') ||
    localStorage.getItem('accessToken'); // fallback

  if (fromLS) return fromLS;

  const m = document.cookie.match(
    /(?:^|;\s*)(ig_access|instagram_access_token|accessToken)=([^;]+)/
  );
  return m ? decodeURIComponent(m[2]) : null;
}
