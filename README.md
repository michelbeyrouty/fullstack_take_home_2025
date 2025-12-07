# Take-Home Project 🛠️

_"Wubba lubba dub dub!"_ - Just like Rick needs Morty to keep his chaotic inventions running smoothly, work orders need proper management to keep operations humming. This full-stack TypeScript application helps manage work orders and track team productivity across multiple dimensions of efficiency.

## 👁️‍🗨️ Original Instruction

For complete project requirements and specifications, see [ORIGINAL_INSTRUCTIONS.md](doc/ORIGINAL_INSTRUCTIONS.md).

## 💬 A Note to the reader

Thank you for checking this project! I'm genuinely excited about the opportunity to bring this same attention to detail and passion for any project I work on. Building solutions that make a real difference - let's build something amazing together! 🚀

## 🚀 Project Overview

A simple work order management system featuring status updates, simple search and productivity analytics. Clean architecture, testing and thoughtful UX design.

### ✨ Key Features

- **📋 Work Order Management**: Create, view, update, and delete with real-time status toggling
- **🔍 Real-time Search**: Simple instant filtering of work orders by name
- **📊 Productivity**: Track users not assigned to active work orders
- **🎯 Sorting**: OPEN work orders automatically listed first
- **🎯 Intuitive Navigation**: Clean interface with visual feedback
- **⚡ Performance**: Efficient loading with proper states
- **📱 Mobile Aware**: Desktop-optimized with mobile warning
- **🔔 Error Handling**: Graceful error states and messaging
- **🧪 Tests**: Unit tests for controllers, services, and middleware

## 🏗️ Tech Stack

**Frontend**: React 19 + TypeScript, React Router, Custom Hooks, Responsive CSS
**Backend**: Express.js + TypeScript, SQLite, Layered Architecture
**Tools**: Vitest, Yarn Workspaces, Vite, Prettier

## 🧪 Testing & Quality

- Controller, middleware, and service layer tests
- Input validation and error handling

```bash
yarn test      # Run all tests
```

## 🚀 Getting Started

**Prerequisites**: Node.js 20+, Yarn

```bash
yarn install          # Install dependencies
yarn start            # Start both frontend + backend
yarn build            # Build for production
yarn test             # Run tests
yarn prettier-write   # Format code
```

**API Endpoints**:

```
GET/POST   /api/workorders        # List/create work orders
GET/PUT    /api/workorders/:id    # Get/update work order
DELETE     /api/workorders/:id    # Delete work order
GET        /api/users             # List users
GET        /api/users/inactive    # List unassigned users
```

## 📁 Project Structure

```
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── containers/      # Page-level components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # API service layer
│   │   └── utils/          # Helper functions
├── backend/                 # Express API server
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic layer
│   │   ├── middlewares/    # Express middleware
│   │   ├── errors/         # Custom error classes
│   │   └── tests/          # Unit tests
└── docs/                   # Documentation
```

## 🔧 Key Decisions

- **Architecture**: Clean separation between presentation, business logic, and data
- **Type Safety**: Full TypeScript for reduced runtime errors
- **Testing**: Focus on business logic and edge cases
- **Performance**: Optimized queries and efficient state management

---

_Built with ⚡ and a healthy dose of interdimensional engineering principles._
