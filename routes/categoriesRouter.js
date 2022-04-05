
const express = require('express');
const router = express.Router();

router.get('/categories/:categoryId/products/:productId', (request, response) => {
  const { categoryId, productId } = request.params;
  response.json({
    categoryId,
    productId,
    name:"Product 2",
    price:2000
  });
});

module.exports = router;
