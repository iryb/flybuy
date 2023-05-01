enum ApiPath {
  ROOT = "http://localhost:1337",
  ITEMSAPI = "http://localhost:1337/api/items?populate=image",
  CATEGORIESAPI = "http://localhost:1337/api/categories?populate=image",
  ORDERAPI = "http://localhost:1337/api/orders",
  CHECKOUT = "/checkout",
  PAYMENTSUCCESSFULL = "/success",
  PRODUCT = "item/:itemId",
  CATEGORY = "category/:slug",
}

export { ApiPath };
