import React from "react"
import { AlertCircle } from "lucide-react"

import { Alert,  AlertTitle } from "@/components/ui/alert"

export function AlertNotImplemented() {
  return (
    <Alert className="mb-2 max-w-xl flex items-center" variant="warning">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle className="mt-0.5">This page is for demonstration purposes only.</AlertTitle>
    </Alert>
  )
}
