import {
  buildStorage,
  type AxiosStorage,
  type StorageValue,
} from "axios-cache-interceptor";
import { Redis } from "@upstash/redis";

export type ServiceName = "user" | "parser" | "recommendations" | "tg";

const redis = new Redis({
  url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_URL!,
  token: process.env.NEXT_PUBLIC_UPSTASH_REDIS_REST_TOKEN!,
});

// Namespaced storage wrapper
export function createNamespacedStorage(
  serviceName: ServiceName,
): AxiosStorage {
  const prefix = `${serviceName}:`;

  // Use buildStorage to create a proper storage that passes isStorage() check
  return buildStorage({
    find: async (key) => {
      const value = await redis.get<StorageValue>(`${prefix}${key}`);
      return value ?? undefined;
    },
    set: async (key, value) => {
      await redis.set(`${prefix}${key}`, value);
    },
    remove: async (key) => {
      await redis.del(`${prefix}${key}`);
    },
    clear: async () => {
      // Clear only keys with this service prefix
      const keys: string[] = [];
      let cursor: string | number = 0;

      do {
        const result: [string | number, string[]] = await redis.scan(cursor, {
          match: `${prefix}*`,
          count: 100,
        });
        cursor = result[0];
        keys.push(...result[1]);
      } while (cursor !== 0 && cursor !== "0");

      if (keys.length > 0) {
        await redis.del(...keys);
      }
    },
  });
}

export const cacheManager = {
  clearService: async (serviceName: ServiceName) => {
    const prefix = `${serviceName}:`;
    // Use SCAN to find all keys with the prefix
    const keys: string[] = [];
    let cursor: string | number = 0;

    do {
      const result: [string | number, string[]] = await redis.scan(cursor, {
        match: `${prefix}*`,
        count: 100,
      });
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== 0 && cursor !== "0");

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  clearServices: async (serviceNames: ServiceName[]) => {
    await Promise.all(
      serviceNames.map((name) => cacheManager.clearService(name)),
    );
  },

  clearAll: async () => {
    const keys = await redis.keys("*");
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },

  clearPattern: async (pattern: string) => {
    const keys: string[] = [];
    let cursor: string | number = 0;

    do {
      const result: [string | number, string[]] = await redis.scan(cursor, {
        match: `*${pattern}*`,
        count: 100,
      });
      cursor = result[0];
      keys.push(...result[1]);
    } while (cursor !== 0 && cursor !== "0");

    if (keys.length > 0) {
      await redis.del(...keys);
    }
  },
};
