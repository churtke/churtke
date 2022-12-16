import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { AddProductInput, AddProductOutput } from './dto/add-product.dto';
import { User } from 'src/user/schema/user.schema';
import { Model, Types } from 'mongoose';
import { EditProductInput, EditProductOutput } from './dto/edit-product.dto';
import { RemoveProductOutput } from './dto/remove-product.dto';
import { FilterProductsInput, GetProductsOutput } from './dto/get-products.dto';
import { ProductFilter } from './model/product.filter';
import { FilterGenerator } from 'src/common/filter/filter-generator';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    private readonly filterGenerator: FilterGenerator,
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

  async editProduct(
    _id: Types.ObjectId,
    input: EditProductInput,
    currentUser: User,
  ): Promise<EditProductOutput> {
    const product = await this.productModel.findOneAndUpdate(
      { _createdBy: currentUser._id, _id },
      { ...input },
      { new: true },
    );

    if (!product) throw new NotFoundException();

    return {
      message: 'product edited successfully',
      product,
    };
  }

  async removeProduct(
    _id: Types.ObjectId,
    currentUser: User,
  ): Promise<RemoveProductOutput> {
    const product = await this.productModel.findOneAndRemove(
      { _createdBy: currentUser._id, _id },
      { new: true },
    );

    if (!product) throw new NotFoundException();

    return {
      message: 'product removed successfully',
      product,
    };
  }

  async getProduct(
    _id: Types.ObjectId,
    currentUser: User,
  ): Promise<RemoveProductOutput> {
    const product = await this.productModel.findOne({
      _createdBy: currentUser._id,
      _id,
    });

    if (!product) throw new NotFoundException();

    return {
      message: 'product was found successfully',
      product,
    };
  }

  async getProducts(
    input: FilterProductsInput,
    currentUser: User,
  ): Promise<GetProductsOutput> {
    const filters = new ProductFilter(input, { _createdBy: currentUser._id });

    const products = await this.productModel.find(
      filters.getFilterQuery(),
      {},
      filters.getQueryOptions(),
    );

    const totalCount = await this.productModel.count(filters.getFilterQuery());

    return {
      message: 'products was found successfully',
      products,
      pagination: { page: input.page, totalCount },
      filters: await this.filterGenerator.generate(input),
    };
  }
}
