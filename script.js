const lista = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const load = document.querySelector('.loading');

const salveLocalStorage = () => {
  saveCartItems(lista.innerHTML);
};

const searchPrice = () => {
  const itens = getSavedCartItems();
  let soma = 0;
  itens.split('</li>').forEach((item) => {
    if (!item) soma += 0;
    else soma += +item.split('$')[1];
  });
  const totalPrice = document.querySelector('.total-price');
  totalPrice.innerHTML = soma;
};

const showLoader = () => {
  items.classList.add('hide');
  load.classList.remove('hide');
};

const hideLoader = () => {
  items.classList.remove('hide');
  load.remove();
};

const cartItemClickListener = (event) => {
  event.target.remove();
  salveLocalStorage();
  searchPrice();
};
// aqui iré devolver para classe ol quando é atribuida a função 
const returnGet = () => {
  lista.innerHTML = getSavedCartItems();
  const todasCartItems = document.querySelectorAll('.cart__items');
  todasCartItems.forEach((item) => {
    item.addEventListener('click', cartItemClickListener);
  });
};
// console.log(returnGet()); 

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};
const createProductItemElement = ({ id: sku, title: name, thumbnail: image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const mostrarFetch = async (evento) => {
  const spanSku = getSkuFromProductItem(evento.target.parentNode);
  const fetch = await fetchItem(spanSku);
  const objetoFetch = { sku: fetch.id, name: fetch.title, salePrice: fetch.price };
  lista.appendChild(createCartItemElement(objetoFetch));
  salveLocalStorage();
  searchPrice();
};

function additems() {
  showLoader();
  const buscaItem = document.querySelectorAll('.item__add');
  setTimeout(() => {
    hideLoader();
    buscaItem.forEach((busca) => {
      busca.addEventListener('click', mostrarFetch);
    });
  }, 1000);
}

const fetchItemVerify = async () => {
  const apiConsume = await fetchItem('MLB1615760527');
  return apiConsume;
};

const mapListProduct = async () => {
  const fetchList = await fetchProducts('computador ');
  // console.log(fetchList.results);
  const itemnaTela = document.querySelector('.items');
  fetchList.results.forEach((product) => {
    const productList = createProductItemElement(product);

    itemnaTela.appendChild(productList);
  });
};
const removeAllsinCart = () => {
  const value = document.querySelector('.total-price');
  lista.innerHTML = '';
  value.innerHTML = '';
  saveCartItems([]);
};
function addApagaTudo() {
  const cleanAll = document.querySelector('.empty-cart');
  cleanAll.addEventListener('click', removeAllsinCart);
}
// e.remove(additems);
// e.target.innerHTML = ''; apaga a escrita
// e.target.remove(additems); assim remove o botaoooooooo 

window.onload = async () => {
  await mapListProduct();
  fetchItemVerify();
  additems();
  returnGet();
  // searchPrice();
  addApagaTudo();
};
// help Guilherme Aquino ;
// Help Rafa Aguiar 9 e 11.