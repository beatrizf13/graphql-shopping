import FakeCostumersRepository from '../repositories/fakes/FakeCostumersRepository';
import ListCostumersService from './ListCostumersService';

let fakeCostumersRepository: FakeCostumersRepository;
let listCostumers: ListCostumersService;

describe('ListCostumers', () => {
  beforeEach(() => {
    fakeCostumersRepository = new FakeCostumersRepository();

    listCostumers = new ListCostumersService(fakeCostumersRepository);
  });

  it('should be able to list all costumers', async () => {
    const costumer1 = await fakeCostumersRepository.create({ name: 'John' });

    const costumer2 = await fakeCostumersRepository.create({ name: 'Doe' });

    const costumers = await listCostumers.execute();

    expect(costumers).toEqual([costumer1, costumer2]);
  });
});
