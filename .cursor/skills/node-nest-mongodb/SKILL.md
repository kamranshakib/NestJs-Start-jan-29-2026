---
name: node-nest-mongodb
description: Guides implementation of Node.js backends using NestJS, Express, and MongoDB. Use when building or modifying NestJS APIs, Mongoose schemas, REST endpoints, DTOs, services, or MongoDB queries in Node.js projects.
---

# Node.js, NestJS, Express & MongoDB

## When to Apply

Use this skill when the user or codebase involves:
- NestJS modules, controllers, services, or dependency injection
- MongoDB or Mongoose (schemas, models, queries)
- Express (NestJS uses it by default; middleware, request/response)
- REST API design, validation (class-validator), or Swagger in Nest

---

## NestJS Conventions

### Module structure

- One feature = one module (e.g. `BlogModule`). Put controller, service, DTOs, and schemas under a feature folder.
- Register Mongoose schemas in the feature module with `MongooseModule.forFeature([{ name: Entity.name, schema: EntitySchema }])`.
- Export only what other modules need (e.g. `BlogService` if used elsewhere).

### Controllers

- Use `@Controller('path')` for route prefix. Prefer plural resources: `blogs`, `users`.
- Inject the feature service in the constructor; keep controllers thin (validation + calling service).
- Use appropriate decorators: `@Get()`, `@Post()`, `@Body()`, `@Param()`, `@Query()`, `@UsePipes(ValidationPipe)`.
- Return HTTP status via `@HttpCode()`, or throw `NotFoundException` / `BadRequestException` from `@nestjs/common`.

### Services

- `@Injectable()` and inject repositories or `Model<T>` from Mongoose.
- Use `constructor(@InjectModel(Entity.name) private model: Model<Entity>)` for Mongoose.
- Prefer async/await; return plain objects or DTOs, not raw Mongoose documents when possible.

### DTOs and validation

- Use classes with `class-validator` decorators: `@IsString()`, `@IsNotEmpty()`, `@IsOptional()`, `@IsMongoId()`, `@IsNumber()`, etc.
- Separate create/update DTOs (e.g. `CreateBlogDto`, `UpdateBlogDto`); use `PartialType` or `PickType` from `@nestjs/mapped-types` or `@nestjs/swagger` to avoid duplication.
- Enable global validation in `main.ts`: `app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))`.

---

## MongoDB & Mongoose

### Schemas (NestJS + Mongoose)

- Use `@Schema({ timestamps: true })` when you need `createdAt`/`updatedAt`.
- Define class with `@Prop()`; use `SchemaFactory.createForClass(Entity)`.
- References: `@Prop({ type: Types.ObjectId, ref: 'OtherEntity', required: true })`.
- Export both the class and the schema: `export const BlogSchema = SchemaFactory.createForClass(Blog)`.

### Queries

- Prefer `Model.find()`, `Model.findOne()`, `Model.findById()` with `.lean()` when you don't need Mongoose document methods.
- Use `Model.findByIdAndUpdate(id, update, { new: true })` to return the updated document.
- Pagination: `.skip((page - 1) * limit).limit(limit)` and optionally `.sort()`.

### IDs

- Use `Types.ObjectId` or validate with `@IsMongoId()` in DTOs. Handle invalid IDs (e.g. throw `BadRequestException` or `NotFoundException`).

---

## Express (with NestJS)

- NestJS runs on Express by default (`@nestjs/platform-express`). Use Nest guards, interceptors, and pipes instead of raw Express middleware when possible.
- For file uploads use `@UseInterceptors(FileInterceptor('field'))` and `@UploadedFile()` with `ParseFilePipe` if needed.
- Static files: `ServeStaticModule` or serve from a controller.

---

## Node.js

- Use async/await; avoid unhandled promise rejections.
- Prefer `async` service methods that return Promises; Nest handles them correctly.
- Environment: use `@nestjs/config` and `process.env` or `ConfigService` for secrets and config.

---

## Quick checklist for new features

1. Create or update Mongoose schema and register in the feature module.
2. Create DTOs (create/update/query) with class-validator.
3. Implement or extend service (inject `Model`, add methods).
4. Add or update controller routes and bind to DTOs.
5. Register module in `AppModule` if new.
6. Optionally add Swagger decorators (`@ApiBody`, `@ApiResponse`) for docs.

---

## Terminology

- **Entity** / **Schema**: the MongoDB document shape (Mongoose schema class).
- **DTO**: data transfer object; request/response validation and typing.
- **Module**: NestJS feature or app boundary (imports, controllers, providers).
- **Route** / **endpoint**: HTTP path + method handled by a controller.
