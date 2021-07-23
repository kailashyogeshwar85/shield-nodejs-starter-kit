export interface IProductDiscountAttributes {
  id: number;
  name: string;
  description?: string;
  discountPercent: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
