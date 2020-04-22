

const Products = require('./products');
const products = new Products();
const startServer = require('./index');

// when all products lister, starts server.
products.on('productsListed', (products) => {
  // console.log(query(allProducts, 'Awesome'));
  startServer(products);
});

// gather all products
products.getProducts();