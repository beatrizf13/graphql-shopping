import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import EmptyCart from '../../components/EmptyCart';
import Input from '../../components/Input';
import { useCart } from '../../hooks/cart';
import { formatValue } from '../../utils/formatValue';

import {
  Container,
  Product,
  ProductsList,
  ProductInfo,
  ProductTotal,
  TotalInfo,
  TotalItens,
  TotalValue,
  PaymentInfo,
  CompletionContainer,
  CardTitle,
  InputAndDescription,
} from './styles';
import { useOrder, ICreateOrderItem } from '../../hooks/order';
import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/ getValidationErrors';
import Alert from '../../components/Alert';
import { useStock } from '../../hooks/stock';

interface IFormData {
  number: string;
  titularName: string;
  validity: string;
  securityCode: number;
}

const Checkout: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const [message, setMessage] = useState('');
  const { costumer } = useAuth();
  const { products, totalValue, totalItens, emptyCart } = useCart();
  const { updateProducts } = useStock();
  const { createOrder } = useOrder();

  const orderItems: ICreateOrderItem[] = products.map(product => ({
    productId: product.id,
    quantity: product.quantity,
  }));

  const handleSubmit = useCallback(
    async (data: IFormData) => {
      try {
        setMessage('');

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          number: Yup.string().required('Número é obrigatório').length(16),
          titularName: Yup.string().required('Nome do títular é obrigatório'),
          validity: Yup.string().required('Validade é obrigatória').max(7),
          securityCode: Yup.string()
            .required('Cód. de segurança é obrigatório')
            .length(3),
        });

        await schema.validate(data, { abortEarly: false });

        await createOrder({
          costumerId: costumer?.id as string,
          creditCard: data.number,
          items: orderItems,
        });

        emptyCart();
        await updateProducts();

        history.push('/compras');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }

        setMessage('Pagamento negado!');
      }
    },
    [createOrder, costumer, orderItems, emptyCart, updateProducts, history],
  );

  if (products.length < 1) {
    return <EmptyCart />;
  }

  return (
    <Container>
      <ProductsList>
        <CardTitle>Revisão do pedido</CardTitle>

        {products.map(product => (
          <Product key={product.id}>
            <ProductInfo>{`${product.quantity}x ${product.name}`}</ProductInfo>

            <ProductTotal>
              {formatValue(product.price * product.quantity)}
            </ProductTotal>
          </Product>
        ))}

        <hr />

        <TotalInfo>
          <TotalItens>
            {totalItens} {`ite${totalItens > 1 ? 'ns' : 'm'}`}
          </TotalItens>

          <TotalValue>{totalValue}</TotalValue>
        </TotalInfo>
      </ProductsList>

      <CompletionContainer>
        <PaymentInfo>
          <CardTitle>Pagamento</CardTitle>

          <p>Insira seu cartão de crédito</p>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputAndDescription>
              <span>Número</span>
              <Input
                maxLength={16}
                placeholder="0000 0000 0000 0000"
                name="number"
              />
            </InputAndDescription>

            <InputAndDescription>
              <span>Nome do títular</span>
              <Input name="titularName" />
            </InputAndDescription>

            <InputAndDescription>
              <span>Validade</span>
              <Input maxLength={7} placeholder="02/2028" name="validity" />
            </InputAndDescription>

            <InputAndDescription>
              <span>Cód. de segurança</span>
              <Input maxLength={3} placeholder="000" name="securityCode" />
            </InputAndDescription>

            <Button type="submit">Finalizar compra</Button>
          </Form>
        </PaymentInfo>
        {message && <Alert message={message} />}
      </CompletionContainer>
    </Container>
  );
};

export default Checkout;
