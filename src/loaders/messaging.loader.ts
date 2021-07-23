import { asValue, AwilixContainer } from 'awilix';
import { IMessagingOptions } from '../interfaces/IMessaging.interface';
import Messaging from '../messaging';
import Config from '../constants/config.constants';
/**
 * @description Exports Messaging Provider
 */
const messagingFactory = async (container: AwilixContainer): Promise<void> => {
  const messagingOptions: IMessagingOptions = {
    type: Config.MESSAGING_ADAPTER,
    connectOpts: Config.MESSAGING_CONFIG,
  };

  const messagingProvider = new Messaging(
    messagingOptions,
    container.resolve('logger'),
  ).init();

  await messagingProvider.createClient(Config.MESSAGING_CONSUMER_GROUP);

  container.register({
    messagingProvider: asValue(messagingProvider),
  });
};

export default messagingFactory;
