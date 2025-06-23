# Modern Todo Application

A feature-rich task management application built with React, TypeScript, and modern web technologies. This application demonstrates advanced React patterns, state management, and provides a comprehensive todo management experience.

This project is part of the **React Programming Basics (4IT427)** course at the University of Economics in Prague.

## 🚀 Features

### Core Todo Management

- **Create Todos**: Add new tasks with title, description, and priority levels (Low, Medium, High)
- **Edit Todos**: Update existing tasks with full CRUD operations
- **Delete Todos**: Remove individual tasks or multiple tasks at once
- **Toggle Completion**: Mark tasks as completed or pending
- **Priority System**: Organize tasks by priority levels (1=Low, 2=Medium, 3=High)

### Advanced Functionality

- **Search & Filter**: Real-time search through todos and filter by status (All, Completed, Pending)
- **Bulk Operations**: Select multiple todos and perform batch actions:
  - Bulk delete selected todos
  - Bulk mark as completed/incomplete
  - Select all/deselect all functionality
- **Statistics Dashboard**: View real-time statistics including total, completed, and pending todos
- **Detailed View**: Individual todo detail pages with complete information

### User Experience

- **Responsive Design**: Fully responsive layout that works on all device sizes
- **Dark/Light Mode**: Complete theme switching with system preference detection
- **Modern UI**: Clean, accessible interface built with Radix UI components
- **Loading States**: Proper loading indicators and error handling
- **Optimistic Updates**: Instant UI feedback with server synchronization

### Technical Features

- **TypeScript**: Full type safety throughout the application
- **React Router**: Client-side routing with lazy loading
- **React Query**: Efficient server state management with caching
- **Form Validation**: Robust form handling with Zod validation
- **RESTful API**: Complete CRUD operations with external API integration
- **Custom Hooks**: Reusable business logic abstraction
- **Error Boundaries**: Graceful error handling and recovery

## 🛠️ Technology Stack

### Frontend

- **React 19** - Latest React with modern features
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router 7** - Client-side routing
- **React Hook Form** - Form state management
- **Zod** - Schema validation

### State Management & API

- **TanStack React Query** - Server state management
- **Custom Hooks** - Business logic abstraction
- **RESTful API** - External API integration

### UI Components

- **Radix UI** - Accessible component primitives
- **Lucide React** - Modern icon library
- **next-themes** - Theme switching functionality
- **Class Variance Authority** - Component styling variants

## 📁 Project Structure

```
src/
├── api/              # API layer and external service integration
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components (buttons, inputs, etc.)
│   └── todos/       # Todo-specific components
├── hooks/           # Custom React hooks for business logic
├── pages/           # Route components
├── types.ts         # TypeScript type definitions
└── lib/             # Utility functions
```

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (16.0 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/react-dev-intro.git
   cd react-dev-intro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 User Interface

The application features a modern, clean interface with:

- **Dashboard**: Overview with statistics cards showing total, completed, and pending todos
- **Search Bar**: Real-time search functionality with instant filtering
- **Filter Dropdown**: Quick filtering by completion status
- **Bulk Actions**: Multi-select interface for batch operations
- **Priority Indicators**: Visual priority levels with color coding
- **Theme Toggle**: Switch between light, dark, and system themes
- **Responsive Layout**: Adapts to different screen sizes

## 🔌 API Integration

The application integrates with a RESTful API providing:

- **GET /api/todos** - Fetch all todos
- **POST /api/todos** - Create new todo
- **PATCH /api/todos/:id** - Update existing todo
- **DELETE /api/todos/:id** - Delete todo
- **Bulk Operations** - Multiple todo operations

API Documentation: [https://eli-workshop.vercel.app/api-docs](https://eli-workshop.vercel.app/api-docs)

## 🧪 Key React Concepts Demonstrated

- **Functional Components** with hooks
- **Custom Hooks** for business logic
- **Context API** for theme management
- **React Query** for server state
- **React Router** for navigation
- **Lazy Loading** for performance
- **Error Boundaries** for error handling
- **TypeScript Integration** for type safety

## 📚 Learning Resources

For detailed information about React concepts used in this project:

- [React Basics](react-basics.md) - Core React concepts
- [JavaScript Basics](javascript-basics.md) - JavaScript fundamentals
- [TypeScript Basics](typescript-basics.md) - TypeScript essentials
- [TypeScript in React](typescript-react.md) - TypeScript with React

## 🤝 Contributing

### For Students

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b your-insis-id
   ```
3. **Make your changes**
4. **Commit your changes**
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push to your branch**
   ```bash
   git push origin your-insis-id
   ```
6. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use existing UI components from the `ui` folder
- Implement proper error handling
- Add loading states for async operations
- Maintain responsive design patterns
- Write meaningful commit messages

## 🔧 Architecture Highlights

### Custom Hooks Pattern

- `useTodosQuery` - Fetch todos with caching
- `useTodoCreate` - Create new todos
- `useTodoUpdate` - Update existing todos
- `useTodoDelete` - Delete todos
- `useBulkTodos` - Bulk operations
- `useTodoToggle` - Toggle completion status

### Component Architecture

- Atomic design principles
- Separation of concerns
- Reusable UI components
- Business logic in custom hooks
- TypeScript for type safety

### State Management

- Server state with React Query
- Local state with React hooks
- Theme state with Context API
- Form state with React Hook Form

## 📄 License

This project is part of an educational course and is intended for learning purposes.

---

Built with ❤️ for React Programming Basics course at University of Economics in Prague
