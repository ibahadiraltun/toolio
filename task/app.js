

const Products = require('./products');
const products = new Products();
const startServer = require('./index');

products.on('productsListed', (products) => {
  // console.log(query(allProducts, 'Awesome'));
  startServer(products);
});

products.getProducts();