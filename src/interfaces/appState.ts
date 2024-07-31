import { IFormattedCartItemData } from './cartItem';
import { IAuthenticatedUser } from './users';

export interface AppState {
  accessToken: string | null;
  user: IAuthenticatedUser | null;
  cart: IFormattedCartItemData[];
}
