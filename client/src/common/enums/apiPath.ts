enum ApiPath {
  ROOT = "http://localhost:1337",
  ITEMSAPI = "http://localhost:1337/api/items?populate=image",
  ORDERAPI = "http://localhost:1337/api/orders",
  CHECKOUT = "/checkout",
  PAYMENTSUCCESSFULL = "/success",
  PRODUCT = "item/:itemId",
  CATEGORY = "category/:slug",
}

export { ApiPath };
