angular.module('JennifershowsApp.shippingCartDataService', [])

.factory('DataService', function ($http, $q, CONFIG) {

    function Store() {
        var productsDeferred = $q.defer();
        this.products = productsDeferred.promise; //this.products is a promise
        $http.get(CONFIG.CF_PRODUCTS_FILE).success(function (data) {
            var products = [];
            for (var i = 0, len = data.length; i < len; i++) {
                var prod = data[i];
                if (prod.storeid == "7cc6cb94-0938-4675-b84e-6b97ada53978") {
                    products.push(prod);
                }
            }
            productsDeferred.resolve(products);
        });
    }

    Store.prototype.getProduct = function (sku) {
        return this.products.then(function (products) {
            for (var i = 0; i < products.length; i++) { // MUST use products, it's the real value; this.products is a promise
                if (products[i].sku == sku)
                    return products[i];
            }
            return null;
        });
    };

    Store.prototype.getProducts = function () {
        return this.products.then(function (products) {
            return products;
        });
    };

    // create store
    var myStore = new Store();

    // create shopping cart
    var myCart = new shoppingCart("myApp");

    // enable PayPal checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with PayPal, you have to create a merchant account with 
    // PayPal. You can do that here:
    // https://www.paypal.com/webapps/mpp/merchant
    //myCart.addCheckoutParameters("PayPal", "paypaluser@youremail.com");
    myCart.addCheckoutParameters("PayPal", "arduino731-facilitator@gmail.com");
    // to test buyer arduino731-buyer@gmail.com;
    // myCart.addCheckoutParameters("PayPal", CONFIG.CF_PAYMENT_PAYPAL_BUYNOW);

    // enable Google Wallet checkout
    // note: the second parameter identifies the merchant; in order to use the 
    // shopping cart with Google Wallet, you have to create a merchant account with 
    // Google. You can do that here:
    // https://developers.google.com/commerce/wallet/digital/training/getting-started/merchant-setup
    //myCart.addCheckoutParameters("Google", "GooGle_Wallet_ID",
    myCart.addCheckoutParameters("Google", CONFIG.CF_PAYMENT_GOOGLE_WALLET_ID,
        {
            ship_method_name_1: "UPS Next Day Air",
            ship_method_price_1: "20.00",
            ship_method_currency_1: "USD",
            ship_method_name_2: "UPS Ground",
            ship_method_price_2: "15.00",
            ship_method_currency_2: "USD"
        }
    );

    // enable Stripe checkout
    // note: the second parameter identifies your publishable key; in order to use the 
    // shopping cart with Stripe, you have to create a merchant account with 
    // Stripe. You can do that here:
    // https://manage.stripe.com/register
    //myCart.addCheckoutParameters("Stripe", "pk_test_stripe",
    myCart.addCheckoutParameters("Stripe", CONFIG.CF_PAYMENT_STRIPE,
        {
            chargeurl: "https://localhost:1234/processStripe.aspx"
        }
    );

    // return data object with store and cart
    return {
        store: myStore,
        cart: myCart
    };
});