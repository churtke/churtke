import { Module } from '@nestjs/common';
import { ObjectIdScalar } from './scalar/object-id.scalar';

@Module({
  providers: [ObjectIdScalar],
})
export class CommonModule {}
