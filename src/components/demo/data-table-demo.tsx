import React, { useState } from "react"
import { DataTable, Column } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  joinDate: string
  department: string
}

const sampleData: User[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    role: "Senior Developer",
    status: "active",
    joinDate: "2023-01-15",
    department: "Engineering"
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    role: "Product Manager",
    status: "active",
    joinDate: "2023-02-20",
    department: "Product"
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol@example.com",
    role: "UX Designer",
    status: "inactive",
    joinDate: "2023-03-10",
    department: "Design"
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@example.com",
    role: "Marketing Specialist",
    status: "pending",
    joinDate: "2023-04-05",
    department: "Marketing"
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva@example.com",
    role: "DevOps Engineer",
    status: "active",
    joinDate: "2023-05-12",
    department: "Engineering"
  }
]

export function DataTableDemo() {
  const [data, setData] = useState<User[]>(sampleData)
  const [loading, setLoading] = useState(false)
  const [selectedRows, setSelectedRows] = useState<User[]>([])

  const handleSimulateLoading = () => {
    setLoading(true)
    setData([])
    setTimeout(() => {
      setData(sampleData)
      setLoading(false)
    }, 2000)
  }

  const handleClearData = () => {
    setData([])
  }

  const handleRestoreData = () => {
    setData(sampleData)
  }

  const getStatusBadgeVariant = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'default'
      case 'inactive':
        return 'secondary'
      case 'pending':
        return 'outline'
      default:
        return 'secondary'
    }
  }

  const columns: Column<User>[] = [
    {
      key: 'user',
      title: 'User',
      dataIndex: 'name',
      sortable: true,
      render: (_, record) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {record.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{record.name}</div>
            <div className="text-sm text-muted-foreground">{record.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      title: 'Role',
      dataIndex: 'role',
      sortable: true
    },
    {
      key: 'department',
      title: 'Department',
      dataIndex: 'department',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      dataIndex: 'status',
      sortable: true,
      render: (status: User['status']) => (
        <Badge variant={getStatusBadgeVariant(status)}>
          {status}
        </Badge>
      )
    },
    {
      key: 'joinDate',
      title: 'Join Date',
      dataIndex: 'joinDate',
      sortable: true,
      render: (date: string) => (
        <span className="text-sm">
          {new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        </span>
      )
    }
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Basic Data Table</CardTitle>
          <CardDescription>
            A simple data table with sortable columns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Table with Selection</CardTitle>
          <CardDescription>
            Enable row selection to interact with data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedRows.length > 0 && (
                <span>{selectedRows.length} row(s) selected</span>
              )}
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleSimulateLoading}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? 'Loading...' : 'Simulate Loading'}
              </Button>
              <Button
                onClick={handleClearData}
                variant="outline"
                size="sm"
              >
                Clear Data
              </Button>
              <Button
                onClick={handleRestoreData}
                variant="outline"
                size="sm"
              >
                Restore Data
              </Button>
            </div>
          </div>
          
          <DataTable
            data={data}
            columns={columns}
            loading={loading}
            selectable
            onRowSelect={setSelectedRows}
            emptyStateMessage="No users found. Try restoring the data."
          />
          
          {selectedRows.length > 0 && (
            <div className="mt-4 p-4 bg-primary-muted rounded-lg">
              <h4 className="font-medium mb-2">Selected Users:</h4>
              <div className="space-y-1">
                {selectedRows.map((user) => (
                  <div key={user.id} className="text-sm">
                    {user.name} ({user.email})
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}