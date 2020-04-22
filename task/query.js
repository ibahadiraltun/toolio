
// function to return items whose title includes given key value
function query(allProducts, key) {
    var res = new Array();
    key = key.toLowerCase();
    allProducts.products.forEach(cur => {
      var title = cur.title.toLowerCase();
      if (title.includes(key)) {
        res.push(cur);
        // console.log(cur);
      }
    });
    resJSON = {'products': res};
    return resJSON;
  }
  
  module.exports = query;
