# Toolio Coding Challenge

## Description

This challenge asks for REST search API that takes in a keyword and returns the list of products that have titles containing the keyword from Toolio Shopify Store

## Installation
Download below libraries to prevent module errors.
```bash
git clone https://github.com/ibahadiraltun/toolio.git
npm install express
npm install parse-link-header
npm install async
npm install request
```
## Running
```bash
node app.js
```
This will automatically download all products from shopify and will start server at **localhost:3000/** .

## Arguments
To test server, use **localhost:3000/search** with **key** parameter.
Example:
``` javascript
localhost:3000/search?key=Awesome
localhost:3000/search?key=coat
localhost:3000/search?key=shoe
```
**NOTE:**
Search results are non-case sensitive.
