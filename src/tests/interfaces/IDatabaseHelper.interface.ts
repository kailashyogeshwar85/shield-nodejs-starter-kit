/* eslint-disable no-unused-vars */
export interface IDatabaseHelper {
  connectDatabase: () => Promise<unknown>;
  clearModel: (model: string) => Promise<unknown>;
  resetFixtures: () => Promise<unknown>;
}
