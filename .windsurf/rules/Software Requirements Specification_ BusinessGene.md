# Software Requirements Specification: BusinessGene

## System Design

- **Client-Server Architecture**: Web-based SaaS application with Next.js frontend and serverless backend
- **Key Subsystems**:
  - User Authentication \& Management System
  - Business Idea Generator \& Storage
  - Credit \& Subscription Management
  - Public/Private Idea Management
  - Bookmark/Save System for Ideas
- **Third-Party Integrations**:
  - AI Text Generation Service (OpenAI API)
  - AI Image Generation Service (OpenAI DALL-E API)
  - Domain Availability API (Namecheap or similar)
  - File Storage Service (Supabase Storage)
  - Stripe Payment Processing

## Architecture Pattern

- **Next.js App Router**: Page-based routing with server components where appropriate
- **Component-Based Structure**: Reusable UI components organized by feature/module
- **API Layer**: Next.js API routes for internal endpoints and third-party service integration
- **Serverless Functions**: For AI operations and business logic
- **Full-Stack Approach**: Next.js handling both frontend rendering and backend API needs

## State Management

- **React Context API**: For global application state (user session, current project)
- **React Query/SWR**: For server state management, data fetching, caching and revalidation
- **Local Component State**: For UI-specific state using React useState
- **Form Management**: React Hook Form for complex form handling
- **Persistent State**: Local storage for draft saving, Supabase for permanent storage

## Data Flow

- **Client-Side Flow**:

1. User interacts with UI
2. Component calls appropriate API
3. UI updates based on response
4. Success/error feedback via Sonner Toast

- **Server-Side Flow**:

1. API routes receive client requests
2. Validate input and authenticate user
3. Check user credits for premium operations
4. Process business logic or call external APIs
5. Update database via Prisma
6. Return response to client

- **Credit Management Flow**:

1. Track usage via CreditTransaction model
2. Check credit balance before premium operations
3. Process credit purchases via Stripe

## Technical Stack

- **Frontend**:
  - Next.js (React framework)
  - Tailwind CSS (styling)
  - Shadcn (UI components)
  - Lucide Icons (iconography)
  - Sonner Toast (notifications)
- **Backend**:
  - Next.js API Routes
  - Prisma (ORM)
  - Supabase (PostgreSQL database \& Storage)
- **Authentication**: Supabase Auth
- **Payment Processing**: Stripe
- **Deployment**: Vercel
- **AI Services**: OpenAI API (text and image generation)

## Authentication Process

- **Provider**: Supabase Auth
- **Authentication Flow**:

1. User registration with email/password or social login
2. JWT-based session management via Supabase
3. Protected routes requiring authentication

- **User Data**: Extended via User model in Prisma (name, image, credits, Stripe info)
- **Server-Side Auth**: Use `@supabase/ssr` package for authenticated server components and API routes
- **Client-Side Auth**: Use browser client from `createBrowserClient` for client components

## Route Design

- **Public Routes**:
  - `/` - Landing page
  - `/login` - Authentication
  - `/signup` - Registration
  - `/pricing` - Subscription plans
  - `/ideas/public` - Browse public business ideas
- **Protected Routes**:
  - `/dashboard` - Main dashboard with user's business ideas
  - `/ideas/new` - Create new business idea
  - `/ideas/[id]` - View/edit specific business idea
  - `/ideas/saved` - View saved/bookmarked ideas
  - `/account` - User account settings
  - `/credits` - Credit management
  - `/subscription` - Subscription management

## API Design

- **Authentication Endpoints**:
  - Handled by Supabase Auth
- **Business Idea Endpoints**:
  - `GET /api/business-ideas` - List user's business ideas
  - `GET /api/business-ideas/public` - List public ideas
  - `GET /api/business-ideas/[id]` - Get specific idea
  - `POST /api/business-ideas` - Create new idea
  - `PUT /api/business-ideas/[id]` - Update idea
  - `DELETE /api/business-ideas/[id]` - Delete idea
- **Saved Ideas Endpoints**:
  - `GET /api/saved-ideas` - Get user's saved ideas
  - `POST /api/saved-ideas` - Save an idea
  - `DELETE /api/saved-ideas/[id]` - Remove saved idea
- **Generation Endpoints**:
  - `POST /api/generate/idea` - Generate business idea
  - `POST /api/generate/logo` - Generate logo
- **Credits \& Subscription Endpoints**:
  - `GET /api/credits` - Get user's credit balance
  - `POST /api/credits/purchase` - Purchase credits
  - `GET /api/subscription` - Get subscription info
  - `POST /api/subscription` - Create/update subscription

## Database Design ERD

- **Users Table**:
  - `id` (PK)
  - `email` (unique)
  - `name` (nullable)
  - `image` (nullable)
  - `emailVerified` (nullable)
  - `createdAt`
  - `updatedAt`
  - `credits` (default: 0)
  - `stripeCustomerId` (nullable)
  - `stripePriceId` (nullable)
  - `stripeCurrentPeriodEnd` (nullable)
- **BusinessIdea Table**:
  - `id` (PK)
  - `title`
  - `description` (text)
  - `category`
  - `tags` (array)
  - `userId` (FK -> User.id)
  - `isPublic` (boolean)
  - `createdAt`
  - `updatedAt`
- **SavedIdea Table**:
  - `id` (PK)
  - `userId` (FK -> User.id)
  - `businessIdeaId` (FK -> BusinessIdea.id)
  - `createdAt`
- **Subscription Table**:
  - `id` (PK)
  - `userId` (FK -> User.id)
  - `stripeCustomerId`
  - `stripeSubscriptionId`
  - `stripePriceId`
  - `stripeCurrentPeriodEnd`
  - `status`
  - `createdAt`
  - `updatedAt`
- **CreditTransaction Table**:
  - `id` (PK)
  - `userId` (FK -> User.id)
  - `amount`
  - `type` (earned, spent, purchased, refunded)
  - `description` (nullable)
  - `createdAt`
