import { stackMiddlewares, localesMiddlewareFactory } from "@/middlewareStack";

const middlewares = [localesMiddlewareFactory];
export default stackMiddlewares(middlewares);
