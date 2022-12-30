// require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('se é uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });

  it('Se é uma  a função fetchItem com o argumento "MLB1615760527" e teste se fetch foi chamada', async () => {
    const result = await fetchItem("MLB1615760527");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('Se a função fetch utiliza o endpoint', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });

  it('Se é uma estrutura de dados igual ao objeto item', async () => {
    const response = await fetchItem('MLB1615760527');
    expect(response).toEqual(item);
  });

  it('se chamando a função fetchItem sem argumento, retorna um erro',async () => {
    // const newError = new Error('You must provide an url')
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});