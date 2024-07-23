const Permissions: { [key: string]: string } = {
  ADD_USERS: 'add_users',
  DELETE_USERS: 'delete_users',
  EDIT_USERS: 'edit_users',
  VIEW_USERS: 'view_users',
  ADD_RESTAURANTS: 'add_restaurants',
  DELETE_RESTAURANTS: 'delete_restaurants',
  EDIT_RESTAURANTS: 'edit_restaurants',
  VIEW_RESTAURANTS: 'view_restaurants',
  ADD_REVIEWS: 'add_reviews',
  DELETE_REVIEWS: 'delete_reviews',
  EDIT_REVIEWS: 'edit_reviews',
  VIEW_REVIEWS: 'view_reviews',
  CREATE_ORDERS: 'create_orders',
  EDIT_OWN_CREDENTIALS: 'edit_own_credentials',
  DELETE_OWN_ACCOUNT: 'delete_own_account',
  CREATE_RESTAURANT_PROFILE: 'create_restaurant_profile',
  RECEIVE_ORDERS: 'receive_orders',
  CANCEL_ORDERS: 'cancel_orders',
  MAINTAIN_MENU: 'maintain_menu',
};

export default Permissions;
