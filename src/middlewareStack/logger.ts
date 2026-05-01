const DEBUG = false;

export const maskToken = (token?: string) => {
  if (!token) return 'undefined';
  return `${token.slice(0, 6)}…${token.slice(-6)}`;
};

export const logger = (name: string) => ({
  info: (message: string, data?: Record<string, unknown>) => {
    if (DEBUG) console.info(`[${name}-middleware] ${message}`, data);
  },
  warn: (message: string, data?: Record<string, unknown>) => {
    if (DEBUG) console.warn(`[${name}-middleware] ${message}`, data);
  },
  error: (message: string, data?: Record<string, unknown>) => {
    if (DEBUG) console.error(`[${name}-middleware] ${message}`, data);
  },
});