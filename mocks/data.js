const nowIso = () => new Date().toISOString()

export const mockDb = {
  users: [
    {
      id: "patient-1",
      email: "patient@sehamaroc.com",
      password: "password",
      role: "patient",
      accountStatus: "ACTIVE",
      canAccessMedicalHistory: true,
      profile: {
        id: "patient-1",
        email: "patient@sehamaroc.com",
        firstName: "Ahmed",
        lastName: "Benali",
        phone: "+212612345678",
        dateOfBirth: "1990-05-15",
        gender: "male",
        address: "123 Rue Mohammed V",
        city: "Casablanca",
        state: "Casablanca-Settat",
        zipCode: "20000",
        country: "Morocco",
        bloodType: "A+",
        emergencyContact: "+212698765432",
        allergies: ["Pollen"],
        chronicDiseases: ["Diabetes Type 2"],
        profileComplete: true,
        accountStatus: "ACTIVE",
      },
    },
    {
      id: "provider-1",
      email: "doctor@sehamaroc.com",
      password: "password",
      role: "provider",
      profile: {
        id: "provider-1",
        email: "doctor@sehamaroc.com",
        firstName: "Fatima",
        lastName: "Alami",
        fullName: "Dr. Fatima Alami",
        professionalTitle: "General Practitioner",
        specialty: "Family Medicine",
        subSpecialties: ["Primary Care"],
        stateLicenses: ["MD-12345"],
        primaryClinicName: "Seha Clinic",
        clinicAddress: "456 Boulevard Zerktouni",
        contactNumber: "+212611223344",
        profileComplete: true,
      },
    },
    {
      id: "patient-2",
      email: "newpatient@sehamaroc.com",
      password: "password",
      role: "patient",
      accountStatus: "PENDING",
      canAccessMedicalHistory: false,
      profile: {
        id: "patient-2",
        email: "newpatient@sehamaroc.com",
        firstName: "Sara",
        lastName: "El Idrissi",
        phone: "+212623456789",
        profileComplete: false,
        accountStatus: "PENDING",
      },
    },
  ],
  providerAssignments: {
    "provider-1": ["patient-1"],
  },
  requests: [
    {
      requestId: "REQ-1001",
      patientId: "patient-1",
      patientName: "Ahmed Benali",
      patientEmail: "patient@sehamaroc.com",
      type: "Consultation",
      subject: "Chest pain consultation",
      description: "I have chest pain for two days.",
      status: "pending",
      priority: "HIGH",
      preferredDate: "2026-04-20",
      createdAt: nowIso(),
      messages: [
        {
          sender: "patient",
          content: "Pain increases at night.",
          timestamp: nowIso(),
        },
      ],
    },
    {
      requestId: "REQ-1002",
      patientId: "patient-1",
      patientName: "Ahmed Benali",
      patientEmail: "patient@sehamaroc.com",
      type: "Prescription",
      subject: "Refill request",
      description: "Need refill for diabetes medication.",
      status: "in_progress",
      priority: "MED",
      preferredDate: "2026-04-18",
      createdAt: nowIso(),
      responseMessage: "Please complete blood test first.",
      responseDate: nowIso(),
      messages: [],
    },
  ],
  notifications: [
    {
      requestId: "REQ-1002",
      message: "Your provider responded to your request",
      status: "IN_PROGRESS",
      responseMessage: "Please complete blood test first.",
      providerName: "Dr. Fatima Alami",
      updatedAt: nowIso(),
      type: "Prescription",
      subject: "Refill request",
      priority: "MED",
    },
  ],
  records: [
    {
      recordId: "REC-9001",
      patientId: "patient-1",
      providerId: "provider-1",
      providerName: "Fatima Alami",
      recordType: "consultation",
      visitDate: nowIso(),
      diagnosis: "Mild chest inflammation",
      content: {
        symptoms: "Chest discomfort",
        treatment: "Anti-inflammatory medication",
        medications: "Ibuprofen",
        notes: "Follow up after 7 days",
      },
      createdAt: nowIso(),
      updatedAt: nowIso(),
    },
  ],
  certificates: [
    {
      id: "CERT-7001",
      patientId: "patient-1",
      patientName: "Ahmed Benali",
      patientEmail: "patient@sehamaroc.com",
      providerId: "provider-1",
      providerName: "Dr. Fatima Alami",
      providerProfessionalTitle: "General Practitioner",
      type: "MEDICAL",
      title: "Medical Certificate",
      caseTreated: "Acute viral flu",
      content: "Patient needs 3 days of rest.",
      issueDate: "2026-04-12",
      expiryDate: "2026-04-20",
      signature: "Dr. Fatima Alami",
      certificateNumber: "CERT-7001",
      status: "ACTIVE",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    },
  ],
}

export function createMockJwt(user) {
  return `mock-jwt-${user.id}-${Date.now()}`
}

export function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    accountStatus: user.accountStatus,
    canAccessMedicalHistory: user.canAccessMedicalHistory,
    profile: user.profile,
  }
}

export function getCurrentPatient() {
  return mockDb.users.find((u) => u.role === "patient")
}

export function getCurrentProvider() {
  return mockDb.users.find((u) => u.role === "provider")
}
