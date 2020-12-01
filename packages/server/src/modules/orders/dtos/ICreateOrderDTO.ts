import { Costumer } from '../../costumers/infra/typeorm/models/Costumer';
import { OrderItem } from '../infra/typeorm/models/OrderItem';

export default interface ICreateOrderDTO {
  costumer: Costumer;
  items: OrderItem[];
  totalPrice: number;
}
