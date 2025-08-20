import * as React from "react"
import { ChevronUp, ChevronDown, Loader2, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { Checkbox } from "@/components/ui/checkbox"

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

type SortDirection = 'asc' | 'desc' | null

interface SortState {
  column: string | null
  direction: SortDirection
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  rowKey = 'id',
  emptyStateMessage = "No data available",
  className
}: DataTableProps<T>) {
  const [sortState, setSortState] = React.useState<SortState>({
    column: null,
    direction: null
  })
  const [selectedRows, setSelectedRows] = React.useState<Set<string | number>>(new Set())

  // Get row key for a record
  const getRowKey = React.useCallback((record: T, index: number): string | number => {
    if (typeof rowKey === 'function') {
      return rowKey(record)
    }
    return record[rowKey] ?? index
  }, [rowKey])

  // Sort data based on current sort state
  const sortedData = React.useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return data
    }

    const column = columns.find(col => col.key === sortState.column)
    if (!column) return data

    return [...data].sort((a, b) => {
      const aValue = a[column.dataIndex]
      const bValue = b[column.dataIndex]

      if (aValue === bValue) return 0

      let comparison = 0
      if (aValue == null) comparison = -1
      else if (bValue == null) comparison = 1
      else if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.localeCompare(bValue)
      } else {
        comparison = aValue < bValue ? -1 : 1
      }

      return sortState.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortState, columns])

  // Handle column sort
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return

    setSortState(prevState => {
      if (prevState.column !== column.key) {
        return { column: column.key, direction: 'asc' }
      }
      
      if (prevState.direction === 'asc') {
        return { column: column.key, direction: 'desc' }
      }
      
      return { column: null, direction: null }
    })
  }

  // Handle row selection
  const handleRowSelect = (rowKey: string | number, selected: boolean) => {
    const newSelectedRows = new Set(selectedRows)
    
    if (selected) {
      newSelectedRows.add(rowKey)
    } else {
      newSelectedRows.delete(rowKey)
    }
    
    setSelectedRows(newSelectedRows)
    
    if (onRowSelect) {
      const selectedData = data.filter((record, index) => 
        newSelectedRows.has(getRowKey(record, index))
      )
      onRowSelect(selectedData)
    }
  }

  // Handle select all
  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allKeys = new Set(data.map((record, index) => getRowKey(record, index)))
      setSelectedRows(allKeys)
      onRowSelect?.(data)
    } else {
      setSelectedRows(new Set())
      onRowSelect?.([])
    }
  }

  const isAllSelected = data.length > 0 && selectedRows.size === data.length
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < data.length

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null

    const isActive = sortState.column === column.key
    
    return (
      <span className="ml-2 inline-flex flex-col">
        <ChevronUp 
          className={cn(
            "h-3 w-3 transition-colors",
            isActive && sortState.direction === 'asc' 
              ? "text-primary" 
              : "text-muted-foreground"
          )} 
        />
        <ChevronDown 
          className={cn(
            "h-3 w-3 -mt-1 transition-colors",
            isActive && sortState.direction === 'desc' 
              ? "text-primary" 
              : "text-muted-foreground"
          )} 
        />
      </span>
    )
  }

  // Empty state
  const renderEmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Database className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium text-foreground mb-2">No Data</h3>
      <p className="text-muted-foreground">{emptyStateMessage}</p>
    </div>
  )

  // Loading state
  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mr-3" />
      <span className="text-muted-foreground">Loading...</span>
    </div>
  )

  return (
    <div className={cn("border rounded-lg bg-card shadow-surface", className)}>
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {selectable && (
                <th className="w-12 px-4 py-3 text-left">
                  <Checkbox
                    checked={isIndeterminate ? "indeterminate" : isAllSelected}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-medium text-muted-foreground",
                    column.sortable && "cursor-pointer hover:text-foreground transition-colors",
                    column.width && `w-[${column.width}]`
                  )}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center">
                    {column.title}
                    {renderSortIcon(column)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  {renderLoadingState()}
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)}>
                  {renderEmptyState()}
                </td>
              </tr>
            ) : (
              sortedData.map((record, index) => {
                const key = getRowKey(record, index)
                const isSelected = selectedRows.has(key)
                
                return (
                  <tr
                    key={key}
                    className={cn(
                      "border-b transition-colors hover:bg-muted/50",
                      isSelected && "bg-primary-muted"
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) => handleRowSelect(key, checked as boolean)}
                          aria-label={`Select row ${index + 1}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = record[column.dataIndex]
                      const cellContent = column.render 
                        ? column.render(value, record, index)
                        : value?.toString() || ''
                      
                      return (
                        <td
                          key={column.key}
                          className="px-4 py-3 text-sm"
                        >
                          {cellContent}
                        </td>
                      )
                    })}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}