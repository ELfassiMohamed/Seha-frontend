import { getStoredToken } from "@/services/auth/storage"

export class ApiError extends Error {
  constructor(message, status = 500, payload = null) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.payload = payload
  }
}

async function parseResponse(response) {
  const contentType = response.headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return response.json()
  }

  if (contentType.includes("application/pdf") || contentType.includes("application/octet-stream")) {
    return response.blob()
  }

  const text = await response.text()
  return text || null
}

export async function httpRequest(url, { method = "GET", body, headers = {}, auth = true } = {}) {
  const requestHeaders = {
    ...headers,
  }

  if (auth) {
    const token = getStoredToken()
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`
    }
  }

  if (body && !(body instanceof FormData)) {
    requestHeaders["Content-Type"] = requestHeaders["Content-Type"] || "application/json"
  }

  const response = await fetch(url, {
    method,
    headers: requestHeaders,
    body: body && !(body instanceof FormData) ? JSON.stringify(body) : body,
  })

  const payload = await parseResponse(response)

  if (!response.ok) {
    const message = payload?.message || payload || `Request failed with status ${response.status}`
    throw new ApiError(message, response.status, payload)
  }

  return payload
}
