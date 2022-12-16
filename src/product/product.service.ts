import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { User } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async addProduct(
    input: AddProductInput,
    currentUser: User,
  ): Promise<AddProductOutput> {
    const product = await this.productModel.create({
      _createdBy: currentUser._id,
      ...input,
    });

    return {
      message: 'product added successfully',
      product,
    };
  }
}
