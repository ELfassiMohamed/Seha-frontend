"use client"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { Heart, Shield, UserCheck, ArrowRight, Github, Linkedin } from "lucide-react"

const LocalLogo = ({ href }) => {
  const content = (
    <div className="flex items-center gap-3 group">
      <div className="relative transition-transform group-hover:scale-110">
        <Image src="/logo-icon.svg" alt="SehAIty Logo" width={40} height={40} className="object-contain drop-shadow-md" />
      </div>
      <span className="font-bold tracking-tight text-xl text-primary">
        SehAIty
      </span>
    </div>
  )
  if (href) return <Link href={href} className="inline-block">{content}</Link>
  return content
}

export default function LandingPage() {
  const { lang, setLang, t, mounted } = useLanguage()
  const isArabic = lang === "ar"

  const team = [
    { name: "Mohamed El Fassi", url: "https://www.linkedin.com/in/mohamed-el-fassi" },
    { name: "Akram Benyacoub", url: "https://www.linkedin.com/in/akram-benyacoub-5a98a3279/" },
    { name: "Amal Chegdali", url: "https://www.linkedin.com/in/amal-chegdali-37a5b9239/" },
    { name: "Nizar Tlidi", url: "https://www.linkedin.com/in/nizartlidi/" },
  ]

  const pageText = {
    en: {
      language: "Language",
      portalTitle: "Access Portal",
      portalDescription: "Choose your workspace to continue.",
      principlesTitle: "Core Platform Principles",
      principlesDescription: "Designed for organized, secure, and patient-centered healthcare workflows.",
      mvpNotice: "MVP - Under Active Development",
      // attribution: "Project Group - EMSI Tanger",
      github: "GitHub",
      builtBy: "Built by",
    },
    fr: {
      language: "Langue",
      portalTitle: "Portail d'Acces",
      portalDescription: "Choisissez votre espace pour continuer.",
      principlesTitle: "Principes Fondamentaux de la Plateforme",
      principlesDescription: "Concue pour des parcours de soins organises, securises et centres sur le patient.",
      mvpNotice: "MVP - En Developpement Actif",
      // attribution: "Groupe de Projet - EMSI Tanger",
      github: "GitHub",
      builtBy: "Concu par",
    },
    ar: {
      language: "اللغة",
      portalTitle: "بوابة الوصول",
      portalDescription: "اختر مساحة العمل المناسبة للمتابعة.",
      principlesTitle: "المبادئ الاساسية للمنصة",
      principlesDescription: "مصممة لمسارات رعاية منظمة وامنة ومتمحورة حول المريض.",
      mvpNotice: "MVP - المنصة قيد التطوير النشط",
      // attribution: "مجموعة مشروع - EMSI Tanger",
      github: "GitHub",
      builtBy: "صُنع بواسطة",
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
            <LocalLogo />
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
        <section className="relative flex min-h-[85vh] items-center overflow-hidden px-4 py-20 md:py-32">
          {/* Background Image with optimized Next.js Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero.jpg"
              alt="Medical Care"
              fill
              className="object-cover object-center"
              priority
            />
            {/* Dynamic gradient overlays for readability and aesthetic */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-background/20 to-transparent ltr:block rtl:hidden" />
            <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-background/20 to-transparent ltr:hidden rtl:block" />
          </div>

          <div className="container relative z-10 mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <div className="space-y-6">
                  <h1 className="text-4xl font-extrabold tracking-tight text-foreground lg:text-6xl drop-shadow-sm">
                    {t.heroTitle}
                  </h1>
                  <p className="max-w-2xl text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
                    {t.heroSubtitle}
                  </p>
                </div>
              </div>

              <Card className="border-border/40 bg-background/60 shadow-2xl backdrop-blur-xl lg:col-span-5 border-2 transition-all hover:border-primary/20">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold tracking-tight">{current.portalTitle}</CardTitle>
                  <CardDescription className="text-lg font-medium text-muted-foreground/90">
                    {current.portalDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/auth/patient" className="group block">
                    <Button size="lg" className="h-14 w-full justify-between bg-primary text-lg font-semibold shadow-lg transition-all hover:scale-[1.02] active:scale-95">
                      <span>{t.imPatient}</span>
                      <ArrowRight className={`h-6 w-6 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
                    </Button>
                  </Link>
                  <Link href="/auth/provider" className="group block">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 w-full justify-between border-2 border-secondary/50 bg-background/50 text-lg font-semibold text-secondary shadow-sm transition-all hover:scale-[1.02] hover:bg-secondary hover:text-secondary-foreground active:scale-95"
                    >
                      <span>{t.imDoctor}</span>
                      <ArrowRight className={`h-6 w-6 transition-transform group-hover:translate-x-1 ${isArabic ? "rotate-180 group-hover:-translate-x-1" : ""}`} />
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
          <div className="rounded-2xl border bg-card p-5 md:p-6 space-y-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="space-y-3">
                <p className="inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold tracking-wide text-secondary">
                  {current.mvpNotice}
                </p>
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
                <LocalLogo href="/" />
                <p className="text-sm text-muted-foreground">{t.copyright}</p>
              </div>
            </div>

            {/* Team LinkedIn Section */}
            <div className="border-t pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {current.builtBy}
              </p>
              <div className="flex flex-wrap gap-3">
                {team.map((member) => (
                  <a
                    key={member.url}
                    href={member.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                  >
                    <Linkedin className="h-3.5 w-3.5 text-[#0A66C2]" />
                    {member.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
