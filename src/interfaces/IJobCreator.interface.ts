import Queue from 'bull';
import { IJobProcessor } from './IQueue.interface';

export default interface IJobCreator {
  add: (job: unknown, jobType?: string) => Promise<Queue.Job<unknown>>;
  process: () => IJobProcessor;
}
