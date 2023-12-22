export interface Voucher {
  _id: string;
  code: string;
  courseId: string | null;
  maxUses: number | null;
  discount: number;
  usedCount: number;
  expirationDate: Date;
  status: string;
  type: string;
  image: string;
}
