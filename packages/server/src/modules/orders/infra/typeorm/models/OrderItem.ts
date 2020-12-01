import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { ObjectType, Field, ID, Int, Float } from 'type-graphql';

import { Order } from './Order';
import { Product } from '../../../../products/infra/typeorm/models/Product';

@ObjectType()
@Entity('orders_items')
export class OrderItem extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Order)
  @ManyToOne(() => Order)
  order: Order;

  @Field(() => Product)
  @ManyToOne(() => Product, { eager: true })
  product: Product;

  @Field(() => Int)
  @Column({ type: 'int' })
  quantity: number;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
