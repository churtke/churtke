import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addProduct(
    user: User,
    input: AddProductInput,
  ): Promise<AddProductOutput> {
    const product = await this.productRepository.save({
      createdBy: user,
      title: input.title,
      description: input.description,
      price: input.price,
      quantity: input.quantity,
      picture: input.picture,
    });

    return {
      message: 'product added successfully',
      product,
    };
  }
}
