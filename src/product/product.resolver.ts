import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schema/user.schema';

@Resolver()
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => AddProductOutput)
  async addProduct(
    @Args('input') input: AddProductInput,
    @CurrentUser() currentUser: User,
  ): Promise<AddProductOutput> {
    return this.productService.addProduct(input, currentUser);
  }
}
