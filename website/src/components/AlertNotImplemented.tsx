import React from 'react'

import {
  AlertCircle,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function AlertNotImplemented() {
    return (
        <Alert className='mb-2 max-w-xl' variant="warning">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>This page is not implemented</AlertTitle>
            <AlertDescription>
                But it does work when utilizing the generated code.
            </AlertDescription>
        </Alert>
    )
}
