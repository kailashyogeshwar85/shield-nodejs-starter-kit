import { KafkaConfig, ProducerRecord } from 'kafkajs';

export interface IStreamOptions {
  type: string;
  connectOpts: KafkaConfig;
}

export interface IStreamProvider {
  createClient: (consumerGroupId: string) => void;
  // eslint-disable-next-line no-undef
  subscribe: (topic: string, handler: MessageHandler) => Promise<void>;
  publish: (message: ProducerRecord) => Promise<void>;
}
