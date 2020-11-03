import Queue from 'bull';
import { KafkaMessage } from 'kafkajs';
import KafkaStreamProvider from '../../streams/providers/kafka.stream';
import RedisQueueService from '../../queue/plugins/redis';
import { IKafkaConnectOpts } from '../../interfaces/IStream';

declare global {
  type JobProcessor = (job: Queue.Job, done: Queue.DoneCallback) => void;
  type QueueService = RedisQueueService;
  type MessageHandler = (message: KafkaMessage) => void;
  type StreamProvider = KafkaStreamProvider; // add more stream providers here
  type StreamConnectOpts = IKafkaConnectOpts;
}
