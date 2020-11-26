import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import {
  ObjectType, Field, ID, Float,
} from 'type-graphql';
import { Costumer } from './Costumer';
import { OrderItem } from './OrderItem';

@ObjectType()
@Entity('orders')
export class Order extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Costumer)
  @ManyToOne(() => Costumer)
  costumer: Costumer;

  @Field(() => [OrderItem])
  @OneToMany(() => OrderItem, (item) => item.order, { eager: true })
  items: OrderItem[];

  @Field(() => Float)
  @Column({ type: 'float' })
  totalPrice: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
