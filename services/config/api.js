export const API_MODES = {
  MOCK: "mock",
  REAL: "real",
}

export const apiMode = (process.env.NEXT_PUBLIC_API_MODE || API_MODES.MOCK).toLowerCase()
export const isMockMode = apiMode !== API_MODES.REAL

export const API_BASE_URLS = {
  authPatient: process.env.NEXT_PUBLIC_AUTH_PATIENT_API_URL || "http://localhost:8081/api/auth",
  authProvider: process.env.NEXT_PUBLIC_AUTH_PROVIDER_API_URL || "http://localhost:8082/api/auth",
  patient: process.env.NEXT_PUBLIC_PATIENT_API_URL || "http://localhost:8081/api/patient",
  providerAuth: process.env.NEXT_PUBLIC_PROVIDER_AUTH_API_URL || "http://localhost:8082/api/auth",
  requests: process.env.NEXT_PUBLIC_REQUESTS_API_URL || "http://localhost:8080/api/requests",
  core: process.env.NEXT_PUBLIC_CORE_API_URL || "http://localhost:8080/api",
  notifications: process.env.NEXT_PUBLIC_NOTIFICATIONS_API_URL || "http://localhost:8081/api/notifications",
  providerPatients: process.env.NEXT_PUBLIC_PROVIDER_PATIENTS_API_URL || "http://localhost:8080/api/providers/patients",
}
