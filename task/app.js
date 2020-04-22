

var _ = require('underscore');
const request = require('request');
const express = require('express');
const headerParser = require('parse-link-header');
const app = express();

const async = require('async');

const Products = require('./products');
const products = new Products();


const USERNAME = 'toolio-retail';
const API_KEY = 'c873d395f841c64634c5330ce9118c9d';
const PASSWORD = '5dcf9317c6ff86ea61d21b0d4dd0a1a8';

const BASE_URL = `https://${API_KEY}:${PASSWORD}@${USERNAME}.myshopify.com/admin/api/2020-04/products.json?limit=250`;

products.on('productsListed', (allProducts) => {
  console.log(allProducts);
});

products.getProducts();


// console.log(_.size());

// //  <https://shop-domain.myshopify.com/admin/api/2019-07/products.json?limit=50&
// // page_info=eyJkaXJlY3Rpb24iOiJwcmV2IiwibGFzdF9pZCI6MTk4NTgyMTYzNCwibGFzdF92YWx1ZSI6IkFjcm9saXRoaWMgQWx1bWludW0gUGVuY2lsIn0%3D>; rel="previous", 
// // <https://shop-domain.myshopify.com/admin/api/2019-07/products.json?limit=50
// // &page_info=eyJkaXJlY3Rpb24iOiJuZXh0IiwibGFzdF9pZCI6MTk4NTgzNjU0NiwibGFzdF92YWx1ZSI6IkFoaXN0b3JpY2FsIFZpbnlsIEtleWJvYXJkIn0%3D>; rel="next