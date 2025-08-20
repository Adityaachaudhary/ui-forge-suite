// Core component types and interfaces

export interface InputFieldProps {
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

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  width?: string | number
  render?: (value: any, record: T, index: number) => React.ReactNode
}

export interface DataTableProps<T extends Record<string, any>> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  rowKey?: keyof T | ((record: T) => string | number)
  emptyStateMessage?: string
  className?: string
}

// Common utility types
export type Size = 'sm' | 'md' | 'lg'
export type Variant = 'default' | 'filled' | 'outlined' | 'ghost'
export type Status = 'default' | 'success' | 'warning' | 'error'