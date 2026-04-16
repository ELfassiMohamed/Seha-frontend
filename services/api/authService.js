import { API_BASE_URLS, isMockMode } from "@/services/config/api"
import { ApiError, httpRequest } from "@/services/http/client"
import { mockLogin, mockPatientRegister } from "@/mocks/auth"

export async function loginPatient(credentials) {
  if (isMockMode) {
    try {
      return await mockLogin({ ...credentials, role: "patient" })
    } catch (error) {
      throw new ApiError(error.message, 401)
    }
  }

  return httpRequest(`${API_BASE_URLS.authPatient}/login`, {
    method: "POST",
    body: credentials,
    auth: false,
  })
}

export async function registerPatient(payload) {
  if (isMockMode) {
    return mockPatientRegister(payload)
  }

  return httpRequest(`${API_BASE_URLS.authPatient}/register`, {
    method: "POST",
    body: payload,
    auth: false,
  })
}

export async function loginProvider(credentials) {
  if (isMockMode) {
    try {
      return await mockLogin({ ...credentials, role: "provider" })
    } catch (error) {
      throw new ApiError(error.message, 401)
    }
  }

  return httpRequest(`${API_BASE_URLS.authProvider}/login`, {
    method: "POST",
    body: credentials,
    auth: false,
  })
}
