//Setup each store below:
var config_module = angular.module('storeApp.config', [])
.constant('CONFIG',
{
    'CF_STORE_ID': 'Led Store',
    'CF_STORE_PAGE': 'storefront.html',
    'CF_STORE_BG_IMAGE': 'ac_img/bg1.jpg',
    'CF_DISTRIBUTOR_ID': 'WS1732',
    'CF_PAYMENT_PAYPAL_BUYNOW': 'arduino731@gmail.com',
    'CF_PAYMENT_GOOGLE_WALLET_ID': 'GooGle_Wallet_ID',
    'CF_PAYMENT_STRIPE': 'pk_test_stripe',
    'CF_PRODUCTS_FILE': 'app/ac_products/products.txt',
    'CF_PRODUCTS_FOLDER': 'ac_products',
    'CF_NAVBAR_THEME': 'navbar_gray_gradient',
    'CF_NAVBAR_LOGO_TEXT': 'Led Store',
    'CF_NAVBAR_LOGO_LINK': '#/store',
    'CF_INSIDE_HEADER_SHOW': true,
    'CF_INSIDE_HEADER_LINK': '/store',
    'CF_INSIDE_HEADER_IMAGE': 'assets/img/js.png',
    'CF_INSIDE_HEADER_TITLE': 'Store',
    'CF_CAROUSEL_SHOW': false,
    'CF_CAROUSEL_AUTO_PLAY': true,
    'CF_AN_CAROUSEL_IMG_VIDEO': 'hvr-pulse-grow',
    'CF_AN_CAROUSEL_PILL': 'hvr-wobble-to-top-right',
    'CF_AN_STORE_IMG_VIDEO': 'hvr-pulse-grow',
    'CF_AN_STORE_PILL': 'hvr-wobble-to-top-right',
    'CF_SYSTEM_NAME': 'My Angular JS project',
    'CF_SYSTEM_LANGUAGE': '',
    'CF_BASE_URL': '',
    'CF_API_URL': '',
    'CF_GOOGLE_ANALYTICS_ID': '',
}
);