import { createMockJwt, mockDb, sanitizeUser } from "@/mocks/data"

export async function mockLogin({ email, password, role }) {
  const user = mockDb.users.find((item) => item.email === email && item.password === password)

  if (!user) {
    throw new Error("Invalid credentials")
  }

  if (role && user.role !== role) {
    throw new Error("Unauthorized role")
  }

  return {
    token: createMockJwt(user),
    ...sanitizeUser(user),
    message: "Login successful",
  }
}

export async function mockPatientRegister({ email, password }) {
  const exists = mockDb.users.some((item) => item.email === email)
  if (exists) {
    throw new Error("User already exists")
  }

  const newUser = {
    id: `patient-${Date.now()}`,
    email,
    password,
    role: "patient",
    accountStatus: "PENDING",
    canAccessMedicalHistory: false,
    profile: {
      id: `patient-${Date.now()}`,
      email,
      profileComplete: false,
      accountStatus: "PENDING",
    },
  }

  mockDb.users.push(newUser)

  return {
    token: createMockJwt(newUser),
    ...sanitizeUser(newUser),
    message: "Account created successfully",
  }
}
