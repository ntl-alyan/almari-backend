import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn,OneToMany } from 'typeorm';
import { Order } from './order'; // Assuming the Order entity is in the same directory

@Entity('order_details')
export class OrderDetails {
    @PrimaryColumn("bigint", { name: "id" })
    ID: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  ORDER_ID: Order;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ITEMTITLE: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  ITEMPRICE: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  ITEMLINK: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  IMAGE: string;

  @Column({ type: 'varchar', length: 1000, nullable: true })
  DESCRIPTION: string;

  @Column({ type: 'timestamp', nullable: true })
  DATETIME: Date;

}
