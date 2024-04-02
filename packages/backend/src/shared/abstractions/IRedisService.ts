export abstract class IRedisService {
  abstract set(
    key: string,
    value: string,
    expiryMode?: string,
    time?: number,
  ): Promise<void>;
  abstract get(key: string, inJson?: boolean): Promise<string | null>;
  abstract delete(key: string): Promise<boolean>;
  abstract exists(key: string): Promise<boolean>;
}
