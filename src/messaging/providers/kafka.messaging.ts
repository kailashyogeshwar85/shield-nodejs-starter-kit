import { Logger } from '@zebpay/colt';
import {
  Kafka,
  KafkaConfig,
  Producer,
  Consumer,
  ProducerRecord,
  EachMessagePayload,
  logLevel,
} from 'kafkajs';
import _ from 'lodash';
import LoggerFactory from '../../factory/services/logger.service.factory';
import {
  IKafkaConnectOpts,
  IMessagingOptions,
  IMessagingProvider,
} from '../../interfaces/IMessaging.interface';

class KafkaStreamProvider implements IMessagingProvider {
  private clientOpts: KafkaConfig;

  private client: Kafka;

  private producer: Producer;

  private consumer: Consumer;

  private logger: Logger;

  // eslint-disable-next-line no-undef
  private messageHandlers: Map<string, MessageHandler>;

  constructor(opts: IMessagingOptions, loggerService: LoggerFactory) {
    this.clientOpts = this.getConnectOpts(opts.connectOpts);
    this.logger = loggerService.createLogger('kafka');
  }

  async createClient(consumerGroupId: string): Promise<void> {
    this.client = new Kafka(this.clientOpts);
    this.producer = this.client.producer();
    this.consumer = this.client.consumer({
      groupId: consumerGroupId,
    });
    this.messageHandlers = new Map();
    this.listenForEvents();
    await this.connectConsumer();
    await this.connectProducer();
  }

  private async connectProducer(): Promise<void> {
    await this.producer.connect();
  }

  private async connectConsumer(): Promise<void> {
    await this.consumer.connect();
    this.beginProcessingMessage();
  }

  // eslint-disable-next-line no-undef
  async subscribe(topic: string, handler: MessageHandler): Promise<void> {
    await this.consumer.subscribe({ topic, fromBeginning: false });
    this.registerHandlers(topic, handler);
  }

  async publish(messages: ProducerRecord): Promise<void> {
    await this.producer.send(messages);
  }

  // eslint-disable-next-line no-undef
  private registerHandlers(topic: string, handler: MessageHandler): void {
    if (!this.messageHandlers.has(topic)) {
      this.messageHandlers.set(topic, handler);
    }
  }

  private beginProcessingMessage(): void {
    this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        if (this.messageHandlers.has(topic)) {
          // eslint-disable-next-line no-undef
          this.messageHandlers.get(topic)(message);
        }
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  private getConnectOpts(opts: IKafkaConnectOpts): KafkaConfig {
    const connectOpts: KafkaConfig = {
      brokers: _.split(opts.brokers, ','),
      logLevel: logLevel.ERROR,
    };

    return _.merge(opts, connectOpts);
  }

  private listenForEvents() {
    this.producer.on('producer.connect', () => {
      this.logger.debug('Producer connected');
    });

    this.producer.on('producer.disconnect', () => {
      this.logger.debug('Producer disconnected');
    });

    this.consumer.on('consumer.connect', () => {
      this.logger.debug('Consumer connected');
    });

    this.consumer.on('consumer.disconnect', () => {
      this.logger.debug('Consumer disconnected');
    });

    this.consumer.on('consumer.crash', e => {
      this.logger.error('Consumer Crashed ', e);
    });
  }
}

export default KafkaStreamProvider;
