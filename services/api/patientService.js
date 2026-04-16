import { API_BASE_URLS, isMockMode } from "@/services/config/api"
import { httpRequest } from "@/services/http/client"
import {
  mockCreatePatientRequest,
  mockGetPatientCertificates,
  mockGetPatientHistory,
  mockGetPatientNotifications,
  mockGetPatientProfile,
  mockGetPatientRequests,
  mockUpdatePatientProfile,
} from "@/mocks/patient"
import { mockGetCertificateById, mockPrintCertificate } from "@/mocks/provider"

export async function getPatientProfile() {
  if (isMockMode) return mockGetPatientProfile()
  return httpRequest(`${API_BASE_URLS.patient}/profile`)
}

export async function updatePatientProfile(payload) {
  if (isMockMode) return mockUpdatePatientProfile(payload)
  return httpRequest(`${API_BASE_URLS.patient}/complete-profile`, {
    method: "PUT",
    body: payload,
  })
}

export async function getPatientRequestsByPatientId(patientId) {
  if (isMockMode) return mockGetPatientRequests()
  return httpRequest(`${API_BASE_URLS.requests}/patient/${patientId}`)
}

export async function createPatientRequest(payload) {
  if (isMockMode) return mockCreatePatientRequest(payload)
  return httpRequest(`${API_BASE_URLS.patient.replace("/patient", "")}/requests`, {
    method: "POST",
    body: payload,
  })
}

export async function getPatientNotifications() {
  if (isMockMode) return mockGetPatientNotifications()
  return httpRequest(API_BASE_URLS.notifications)
}

export async function getPatientMedicalHistory() {
  if (isMockMode) return mockGetPatientHistory()
  return httpRequest(`${API_BASE_URLS.patient}/medical-history`)
}

export async function getPatientCertificates(patientId) {
  if (isMockMode) return mockGetPatientCertificates()
  return httpRequest(`${API_BASE_URLS.core}/certificates/${patientId}/patient`)
}

export async function getCertificateById(certificateId) {
  if (isMockMode) return mockGetCertificateById(certificateId)
  return httpRequest(`${API_BASE_URLS.core}/certificates/${certificateId}`)
}

export async function downloadCertificate(certificateId) {
  if (isMockMode) return mockPrintCertificate(certificateId)
  return httpRequest(`${API_BASE_URLS.core}/certificates/${certificateId}/print`, {
    headers: { Accept: "application/pdf" },
  })
}
