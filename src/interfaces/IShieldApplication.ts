export default interface IShieldApplication {
  /**
   * @description Start your http server at the configured port
   * @memberof IShieldApplication
   */
  start: () => Promise<IShieldApplication>;
  /**
   * @description ShutsDown the server and release the resource pool.
   * @memberof IShieldApplication
   */
  gracefulShutdown: () => void;
}
