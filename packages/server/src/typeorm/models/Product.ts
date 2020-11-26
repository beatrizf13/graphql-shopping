import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import {
  ObjectType, Field, ID, Float, Int,
} from 'type-graphql';

@ObjectType()
@Entity('products')
export class Product extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  description: string;

  @Field(() => String)
  @Column({ type: 'varchar' })
  imageUrl: string;

  @Field(() => Float)
  @Column({ type: 'float' })
  price: number;

  @Field(() => Int)
  @Column({ type: 'int', default: 0 })
  quantity: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
