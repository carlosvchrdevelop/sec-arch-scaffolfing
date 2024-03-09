# REST API SCAFFOLDER

This project scaffolds a development environment for building REST APIs with the following integrations:

|      Need      |        Package         |
| :------------: | :--------------------: |
|    Language    |       Typescript       |
|  HTTP Server   |          Koa           |
|     Router     |       Koa-router       |
|      ORM       |    Prisma (pending)    |
|   Validation   |          Zod           |
| Authentication | JsonWebToken (pending) |
|    Testing     |          Jest          |
|    Logging     |   Winston (pending)    |
|    Mailing     | Node mailer (pending)  |
| Documentation  |  Swagger UI (pending)  |
|   Hot reload   |        Nodemon         |

## Usage

First, you must install dependencies:

```bash
npm install
```

Now you may perform some tasks:

```bash
# Build and preview
npm start

# Preview with hot reload
npm run dev

# Run tests once
npm run test

# Run tests and watch for changes
npm run test:watch

# Run test coverage analisys
npm run test:coverage
```

## Project structure

- **app.ts**: creación del servidor y asignación de middlewares.
- **middlewares/**: código que debe ejecutarse para múltiples rutas, por ejemplo el RBAC.
- **routes/**: definen las rutas de la api y las asignan a un controlador.
- **controllers/**: procesan las peticiones http, adaptan los datos y realizan las validaciones (aquí no debe haber lógica de negocio).
- **services/**: lógica de negocio general.
- **use-cases/**: lógica de negocio muy específica.
- **db/index.ts**: conexión a base de datos y configuración del ORM.
- **db/models/**: modelado los objetos de base de datos.
- **db/migrations/**: archivos de migraciones.
- **config/**: configuraciones varias.
- **utils/**: código que no es específico de la aplicación (utilidades).
- **plugins/**: código que actúa de adaptador para desacoplar librerías de terceros.
- **tests/**: código de testing.

## Examples

This scaffolding creates several examples. You are free to edit or delete completely:

- `src/routes/hello.route.ts`
- `src/controllers/hello.controller.ts`
- `src/use-cases/sayHello.use-case.ts`
- `src/validations/hello.validation.ts`
- `src/tests/controllers/hello.controller.test.ts`
- `src/tests/use-cases/sayHello.use-case.test.ts`
