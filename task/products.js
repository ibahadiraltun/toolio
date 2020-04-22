
const EventEmitter = require('events');

var _ = require('underscore');
const request = require('request');
const express = require('express');
const headerParser = require('parse-link-header');
const app = express();

const async = require('async');

const USERNAME = 'toolio-retail';
const API_KEY = 'c873d395f841c64634c5330ce9118c9d';
const PASSWORD = '5dcf9317c6ff86ea61d21b0d4dd0a1a8';

const BASE_URL = `https://${API_KEY}:${PASSWORD}@${USERNAME}.myshopify.com/admin/api/2020-04/products.json?limit=250`;

class Products extends EventEmitter {

    constructor() {
        super();
    }

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
      
              if (allProducts == null) {
                allProducts = body;
              } else {
                allProducts.products = [...allProducts.products, ...body.products];
              }

              var parsedLink = headerParser(res.headers.link);
              // console.log(parsedLink);
              if (parsedLink.next == null) {
                // all products have been listed
                isNextPage = false;
                return ;
              }
          
              var nextPageInfo = parsedLink.next.page_info;
              curUrl = BASE_URL + '&page_info=' + nextPageInfo;
              console.log(curUrl);
            });
      
            // return callback(null);
            setTimeout(callback, 1000);
          },
          function (error) {
              // 5 seconds have passed, n = 5
              if (error) {
                console.log(error);
              } else {
                console.log("All products have been listed");
                console.log(this);
                curObj.emit('productsListed', allProducts);
              }
      
          }
        );
        
      }
}

module.exports = Products;

