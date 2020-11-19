import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';

@Resolver((of) => Restaurant)
export class RestaurantResolver {
  @Query((returns) => [Restaurant])
  restaurants(@Args('veganOnly') veganOnly: Boolean): Restaurant[] {
    return [];
  }

  @Mutation((returns) => Boolean)
  createRestaurant(@Args() createRestaurantDTO: CreateRestaurantDTO) {
    console.log(createRestaurantDTO);
    return true;
  }
}
