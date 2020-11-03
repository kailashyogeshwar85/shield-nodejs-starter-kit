import { ProducerRecord } from 'kafkajs';

export interface IKafkaConnectOpts {
  brokers: string;
  ssl?: boolean;
  sasl?: {
    mechanism: string;
    username: string;
    password: string;
  };
}

export interface IStreamOptions {
  type: string;
  // eslint-disable-next-line no-undef
  connectOpts: StreamConnectOpts;
}

export interface IStreamProvider {
  createClient: (consumerGroupId: string) => void;
  // eslint-disable-next-line no-undef
  subscribe: (topic: string, handler: MessageHandler) => Promise<void>;
  publish: (message: ProducerRecord) => Promise<void>;
}
