## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database Migrations

This project uses TypeORM migrations for database schema management. The `synchronize` option is disabled for production safety.

```bash
# Generate a new migration (auto-detect entity changes)
$ npm run migration:generate --name=CreatePostsTable

# Create an empty migration file (for custom SQL)
$ npm run migration:create --name=CreatePostsTable

# Run all pending migrations
$ npm run migration:run

# Revert the last migration
$ npm run migration:revert

# Show all migrations and their execution status (executed vs pending)
$ npm run migration:show
```
