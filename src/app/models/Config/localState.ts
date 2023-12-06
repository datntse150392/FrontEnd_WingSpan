import { Cart } from '../Cart.model';
import { User } from '../UserModel';

export interface ConfigLocal {
  userInfo: User;
  cartItems?: Cart | undefined;
}
