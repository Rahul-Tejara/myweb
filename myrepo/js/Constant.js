// write the all APi URL

// 1. this APi URL for Display product in tabs (GET METHOD)
// var  tabContains_apiUrl = 'http://localhost:3000/index/tabcontains';
var baseUrl = 'https://mqecqtcwh2.execute-api.us-east-2.amazonaws.com/mag_dev/mag-store'
var tabContains_apiUrl =  baseUrl + '/tabcontains';

// 2. this APi URL for ADD TO CART( POST METHOD - update magCart_tbl)
var addTocart_apiUrl = baseUrl+'/addtocart';

// 3. this APi URL for Display total item in CART ( GET METHOD - by defualt call to update cart counter and disable add to cart button )
var displayTotalNumberItem_apiUrl = baseUrl +'/displaytotalitem';

// 4. this APi URL for Display ADD TO CART item on pop-up window ( GET METHOD - )
var displayPopUpItem_apiUrl = baseUrl+'/displayitemcart';

// 5. this APi URL for increment quantity and decrement quantity ( POST METHOD - )
var qauntity_apiUrl = 'http://localhost:3000/index/quantity';

// 6. search ....
var serach_apiUrl = baseUrl+'/searchproduct';

// 7. post method for email emailsubscribe.....
var email_subscribe_apiUrl = 'http://localhost:3000/index/emailsubscribe';


// var email_subscribe_apiUrl = "https://mqecqtcwh2.execute-api.us-east-2.amazonaws.com/dev/first";
