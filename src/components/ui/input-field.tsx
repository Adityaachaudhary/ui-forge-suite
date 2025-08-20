import * as React from "react"
import { Eye, EyeOff, X, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const inputVariants = cva(
  "flex w-full rounded-md border font-normal transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        filled: "bg-input border-input-border hover:border-border focus:border-input-focus focus:bg-background",
        outlined: "bg-background border-border hover:border-border-strong focus:border-input-focus",
        ghost: "border-transparent bg-transparent hover:bg-muted focus:bg-input focus:border-input-border"
      },
      size: {
        sm: "h-8 px-3 py-1 text-sm",
        md: "h-10 px-3 py-2",
        lg: "h-12 px-4 py-3 text-lg"
      },
      state: {
        default: "",
        invalid: "border-destructive focus:border-destructive focus:ring-destructive",
        valid: "border-success focus:border-success focus:ring-success"
      }
    },
    defaultVariants: {
      variant: "outlined",
      size: "md",
      state: "default"
    }
  }
)

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors",
  {
    variants: {
      state: {
        default: "text-foreground",
        invalid: "text-destructive",
        valid: "text-success"
      }
    },
    defaultVariants: {
      state: "default"
    }
  }
)

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  label?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  loading?: boolean
  clearable?: boolean
  showPasswordToggle?: boolean
  onClear?: () => void
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({
    className,
    variant,
    size,
    label,
    helperText,
    errorMessage,
    disabled,
    invalid,
    loading,
    clearable,
    showPasswordToggle,
    onClear,
    type = "text",
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [inputType, setInputType] = React.useState(type)

    React.useEffect(() => {
      if (type === "password") {
        setInputType(showPassword ? "text" : "password")
      } else {
        setInputType(type)
      }
    }, [type, showPassword])

    const state = invalid ? "invalid" : "default"
    const hasValue = props.value !== undefined && props.value !== ""
    const showClearButton = clearable && hasValue && !disabled && !loading
    const showPasswordButton = showPasswordToggle && type === "password" && !disabled
    const hasRightIcon = showClearButton || showPasswordButton || loading

    const handleClear = () => {
      if (onClear) {
        onClear()
      }
    }

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <div className="space-y-2">
        {label && (
          <label
            className={cn(labelVariants({ state }))}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              inputVariants({ variant, size, state }),
              hasRightIcon && "pr-10",
              className
            )}
            ref={ref}
            disabled={disabled || loading}
            aria-invalid={invalid}
            aria-describedby={
              errorMessage ? `${props.id}-error` : 
              helperText ? `${props.id}-helper` : undefined
            }
            {...props}
          />
          
          {/* Right side icons */}
          {hasRightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              )}
              
              {showClearButton && !loading && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label="Clear input"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
              
              {showPasswordButton && !loading && !showClearButton && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Helper text or error message */}
        {(helperText || errorMessage) && (
          <p
            id={errorMessage ? `${props.id}-error` : `${props.id}-helper`}
            className={cn(
              "text-xs",
              errorMessage ? "text-destructive" : "text-muted-foreground"
            )}
          >
            {errorMessage || helperText}
          </p>
        )}
      </div>
    )
  }
)

InputField.displayName = "InputField"

export { InputField, inputVariants }