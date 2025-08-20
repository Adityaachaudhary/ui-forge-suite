import React, { useState } from "react"
import { InputField } from "@/components/ui/input-field"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function InputFieldDemo() {
  const [values, setValues] = useState({
    filled: '',
    outlined: '',
    ghost: '',
    password: '',
    clearable: 'Clear me!',
    loading: '',
    error: 'Invalid input',
    success: 'Valid input'
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSimulateLoading = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 2000)
  }

  const updateValue = (key: string, value: string) => {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Input Field Variants</CardTitle>
          <CardDescription>
            Explore different visual styles for input fields
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Filled Input"
              placeholder="Enter text..."
              variant="filled"
              value={values.filled}
              onChange={(e) => updateValue('filled', e.target.value)}
              helperText="This is a filled input variant"
            />
            
            <InputField
              label="Outlined Input"
              placeholder="Enter text..."
              variant="outlined"
              value={values.outlined}
              onChange={(e) => updateValue('outlined', e.target.value)}
              helperText="This is an outlined input variant"
            />
            
            <InputField
              label="Ghost Input"
              placeholder="Enter text..."
              variant="ghost"
              value={values.ghost}
              onChange={(e) => updateValue('ghost', e.target.value)}
              helperText="This is a ghost input variant"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Field Sizes</CardTitle>
          <CardDescription>
            Different sizes to fit various UI contexts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Small Size"
              placeholder="Small input"
              size="sm"
              helperText="Small size input"
            />
            
            <InputField
              label="Medium Size"
              placeholder="Medium input"
              size="md"
              helperText="Medium size input (default)"
            />
            
            <InputField
              label="Large Size"
              placeholder="Large input"
              size="lg"
              helperText="Large size input"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Input Field Features</CardTitle>
          <CardDescription>
            Special features like password toggle, clear button, and loading states
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Password Input"
              type="password"
              placeholder="Enter password"
              value={values.password}
              onChange={(e) => updateValue('password', e.target.value)}
              showPasswordToggle
              helperText="Click the eye icon to toggle visibility"
            />
            
            <InputField
              label="Clearable Input"
              placeholder="Type to see clear button"
              value={values.clearable}
              onChange={(e) => updateValue('clearable', e.target.value)}
              clearable
              onClear={() => updateValue('clearable', '')}
              helperText="X button appears when there's content"
            />
            
            <div className="space-y-3">
              <InputField
                label="Loading State"
                placeholder="Loading..."
                value={values.loading}
                onChange={(e) => updateValue('loading', e.target.value)}
                loading={isLoading}
                helperText="Input is disabled during loading"
              />
              <Button onClick={handleSimulateLoading} disabled={isLoading} size="sm">
                {isLoading ? 'Loading...' : 'Simulate Loading'}
              </Button>
            </div>
            
            <InputField
              label="Disabled Input"
              placeholder="This is disabled"
              disabled
              helperText="This input is disabled"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation States</CardTitle>
          <CardDescription>
            Error and success states with appropriate messaging
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Error State"
              placeholder="This has an error"
              value={values.error}
              onChange={(e) => updateValue('error', e.target.value)}
              invalid
              errorMessage="This field contains an error"
            />
            
            <InputField
              label="Success State"
              placeholder="This is valid"
              value={values.success}
              onChange={(e) => updateValue('success', e.target.value)}
              helperText="This field is valid"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}