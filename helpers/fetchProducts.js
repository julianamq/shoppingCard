const fetchProducts = (searchQuery) =>
  fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${searchQuery}`)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
