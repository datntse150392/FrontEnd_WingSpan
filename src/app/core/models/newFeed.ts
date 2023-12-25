import { User } from './user';

export interface NewFeed {
  _id: string;
  title: string;
  description: string;
  image: string;
  footer: string;
  postDate: Date;
  author: User;
  priority: number;
}
