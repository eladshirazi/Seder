# Seder Backend API

A professional Node.js + TypeScript backend for the Seder SaaS platform, built with Express, Prisma, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your database connection string
   ```

3. **Database setup**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database (for development)
   npm run db:push
   
   # Or create migrations (for production)
   npm run db:migrate
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # Route definitions
├── middleware/      # Express middleware
├── lib/            # Utilities and configurations
└── index.ts        # Main application entry
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and apply migrations
- `npm run db:studio` - Open Prisma Studio

## 🗄️ Database Schema

### User Model
- `id` - Unique identifier (CUID)
- `email` - Unique email address
- `password` - Hashed password
- `firstName` - User's first name
- `lastName` - User's last name
- `role` - User role (ADMIN/USER)
- `isActive` - Account status
- `createdAt` - Account creation timestamp
- `updatedAt` - Last update timestamp

### Session Model
- `id` - Unique identifier (CUID)
- `userId` - Reference to user
- `token` - JWT token
- `expiresAt` - Token expiration
- `createdAt` - Session creation timestamp

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - Register new user
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "firstName": "John",
    "lastName": "Doe"
  }
  ```

## 🛡️ Security Features

- Password hashing with bcrypt (12 salt rounds)
- Input validation with Zod
- CORS configuration
- Error handling middleware
- TypeScript strict mode

## 🔄 Development Workflow

1. Make changes to Prisma schema
2. Run `npm run db:generate` to update client
3. Run `npm run db:push` to apply changes
4. Test endpoints with your preferred API client

## 🚀 Deployment

1. Set `NODE_ENV=production` in environment
2. Run `npm run build` to compile TypeScript
3. Start with `npm run start`
4. Ensure database connection is configured

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:3000 |
| `JWT_SECRET` | JWT signing secret | Required for auth |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d | 