import knex, { Knex } from 'knex';
import db from '../utils/db';

export class BaseModel {
  static connection: Knex = db;

  /**
   * Returns the query builder instance for the current model.
   *
   * @return {Knex} The query builder instance.
   */
  static queryBuilder() {
    return this.connection;
  }
}
