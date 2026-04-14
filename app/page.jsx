"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/LanguageContext"
import { Heart, Shield, UserCheck, ArrowRight, Github } from "lucide-react"

export default function LandingPage() {
  const { lang, setLang, t, mounted } = useLanguage()
  const isArabic = lang === "ar"

  const pageText = {
    en: {
      language: "Language",
      portalTitle: "Access Portal",
      portalDescription: "Choose your workspace to continue.",
      principlesTitle: "Core Platform Principles",
      principlesDescription: "Designed for organized, secure, and patient-centered healthcare workflows.",
      mvpNotice: "MVP - Under Active Development",
      attribution: "Project Group - EMSI Tanger",
      github: "GitHub",
    },
    fr: {
      language: "Langue",
      portalTitle: "Portail d'Acces",
      portalDescription: "Choisissez votre espace pour continuer.",
      principlesTitle: "Principes Fondamentaux de la Plateforme",
      principlesDescription: "Concue pour des parcours de soins organises, securises et centres sur le patient.",
      mvpNotice: "MVP - En Developpement Actif",
      attribution: "Groupe de Projet - EMSI Tanger",
      github: "GitHub",
    },
    ar: {
      language: "اللغة",
      portalTitle: "بوابة الوصول",
      portalDescription: "اختر مساحة العمل المناسبة للمتابعة.",
      principlesTitle: "المبادئ الاساسية للمنصة",
      principlesDescription: "مصممة لمسارات رعاية منظمة وامنة ومتمحورة حول المريض.",
      mvpNotice: "MVP - المنصة قيد التطوير النشط",
      attribution: "مجموعة مشروع - EMSI Tanger",
      github: "GitHub",
    },
  }

  const current = pageText[lang] || pageText.en
  const languageOptions = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
  ]

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background" dir={isArabic ? "rtl" : "ltr"}>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between gap-4">
            <Logo size="md" />
            <div className="flex items-center gap-3">
              <span className="hidden text-sm font-medium text-muted-foreground md:inline">{current.language}</span>
              <div className="inline-flex rounded-xl border bg-card p-1">
                {languageOptions.map((option) => (
                  <Button
                    key={option.code}
                    type="button"
                    size="sm"
                    variant={lang === option.code ? "default" : "ghost"}
                    onClick={() => setLang(option.code)}
                    className="h-8 rounded-lg px-3 text-xs font-semibold"
                    aria-label={`Switch to ${option.label}`}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden px-4 py-16 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h1 className="text-4xl font-bold leading-tight md:text-5xl">{t.heroTitle}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{t.heroSubtitle}</p>
              </div>

              <Card className="border-2 shadow-sm lg:col-span-5">
                <CardHeader className="pb-3">
                  <CardTitle className="text-2xl">{current.portalTitle}</CardTitle>
                  <CardDescription className="text-base">{current.portalDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/auth/patient" className="block">
                    <Button size="lg" className="w-full justify-between bg-primary text-base hover:bg-primary/90">
                      <span>{t.imPatient}</span>
                      <ArrowRight className={`h-5 w-5 ${isArabic ? "rotate-180" : ""}`} />
                    </Button>
                  </Link>
                  <Link href="/auth/provider" className="block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full justify-between border-2 border-secondary bg-transparent text-base text-secondary hover:bg-secondary hover:text-secondary-foreground"
                    >
                      <span>{t.imDoctor}</span>
                      <ArrowRight className={`h-5 w-5 ${isArabic ? "rotate-180" : ""}`} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="px-4 pb-14 pt-4 md:pb-20">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8 max-w-3xl">
              <h2 className="text-3xl font-semibold md:text-4xl">{current.principlesTitle}</h2>
              <p className="mt-3 text-muted-foreground">{current.principlesDescription}</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-2 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{t.advantageTitle1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{t.advantageDesc1}</CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{t.advantageTitle2}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{t.advantageDesc2}</CardDescription>
                </CardContent>
              </Card>

              <Card className="border-2 shadow-sm transition-shadow hover:shadow-md">
                <CardHeader className="space-y-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-secondary/10">
                    <UserCheck className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{t.advantageTitle3}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{t.advantageDesc3}</CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-10 border-t bg-muted/40 px-4 py-10">
        <div className="container mx-auto max-w-6xl">
          <div className="rounded-2xl border bg-card p-5 md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold tracking-wide text-secondary">
                  {current.mvpNotice}
                </p>
                <p className="text-sm text-muted-foreground">{current.attribution}</p>
                <a
                  href="https://github.com/ELfassiMohamed/Seha-frontend"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  {current.github}
                </a>
              </div>

              <div className={`space-y-2 ${isArabic ? "md:text-left" : "md:text-right"}`}>
                <Logo size="md" href="/" />
                <p className="text-sm text-muted-foreground">{t.copyright}</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
