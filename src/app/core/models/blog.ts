import { User } from './user';

export interface Blog {
  _id: String;
  title: String;
  content: String;
  author: User;
  createAt: Date;
  likes: Array<User>;
  comments: Array<{
    user: User;
    content: String;
  }>;
  status: Boolean;
}
