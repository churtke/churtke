import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { GetProductOutput } from './dto/get-product.dto';
import { GetProductsInput, GetProductsOutput } from './dto/get-products.dto';
import { ProductFilter } from './product.filter';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';

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

  async editProduct(
    user: User,
    id: number,
    input: EditProductInput,
  ): Promise<EditProductOutput> {
    const p = await this.productRepository.findOneBy({
      id,
    });

    if (!p) throw new NotFoundException();

    Object.assign(p, input);

    const product = await this.productRepository.save(p);

    return {
      message: 'product edited successfully',
      product,
    };
  }

  async getProduct(user: User, id: number): Promise<GetProductOutput> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException();

    return {
      message: 'product was found successfully',
      product,
    };
  }

  async getProducts(
    user: User,
    input: GetProductsInput,
  ): Promise<GetProductsOutput> {
    const filters = new ProductFilter(input);

    const products = await this.productRepository.find({
      relations: ['createdBy'],
      where: filters.getFilters(),
      ...filters.getOptions(),
    });

    const totalCount = await this.productRepository.countBy(
      filters.getFilters(),
    );

    return {
      message: 'products was found successfully',
      products,
      pagination: { page: input.page, totalCount },
    };
  }
}
