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

export interface IMessagingOptions {
  type: string;
  // eslint-disable-next-line no-undef
  connectOpts: MessagingConnectOpts;
}

export interface IMessagingProvider {
  createClient: (consumerGroupId: string) => void;
  // eslint-disable-next-line no-undef
  subscribe: (topic: string, handler: MessageHandler) => Promise<void>;
  publish: (message: ProducerRecord) => Promise<void>;
}
