enum ApiPath {
  ROOT = "http://localhost:1337",
  API = "http://localhost:1337/api",
  ITEMSAPI = "http://localhost:1337/api/items?populate=image",
  CATEGORIESAPI = "http://localhost:1337/api/categories?populate=image",
  ORDERAPI = "http://localhost:1337/api/orders",
  SUBSCRIBERAPI = "http://localhost:1337/api/subscribers",
  CHECKOUT = "/checkout",
  PAYMENTSUCCESSFULL = "/success",
  PRODUCT = "item/:slug",
  CATEGORY = "category/:slug",
  SIGNIN = "/signin",
  SIGNUP = "/signup",
  FORGOTPASSWORD = "/forgot-password",
  RESETPASSWORD = "/reset-password",
  PROFILE = "/profile",
  SEARCH = "/search",
  ABOUT = "/about",
  CONTACT = "/contact",
}

export { ApiPath };
