import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { Permission } from 'src/permission/permission.decorator';
import { Action } from 'src/user/role/role.constant';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/user.entity';
import { ProductService } from './product.service';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
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
  @Put('/:id')
  async editProduct(
    @CurrentUser() user: User,
    @Param('id') id: number,
    @Body() input: EditProductInput,
  ): Promise<EditProductOutput> {
    return this.productService.editProduct(user, id, input);
  }
}
