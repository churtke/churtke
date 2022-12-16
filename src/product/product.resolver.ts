import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';

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

  @Mutation(() => EditProductOutput)
  async editProduct(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @Args('input') input: EditProductInput,
    @CurrentUser() currentUser: User,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(_id, input, currentUser);
  }
}
