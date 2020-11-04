import Queue from 'bull';
import { IJobProcessor } from './IQueue';

export default interface IJobCreator {
  add: (job: unknown, jobType?: string) => Promise<Queue.Job<unknown>>;
  process: () => IJobProcessor;
}
