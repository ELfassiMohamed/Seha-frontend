const TOKEN_KEY = "token"
const USER_KEY = "user"

const isBrowser = typeof window !== "undefined"

export function getStoredToken() {
  if (!isBrowser) return null
  return localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser() {
  if (!isBrowser) return null
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch (error) {
    clearAuthSession()
    return null
  }
}

export function setAuthSession({ token, user }) {
  if (!isBrowser) return
  localStorage.setItem(TOKEN_KEY, token)
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuthSession() {
  if (!isBrowser) return
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}

export function isAuthenticated() {
  return Boolean(getStoredToken() && getStoredUser())
}
