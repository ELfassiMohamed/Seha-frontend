"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { PatientSidebar } from "@/components/patient-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Award, Download, Eye, Loader2, Printer } from "lucide-react"
import {
  downloadCertificate,
  getCertificateById,
  getPatientCertificates,
  getPatientProfile,
} from "@/services/api/patientService"
import { handleUnauthorized as clearUnauthorizedSession, resolveProtectedUser } from "@/services/auth/guard"

export default function PatientCertifications() {
  const [user, setUser] = useState(null)
  const [certificates, setCertificates] = useState([])
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const result = resolveProtectedUser("patient")
    if (!result.ok) {
      if (result.reason === "unauthenticated") {
        router.push("/auth/patient")
      } else {
        router.push("/")
      }
      return
    }

    setUser(result.user)
    fetchCertificates(result.user)
  }, [router])

  const fetchCertificates = async (userData) => {
    setIsLoading(true)
    try {
      const profileData = await getPatientProfile()
      let patientId = profileData?.id

      if (!patientId) {
        patientId = userData.id || userData.patientId || userData.email
      }

      if (!patientId) {
        toast({
          title: "Error",
          description: "Unable to identify patient ID",
          variant: "destructive",
        })
        return
      }

      const data = await getPatientCertificates(patientId)
      setCertificates(data)
    } catch (error) {
      console.error("Error fetching certificates:", error)
      if (error.status === 401) {
        clearUnauthorizedSession()
        router.push("/auth/patient")
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to load certificates",
          variant: "destructive",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewCertificate = async (certificate) => {
    try {
      const fullCertificate = await getCertificateById(certificate.id)
      setSelectedCertificate(fullCertificate)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error fetching certificate:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to load certificate details",
        variant: "destructive",
      })
    }
  }

  const handlePrintCertificate = async (certificate) => {
    try {
      const blob = await downloadCertificate(certificate.id)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `certificate-${certificate.certificateNumber || certificate.id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast({
        title: "Success",
        description: "Certificate downloaded successfully",
      })
    } catch (error) {
      console.error("Error downloading certificate:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to download certificate",
        variant: "destructive",
      })
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCertificate(null)
  }

  const formatDate = (dateString) => {
    if (!dateString) return "-"
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (!user || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      <PatientSidebar user={user} />

      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-balance">My Certificates</h1>
            <p className="text-muted-foreground">View and download your medical certificates</p>
          </div>

          {/* Certificates List */}
          <Card>
            <CardHeader>
              <CardTitle>Received Certificates</CardTitle>
              <CardDescription>All medical certificates issued by your healthcare providers</CardDescription>
            </CardHeader>
            <CardContent>
              {certificates.length === 0 ? (
                <div className="text-center py-12">
                  <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No certificates yet</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Certificates issued by your healthcare providers will appear here
                  </p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  <div className="hidden md:block overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium">Certificate #</th>
                          <th className="text-left py-3 px-4 font-medium">Title</th>
                          <th className="text-left py-3 px-4 font-medium">Provider</th>
                          <th className="text-left py-3 px-4 font-medium">Case Treated</th>
                          <th className="text-left py-3 px-4 font-medium">Issue Date</th>
                          <th className="text-left py-3 px-4 font-medium">Expiry Date</th>
                          <th className="text-left py-3 px-4 font-medium">Status</th>
                          <th className="text-left py-3 px-4 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {certificates.map((certificate) => (
                          <tr key={certificate.id} className="border-b hover:bg-muted/30">
                            <td className="py-4 px-4 font-mono text-sm">
                              {certificate.certificateNumber || certificate.id}
                            </td>
                            <td className="py-4 px-4 font-medium">{certificate.title}</td>
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium">{certificate.providerName}</p>
                                <p className="text-sm text-muted-foreground">
                                  {certificate.providerProfessionalTitle}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-sm line-clamp-1">{certificate.caseTreated}</td>
                            <td className="py-4 px-4">{formatDate(certificate.issueDate)}</td>
                            <td className="py-4 px-4">{formatDate(certificate.expiryDate)}</td>
                            <td className="py-4 px-4">
                              <Badge
                                variant={certificate.status === "ACTIVE" ? "active" : "secondary"}
                                className="text-xs"
                              >
                                {certificate.status || "ACTIVE"}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewCertificate(certificate)}
                                  title="View Details"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handlePrintCertificate(certificate)}
                                  title="Download PDF"
                                  className="gap-1"
                                >
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="md:hidden space-y-4">
                    {certificates.map((certificate) => (
                      <Card key={certificate.id}>
                        <CardContent className="pt-6 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{certificate.title}</p>
                              <p className="text-sm text-muted-foreground font-mono">
                                #{certificate.certificateNumber || certificate.id}
                              </p>
                            </div>
                            <Badge
                              variant={certificate.status === "ACTIVE" ? "active" : "secondary"}
                              className="text-xs"
                            >
                              {certificate.status || "ACTIVE"}
                            </Badge>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{certificate.providerName}</p>
                            <p className="text-sm text-muted-foreground">
                              {certificate.providerProfessionalTitle}
                            </p>
                          </div>
                          <div className="pt-2 border-t">
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {certificate.caseTreated}
                            </p>
                          </div>
                          <div className="flex gap-1 text-sm text-muted-foreground">
                            <span>Issued: {formatDate(certificate.issueDate)}</span>
                            {certificate.expiryDate && (
                              <>
                                <span>•</span>
                                <span>Expires: {formatDate(certificate.expiryDate)}</span>
                              </>
                            )}
                          </div>
                          <div className="flex gap-2 pt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewCertificate(certificate)}
                              className="flex-1 gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handlePrintCertificate(certificate)}
                              className="flex-1 gap-2"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Certificate Details Modal */}
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Certificate Details</DialogTitle>
              <DialogDescription>
                Certificate #{selectedCertificate?.certificateNumber || selectedCertificate?.id}
              </DialogDescription>
            </DialogHeader>

            {selectedCertificate && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Certificate Number</Label>
                    <p className="font-medium font-mono">
                      {selectedCertificate.certificateNumber || selectedCertificate.id}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Type</Label>
                    <p className="font-medium">{selectedCertificate.type}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Title</Label>
                  <p className="font-medium">{selectedCertificate.title}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Healthcare Provider</Label>
                  <p className="font-medium">{selectedCertificate.providerName}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedCertificate.providerProfessionalTitle}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Case Treated</Label>
                  <p className="font-medium">{selectedCertificate.caseTreated}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Certificate Content</Label>
                  <p className="font-medium whitespace-pre-wrap">{selectedCertificate.content}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-muted-foreground">Issue Date</Label>
                    <p className="font-medium">{formatDate(selectedCertificate.issueDate)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Expiry Date</Label>
                    <p className="font-medium">{formatDate(selectedCertificate.expiryDate)}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <Badge
                    variant={selectedCertificate.status === "ACTIVE" ? "active" : "secondary"}
                    className="mt-1"
                  >
                    {selectedCertificate.status || "ACTIVE"}
                  </Badge>
                </div>

                <div>
                  <Label className="text-muted-foreground">Signature</Label>
                  <p className="font-medium italic">{selectedCertificate.signature}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4 border-t">
                  <div>
                    <Label className="text-muted-foreground">Created</Label>
                    <p>{formatDate(selectedCertificate.createdAt)}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Updated</Label>
                    <p>{formatDate(selectedCertificate.updatedAt)}</p>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>Close</Button>
              <Button onClick={() => handlePrintCertificate(selectedCertificate)} className="gap-2">
                <Printer className="h-4 w-4" />
                Download PDF
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
