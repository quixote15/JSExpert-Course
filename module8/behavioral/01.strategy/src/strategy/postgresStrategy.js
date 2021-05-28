import knex from 'knex';

export default class PostgresStrategy {
  #instance

  constructor(connectionString) {
    this.connectionString = connectionString;
    this.table = 'warriors'; // not recommended
  }

  async connect() {
    console.log('connected to postgress!')
    this.#instance = knex({
      client: 'pg',
      connection: this.connectionString
    });

    return this.#instance.raw('select 1+1 as result');
  }

  async create(item) {
    return this.#instance
      .insert(item)
      .into(this.table)
  }

  async read(item) {
    return this.#instance
      .select()
      .from(this.table)
  }
}