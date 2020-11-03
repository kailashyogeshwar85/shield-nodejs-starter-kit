import { IStreamOptions } from '../interfaces/IStream';
import KafkaStreamProvider from './providers/kafka.stream';

class Stream {
  private streamOptions: IStreamOptions;

  constructor(options: IStreamOptions) {
    this.streamOptions = options;
  }

  /* eslint-disable no-undef */
  init(): StreamProvider {
    let provider: StreamProvider;

    switch (this.streamOptions.type) {
      case 'kafka':
        provider = new KafkaStreamProvider(this.streamOptions.connectOpts);
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
