import { AwilixContainer, createContainer } from 'awilix';

class DI {
  static container: AwilixContainer;

  /**
   * @description Gets or Created a container
   * @static
   * @return {*}  {AwilixContainer}
   * @memberof DI
   */
  static getContainer(): AwilixContainer {
    return DI.lazyLoad();
  }

  /**
   * @description Lazyloads the container if it is not initialized
   * @static
   * @return {*}  {AwilixContainer}
   * @memberof DI
   */
  static lazyLoad(): AwilixContainer {
    let container;
    if (DI.container) {
      container = DI.container;
    } else {
      container = createContainer();
      DI.container = container;
    }

    return container;
  }
}

export default DI;
