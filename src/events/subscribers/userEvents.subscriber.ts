import { AwilixContainer } from 'awilix';
import { Log4Microservice as Logger } from 'log4-microservice';
import EventEnum from '../constants/events.constants';
import { IEventBus, IEvent } from '../../interfaces/IEventBus.interface';
import LoggerFactory from '../../factory/services/logger.service.factory';

/**
 * @description Subscribes to UserEvent published throughout application.
 * @class UserEventSubscribers
 */
class UserEventSubscribers {
  private eventBus: IEventBus;

  private logger: Logger;

  /**
   * Creates an instance of UserEventSubscribers.
   * @param {IEventBus} bus
   * @param {AwilixContainer} container
   * @memberof UserEventSubscribers
   */
  constructor(bus: IEventBus, container: AwilixContainer) {
    this.eventBus = bus;
    this.logger = container
      .resolve<LoggerFactory>('logger')
      .createLogger('usrsub');
    this.configure();
  }

  /**
   * @description Configures subscriber to listen
   * @private
   * @memberof UserEventSubscribers
   */
  private configure(): void {
    this.eventBus.subscribe(
      EventEnum.USER_REGISTERED,
      this.handleUserRegistrationEvent,
    );
  }

  /**
   * @description Process messages for USER_REGISTRATION Event.
   * @private
   * @param {IEvent} event
   * @memberof UserEventSubscribers
   */
  private handleUserRegistrationEvent(event: IEvent): void {
    this.logger.debug(
      'handling user registration event ',
      event,
      this.eventBus,
    );
  }
}

export default UserEventSubscribers;
