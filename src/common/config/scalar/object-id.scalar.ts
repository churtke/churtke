import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';
import { Types } from 'mongoose';

@Scalar('ObjectId')
export class ObjectIdScalar implements CustomScalar<string, Types.ObjectId> {
  description = 'Mongo object id scalar type';

  parseValue(value: string): Types.ObjectId {
    return new Types.ObjectId(value);
  }

  serialize(value: Types.ObjectId): string {
    return value.toString();
  }

  parseLiteral(ast: ValueNode): Types.ObjectId {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value);
    }
    return null;
  }
}
