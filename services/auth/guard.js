import { clearAuthSession, getStoredToken, getStoredUser } from "@/services/auth/storage"

function normalizeRole(value) {
  return String(value || "")
    .replace(/^ROLE_/, "")
    .toLowerCase()
}

export function resolveProtectedUser(expectedRole) {
  const token = getStoredToken()
  const user = getStoredUser()

  if (!token || !user) {
    return { ok: false, reason: "unauthenticated" }
  }

  if (!expectedRole) {
    return { ok: true, user }
  }

  if (normalizeRole(user.role) !== normalizeRole(expectedRole)) {
    return { ok: false, reason: "forbidden" }
  }

  return { ok: true, user }
}

export function handleUnauthorized() {
  clearAuthSession()
}
