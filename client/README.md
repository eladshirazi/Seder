# Seder Client - Next.js 14 Authentication

A professional SaaS client built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, featuring a complete authentication flow.

## 🚀 Features

- **Complete Authentication Flow**: Login, register, and logout functionality
- **Protected Routes**: Dashboard with authentication checks
- **Modern UI Components**: Reusable, accessible components with Tailwind CSS
- **TypeScript**: Fully typed for better development experience
- **HTTP-only Cookies**: Secure JWT token storage
- **Form Validation**: Client and server-side validation
- **Responsive Design**: Mobile-first approach

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/page.tsx     # Login page
│   ├── register/page.tsx  # Registration page
│   ├── dashboard/page.tsx # Protected dashboard
│   └── page.tsx          # Home page (redirects)
├── components/ui/         # Reusable UI components
│   ├── button.tsx        # Button component
│   ├── input.tsx         # Input component
│   ├── form-field.tsx    # Form field wrapper
│   └── index.ts          # Component exports
└── lib/                  # Utilities and API logic
    ├── auth.ts           # Authentication API functions
    ├── getCurrentUser.ts # Get current user utility
    └── utils.ts          # Utility functions
```

## 🔐 Authentication Flow

### 1. Registration (`/register`)
- Form with email, password, first name, last name
- Client-side validation
- Server-side validation via API
- Automatic redirect to dashboard on success

### 2. Login (`/login`)
- Form with email and password
- JWT token stored in HTTP-only cookie
- Automatic redirect to dashboard on success

### 3. Dashboard (`/dashboard`)
- Protected route requiring authentication
- Displays user information
- Logout functionality
- Redirects to login if not authenticated

### 4. API Integration
- All API calls use `credentials: 'include'` for cookies
- Error handling for network and validation errors
- TypeScript interfaces for all API responses

## 🎨 UI Components

### Button
- Multiple variants: primary, secondary, outline, ghost
- Loading states with spinner
- Accessible with proper ARIA attributes

### Input
- Label and error display
- Form validation integration
- Accessible with proper IDs and labels

### FormField
- Wrapper around Input with consistent styling
- Required field indicators
- Error message display

## 🔧 Development

### Prerequisites
- Node.js 18+
- Backend server running on `http://localhost:3001`

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🧪 Testing

Run the authentication test script:
```bash
node test-auth.js
```

This will test:
1. User registration
2. User login
3. Protected route access

## 🔒 Security Features

- **HTTP-only Cookies**: JWT tokens stored securely
- **CORS Configuration**: Proper cross-origin setup
- **Form Validation**: Both client and server-side
- **Error Handling**: No sensitive information exposed
- **TypeScript**: Type safety throughout

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS for styling
- Accessible components
- Keyboard navigation support

## 🚀 Deployment

The app is ready for deployment on Vercel, Netlify, or any Next.js-compatible platform.

### Build Commands
```bash
npm run build  # Production build
npm run start  # Start production server
```

## 🔄 API Endpoints Used

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout
- `GET /api/me` - Get current user

All endpoints expect and return JSON with consistent response format:
```typescript
{
  success: boolean
  message?: string
  user?: User
  error?: string
  details?: ValidationError[]
}
```

## 📝 Next Steps

This authentication system provides a solid foundation for:
- Role-based access control
- Password reset functionality
- Email verification
- Two-factor authentication
- Session management
- User profile management
