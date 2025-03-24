# Next.js Hackathon Boilerplate

A boilerplate for hackathon projects built with Next.js 14 (App Router) and TypeScript. This template includes a set of pre-configured tools and components.

## Core Features

- **Modern Stack**: Built with Next.js 14 (App Router) and TypeScript
- **UI Components**: Integrated with shadcn/ui for beautiful, accessible components
- **State Management**: Redux Toolkit with RTK Query for efficient API handling
- **Styling**: Tailwind CSS with CSS Variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Example Implementation**: Includes a Todo application showcasing the stack

## Tech Stack

### Frontend Framework
- Next.js 14 (App Router)
- React 18
- TypeScript

### UI and Styling
- shadcn/ui (Radix UI + Tailwind)
- Tailwind CSS

### State Management & API
- Redux Toolkit
- RTK Query
- Axios

### Forms and Validation
- React Hook Form
- Zod
- React Hook Form Resolvers

### Developer Experience
- ESLint
- Prettier
- TypeScript
- Simple Import Sort

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/danielavornic/hack-boilerplate
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

├── app/                  # Next.js app directory
│   ├── layouts/         # Layout components
│   ├── todos/          # Example feature (todos)
│   └── ...
├── components/          # Reusable components
│   ├── ui/             # shadcn/ui components
│   └── ...
├── lib/                # Utility functions and configurations
│   ├── store/         # Redux store setup
│   └── ...
└── hooks/             # Custom React hooks

## Features Showcase

### Todo Example
The boilerplate includes a Todo application example demonstrating:
- RTK Query for API handling
- Form handling with React Hook Form and Zod
- UI components from shadcn/ui
- Toast notifications
- Loading states and error handling

### API Integration
- Pre-configured RTK Query setup
- Base query configuration
- Type-safe API calls
- Automatic cache invalidation
