# UI Forge Suite - Component Documentation

## Overview

UI Forge Suite is a professional React component library built with TypeScript, Tailwind CSS, and modern design patterns. It provides a comprehensive set of accessible, customizable, and production-ready components.

## Design System

Our design system is built on semantic color tokens, consistent spacing, and thoughtful typography. All components use the centralized design system defined in `src/index.css` and `tailwind.config.ts`.

### Key Features
- **TypeScript First**: Full type safety and excellent developer experience
- **Accessibility**: ARIA compliant with keyboard navigation and screen reader support
- **Design System**: Consistent tokens, semantic colors, and responsive layouts
- **Modern Patterns**: Built with latest React patterns and best practices

## Components

### InputField

A flexible input component with comprehensive validation states and features.

#### Features
- Multiple variants: `filled`, `outlined`, `ghost`
- Three sizes: `sm`, `md`, `lg`
- Validation states with error/success messaging
- Password toggle functionality
- Clear button support
- Loading states
- Disabled states
- Helper text support

#### Usage

```tsx
import { InputField } from '@/components/ui/input-field'

// Basic usage
<InputField
  label="Email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>

// With validation
<InputField
  label="Password"
  type="password"
  invalid={hasError}
  errorMessage="Password must be at least 8 characters"
  showPasswordToggle
/>

// With clear functionality
<InputField
  label="Search"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  clearable
  onClear={() => setSearchTerm('')}
/>
```

#### Props

```typescript
interface InputFieldProps {
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  label?: string
  placeholder?: string
  helperText?: string
  errorMessage?: string
  disabled?: boolean
  invalid?: boolean
  variant?: 'filled' | 'outlined' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  clearable?: boolean
  showPasswordToggle?: boolean
  onClear?: () => void
}
```

### DataTable

A powerful data table component with sorting, selection, and customizable rendering.

#### Features
- Column sorting (ascending/descending/none)
- Row selection (single/multiple)
- Loading states with spinner
- Empty state with custom messaging
- Custom cell rendering
- Responsive design with horizontal scroll
- Accessible with proper ARIA labels
- Flexible row key configuration

#### Usage

```tsx
import { DataTable, Column } from '@/components/ui/data-table'

// Define your data type
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
}

// Define columns
const columns: Column<User>[] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sortable: true
  },
  {
    key: 'email',
    title: 'Email',
    dataIndex: 'email',
    sortable: true
  },
  {
    key: 'status',
    title: 'Status',
    dataIndex: 'status',
    render: (status) => (
      <Badge variant={status === 'active' ? 'default' : 'secondary'}>
        {status}
      </Badge>
    )
  }
]

// Use the table
<DataTable
  data={users}
  columns={columns}
  loading={isLoading}
  selectable
  onRowSelect={(selectedRows) => console.log(selectedRows)}
/>
```

#### Props

```typescript
interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  rowKey?: keyof T | ((record: T) => string | number)
  emptyStateMessage?: string
  className?: string
}

interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  width?: string | number
  render?: (value: any, record: T, index: number) => React.ReactNode
}
```

## Styling and Customization

### Design Tokens

All components use semantic design tokens defined in our CSS custom properties:

```css
/* Primary colors */
--primary: 217 91% 60%
--primary-foreground: 0 0% 100%

/* Status colors */
--success: 142 71% 45%
--warning: 45 93% 58%
--destructive: 0 84% 60%

/* UI elements */
--border: 215 15% 90%
--input: 215 15% 98%
--muted: 215 15% 96%
```

### Component Variants

Components support multiple variants through the class-variance-authority pattern:

```tsx
// InputField variants
<InputField variant="filled" />    // Filled background
<InputField variant="outlined" />  // Outlined border
<InputField variant="ghost" />     // Minimal styling

// Sizes
<InputField size="sm" />  // Small: 32px height
<InputField size="md" />  // Medium: 40px height  
<InputField size="lg" />  // Large: 48px height
```

## Accessibility

All components follow WAI-ARIA guidelines:

- **Keyboard Navigation**: Full keyboard support with logical tab order
- **Screen Readers**: Proper ARIA labels, descriptions, and live regions
- **Focus Management**: Visible focus indicators and logical focus flow
- **Semantic HTML**: Proper HTML structure and landmarks

### Example Accessibility Features

```tsx
// InputField accessibility
<InputField
  label="Email"
  aria-describedby="email-helper"
  helperText="Enter your work email address"
  invalid={hasError}
  aria-invalid={hasError}
  errorMessage="Please enter a valid email"
/>

// DataTable accessibility
<DataTable
  data={users}
  columns={columns}
  selectable
  // Automatically includes:
  // - aria-label on checkboxes
  // - role="table" structure
  // - proper column headers
/>
```

## Testing

Components are designed to be easily testable:

```tsx
// Example test patterns
import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '@/components/ui/input-field'

test('shows error message when invalid', () => {
  render(
    <InputField
      label="Email"
      invalid
      errorMessage="Invalid email"
    />
  )
  
  expect(screen.getByText('Invalid email')).toBeInTheDocument()
})
```

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Contributing

1. All colors must be defined in HSL format in the design system
2. Use semantic tokens instead of hardcoded colors
3. Ensure components are accessible (test with screen readers)
4. Include TypeScript interfaces for all props
5. Follow the established component patterns

## Performance

Components are optimized for performance:
- Tree-shakable imports
- Minimal bundle size impact
- Efficient re-rendering with React.memo where appropriate
- CSS-in-JS avoided in favor of Tailwind classes