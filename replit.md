# Child Growth Tracker - Comprehensive Pediatric Growth Assessment Tool

## Overview

A comprehensive, kid-friendly web application designed for parents to track their child's complete growth profile using authentic WHO growth standards. The tool has evolved from a simple weight checker into a full pediatric growth assessment system that tracks weight, height, head circumference, and BMI for children aged 0-60 months (birth to 5 years). Features a colorful, doodle-filled interface with emojis and animations, making medical assessment approachable and non-intimidating for families. Built with React and Express.js, the app provides professional-grade growth analysis with visual percentile indicators and personalized recommendations.

## Recent Changes (Latest Update - January 2025)

### Major Platform Enhancements
- **Multi-Feature Platform Transformation**: Evolved from single-page growth tracker to comprehensive child health platform with dashboard-based navigation
- **Height Predictor Major Update**: Removed child height requirement, added feet/inches input options for parents, implemented animated visual family height comparison, removed 4-year age minimum (now 6 months+)
- **Travel Medicine Guide**: Added comprehensive travel medicine guide with age-specific dosages for essential over-the-counter medications for children
- **Indian Documents Guide**: Created complete checklist of required documents for children in India with application processes and booking information
- **Dashboard-Based Architecture**: Created feature card dashboard with Growth Tracker as primary highlight and Height Predictor as co-equal tool
- **Information Hierarchy Restructure**: Moved vaccination schedule to secondary information section, emphasizing interactive tools over static content

### Technical Improvements
- **Enhanced Height Predictor**: Uses mid-parental height method suitable for young children, displays results in both cm and feet/inches, animated visual comparison
- **SEO Expansion**: Updated sitemap to include all new pages (travel-medicine, indian-documents) with proper priority structure
- **Google Analytics Integration**: Complete event tracking across all features with measurement ID G-79C3SK7LZP
- **Authentic WHO Data Integration**: Complete WHO growth charts for height, head circumference, and BMI (boys and girls)
- **Multi-Measurement Support**: Users can track any combination of weight, height, head circumference with automatic BMI calculation
- **Advanced Growth Analytics**: Comprehensive percentile calculations with concern level assessment (none/mild/moderate/high)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing with dashboard-based multi-feature navigation
- **Navigation Structure**: Primary features (Dashboard, Growth Tracker, Height Predictor) and secondary resources (Vaccination, Guide, WHO Data)
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Dashboard Design**: Feature card layout with Growth Tracker prominence and Height Predictor as co-equal tool
- **Styling**: Kid-friendly design with bright colors, gradients, and custom SVG doodles maintained across all features
- **Animations**: Custom CSS animations (bounce-gentle, wiggle) for playful interactions
- **Form Handling**: React Hook Form with Zod validation for multi-measurement forms and height prediction calculator
- **Growth Visualization**: Interactive percentile bars with color-coded categories and real-time position indicators
- **Height Prediction**: Khamis-Roche method implementation with confidence intervals and parent height analysis
- **Measurement Selector**: Tabbed interface supporting comprehensive, weight-only, height-only, and head circumference modes
- **Design System**: Pastel color palette with purple, blue, pink, green, orange, and yellow themes

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with POST `/api/calculate-weight` (legacy) and POST `/api/calculate-growth` (comprehensive)
- **Age Range**: Supports 0-60 months (birth to 5 years) with authentic WHO data
- **Growth Calculations**: Complete WHO growth standards for weight, height, head circumference, and BMI
- **Data Sources**: Extracted from authentic WHO percentile charts (6 PDF files provided by user)
- **Percentile Engine**: Advanced interpolation algorithms for accurate percentile calculations across all growth metrics
- **Assessment Logic**: Multi-factor concern level analysis with professional recommendations
- **Validation**: Zod schemas for request/response validation with optional measurement fields
- **Build System**: Vite for frontend bundling, esbuild for backend compilation

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM
- **Connection**: Neon Database serverless PostgreSQL
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current State**: Application uses in-memory calculations without persistent storage

### Authentication and Authorization
- **Current Implementation**: No authentication system implemented
- **Session Management**: Basic session infrastructure present via connect-pg-simple
- **Security**: CORS and standard Express security middleware

### Development Workflow
- **Hot Reload**: Vite HMR for frontend development
- **Type Checking**: Shared TypeScript types between frontend and backend
- **Validation**: Unified Zod schemas in shared directory
- **Build Process**: Separate build commands for client and server
- **Development Server**: tsx for TypeScript execution in development

### Design Patterns
- **Monorepo Structure**: Client, server, and shared code in single repository
- **Shared Types**: Common schemas and types in `/shared` directory
- **Component Composition**: Radix UI primitives with kid-friendly custom styling
- **Error Handling**: Centralized error handling with friendly toast notifications
- **Responsive Design**: Mobile-first approach optimized for parent usage
- **Multi-Section Navigation**: Tabbed interface with comprehensive growth tracker as main interface
- **SEO Content Structure**: Dedicated theory guide, WHO data reference, and vaccination schedule pages for educational content and search optimization
- **Subtle Footer Navigation**: Unobtrusive links to additional content pages for discoverability
- **Custom SVG Doodles**: Hand-crafted cloud, star, and heart decorations throughout the interface

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **express**: Node.js web framework
- **drizzle-orm**: TypeScript ORM for PostgreSQL

### UI and Styling
- **@radix-ui/***: Headless UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Icon library

### Form and Validation
- **react-hook-form**: Form state management
- **@hookform/resolvers**: Form validation resolvers
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle and Zod

### Database and Infrastructure
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **connect-pg-simple**: PostgreSQL session store
- **drizzle-kit**: Database schema management

### Development Tools
- **vite**: Frontend build tool and dev server
- **typescript**: Static type checking
- **esbuild**: Fast JavaScript bundler for backend
- **tsx**: TypeScript execution for development

### Data Visualization
- **recharts**: React charting library for weight distribution visualization

### Utility Libraries
- **date-fns**: Date manipulation utilities
- **clsx**: Conditional CSS class composition
- **nanoid**: URL-safe unique ID generator