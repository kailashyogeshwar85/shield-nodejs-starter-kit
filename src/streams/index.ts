import { Logger } from '@zebpay/colt';
import LoggerFactory from '../factory/services/logger.factory';
import { IStreamOptions } from '../interfaces/IStream';
import KafkaStreamProvider from './providers/kafka.stream';

class Stream {
  private streamOptions: IStreamOptions;

  private logger: Logger;

  private loggerService: LoggerFactory;

  constructor(options: IStreamOptions, loggerService: LoggerFactory) {
    this.streamOptions = options;
    this.loggerService = loggerService;
    this.logger = loggerService.createLogger('stream');
  }

  /* eslint-disable no-undef */
  init(): StreamProvider {
    let provider: StreamProvider;
    const opts: IStreamOptions = this.streamOptions;
    this.logger.debug(`Configuring Stream TYPE:: ${opts.type}`);
    switch (this.streamOptions.type) {
      case 'kafka':
        provider = new KafkaStreamProvider(opts, this.loggerService);
        break;
      default:
        throw new Error(
          `Stream provider ${this.streamOptions.type} not supported`,
        );
    }

    return provider;
  }
}

export default Stream;
