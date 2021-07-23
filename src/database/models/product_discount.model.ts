import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { IProductDiscountAttributes } from '../../interfaces/model_interfaces/IProductDiscountAttributes';

@Table({
  tableName: 'product_discount',
  timestamps: false,
  underscored: false,
})
export default class ProductDiscount
  extends Model<ProductDiscount>
  implements IProductDiscountAttributes {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
  })
  description?: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: 'discount_percent',
  })
  discountPercent: number;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  active: boolean;

  @ForeignKey(() => Product)
  categoryId: number;

  @Column({
    type: DataType.DATE,
    field: 'created_at',
    allowNull: false,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'updated_at',
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: null,
    field: 'deleted_at',
  })
  deletedAt?: Date;
}
