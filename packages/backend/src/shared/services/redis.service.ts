import { IRedisService } from './../abstractions/IRedisService';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisClientType, createClient } from 'redis';

@Injectable()
export class RedisService implements IRedisService, OnModuleInit {
  private client: RedisClientType;
  private readonly expirationTime = 60 * 60;

  onModuleInit() {
    try {
      this.client = createClient({
        url: `${process.env.REDIS_URL}`,
      });
      this.client.connect();
    } catch (error) {
      console.log('Redis init', error);
    }
  }

  async set(key: string, value: any) {
    try {
      await this.client.SET(key, value, { EX: this.expirationTime });
      return;
    } catch (error) {
      console.log('Redis set', error);
    }
  }

  async get(key: string) {
    try {
      const redisUser = await this.client.GET(key);
      return redisUser;
    } catch (error) {
      console.log('Redis get', error);
    }
  }

  async delete(key: string) {
    try {
      return !!(await this.client.del(key));
    } catch (error) {
      console.log('Redis delete', error);
    }
  }

  async exists(key: string) {
    try {
      return !!(await this.client.exists(key));
    } catch (error) {
      console.log(error);
    }
  }
}
