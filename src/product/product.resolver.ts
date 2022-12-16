import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { CurrentUser } from 'src/user/current-user.decorator';
import { User } from 'src/user/schema/user.schema';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';
import { ObjectIdScalar } from 'src/common/scalar/object-id.scalar';
import { Types } from 'mongoose';
import { RemoveProductOutput } from './dto/remove-product.dto';
import { GetProductOutput } from './dto/get-product.dto';
import { FilterProductsInput, GetProductsOutput } from './dto/get-products.dto';

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

  @Mutation(() => RemoveProductOutput)
  async removeProduct(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<RemoveProductOutput> {
    return this.productService.removeProduct(_id, currentUser);
  }

  @Query(() => GetProductOutput)
  async getProduct(
    @Args('_id', { type: () => ObjectIdScalar }) _id: Types.ObjectId,
    @CurrentUser() currentUser: User,
  ): Promise<GetProductOutput> {
    return this.productService.getProduct(_id, currentUser);
  }

  @Query(() => GetProductsOutput)
  async getProducts(
    @Args('input') input: FilterProductsInput,
    @CurrentUser() currentUser: User,
  ): Promise<GetProductsOutput> {
    return this.productService.getProducts(input, currentUser);
  }
}
