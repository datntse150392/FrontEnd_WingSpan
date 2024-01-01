import { User } from './user';

export interface ChatRoom {
  _id: string;
  name: string;
  createAt: Date;
  status: Boolean;
  studentCount: number;
  user: User[];
  messages: [];
  thumbnail: string;
}
