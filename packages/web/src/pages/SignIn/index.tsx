import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';

import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { Container, Content } from './styles';

import getValidationErrors from '../../utils/ getValidationErrors';

import { useAuth } from '../../hooks/auth';

interface IFormData {
  name: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const history = useHistory();

  const { signIn } = useAuth();

  const handleSubmit = useCallback(
    async (data: IFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({ name: data.name });

        history.push('/produtos');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [history, signIn],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Shopping</h1>
          <Input name="name" icon={FiUser} placeholder="Seu nome" />
          <Button type="submit">Entrar</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
