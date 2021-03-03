import { IEvent } from '../../interfaces/IEventBus.interface';
import EventEnum from '../events';

/**
 * @description Dispatches user registration event.
 * @param {unknown} payload
 * @return {*}  {IEvent}
 */
function userRegisteredDispatcher(payload: unknown): IEvent {
  return {
    type: EventEnum.USER_REGISTERED,
    payload,
  };
}

export default userRegisteredDispatcher;
