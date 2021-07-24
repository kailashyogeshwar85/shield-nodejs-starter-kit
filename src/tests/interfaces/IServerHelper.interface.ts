/* eslint-disable import/no-extraneous-dependencies */
import * as supertest from 'supertest';
import DatabaseHelper from '../test-helpers/database.helper';
import ShieldApplication from '../../app';
import RequestMocker from '../test-helpers/request_mocker.helper';

export default interface IServerHelper {
  server: ShieldApplication;
  databaseHelper: DatabaseHelper;
  request: supertest.SuperTest<supertest.Test>;
  requestMocker: RequestMocker;
}
