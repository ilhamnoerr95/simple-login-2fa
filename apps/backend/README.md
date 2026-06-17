# Boilerplate NestJS

A ready-to-use [NestJS](https://nestjs.com/) boilerplate project pre-configured with essential features to accelerate backend API development.

## Tech Stack

- **NestJS 11** — Node.js framework for building server-side applications
- **TypeScript** — Static typing for JavaScript
- **Winston** — Logging library with file & console transports
- **Swagger (OpenAPI)** — Auto-generated API documentation
- **class-validator & class-transformer** — Request DTO validation
- **Jest** — Unit & E2E testing framework
- **ESLint + Prettier** — Code linting & formatting

## Features

### 1. Global API Prefix & URI Versioning
All routes automatically use the `/api` prefix and support URI versioning (`/api/v1/...`).

### 2. Swagger API Documentation
Auto-generated API docs available at `/api/docs` with API Key authentication support (`x-client-id`, `x-client-secret`).

### 3. Global Validation Pipe
- Whitelist mode — properties not defined in the DTO are automatically stripped
- `forbidNonWhitelisted` — requests are rejected if unknown properties are present
- Auto-transform — request body is automatically transformed to match DTO types
- Custom error response format for validation errors

### 4. Structured Logging (Winston)
- Console transport with timestamp & colorize format
- File transport: `logs/error.log` (error only) and `logs/combined.log` (all levels)
- JSON format for file logs for easy parsing

### 5. HTTP Logging Interceptor
Every request is automatically logged with format: `[status] METHOD /path - duration ms`

### 6. Global HTTP Exception Filter
Consistent error response format:
```json
{
  "success": false,
  "status": 400,
  "message": { "field": "error message" }
}
```

### 7. Modular Structure
Organized folder structure:
```
src/
├── common/
│   ├── filter/       # Global exception filters
│   ├── guard/        # Auth guards
│   └── utils/        # Utility functions
├── logger/           # Winston & interceptor config
├── modules/
│   └── example/      # Example CRUD module (controller, service, dto, entity)
├── app.module.ts
└── main.ts
```

### 8. Example CRUD Module
An `example` module as a reference for creating new modules with:
- Controller with full CRUD endpoints
- DTO with validation (`class-validator`)
- Service layer
- Unit test boilerplate

## Usage

### Prerequisites
- Node.js >= 18
- pnpm

### Install Dependencies
```bash
pnpm install
```

### Running the Application
```bash
# development (watch mode)
pnpm run start:dev

# production
pnpm run build
pnpm run start:prod
```

### Access Swagger
After the server is running, open: http://localhost:3000/api/docs

### Running Tests
```bash
# unit tests
pnpm run test

# e2e tests
pnpm run test:e2e

# test coverage
pnpm run test:cov
```

### Linting & Formatting
```bash
pnpm run lint
pnpm run format
```

## Creating a New Module

Use the NestJS CLI to generate a new module:
```bash
npx nest g resource modules/module-name
```

This will auto-generate a module with controller, service, dto, and entity.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | Server port |

## License

UNLICENSED
