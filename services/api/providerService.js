import { API_BASE_URLS, isMockMode } from "@/services/config/api"
import { httpRequest } from "@/services/http/client"
import {
  mockActivatePatient,
  mockAssignPatient,
  mockCreateCertificate,
  mockCreateRecord,
  mockDeleteRecord,
  mockGetAllPatients,
  mockGetAssignedPatients,
  mockGetCertificateById,
  mockGetCertificates,
  mockGetProviderProfile,
  mockGetProviderRequestById,
  mockGetProviderRequests,
  mockGetRecords,
  mockGetRecordById,
  mockGetUnassignedPatients,
  mockPrintCertificate,
  mockRespondToRequest,
  mockSendRequestMessage,
  mockSuspendPatient,
  mockUnassignPatient,
  mockUpdateProviderProfile,
  mockUpdateRecord,
} from "@/mocks/provider"

export async function getProviderProfile() {
  if (isMockMode) return mockGetProviderProfile()
  return httpRequest(`${API_BASE_URLS.providerAuth}/profile`)
}

export async function updateProviderProfile(payload) {
  if (isMockMode) return mockUpdateProviderProfile(payload)
  return httpRequest(`${API_BASE_URLS.providerAuth}/complete-profile`, {
    method: "PUT",
    body: payload,
  })
}

export async function getProviderRequests() {
  if (isMockMode) return mockGetProviderRequests()
  return httpRequest(API_BASE_URLS.requests)
}

export async function getProviderRequestById(requestId) {
  if (isMockMode) return mockGetProviderRequestById(requestId)
  return httpRequest(`${API_BASE_URLS.requests}/${requestId}`)
}

export async function sendProviderRequestMessage(requestId, payload) {
  if (isMockMode) return mockSendRequestMessage(requestId, payload)
  return httpRequest(`${API_BASE_URLS.requests}/${requestId}/messages`, {
    method: "POST",
    body: payload,
  })
}

export async function respondToProviderRequest(requestId, payload) {
  if (isMockMode) return mockRespondToRequest(requestId, payload)
  return httpRequest(`${API_BASE_URLS.requests}/${requestId}/respond`, {
    method: "PUT",
    body: payload,
  })
}

export async function getAllPatients() {
  if (isMockMode) return mockGetAllPatients()
  return httpRequest(`${API_BASE_URLS.providerPatients}/all`)
}

export async function getAssignedPatients() {
  if (isMockMode) return mockGetAssignedPatients()
  return httpRequest(`${API_BASE_URLS.providerPatients}/assigned`)
}

export async function getUnassignedPatients() {
  if (isMockMode) return mockGetUnassignedPatients()
  return httpRequest(`${API_BASE_URLS.providerPatients}/unassigned`)
}

export async function assignPatient(patientId) {
  if (isMockMode) return mockAssignPatient(patientId)
  return httpRequest(`${API_BASE_URLS.providerPatients}/${patientId}/assign`, {
    method: "POST",
  })
}

export async function unassignPatient(patientId) {
  if (isMockMode) return mockUnassignPatient(patientId)
  return httpRequest(`${API_BASE_URLS.providerPatients}/${patientId}/assign`, {
    method: "DELETE",
  })
}

export async function activatePatient(patientId) {
  if (isMockMode) return mockActivatePatient(patientId)
  return httpRequest(`${API_BASE_URLS.providerPatients}/${patientId}/activate`, {
    method: "POST",
  })
}

export async function suspendPatient(patientId) {
  if (isMockMode) return mockSuspendPatient(patientId)
  return httpRequest(`${API_BASE_URLS.providerPatients}/${patientId}/suspend`, {
    method: "POST",
    body: { reason: "Suspended by provider" },
  })
}

export async function getMedicalRecords() {
  if (isMockMode) return mockGetRecords()
  return httpRequest(`${API_BASE_URLS.core}/records`)
}

export async function getMedicalRecordById(recordId) {
  if (isMockMode) return mockGetRecordById(recordId)
  return httpRequest(`${API_BASE_URLS.core}/records/${recordId}`)
}

export async function createMedicalRecord(payload) {
  if (isMockMode) return mockCreateRecord(payload)
  return httpRequest(`${API_BASE_URLS.core}/providers/medical-records`, {
    method: "POST",
    body: payload,
  })
}

export async function updateMedicalRecord(recordId, payload) {
  if (isMockMode) return mockUpdateRecord(recordId, payload)
  return httpRequest(`${API_BASE_URLS.core}/records/${recordId}`, {
    method: "PUT",
    body: payload,
  })
}

export async function deleteMedicalRecord(recordId) {
  if (isMockMode) return mockDeleteRecord(recordId)
  return httpRequest(`${API_BASE_URLS.core}/records/${recordId}`, {
    method: "DELETE",
  })
}

export async function getCertificates() {
  if (isMockMode) return mockGetCertificates()
  return httpRequest(`${API_BASE_URLS.core}/certificates/all`)
}

export async function getCertificateById(certificateId) {
  if (isMockMode) return mockGetCertificateById(certificateId)
  return httpRequest(`${API_BASE_URLS.core}/certificates/${certificateId}`)
}

export async function createCertificate(payload) {
  if (isMockMode) return mockCreateCertificate(payload)
  return httpRequest(`${API_BASE_URLS.core}/certificates`, {
    method: "POST",
    body: payload,
  })
}

export async function printCertificate(certificateId) {
  if (isMockMode) return mockPrintCertificate(certificateId)
  return httpRequest(`${API_BASE_URLS.core}/certificates/${certificateId}/print`, {
    headers: { Accept: "application/pdf" },
  })
}
