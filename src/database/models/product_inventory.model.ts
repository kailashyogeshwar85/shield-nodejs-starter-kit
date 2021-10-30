import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { IProductInventoryAttributes } from '../../interfaces/model_interfaces/IProductInventoryAttributes';

@Table({
  tableName: 'product_inventory',
  timestamps: false,
  underscored: false,
})
export default class ProductInventory
  extends Model<ProductInventory>
  implements IProductInventoryAttributes {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    autoIncrementIdentity: true,
  })
  id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity: number;

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
