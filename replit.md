# Cryptocurrency Dashboard Application

## Overview

This is a modern cryptocurrency dashboard application built with React and Express. The application provides real-time cryptocurrency tracking, market analytics, and portfolio management features. It uses a clean, modern design with a dark theme and glassmorphism effects.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: Radix UI components with shadcn/ui styling
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Development Storage**: In-memory storage for development

## Key Components

### Frontend Structure
- **Layout System**: Dashboard layout with collapsible sidebar and top navigation
- **Component Library**: Comprehensive UI components from Radix UI
- **Crypto Components**: Specialized components for cryptocurrency data display
- **Theme System**: Dark/light theme toggle with CSS custom properties
- **Responsive Design**: Mobile-first approach with breakpoint-based layouts

### Backend Structure
- **API Layer**: Express.js server with RESTful endpoints
- **Storage Interface**: Abstracted storage interface supporting both memory and database storage
- **Database Schema**: User management with extensible schema structure
- **Development Setup**: Hot reload with Vite integration

### Data Management
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Type-safe database schema with Zod validation
- **Migrations**: Database migration system with drizzle-kit
- **Mock Data**: Simulated cryptocurrency data for development

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **Server Processing**: Express routes handle requests and interact with storage layer
3. **Database Operations**: Drizzle ORM manages database interactions
4. **Response Handling**: Type-safe responses with proper error handling
5. **State Updates**: TanStack Query manages caching and state synchronization

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **UI Library**: Radix UI primitives, Lucide React icons
- **State Management**: TanStack Query for server state
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **Database**: Drizzle ORM, Neon Database serverless driver
- **Validation**: Zod for schema validation
- **Charts**: Recharts for data visualization

### Development Dependencies
- **Build Tools**: Vite, ESBuild for production builds
- **Development**: TypeScript, TSX for development server
- **Replit Integration**: Replit-specific plugins for development environment

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with hot module replacement
- **Database**: Neon Database with connection pooling
- **Environment Variables**: DATABASE_URL for database connection
- **Asset Serving**: Vite handles static assets and client-side routing

### Production Build
- **Client Build**: Vite builds optimized React application
- **Server Build**: ESBuild compiles TypeScript server code
- **Static Assets**: Client build output served by Express
- **Database**: Production PostgreSQL database via Neon

### Architecture Decisions

1. **Monorepo Structure**: Single repository with separate client/server/shared directories
   - **Problem**: Managing related frontend and backend code
   - **Solution**: Organized monorepo with shared types and schemas
   - **Benefits**: Code reuse, type safety, simplified deployment

2. **Drizzle ORM**: Chosen for type-safe database operations
   - **Problem**: Need for type-safe database interactions
   - **Solution**: Drizzle ORM with PostgreSQL
   - **Benefits**: Full TypeScript support, lightweight, good performance

3. **TanStack Query**: Selected for client-side state management
   - **Problem**: Managing server state and caching
   - **Solution**: TanStack Query for data fetching and caching
   - **Benefits**: Automatic caching, background updates, error handling

4. **Shadcn/UI + Radix**: Component library choice
   - **Problem**: Need for accessible, customizable UI components
   - **Solution**: Radix UI primitives with shadcn/ui styling
   - **Benefits**: Accessibility, customization, modern design

5. **Vite**: Build tool selection
   - **Problem**: Fast development and optimized builds
   - **Solution**: Vite for both development and production
   - **Benefits**: Fast HMR, optimized builds, modern tooling