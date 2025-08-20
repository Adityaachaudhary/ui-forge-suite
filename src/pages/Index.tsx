import React from "react"
import { InputFieldDemo } from "@/components/demo/input-field-demo"
import { DataTableDemo } from "@/components/demo/data-table-demo"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Github, Zap, Code, Palette } from "lucide-react"

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] [mask-image:radial-gradient(white,transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Zap className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm font-medium text-primary-foreground">
                UI Forge Suite
              </span>
              <Badge variant="secondary" className="ml-2">
                v1.0
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-bold text-primary-foreground mb-6">
              Modern React Components
            </h1>
            
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
              Professional, accessible, and beautifully designed components built with TypeScript, 
              Tailwind CSS, and modern React patterns. Perfect for scalable applications.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Code className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Palette className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">Design System</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                <Github className="h-4 w-4 text-primary-foreground" />
                <span className="text-sm text-primary-foreground">Open Source</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Production-Ready Components
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each component is crafted with attention to detail, accessibility, and developer experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-elevated hover:shadow-floating transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3">
                  <Code className="h-5 w-5 text-primary" />
                </div>
                TypeScript First
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Built with TypeScript for excellent developer experience with full type safety and IntelliSense support.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-floating transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                  <Palette className="h-5 w-5 text-accent" />
                </div>
                Design System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Consistent design tokens, semantic colors, and responsive layouts that work beautifully across devices.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-elevated hover:shadow-floating transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center mr-3">
                  <Zap className="h-5 w-5 text-success" />
                </div>
                Accessible
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                ARIA compliant components with keyboard navigation, screen reader support, and semantic HTML structure.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Component Demos */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle>Component Showcase</CardTitle>
            <CardDescription>
              Explore our component library with interactive examples and customization options.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="input-field" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="input-field">Input Field</TabsTrigger>
                <TabsTrigger value="data-table">Data Table</TabsTrigger>
              </TabsList>
              
              <TabsContent value="input-field" className="mt-6">
                <InputFieldDemo />
              </TabsContent>
              
              <TabsContent value="data-table" className="mt-6">
                <DataTableDemo />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Index