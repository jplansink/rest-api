# REST API Boilerplate

REST API with Node.js, TypeScript, Express, and Prisma.

## Features

- **TypeScript** - Type-safe development
- **Express.js** - Fast, minimal web framework
- **Prisma ORM** - Type-safe database access with PostgreSQL
- **JWT Authentication** - Secure token-based auth with refresh tokens
- **Role-Based Access Control** - User and Admin roles
- **Input Validation** - Request validation with Joi
- **Security** - Helmet, CORS, XSS protection, rate limiting
- **API Documentation** - Swagger/OpenAPI (development mode)
- **Docker Ready** - Multi-stage Dockerfile for production
- **Health Check** - `/v1/health` endpoint for monitoring

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (or Docker)

### Local Development

```bash
# Install dependencies
npm install

# Start PostgreSQL with Docker
npm run docker:db:start

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

API runs at `http://localhost:3000`

Swagger docs at `http://localhost:3000/v1/docs` (dev mode only)

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL="postgresql://postgres:secret@localhost:5432/mydb?schema=public"
JWT_SECRET=your-secure-secret-min-32-chars
FRONTEND_URL=http://localhost:3000
CORS_ORIGIN=*
```

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/auth/register` | Register new user |
| POST | `/v1/auth/login` | Login |
| POST | `/v1/auth/logout` | Logout |
| POST | `/v1/auth/refresh-tokens` | Refresh access token |
| POST | `/v1/auth/forgot-password` | Request password reset |
| POST | `/v1/auth/reset-password` | Reset password |
| POST | `/v1/auth/send-verification-email` | Send verification email |
| POST | `/v1/auth/verify-email` | Verify email |

### Users (requires auth)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/users` | List users (admin) |
| POST | `/v1/users` | Create user (admin) |
| GET | `/v1/users/:id` | Get user |
| PATCH | `/v1/users/:id` | Update user |
| DELETE | `/v1/users/:id` | Delete user |

### Health
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/health` | Health check with DB status |

## Deployment

### Docker

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build image only
docker build -t my-api .
```

### Deployment

1. Connect your repository
2. Select **Dockerfile** as build method
3. Set environment variables:
   - `NODE_ENV=production`
   - `PORT=3000`
   - `DATABASE_URL=postgresql://...`
   - `JWT_SECRET=<secure-secret>`
   - `FRONTEND_URL=https://yourapp.com`
   - `CORS_ORIGIN=https://yourapp.com`
4. Deploy

### Health Check

The `/v1/health` endpoint returns:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production",
  "database": "connected"
}
```

## Scripts

```bash
npm run dev          # Development server with hot reload
npm run build        # Build for production
npm run start        # Production server (with PM2)
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
npm run db:migrate   # Run Prisma migrations
npm run db:studio    # Open Prisma Studio
npm run docker:up    # Start all services
npm run docker:down  # Stop all services
```

## Project Structure

```
src/
├── config/         # Configuration (env, logger, passport)
├── controllers/    # Request handlers
├── middlewares/    # Express middlewares (auth, validation, error)
├── routes/v1/      # API routes
├── services/       # Business logic
├── utils/          # Utilities (ApiError, encryption)
├── validations/    # Joi validation schemas
├── app.ts          # Express app setup
├── index.ts        # Entry point
└── client.ts       # Prisma client singleton
```

## License

ISC
