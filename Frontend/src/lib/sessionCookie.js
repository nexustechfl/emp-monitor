const ADMIN_SESSION_COOKIE = 'admin_session'
const SESSION_MAX_AGE_SECONDS = 4 * 60 * 60 // 4 hours

/**
 * Set admin session in cookie (4hr expiry).
 * @param {object} data - Session data to store (will be JSON stringified).
 */
export function setSessionCookie(data) {
  localStorage.setItem("token", data.data);
  const value = encodeURIComponent(JSON.stringify(data))
  const maxAge = SESSION_MAX_AGE_SECONDS
  document.cookie = `${ADMIN_SESSION_COOKIE}=${value}; path=/; max-age=${maxAge}; SameSite=Lax`
}

/**
 * Get admin session from cookie, or null if missing/expired/invalid.
 * @returns {object|null}
 */
export function getSessionCookie() {
  const match = document.cookie.match(new RegExp(`(^| )${ADMIN_SESSION_COOKIE}=([^;]+)`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match[2]))
  } catch {
    return null
  }
}

/**
 * Remove admin session cookie.
 */
export function clearSessionCookie() {
  document.cookie = `${ADMIN_SESSION_COOKIE}=; path=/; max-age=0`
}
