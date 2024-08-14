import { Entity, PrimaryColumn, Column,OneToMany  } from 'typeorm';
import { OrderDetails } from './OrderDetail';

@Entity('order')
export class Order {
  @PrimaryColumn("bigint", { name: "id" })
  ID: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  USERID: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ADDRESS: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ORDER_PRICE: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  PAYMENT_TYPE: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  PAYMENT_STATUS: string;

  @Column({ type: 'timestamp', nullable: true })
  DATETIME: Date;

  
  @OneToMany(() => OrderDetails, orderDetails => orderDetails.ORDER_ID)
  orderDetails: OrderDetails[];
}
