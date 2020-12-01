import costumerResolvers from '../../modules/costumers/infra/graphql/resolvers';
import orderResolvers from '../../modules/orders/infra/graphql/resolvers';
import productResolvers from '../../modules/products/infra/graphql/resolvers';

export default [
  ...costumerResolvers,
  ...orderResolvers,
  ...productResolvers,
] as any;
