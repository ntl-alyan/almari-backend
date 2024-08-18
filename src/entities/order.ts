import { Entity, PrimaryColumn, Column,OneToMany,JoinColumn  } from 'typeorm';
import { OrderDetails } from './OrderDetail';

@Entity("order", { schema: "public" })
export class Order {
  @PrimaryColumn("bigint", { name: "id" })
  ID: number;

  @Column({ name: "userid", type: 'varchar', length: 100, nullable: true })
  USERID: string;

  @Column({  name: "address", type: 'varchar', length: 1000, nullable: true })
  ADDRESS: string;

  @Column({  name: "order_price", type: 'varchar', length: 20, nullable: true })
  ORDER_PRICE: string;

  @Column({  name: "payment_type", type: 'varchar', length: 30, nullable: true })
  PAYMENT_TYPE: string;

  @Column({  name: "payment_status", type: 'varchar', length: 30, nullable: true })
  PAYMENT_STATUS: string;

  @Column({  name: "order_status", type: 'varchar', length: 50, nullable: true })
  ORDER_STATUS: string;

  @Column({  name: "datetime", type: 'timestamp', nullable: true })
  DATETIME: Date;

  
  @OneToMany(
    () => OrderDetails,
    (orderDetails) => orderDetails.orders
  ) //inverse relationin a entity
  @JoinColumn([
    { name: "id", referencedColumnName: "ORDER_ID" },
  ])
  orderDetails: OrderDetails[];
}
