import FakeCostumersRepository from '../repositories/fakes/FakeCostumersRepository';
import CreateCostumerService from './CreateCostumerService';

let fakeCostumersRepository: FakeCostumersRepository;
let createCostumer: CreateCostumerService;

describe('CreateCostumer', () => {
  beforeEach(() => {
    fakeCostumersRepository = new FakeCostumersRepository();

    createCostumer = new CreateCostumerService(fakeCostumersRepository);
  });

  it('should be able to create a costumer', async () => {
    const costumer = await createCostumer.execute({
      name: 'John',
    });

    expect(costumer.id).toBeTruthy();
  });
});
