import {Commands, createClient, RedisClient} from 'redis';
import {promisify} from 'util';

interface ICacheOptions {
  db: number;
}

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
    this.client = createClient(cacheOptions);
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
  hset(hash: string, key: string, value): Promise<unknown> {
    const hsetAsync = promisify(this.client.hset);
    return hsetAsync([hash, key, value]);
  }

   /**
   * @description Gets the hash record for key
   * @param {string} key
   * @return {*}  {Promise<unknown>}
   * @memberof RedisCachingService
   */
  hget(hash: string, key: string, value): Promise<unknown> {
    const hgetAsync = promisify(this.client.hget);
    return hgetAsync(hash, key);
  }
}
