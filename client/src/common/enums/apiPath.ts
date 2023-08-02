enum ApiPath {
  ROOT = "http://localhost:1337",
  API = "http://localhost:1337/api",
  ITEMSAPI = "http://localhost:1337/api/items?populate=image",
  CATEGORIESAPI = "http://localhost:1337/api/categories?populate=image",
  ORDERAPI = "http://localhost:1337/api/orders",
  CHECKOUT = "/checkout",
  PAYMENTSUCCESSFULL = "/success",
  PRODUCT = "item/:itemId",
  CATEGORY = "category/:slug",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  PROFILE = "/profile",
  SEARCH = "/search",
}

export { ApiPath };
