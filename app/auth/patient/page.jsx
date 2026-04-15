"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/LanguageContext"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft } from "lucide-react"

const API_BASE_URL = "http://localhost:8081/api/auth"

export default function PatientAuthPage() {
  const { lang, setLang, t, mounted } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  if (!mounted) {
    return null
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: loginEmail, 
          password: loginPassword 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          role: data.role,
          accountStatus: data.accountStatus,
          canAccessMedicalHistory: data.canAccessMedicalHistory
        }))

        toast({
          title: t.success || "Success",
          description: t.loginSuccess || "Login successful",
        })

        // Redirect to dashboard
        router.push("/patient/dashboard")
      } else {
        toast({
          title: t.error || "Error",
          description: data.message || t.invalidCredentials || "Invalid credentials",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: t.error || "Error",
        description: t.connectionError || "Connection error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          email: registerEmail, 
          password: registerPassword 
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Store authentication data
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          role: data.role,
          accountStatus: data.accountStatus,
          canAccessMedicalHistory: data.canAccessMedicalHistory,
          isNewUser: true // Flag to indicate this is a new registration
        }))

        toast({
          title: t.success || "Success",
          description: data.message || t.accountCreated || "Account created successfully",
        })

        // Redirect to profile completion page
        router.push("/patient/profile?complete=true")
      } else {
        toast({
          title: t.error || "Error",
          description: data.message || t.registrationFailed || "Registration failed",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: t.error || "Error",
        description: t.connectionError || "Connection error. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-background" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Visual Identity Side - Visible on Desktop */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/patient.jpg"
          alt="Patient Care"
          fill
          className="object-cover"
          priority
        />
        {/* Overlays for brand identity and readability */}
        <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Branding on Image */}
        <div className="absolute bottom-16 left-16 right-16 z-10 space-y-6">
          <div className="inline-flex rounded-2xl bg-background/80 p-4 backdrop-blur-md">
            <Logo size="lg" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
              {t.patientLogin}
            </h2>
            <p className="max-w-md text-xl font-medium text-muted-foreground">
              {t.manageYourHealth}
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="container mx-auto flex h-full max-w-xl flex-col px-6 py-8">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/">
              <Button variant="ghost" className="group gap-2 rounded-xl transition-all hover:bg-primary/5">
                <ArrowLeft className={`h-4 w-4 transition-transform group-hover:-translate-x-1 ${lang === "ar" ? "rotate-180 group-hover:translate-x-1" : ""}`} />
                <span className="font-medium">{t.back}</span>
              </Button>
            </Link>
            <LanguageSelector />
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            {/* Mobile Logo */}
            <div className="mb-8 lg:hidden">
              <Logo size="lg" href="/" />
            </div>

            {/* Auth Card - Glassmorphism style to match the platform aesthetic */}
            <Card className="w-full border-border/50 bg-background/50 shadow-2xl backdrop-blur-sm transition-all border-2">
              <Tabs defaultValue="login" className="w-full">
                <CardHeader className="space-y-4 pb-6">
                  <TabsList className="grid w-full grid-cols-2 rounded-xl bg-muted/50 p-1">
                    <TabsTrigger value="login" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      {t.login}
                    </TabsTrigger>
                    <TabsTrigger value="register" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm">
                      {t.register}
                    </TabsTrigger>
                  </TabsList>
                  <div className="space-y-1">
                    <CardTitle className="text-3xl font-bold tracking-tight">{t.patientLogin}</CardTitle>
                    <CardDescription className="text-lg font-medium text-muted-foreground/80">
                      {t.enterCredentials}
                    </CardDescription>
                  </div>
                </CardHeader>

                <TabsContent value="login" className="mt-0">
                  <CardContent className="space-y-5">
                    <div className="space-y-2.5">
                      <Label htmlFor="login-email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {t.email}
                      </Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        placeholder="patient@email.com" 
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="login-password" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {t.password}
                      </Label>
                      <Input 
                        id="login-password" 
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={handleLogin}
                      className="h-14 w-full rounded-xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-95" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.loading}
                        </>
                      ) : (t.login)}
                    </Button>
                  </CardFooter>
                </TabsContent>

                <TabsContent value="register" className="mt-0">
                  <CardContent className="space-y-5">
                    <div className="space-y-2.5">
                      <Label htmlFor="register-email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {t.email}
                      </Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="you@example.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="space-y-2.5">
                      <Label htmlFor="register-password" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                        {t.password}
                      </Label>
                      <Input 
                        id="register-password" 
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                        required 
                        className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary"
                      />
                    </div>
                    <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3 text-sm text-primary">
                      <p className="font-medium">{t.completeProfileAfter}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={handleRegister}
                      className="h-14 w-full rounded-xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-95" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          {t.loading}
                        </>
                      ) : (t.register)}
                    </Button>
                  </CardFooter>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-4 text-center transition-colors hover:bg-primary/10">
              <p className="text-sm font-medium text-primary/80">
                {t.demoCredentialsPatient}
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-8 text-center text-xs text-muted-foreground/60">
            <p>{t.copyright}</p>
          </div>
        </div>
      </div>
    </div>
  )
}