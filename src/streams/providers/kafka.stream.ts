import {
  Kafka,
  KafkaConfig,
  Producer,
  Consumer,
  ProducerRecord,
  EachMessagePayload,
} from 'kafkajs';
import { IStreamProvider } from '../../interfaces/IStream';

class KafkaStreamProvider implements IStreamProvider {
  private clientOpts: KafkaConfig;

  private client: Kafka;

  private producer: Producer;

  private consumer: Consumer;

  // eslint-disable-next-line no-undef
  private messageHandlers: Map<string, MessageHandler>;

  constructor(connectOpts: KafkaConfig) {
    this.clientOpts = connectOpts;
  }

  createClient(consumerGroupId: string): void {
    this.client = new Kafka(this.clientOpts);
    this.producer = this.client.producer();
    this.consumer = this.client.consumer({
      groupId: consumerGroupId,
    });
    this.messageHandlers = new Map();
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
}

export default KafkaStreamProvider;
