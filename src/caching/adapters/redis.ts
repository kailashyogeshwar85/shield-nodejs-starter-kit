import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';
import { ICacheOptions } from '../../interfaces/ICache.interface';

/**
 * @description RedisCacheService
 * @export
 * @class RedisCachingService
 */
export default class RedisCachingService {
  private client: RedisClient;

  private cacheOptions: ICacheOptions;

  /**
   * Creates an instance of RedisCachingService.
   * @param {ICacheOptions} cacheOptions
   * @memberof RedisCachingService
   */
  constructor(cacheOptions: ICacheOptions) {
    this.cacheOptions = cacheOptions;
    this.client = createClient(this.cacheOptions);
  }

  /**
   * @description Gets the key from Redis
   * @param {string} key
   * @return {*}  {Promise<unknown>}
   * @memberof RedisCachingService
   */
  get(key: string): Promise<unknown> {
    const getAsync = promisify(this.client.get);

    return getAsync(key);
  }

  /**
   * @description Sets the key from Redis
   * @param {string} key
   * @return {*}  {Promise<unknown>}
   * @memberof RedisCachingService
   */
  set(key: string, value: string): Promise<unknown> {
    const setAsync = promisify(this.client.set);

    return setAsync(key, value);
  }

  /**
   * @description Sets the hash record for key with value.
   * @param {string} key
   * @return {*}  {Promise<unknown>}
   * @memberof RedisCachingService
   */
  HSET(hash: string, key: string, value: string): Promise<unknown> {
    const hsetAsync = promisify(this.client.hset);

    return hsetAsync([hash, key, value]);
  }

  /**
   * @description Gets the hash record for key
   * @param {string} key
   * @return {*}  {Promise<unknown>}
   * @memberof RedisCachingService
   */
  HGET(hash: string, key: string): Promise<unknown> {
    const hgetAsync = promisify(this.client.HGET);

    return hgetAsync(hash, key);
  }

  HGETALL(hash: string): Promise<unknown> {
    const hgetAllAsync = promisify(this.client.HGETALL);

    return hgetAllAsync(hash);
  }
}
