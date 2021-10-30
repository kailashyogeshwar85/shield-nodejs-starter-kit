import { Column, DataType, Table, Model } from 'sequelize-typescript';
import { IProductCategoryAttributes } from '../../interfaces/model_interfaces/IProductCategoryAttributes';

@Table({
  tableName: 'product_category',
  timestamps: false,
  underscored: false,
})
export default class ProductCategory
  extends Model<ProductCategory>
  implements IProductCategoryAttributes {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
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
  description: string;

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
