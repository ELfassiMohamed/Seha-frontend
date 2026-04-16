import { mockDb } from "@/mocks/data"

function currentPatient() {
  return mockDb.users.find((u) => u.role === "patient")
}

export async function mockGetPatientProfile() {
  return currentPatient().profile
}

export async function mockUpdatePatientProfile(payload) {
  const patient = currentPatient()
  patient.profile = {
    ...patient.profile,
    ...payload,
    profileComplete: true,
  }
  patient.accountStatus = patient.accountStatus || "ACTIVE"
  return patient.profile
}

export async function mockGetPatientRequests() {
  const patient = currentPatient()
  return mockDb.requests.filter((request) => request.patientId === patient.id)
}

export async function mockCreatePatientRequest(payload) {
  const patient = currentPatient()
  const request = {
    requestId: `REQ-${Date.now()}`,
    patientId: patient.id,
    patientName: `${patient.profile.firstName || ""} ${patient.profile.lastName || ""}`.trim() || patient.email,
    patientEmail: patient.email,
    status: "pending",
    createdAt: new Date().toISOString(),
    messages: [],
    ...payload,
  }

  mockDb.requests.unshift(request)
  return request
}

export async function mockGetPatientNotifications() {
  return mockDb.notifications
}

export async function mockGetPatientHistory() {
  const patient = currentPatient()
  return mockDb.records
    .filter((record) => record.patientId === patient.id)
    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
}

export async function mockGetPatientCertificates() {
  const patient = currentPatient()
  return mockDb.certificates.filter((certificate) => certificate.patientId === patient.id)
}
