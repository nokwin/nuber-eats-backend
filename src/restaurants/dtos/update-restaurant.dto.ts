import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateRestaurantDTO } from './create-restaurant.dto';

@InputType()
export class UpdateRestaurantInputType extends PartialType(
  CreateRestaurantDTO,
) {
  @Field((type) => Boolean, { nullable: true })
  isVegan: Boolean;
}

@InputType()
export class UpdateRestaurantDTO {
  @Field((type) => Number)
  id: number;

  @Field((type) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
