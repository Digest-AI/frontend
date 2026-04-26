import { NextProxy, NextResponse } from "next/server";

export function stackMiddlewares(
  functions: Array<(middleware: NextProxy) => NextProxy>,
  index = 0,
): NextProxy {
  const current = functions[index];
  if (current) {
    const next = stackMiddlewares(functions, index + 1);
    const response = current(next);
    return response;
  }
  return () => NextResponse.next();
}
