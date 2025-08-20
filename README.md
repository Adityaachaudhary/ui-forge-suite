# UI Component Library

A modern, accessible, and customizable React component library built with TypeScript, Tailwind CSS, and shadcn/ui principles.

## 🚀 Features

- **Modern React Components**: Built with React 18, TypeScript, and modern patterns
- **Design System**: Consistent styling with semantic color tokens and theme support
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Dark/Light Theme**: Built-in theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Type Safety**: Full TypeScript support with proper type definitions

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Core UI components
│   │   ├── input-field.tsx    # Flexible input with validation states
│   │   ├── data-table.tsx     # Feature-rich data table
│   │   ├── theme-toggle.tsx   # Theme switching component
│   │   ├── button.tsx         # Button component with variants
│   │   ├── card.tsx           # Card container component
│   │   └── ...                # Other shadcn/ui components
│   └── demo/                  # Component demonstration pages
│       ├── input-field-demo.tsx
│       └── data-table-demo.tsx
├── lib/
│   ├── types.ts              # TypeScript type definitions
│   └── utils.ts              # Utility functions
├── pages/
│   ├── Index.tsx             # Main demo page
│   └── NotFound.tsx          # 404 error page
├── hooks/                    # Custom React hooks
├── index.css                 # Global styles and design tokens
└── main.tsx                  # Application entry point
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ui-component-library
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see the component library in action.

### Build for Production

```bash
npm run build
```

## 🎨 Design Approach

### Design System Philosophy

Our component library follows a **semantic token-based design system** that prioritizes:

1. **Consistency**: All components use the same design tokens defined in `index.css`
2. **Theming**: Automatic dark/light mode support through CSS custom properties
3. **Scalability**: Easy to extend and customize without breaking existing components
4. **Accessibility**: Built-in focus states, proper contrast ratios, and ARIA support

### Component Architecture

#### InputField Component
- **Flexible Design**: Supports multiple variants (filled, outlined, ghost) and sizes
- **State Management**: Handles disabled, invalid, and loading states
- **Enhanced UX**: Includes clear button, password toggle, and helper text
- **Validation Ready**: Built-in error state handling for form validation

#### DataTable Component
- **Generic Implementation**: Uses TypeScript generics for type-safe data handling
- **Interactive Features**: Column sorting, row selection, and loading states
- **Performance Focused**: Efficient rendering with proper React patterns
- **Customizable**: Flexible column configuration with custom render support

### Styling Strategy

- **CSS Custom Properties**: All colors defined as HSL values in CSS variables
- **Tailwind Integration**: Semantic tokens mapped to Tailwind utility classes
- **Component Variants**: Uses `class-variance-authority` for consistent variant patterns
- **Responsive Design**: Mobile-first approach with consistent breakpoints

### TypeScript Implementation

- **Strict Typing**: All components fully typed with proper interfaces
- **Generic Support**: DataTable uses generics for type-safe data operations
- **Prop Validation**: Comprehensive prop types with optional/required distinctions
- **Developer Experience**: IntelliSense support and compile-time error checking

## 🧩 Available Components

### InputField
Flexible input component with validation states, multiple variants, and enhanced UX features.

### DataTable
Feature-rich table component with sorting, selection, and loading states for displaying tabular data.

### Theme Toggle
Seamless dark/light mode switching with system preference detection.

## 🤝 Contributing

1. Follow the existing code style and patterns
2. Ensure TypeScript types are properly defined
3. Add components to the demo pages for testing
4. Update documentation for new features

## 📄 License

This project is open source and available under the MIT License.