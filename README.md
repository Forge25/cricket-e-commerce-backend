# Cricket E-Commerce Backend

A robust backend API for a cricket equipment e-commerce platform built with Node.js, Express, TypeScript, and Prisma ORM.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Features

- RESTful API architecture
- TypeScript for type safety
- PostgreSQL database with Prisma ORM
- JWT authentication
- Password hashing with bcrypt
- CORS enabled
- Environment-based configuration
- Hot-reload development with nodemon

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js v5
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcrypt
- **CORS:** cors middleware
- **Environment Variables:** dotenv

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v7 or higher) or **yarn**
- **PostgreSQL** (v12 or higher)
- **Git**

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd cricket-ecommerce-backend
```

2. **Install dependencies**

```bash
npm install
```

## Environment Setup

1. **Create a `.env` file** in the root directory:

```bash
cp .env.example .env
```

2. **Configure environment variables** in `.env`:

```env
# Server Configuration
PORT=8080
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/cricket_ecommerce"

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration (optional)
ALLOWED_ORIGINS=http://localhost:3000
```

Replace the following placeholders:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `cricket_ecommerce`: Your database name
- `your-super-secret-jwt-key-here`: A strong secret key for JWT

## Database Setup

1. **Create a PostgreSQL database**

```bash
# Access PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE cricket_ecommerce;

# Exit PostgreSQL
\q
```

2. **Run Prisma migrations**

```bash
# Generate Prisma Client
npx prisma generate

# Create and apply migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

3. **View your database in Prisma Studio** (optional)

```bash
npx prisma studio
```

This will open a browser interface at `http://localhost:5555` where you can view and edit your data.

## Running the Application

### Development Mode

Run the application with hot-reload enabled:

```bash
npm run dev
```

The server will start at `http://localhost:8080` (or the port specified in your `.env` file).

### Production Mode

1. **Build the TypeScript code:**

```bash
npm run build
```

2. **Start the production server:**

```bash
npm start
```

## API Documentation

### Base URL

```
http://localhost:8080
```

### Endpoints

#### Health Check

```http
GET /
```

**Response:**
```json
"Backend is running with TypeScript!"
```

### Authentication Endpoints

(To be documented as you build them)

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/profile
```

### Product Endpoints

(To be documented as you build them)

```http
GET /api/products
GET /api/products/:id
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id
```

### Order Endpoints

(To be documented as you build them)

```http
GET /api/orders
GET /api/orders/:id
POST /api/orders
PUT /api/orders/:id
DELETE /api/orders/:id
```

## Project Structure

```
cricket-ecommerce-backend/
├── src/
│   ├── app.ts              # Application entry point
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware (auth, validation, etc.)
│   ├── models/            # Database models (if needed beyond Prisma)
│   ├── routes/            # API route definitions
│   └── utils/             # Utility functions and helpers
├── prisma/
│   └── schema.prisma      # Prisma schema definition
├── generated/
│   └── prisma/           # Generated Prisma Client
├── dist/                 # Compiled JavaScript (production build)
├── node_modules/         # Dependencies
├── .env                  # Environment variables (not in git)
├── .gitignore           # Git ignore rules
├── package.json         # Project metadata and dependencies
├── tsconfig.json        # TypeScript configuration
└── README.md           # Project documentation
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot-reload |
| `npm start` | Build and start production server |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm test` | Run test suite (to be configured) |

## Development

### Adding New Routes

1. Create a route file in `src/routes/`
2. Create corresponding controller in `src/controllers/`
3. Import and use in `src/app.ts`

Example:

```typescript
// src/routes/products.ts
import { Router } from 'express';
import { getProducts } from '../controllers/productController';

const router = Router();
router.get('/products', getProducts);

export default router;
```

### Database Schema Changes

1. Update `prisma/schema.prisma`
2. Create a migration:

```bash
npx prisma migrate dev --name description-of-changes
```

3. Prisma Client will be automatically regenerated

### Code Style

- Use TypeScript for all new files
- Follow existing code formatting
- Use meaningful variable and function names
- Add comments for complex logic

## Deployment

### Using a Platform (Heroku, Railway, Render, etc.)

1. **Set environment variables** in your platform's dashboard
2. **Ensure your database** is accessible from the deployment platform
3. **Build command:** `npm run build`
4. **Start command:** `npm start`

### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 8080

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t cricket-backend .
docker run -p 8080:8080 --env-file .env cricket-backend
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For support, email your-email@example.com or open an issue in the repository.

---

**Happy Coding!**
