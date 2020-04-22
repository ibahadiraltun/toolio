
function query(allProducts, target) {
    var res = new Array();
    target = target.toLowerCase();
    allProducts.products.forEach(cur => {
      var title = cur.title.toLowerCase();
      if (title.includes(target)) {
        res.push(cur);
        // console.log(cur);
      }
    });
    resJSON = {'products': res};
    return resJSON;
  }
  
  module.exports = query;
