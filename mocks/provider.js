import { mockDb } from "@/mocks/data"

function currentProvider() {
  return mockDb.users.find((u) => u.role === "provider")
}

function assignedPatientIds() {
  const provider = currentProvider()
  return mockDb.providerAssignments[provider.id] || []
}

function mapPatient(patient) {
  return {
    id: patient.id,
    firstName: patient.profile.firstName,
    lastName: patient.profile.lastName,
    fullName: `${patient.profile.firstName || ""} ${patient.profile.lastName || ""}`.trim() || "N/A",
    email: patient.email,
    phone: patient.profile.phone || "N/A",
    accountStatus: patient.accountStatus || patient.profile.accountStatus || "PENDING",
  }
}

export async function mockGetProviderProfile() {
  return currentProvider().profile
}

export async function mockUpdateProviderProfile(payload) {
  const provider = currentProvider()
  provider.profile = {
    ...provider.profile,
    ...payload,
    profileComplete: true,
  }
  return provider.profile
}

export async function mockGetProviderRequests() {
  return mockDb.requests
}

export async function mockGetProviderRequestById(requestId) {
  return mockDb.requests.find((request) => request.requestId === requestId)
}

export async function mockRespondToRequest(requestId, payload) {
  const request = mockDb.requests.find((item) => item.requestId === requestId)
  if (!request) throw new Error("Request not found")

  request.status = "completed"
  request.responseMessage = payload.responseMessage
  request.responseDate = new Date().toISOString()
  return request
}

export async function mockSendRequestMessage(requestId, payload) {
  const request = mockDb.requests.find((item) => item.requestId === requestId)
  if (!request) throw new Error("Request not found")

  request.messages = request.messages || []
  request.messages.push({
    sender: "provider",
    content: payload.content,
    timestamp: new Date().toISOString(),
  })

  return { success: true }
}

export async function mockGetAllPatients() {
  return mockDb.users.filter((user) => user.role === "patient").map(mapPatient)
}

export async function mockGetAssignedPatients() {
  const ids = assignedPatientIds()
  return mockDb.users.filter((user) => user.role === "patient" && ids.includes(user.id)).map(mapPatient)
}

export async function mockGetUnassignedPatients() {
  const ids = assignedPatientIds()
  return mockDb.users.filter((user) => user.role === "patient" && !ids.includes(user.id)).map(mapPatient)
}

export async function mockAssignPatient(patientId) {
  const provider = currentProvider()
  const ids = mockDb.providerAssignments[provider.id] || []
  if (!ids.includes(patientId)) ids.push(patientId)
  mockDb.providerAssignments[provider.id] = ids
  return { success: true }
}

export async function mockUnassignPatient(patientId) {
  const provider = currentProvider()
  const ids = mockDb.providerAssignments[provider.id] || []
  mockDb.providerAssignments[provider.id] = ids.filter((id) => id !== patientId)
  return { success: true }
}

export async function mockActivatePatient(patientId) {
  const patient = mockDb.users.find((u) => u.id === patientId)
  if (patient) patient.accountStatus = "ACTIVE"
  return { success: true }
}

export async function mockSuspendPatient(patientId) {
  const patient = mockDb.users.find((u) => u.id === patientId)
  if (patient) patient.accountStatus = "SUSPENDED"
  return { success: true }
}

export async function mockGetRecords() {
  return mockDb.records
}

export async function mockGetRecordById(recordId) {
  return mockDb.records.find((record) => record.recordId === recordId)
}

export async function mockCreateRecord(payload) {
  mockDb.records.unshift(payload)
  return payload
}

export async function mockUpdateRecord(recordId, payload) {
  const index = mockDb.records.findIndex((record) => record.recordId === recordId)
  if (index === -1) throw new Error("Record not found")
  mockDb.records[index] = payload
  return payload
}

export async function mockDeleteRecord(recordId) {
  mockDb.records = mockDb.records.filter((record) => record.recordId !== recordId)
  return { success: true }
}

export async function mockGetCertificates() {
  return mockDb.certificates
}

export async function mockGetCertificateById(id) {
  return mockDb.certificates.find((certificate) => certificate.id === id)
}

export async function mockCreateCertificate(payload) {
  const provider = currentProvider()
  const patient = mockDb.users.find((u) => u.id === payload.patientId)
  const certificate = {
    id: payload.certificateNumber || `CERT-${Date.now()}`,
    ...payload,
    patientName: `${patient?.profile?.firstName || ""} ${patient?.profile?.lastName || ""}`.trim(),
    patientEmail: patient?.email,
    providerId: provider.id,
    providerName: provider.profile.fullName,
    providerProfessionalTitle: provider.profile.professionalTitle,
    issueDate: new Date().toISOString().split("T")[0],
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  mockDb.certificates.unshift(certificate)
  return certificate
}

export async function mockPrintCertificate(id) {
  const certificate = await mockGetCertificateById(id)
  const content = `Certificate ${certificate?.certificateNumber || id}`
  return new Blob([content], { type: "application/pdf" })
}
