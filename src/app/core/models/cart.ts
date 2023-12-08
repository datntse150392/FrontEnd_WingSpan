import { Course } from './course';

export interface Cart {
  _id: String;
  userId: String;
  items: Course[];
  count: Number;
}
