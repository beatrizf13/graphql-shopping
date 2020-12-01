import FakeCostumersRepository from '../repositories/fakes/FakeCostumersRepository';
import ShowCostumerService from './ShowCostumerService';

let fakeCostumersRepository: FakeCostumersRepository;
let showCostumer: ShowCostumerService;

describe('ShowCostumer', () => {
  beforeEach(() => {
    fakeCostumersRepository = new FakeCostumersRepository();

    showCostumer = new ShowCostumerService(fakeCostumersRepository);
  });

  it('should be able to show a costumer', async () => {
    const costumer = await fakeCostumersRepository.create({ name: 'John' });

    const findCostumer = await showCostumer.execute({
      id: costumer.id,
    });

    expect(costumer).toEqual(findCostumer);
  });
});
