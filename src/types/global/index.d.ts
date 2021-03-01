import Queue from 'bull';
import { KafkaMessage } from 'kafkajs';
import KafkaStreamProvider from '../../messaging/providers/kafka.messaging';
import RedisQueueService from '../../queue/plugins/redis.queue';
import { IKafkaConnectOpts } from '../../interfaces/IMessaging.interface';

declare global {
  type JobProcessor = (job: Queue.Job, done: Queue.DoneCallback) => void;
  type QueueService = RedisQueueService;
  type MessageHandler = (message: KafkaMessage) => void;
  type MessagingProvider = KafkaStreamProvider; // add more stream providers here
  type MessagingConnectOpts = IKafkaConnectOpts;

  type SubscribeHandler = (message: unknown) => void;

  type EventTypeMap = Map<symbol, SubscribeHandler>;
  type EventSubscriberMap = Map<string, EventTypeMap>;
}
