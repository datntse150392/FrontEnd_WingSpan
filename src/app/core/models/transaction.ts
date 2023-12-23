import { Course } from './course';

export interface Transaction {
  _id: String;
  userId: String;
  items: Course[];
  count: Number;
  amount: Number;
  payer: Object;
  transactionType: String;
  transactionDate: Date;
  status: Transaction;
}
