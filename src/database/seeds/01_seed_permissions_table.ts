import { Knex } from 'knex';
import { Permissions } from '../../enums/permissions';

export async function seed(knex: Knex): Promise<void> {
  await knex('permissions').del(); // Deletes ALL existing entries
  await knex('permissions').insert([
    { id: '1', name: Permissions.ADD_USER },
    { id: '2', name: Permissions.DELETE_USER },
    { id: '3', name: Permissions.EDIT_USER },
    { id: '4', name: Permissions.VIEW_USER },

    { id: '5', name: Permissions.CREATE_RESTAURANT },
    { id: '6', name: Permissions.DELETE_RESTAURANT },
    { id: '7', name: Permissions.EDIT_RESTAURANT },
    { id: '8', name: Permissions.VIEW_RESTAURANT },

    { id: '9', name: Permissions.ADD_REVIEW },
    { id: '10', name: Permissions.DELETE_REVIEW },
    { id: '11', name: Permissions.EDIT_REVIEW },
    { id: '12', name: Permissions.VIEW_REVIEW },

    { id: '13', name: Permissions.CREATE_ORDER },
    { id: '14', name: Permissions.EDIT_ORDER },
    { id: '15', name: Permissions.VIEW_ORDER },
    { id: '16', name: Permissions.CANCEL_ORDER },

    { id: '17', name: Permissions.EDIT_CART },
    { id: '18', name: Permissions.VIEW_CART },

    { id: '19', name: Permissions.PROCESS_ORDER },
    { id: '20', name: Permissions.MAINTAIN_MENU },
  ]);
}
