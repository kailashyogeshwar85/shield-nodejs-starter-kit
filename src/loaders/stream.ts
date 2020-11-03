import { asFunction, asValue } from 'awilix';
import { IStreamOptions } from '../interfaces/IStream';
import Stream from '../streams';
import Config from '../config';
import DIHelper from '../utils/di.utils';

/**
 * @description Exports Stream Provider
 */
const streamFactory = async (): Promise<void> => {
  const container = DIHelper.getContainer();

  const options: IStreamOptions = {
    type: Config.STREAM_ADAPTER,
    connectOpts: {
      brokers: Config.STREAM_CONFIG.brokers,
    },
  };
  const streamProvider = new Stream(options).init();
  await streamProvider.createClient('some_group_id');

  container.register({
    streamProvider: asValue(streamProvider),
  });
};

export default streamFactory;
