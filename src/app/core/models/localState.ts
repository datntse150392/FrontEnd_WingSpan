import { Cart } from './cart';
import { User } from './user';

export interface ConfigLocal {
  userInfo: User;
  cartItems?: Cart | undefined;
}
