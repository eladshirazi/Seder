import { InputHTMLAttributes, forwardRef } from 'react'
import { Input } from './input'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, required = false, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        label={required ? `${label} *` : label}
        error={error}
        required={required}
        {...props}
      />
    )
  }
)

FormField.displayName = 'FormField'

export { FormField } 