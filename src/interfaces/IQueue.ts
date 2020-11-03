export default interface IQueue<T> {
  configure: (queueName: string) => Promise<T>;
  purge: () => void;
}
