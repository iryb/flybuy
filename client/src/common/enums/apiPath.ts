const ROOT = process.env.REACT_APP_ROOTURL ?? "/";

enum ApiPath {
  ITEMSAPI = "/api/items?populate=image",
  CATEGORIESAPI = "/api/categories",
  ORDERAPI = "/api/orders",
  SUBSCRIBERAPI = "/api/subscribers",
  USERAPI = "/api/users",
  AUTHAPI = "/api/auth",
  BANNERAPI = "/api/banners",
  COUPONAPI = "/api/coupons",
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

export { ApiPath, ROOT };
