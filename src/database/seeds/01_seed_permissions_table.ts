import { Knex } from 'knex';
import Permissions from '../../enums/permissions';

export async function seed(knex: Knex): Promise<void> {
  await knex('permissions').del(); // Deletes ALL existing entries
  await knex('permissions').insert([
    { id: '1', name: Permissions.ADD_USERS },
    { id: '2', name: Permissions.DELETE_USERS },
    { id: '3', name: Permissions.EDIT_USERS },
    { id: '4', name: Permissions.VIEW_USERS },
    { id: '5', name: Permissions.ADD_RESTAURANTS },
    { id: '6', name: Permissions.DELETE_RESTAURANTS },
    { id: '7', name: Permissions.EDIT_RESTAURANTS },
    { id: '8', name: Permissions.VIEW_RESTAURANTS },
    { id: '9', name: Permissions.ADD_REVIEWS },
    { id: '10', name: Permissions.DELETE_REVIEWS },
    { id: '11', name: Permissions.EDIT_REVIEWS },
    { id: '12', name: Permissions.VIEW_REVIEWS },
    { id: '13', name: Permissions.CREATE_ORDERS },
    { id: '14', name: Permissions.EDIT_OWN_CREDENTIALS },
    { id: '15', name: Permissions.DELETE_OWN_ACCOUNT },
    { id: '16', name: Permissions.CREATE_RESTAURANT_PROFILE },
    { id: '17', name: Permissions.RECEIVE_ORDERS },
    { id: '18', name: Permissions.CANCEL_ORDERS },
    { id: '19', name: Permissions.MAINTAIN_MENU },
  ]);
}
