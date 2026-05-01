import { redirect } from "@/i18n";
import { IError } from "@/types";

type Data = object | Array<object> | null;
type ManualHandler<T> = {
  auth?: () => Promise<T>;
  forbidden?: () => Promise<T>;
  "not-found"?: () => Promise<T>;
  error?: () => Promise<T>;
};

export function isError(data: Data): data is IError {
  return (
    data !== null &&
    typeof data === "object" &&
    "code" in data &&
    "detail" in data
  );
}

export async function handleResponse<T extends Data>(
  response: Promise<T | IError>,
  manualHandlers?: ManualHandler<T>,
) {
  const data = await response;
  if (isError(data)) {
    let key: keyof ManualHandler<T>;
    switch (data.code) {
      case 401:
        key = "auth";
        break;
      case 403:
        key = "forbidden";
        break;
      case 404:
        key = "not-found";
        break;
      default:
        key = "error";
        break;
    }
    if (manualHandlers && typeof manualHandlers[key] === "function") {
      return await manualHandlers[key]!();
    }
    //explicitly return the redirect response to avoid type errors
    return await redirect(`/${key}`);
  }

  return data;
}
