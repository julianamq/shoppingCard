require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
 it('testa se é uma função', ()=>{
  expect(typeof (fetchProducts)).toEqual('function');
});

it('Se a função fetchProducts com o argumento "computador" e se fetch foi chamada', async () => {
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalled();
  //https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
});

it('Se ao chamar a função fetchProducts com o argumento "computador",utiliza o endpoint', async () => {
  const endPoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
  fetchProducts('computador');
  expect(fetch).toHaveBeenCalledWith(endPoint);
});

it('Se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSearch', async () => {
  expect(await fetchProducts('computador')).toEqual(computadorSearch);
});//await 
it('Se ao chamar a função fetchProducts sem argumento, retorna um erro: "You must provide an url".', async () => {
  const messageError =  'You must provide an url';
  expect( await fetchProducts()).toEqual(new Error(messageError));
});

});
