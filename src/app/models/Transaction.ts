export interface Transaction {
  _id: Object;
  userId: String;
  items: [];
  count: Number;
  amout: Number;
  payer: Object;
  transactionType: String;
  transactionDate: Date;
  status: Transaction;
}
