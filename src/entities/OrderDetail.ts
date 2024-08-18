import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Order } from './order'; // Assuming the Order entity is in the same directory

@Entity("order_details", { schema: "public" })
export class OrderDetails {
    @PrimaryColumn("bigint", { name: "id" })
    ID: number;


  @Column("bigint", { name: "order_id", nullable: true })
  ORDER_ID: string | null;

  @Column({ name: 'item_title',type: 'varchar', length: 100, nullable: true })
  ITEM_TITLE: string;

  @Column({ name: 'item_price', type: 'varchar', length: 20, nullable: true })
  ITEM_PRICE: string;

  @Column({ name: 'itemlink', type: 'varchar', length: 1000, nullable: true })
  ITEM_LINK: string;

  @Column({ name: 'image', type: 'varchar', length: 1000, nullable: true })
  IMAGE: string;

  @Column({ name: 'description', type: 'varchar', length: 1000, nullable: true })
  DESCRIPTION: string;

  @Column({ name: 'datetime', type: 'timestamp', nullable: true })
  DATETIME: Date;

  @ManyToOne((type) => Order) // no inverse in many to one
  @JoinColumn([
    { name: "order_id", referencedColumnName: "ID" },
  ])
  orders: Order;

}
