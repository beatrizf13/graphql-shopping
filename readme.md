# Shopping

Aplicação fullstack que simula um carrinho de compras utilizando GraphQl com Apollo e TypeORM.

![demo](./.github/demo.gif)

### Instruções de inicialização

1.Instale as dependências:

```bash
yarn
```
2. Preencha o .env

3. Execute as migrações:

```bash
yarn typeorm migration:run
```

4. Inicie o servidor:

```bash
yarn server dev
```

> Playground GraphQL: [http://localhost:3333](http://localhost:3333)

5. Inicie o cliente web:

```bash
yarn web dev
```

> Cliente web: [http://localhost:3000](http://localhost:3000)


Número do cartão de crédito sempre aceito:

```bash
1111111111111111
```
### Para executar os testes:

```bash
yarn test
```
