// NPM Modules
import knex from 'knex';
import knexConfigs from '../knex.configs';

// Local Modules
import { LoggerUtil } from '../src/utils';

function up(pg) {
  return pg.schema

    .createTable('member', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('pwd').notNullable();
      table.string('role').notNullable();
      table.dateTime('created_at');
      table.dateTime('updated_at');
    })
    .createTable('text1', (table) => {
      table.increments('id').primary();
      table.text('title').notNullable();
      table.text('text').notNullable();
      table.text('subtitle1');
      table.text('subtitle2');
      table.dateTime('created_at');
      table.dateTime('updated_at');
    });
}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();
