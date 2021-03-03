import { Application } from 'express';
import { AwilixContainer } from 'awilix';
import * as Sequelize from 'sequelize-typescript';
import { Model } from 'sequelize-typescript';
import Queue from 'bull';
import { KafkaMessage } from 'kafkajs';
import KafkaStreamProvider from '../../messaging/providers/kafka.messaging';
import RedisQueueService from '../../queue/plugins/redis.queue';
import { IKafkaConnectOpts } from '../../interfaces/IMessaging.interface';
import { IUtils } from '../../interfaces/IUtils.interface';

declare global {
  type JobProcessor = (job: Queue.Job, done: Queue.DoneCallback) => void;
  type QueueService = RedisQueueService;
  type MessageHandler = (message: KafkaMessage) => void;
  type MessagingProvider = KafkaStreamProvider; // add more stream providers here
  type MessagingConnectOpts = IKafkaConnectOpts;

  type SubscribeHandler = (message: unknown) => void;

  // Ensure we can not pass regular map to our custom functions
  type EventTypeMap = {
    [Key in string]: SubscribeHandler;
  };

  // type EventSubscriberMap = Map<string, EventTypeMap>;
  type EventSubscriberMap = {
    [type: string]: EventTypeMap;
  };

  type LoaderDependencies = {
    app: Application;
    container: AwilixContainer;
  };

  type injectorDependencies = {
    sequelize: Sequelize.Sequelize;
    utils: IUtils;
    container: AwilixContainer;
  };

  type modelDependency = {
    name: string;
    model: any;
  };

  type ModelList = 'User' | 'Todo';

  type TModel<M extends ModelList> = {
    [model in M]: typeof Model;
  };

  type loaderDependencies = {
    app: Application;
    container: AwilixContainer;
  };

  // For Sequelize Typecasting support
  type NonAbstract<T> = { [P in keyof T]: T[P] };
  type Constructor<T> = new () => T;

  type Models<T> = Constructor<T> & NonAbstract<typeof Model>;
}
