import Queue from 'bull';

export default interface IQueue<T> {
  configure: (queueName: string) => Promise<T>;
  registerProcessor: (
    queueName: string,
    // eslint-disable-next-line no-undef
    processor: JobProcessor,
    jobCategory?: string,
  ) => void;
  addJob: (
    queueName: string,
    jobData: unknown,
    jobCategory?: string,
  ) => Promise<Queue.Job<any>>;
  purge: (queueName: string, gracePeriod: number) => void;
}

export interface IJobProcessor {
  (job: Queue.Job<any>, done: Queue.DoneCallback);
}
