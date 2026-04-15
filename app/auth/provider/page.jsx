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
import { ArrowLeft, Loader2 } from "lucide-react"

const API_BASE_URL = "http://localhost:8082/api/auth"

export default function ProviderAuthPage() {
  const { lang, setLang, t } = useLanguage()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target)
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        // Store token and user data
        localStorage.setItem("token", data.token)
        localStorage.setItem("user", JSON.stringify({
          email: data.email,
          role: data.role,
        }))

        toast({
          title: t.success || "Success",
          description: data.message || t.loginSuccessful || "Login successful",
        })

        // Redirect to provider dashboard
        router.push("/provider/dashboard")
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

  return (
    <div className="flex min-h-screen bg-background" dir={lang === "ar" ? "rtl" : "ltr"}>
      {/* Visual Identity Side - Visible on Desktop */}
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src="/doctor.jpeg"
          alt="Healthcare Professional"
          fill
          className="object-cover"
          priority
        />
        {/* Overlays for brand identity and readability */}
        <div className="absolute inset-0 bg-primary/10 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Branding on Image */}
        <div className="absolute bottom-16 left-16 right-16 z-10 space-y-6">
          <div className="inline-flex rounded-2xl bg-background/80 p-4 backdrop-blur-md">
            <Logo size="lg" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
              {t.providerLogin}
            </h2>
            <p className="max-w-md text-xl font-medium text-muted-foreground">
              {t.managePatients}
            </p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex w-full flex-col lg:w-1/2">
        <div className="container mx-auto flex h-full max-w-xl flex-col px-6 py-8">
          {/* Top Navigation */}
          <div className="flex items-center justify-between mb-12">
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
            <div className="mb-10 lg:hidden">
              <Logo size="lg" href="/" />
            </div>

            {/* Auth Card - Glassmorphism style to match the platform aesthetic */}
            <Card className="w-full border-border/50 bg-card/50 shadow-2xl backdrop-blur-sm transition-all border-2">
              <Tabs defaultValue="login" className="w-full">
                <CardHeader className="space-y-4 pb-8 text-center lg:text-start">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary lg:mx-0">
                    <Logo size="md" iconOnly />
                  </div>
                  <div className="space-y-1.5">
                    <CardTitle className="text-3xl font-bold tracking-tight">{t.providerLogin}</CardTitle>
                    <CardDescription className="text-lg font-medium text-muted-foreground">
                      {t.accessProviderAccount}
                    </CardDescription>
                  </div>
                </CardHeader>

                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-5">
                      <div className="space-y-2.5">
                        <Label htmlFor="login-email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                          {t.email}
                        </Label>
                        <Input
                          id="login-email"
                          name="email"
                          type="email"
                          placeholder="doctor@example.com"
                          required
                          className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-secondary"
                        />
                      </div>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground/80">
                            {t.password}
                          </Label>
                        </div>
                        <Input
                          id="login-password"
                          name="password"
                          type="password"
                          required
                          className="h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-secondary"
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="pt-6">
                      <Button
                        type="submit"
                        className="h-14 w-full rounded-xl bg-secondary text-lg font-bold shadow-lg transition-all hover:bg-secondary/90 hover:shadow-secondary/20 active:scale-95"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            {t.loading}
                          </>
                        ) : (
                          t.login
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
            </Card>

            <div className="mt-8 rounded-2xl border border-secondary/20 bg-secondary/5 px-6 py-4 text-center transition-colors hover:bg-secondary/10">
              <p className="text-sm font-medium text-secondary/80">
                {t.demoCredentialsProvider}
              </p>
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 text-center text-xs text-muted-foreground/60">
            <p>{t.copyright}</p>
          </div>
        </div>
      </div>
    </div>
  )
}