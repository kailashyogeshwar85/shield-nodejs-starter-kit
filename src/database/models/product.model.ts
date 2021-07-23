import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { IProductAtributes } from '../../interfaces/model_interfaces/IProductAttributes';
import ProductCategory from './product_category.model';
import ProductDiscount from './product_discount.model';
import ProductInventory from './product_inventory.model';

@Table({
  tableName: 'products',
  timestamps: false,
  underscored: false,
})
export default class Product
  extends Model<Product>
  implements IProductAtributes {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: true,
    autoIncrementIdentity: true,
    field: 'id',
  })
  productId: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'product_code',
  })
  productCode: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    field: 'product_description',
  })
  productDescription: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    field: 'product_name',
  })
  productName: string;

  @Column({
    type: DataType.DECIMAL(18, 2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => ProductCategory)
  categoryId: number;

  @ForeignKey(() => ProductInventory)
  inventoryId: number;

  @ForeignKey(() => ProductDiscount)
  discountId?: number;

  @BelongsTo(() => ProductCategory)
  category: ProductCategory;

  @BelongsTo(() => ProductDiscount)
  discount: ProductDiscount;

  @BelongsTo(() => ProductInventory)
  inventory: ProductInventory;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    field: 'updated_at',
    allowNull: false,
  })
  updatedAt: Date;
}
