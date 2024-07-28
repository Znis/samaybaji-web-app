import type { Knex } from 'knex';
import { ReviewTargetType } from '../../enums/review';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
        CREATE OR REPLACE FUNCTION delete_associated_reviews_and_ratings()
        RETURNS TRIGGER AS $$
        BEGIN
          DELETE FROM ratings WHERE target_id = OLD.id AND target_type = TG_ARGV[0]::text;
          DELETE FROM reviews WHERE target_id = OLD.id AND target_type = TG_ARGV[0]::text;
          RETURN OLD;
        END;
        $$ LANGUAGE plpgsql;
      `);

  await knex.raw(`
        CREATE TRIGGER delete_associated_reviews_and_ratings_on_dish_delete
        AFTER DELETE ON dishes
        FOR EACH ROW
        EXECUTE FUNCTION delete_associated_reviews_and_ratings('${ReviewTargetType.DISH}');
      `);

  await knex.raw(`
        CREATE TRIGGER delete_associated_reviews_and_ratings_on_restaurant_delete
        AFTER DELETE ON restaurants
        FOR EACH ROW
        EXECUTE FUNCTION delete_associated_reviews_and_ratings('${ReviewTargetType.RESTAURANT}');
      `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(
    'DROP FUNCTION IF EXISTS delete_associated_reviews_and_ratings() CASCADE',
  );
}
