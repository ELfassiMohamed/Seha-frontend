"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"
import { useLanguage } from "@/contexts/LanguageContext"
import {
  LayoutDashboard,
  User,
  FileText,
  History,
  Bell,
  LogOut,
  Menu,
  X,
  Award,
  ChevronLeft,
  Settings,
} from "lucide-react"
import { clearAuthSession } from "@/services/auth/storage"

export function PatientSidebar({ user }) {
  const { lang, t } = useLanguage()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Primary navigation
  const navigation = [
    { name: t.dashboard, href: "/patient/dashboard", icon: LayoutDashboard },
    { name: t.myProfile, href: "/patient/profile", icon: User },
    { name: t.myRequests, href: "/patient/requests", icon: FileText },
    { name: t.medicalHistory, href: "/patient/history", icon: History },
    { name: t.myCertifications, href: "/patient/certifications", icon: Award },
    { name: t.notifications, href: "/patient/notifications", icon: Bell },
  ]

  // Secondary navigation (bottom)
  const secondaryNavigation = [
    { name: t.myProfile, href: "/patient/profile", icon: User },
  ]

  const handleLogout = () => {
    clearAuthSession()
    router.push("/")
  }

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || "U"}${lastName?.[0] || "U"}`.toUpperCase()
  }

  // Effect to handle window resize for mobile behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const wrapperWidth = isCollapsed ? "w-[101px]" : "w-[286px]"
  const isRtl = lang === "ar"

  return (
    <div
      className={cn(
        "relative transition-all duration-400 ease-in-out hidden lg:block",
        wrapperWidth
      )}
    >
      <aside
        className={cn(
          "fixed top-4 bottom-4 z-40 bg-sidebar border border-sidebar-border rounded-2xl flex flex-col transition-all duration-400 ease-in-out shadow-lg overflow-hidden",
          isRtl ? "right-4" : "left-4",
          isCollapsed ? "w-[85px]" : "w-[270px]"
        )}
      >
        {/* Sidebar Header */}
        <header className="relative flex items-center justify-between p-6 h-[96px]">
          <div className={cn("transition-all duration-300", isCollapsed ? "opacity-0 invisible scale-95" : "opacity-100 visible scale-100")}>
            <Logo size="md" href="/patient/dashboard" />
          </div>
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={cn(
              "absolute flex items-center justify-center w-9 h-9 bg-white text-sidebar-foreground border border-sidebar-border rounded-lg transition-all duration-400 hover:bg-sidebar-accent shadow-sm z-50",
              isCollapsed 
                ? (isRtl ? "right-[24px] top-[75px]" : "left-[24px] top-[75px]") 
                : (isRtl ? "left-6" : "right-6")
            )}
          >
            <ChevronLeft className={cn("h-6 w-6 transition-transform duration-400", isCollapsed && "rotate-180")} />
          </button>
        </header>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <ul className={cn("space-y-1 transition-transform duration-400", isCollapsed && "translate-y-4")}>
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-400 whitespace-nowrap",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isCollapsed && "px-3 justify-center rounded-xl"
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    <span
                      className={cn(
                        "font-medium transition-all duration-300",
                        isCollapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100"
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                  {/* Tooltip */}
                  {isCollapsed && (
                    <span className={cn(
                      "absolute top-1/2 -translate-y-1/2 bg-white text-sidebar-foreground px-3 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-400 z-50",
                      isRtl ? "right-[calc(100%+20px)]" : "left-[calc(100%+20px)]"
                    )}>
                      {item.name}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Secondary Nav (Bottom) */}
        <div className="px-4 py-6 border-t border-sidebar-border space-y-4">
          <ul className="space-y-1">
            <li className="relative group">
              <div className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-400 whitespace-nowrap",
                "text-sidebar-foreground",
                isCollapsed && "px-3 justify-center rounded-xl"
              )}>
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">
                    {getInitials(user?.profile?.firstName, user?.profile?.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className={cn(
                  "flex-1 min-w-0 transition-all duration-300",
                  isCollapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100"
                )}>
                  <p className="text-sm font-medium truncate">
                    {user?.profile?.firstName || user?.email}
                  </p>
                </div>
              </div>
              {isCollapsed && (
                <span className={cn(
                  "absolute top-1/2 -translate-y-1/2 bg-white text-sidebar-foreground px-3 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-400 z-50",
                  isRtl ? "right-[calc(100%+20px)]" : "left-[calc(100%+20px)]"
                )}>
                  {user?.profile?.firstName || user?.email}
                </span>
              )}
            </li>
            
            <li className="relative group">
              <button
                onClick={handleLogout}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-400 whitespace-nowrap text-sidebar-foreground hover:bg-red-50 hover:text-red-600",
                  isCollapsed && "px-3 justify-center rounded-xl"
                )}
              >
                <LogOut className="h-6 w-6 shrink-0" />
                <span
                  className={cn(
                    "font-medium transition-all duration-300",
                    isCollapsed ? "opacity-0 pointer-events-none w-0" : "opacity-100"
                  )}
                >
                  {t.logout}
                </span>
              </button>
              {isCollapsed && (
                <span className={cn(
                  "absolute top-1/2 -translate-y-1/2 bg-white text-sidebar-foreground px-3 py-2 rounded-lg shadow-xl text-sm font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-400 z-50",
                  isRtl ? "right-[calc(100%+20px)]" : "left-[calc(100%+20px)]"
                )}>
                  {t.logout}
                </span>
              )}
            </li>
          </ul>
          
          {!isCollapsed && (
            <div className="flex justify-center">
              <LanguageSelector />
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 right-4 z-50">
        <aside
          className={cn(
            "bg-sidebar border border-sidebar-border rounded-2xl shadow-lg transition-all duration-400 overflow-hidden",
            isMobileMenuOpen ? "h-auto max-h-[calc(100vh-32px)]" : "h-[64px]"
          )}
        >
          <div className="flex items-center justify-between p-3 h-[64px]">
            <Logo size="sm" href="/patient/dashboard" />
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center justify-center w-10 h-10 bg-white text-sidebar-foreground border border-sidebar-border rounded-lg"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className={cn("px-4 pb-6 space-y-4", !isMobileMenuOpen && "hidden")}>
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg",
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="pt-4 border-t border-sidebar-border">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span>{t.logout}</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

