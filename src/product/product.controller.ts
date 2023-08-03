import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { Permission } from 'src/permission/permission.decorator';
import { Action } from 'src/user/role/role.constant';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { ProductService } from './product.service';
import { GetProductsOutput } from './dto/get-products.dto';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { GetProductOutput } from './dto/get-product.dto';
import { GetProductsInput } from 'src/product/dto/get-products.dto';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Permission(Action.PRODUCT_ADD)
  @Post()
  async addProduct(
    @CurrentUser() user: User,
    @Body() input: AddProductInput,
  ): Promise<AddProductOutput> {
    return this.productService.addProduct(user, input);
  }

  @Permission(Action.PRODUCT_EDIT)
  @Put(':id')
  async editProduct(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() input: EditProductInput,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(user, id, input);
  }

  @Permission(Action.PRODUCT_VIEW)
  @Get(':id')
  async getProduct(
    @CurrentUser() user: User,
    @Param('id') id: number,
  ): Promise<GetProductOutput> {
    return this.productService.getProduct(user, id);
  }

  @Permission(Action.PRODUCT_VIEW)
  @Get()
  async getProducts(
    @CurrentUser() user: User,
    @Query() input: GetProductsInput,
  ): Promise<GetProductsOutput> {
    return this.productService.getProducts(user, input);
  }
}
