import { AlertCircle, X } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { cn } from '../lib/utils'

type ErrorMessageProps = {
  message: string
  onDismiss?: () => void
  className?: string
}

export const ErrorMessage = ({
  message,
  onDismiss,
  className,
}: ErrorMessageProps) => {
  return (
    <Card className={cn('border-destructive bg-destructive/5', className)}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-destructive font-medium">{message}</p>
          </div>
          {onDismiss && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onDismiss}
              className="h-6 w-6 p-0 hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
