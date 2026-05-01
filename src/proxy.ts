import {
  stackMiddlewares,
  authMiddlewareFactory,
  localesMiddlewareFactory,
} from "@/middlewareStack";

const middlewares = [authMiddlewareFactory, localesMiddlewareFactory];
export default stackMiddlewares(middlewares);
