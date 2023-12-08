export interface Transaction {
  _id: String;
  userId: String;
  items: [];
  count: Number;
  amout: Number;
  payer: Object;
  transactionType: String;
  transactionDate: Date;
  status: Transaction;
}
