import { Course } from './CourseModel';

export interface Cart {
  _id: Object;
  userId: String;
  items: Course[];
  count: Number;
}
