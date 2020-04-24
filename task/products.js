
const EventEmitter = require('events');

const async = require('async');
const request = require('request');
const headerParser = require('parse-link-header');

const USERNAME = 'toolio-retail';
const API_KEY = 'API_KEY';
const PASSWORD = 'PASSWORD';

const BASE_URL = `https://${API_KEY}:${PASSWORD}@${USERNAME}.myshopify.com/admin/api/2020-04/products.json?limit=250&fields=id,title`;

class Products extends EventEmitter {

    getProducts() {
        var isNextPage = true;
        var curUrl = BASE_URL;
        var allProducts = null;
        var curObj = this;

        console.log('------ fetching products starts ------ ');
        async.during(
          function (callback) { return callback(null, isNextPage == true); },
          function (callback) {
            request(curUrl, { json: true }, (err, res, body) => {
              if (err) {
                console.log(err);
              }
              

              // appending next 250 products to previous one.
              if (allProducts == null) {
                allProducts = body;
              } else {
                allProducts.products = [...allProducts.products, ...body.products];
              }

              // parsing headers to find next page_info.
              var parsedLink = headerParser(res.headers.link);
              // console.log(parsedLink);
              if (parsedLink.next == null) {
                // all products have been listed
                isNextPage = false;
                return ;
              }
          
              var nextPageInfo = parsedLink.next.page_info;

              // updating url
              curUrl = BASE_URL + '&page_info=' + nextPageInfo;
              console.log(curUrl);
            });
      
            // return callback(null);
            setTimeout(callback, 1000);
          },
          function (error) {
              if (error) {
                console.log(error);
              } else {
                console.log("All products have been listed");
                
                // sending signal to app.js. It will now start server.
                curObj.emit('productsListed', allProducts);
              }
          }
        );
        
      }
}

module.exports = Products;

