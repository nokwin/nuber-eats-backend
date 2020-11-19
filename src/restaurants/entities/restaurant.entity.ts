import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field((type) => Number)
  @PrimaryGeneratedColumn()
  id: Number;

  @Field((type) => String)
  @Column()
  @IsString()
  @Length(5)
  name: String;

  @Field((type) => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsOptional()
  @IsBoolean()
  isVegan: Boolean;

  @Field((type) => String)
  @Column()
  @IsString()
  address: String;

  @Field((type) => String)
  @Column()
  @IsString()
  ownerName: String;
}
