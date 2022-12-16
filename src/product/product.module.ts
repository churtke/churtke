import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { DatabaseModule } from 'src/database/database.module';
import { FilterGenerator } from 'src/common/filter/filter-generator';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ProductResolver, FilterGenerator],
})
export class ProductModule {}
