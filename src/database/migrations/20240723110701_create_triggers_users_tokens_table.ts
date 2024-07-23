import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create the function to delete expired tokens
  await knex.raw(`
    CREATE OR REPLACE FUNCTION delete_expired_tokens() RETURNS TRIGGER AS $$
    BEGIN
      DELETE FROM users_tokens WHERE expiry_time <= NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `);

  // Create the trigger to call the function before insert and update
  await knex.raw(`
    CREATE TRIGGER trigger_delete_expired_tokens
    BEFORE INSERT OR UPDATE ON users_tokens
    FOR EACH ROW EXECUTE FUNCTION delete_expired_tokens();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        DROP TRIGGER IF EXISTS trigger_delete_expired_tokens ON users_tokens;
      `);

  await knex.raw(`
        DROP FUNCTION IF EXISTS delete_expired_tokens;
      `);
}
