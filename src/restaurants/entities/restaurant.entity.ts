import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field((type) => String)
  @Column()
  name: String;

  @Field((type) => Boolean, { nullable: true })
  @Column()
  isVegan?: Boolean;

  @Field((type) => String)
  @Column()
  address: String;

  @Field((type) => String)
  @Column()
  ownerName: String;
}
