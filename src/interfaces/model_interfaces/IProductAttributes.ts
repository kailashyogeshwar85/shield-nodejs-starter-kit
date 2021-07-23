export interface IProductAtributes {
  productId?: number;
  productCode: string;
  productName: string;
  productDescription: string;
  categoryId?: number;
  inventoryId?: number;
  discountId?: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}
