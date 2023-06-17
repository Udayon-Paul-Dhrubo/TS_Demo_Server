
## setup
  
```bash
npm i --save http-errors
npm i @types/http-errors -D
```

## throw error

```typescript
import createError from 'http-errors'
throw createError(404, 'Not Found')
 ```

## catch error
> in server.ts

```typescript
import { notFoundHandler, defaultErrorHandler } from "./error-handler/error-handler";

//404 handler
app.use(notFoundHandler);

//default error handler
app.use(defaultErrorHandler);

```

## run project
  
  ```bash
  npm run start:nodemon
  ```
  or simply just
  
  ```bash
  nodemon
  ```