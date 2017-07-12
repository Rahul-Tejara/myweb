
// this is ...first default call function for tabs contain and all
	$(function(){
		  //  set pageProduct varible for display 8 product in first time(example - : 8);  
		  var pageProduct = 0;
		  //   call to fucntion for display product for everytabs
		  displayProduct("trending", pageProduct);
		  displayProduct("entertainment", pageProduct);
		  displayProduct("travel", pageProduct);
		  displayProduct("food", pageProduct);

          // default function call when we refresh page .....to display cart counter in cart and disabled selected button 
		  totalItemCartValue();
          //    this is logic for change tabs 
		  $('.tabs li:first').addClass('active');
		  $('.block section').hide();
		  $('.block section:first').show();
		  $('.tabs li').on('click',function(){
		    $('.tabs li').removeClass('active');
		    $(this).addClass('active')
		    $('.block section').hide();
		    var activeTab = $(this).find('a').attr('href');
			document.getElementById('search').value = '';
			document.getElementById('search-item').innerHTML = '';
            hideMenuList();
		    $(activeTab).show();
		    return false;
		  });
    })

	

    function displayProduct(tabIdName, pageProduct, moreButton_id) {
		/**
		 * used this function for fetch data from db and call to createDiv function for creating dynamic div and append with tab name 
		 */
	   	// body...
		      var flag = true;
		      var params = {tabName: tabIdName};
		      serviceCall('GET', tabContains_apiUrl, params, function(response) {
			  if(response.status == 200){
				var sizeOfJson = response.tab_data.length;
				var prodcutData = response.tab_data;
				// after clicking load more  button...... remove more previous  button .....
				if(pageProduct > 0){
						document.getElementById(moreButton_id).remove();

				}
				// call fucntion  for createDiv and append with tabName
               createDiv(tabIdName, pageProduct, sizeOfJson, prodcutData, flag);
			  }else if(response.status == 500){
                  console.log("error message"+ response.msg);
			  }else{
                  console.log("server down..... please check internet connection");
			  }
		  }); // end sevice call fucntion for fetching data of product .....
	   
   }

   function createDiv(tabIdName, pageProduct, sizeOfJson, prodcutData, flag){
	    /**
		 *  this function used for display create dynamic div product contain by tabIdName and  i am using this fucntion for searching item by categaory
		 */
	            var endIndex;
				var startIndex;
				// if flag is true then it will consider for display only product item if flag is false then its for serachItem
				if(flag == true){
                   endIndex = (pageProduct)+8;
				   startIndex = pageProduct;
				}else{
					// this is for searching flag 
                   endIndex = sizeOfJson;
				   startIndex = 0;
				}
			    for(var i = startIndex; i < sizeOfJson && i < endIndex; i++){ 
					var imageUrl = prodcutData[i].productUrl;
					var productTitle = prodcutData[i].productTitle;
					var prodcutPrice = prodcutData[i].productPrice; 
					var addCartId = prodcutData[i].id;
					var id = i.toString();	
					//  first create outerDiv and appendChild to tabIdName (it will add based on tab id )
					var outerDiv = document.createElement('div');
					outerDiv.id = tabIdName+'_item_'+id;
					outerDiv.className = 'item';
					outerDiv.style.backgroundImage = "url('"+ imageUrl +"')";
					document.getElementById(tabIdName).appendChild(outerDiv);
					//  now will create another innerDiv add to parent div (outerDiv)
					var innerDiv = document.createElement('div');
					innerDiv.className = 'image-details';
					outerDiv.appendChild(innerDiv);

				// inside of innerDiv - : create anothe two div (one for title & price anothe for add Cart button)
					var innerDivFirst = document.createElement('div');
					innerDivFirst.className = 'image-title-price';
					innerDiv.appendChild(innerDivFirst); 

					// create span for  display title of product and add with innerDivFirst
					var innerSpanFirst = document.createElement('span');
					innerSpanFirst.className = ''; // will put class name later if required
					innerDivFirst.appendChild(innerSpanFirst);
					innerSpanFirst.innerHTML = "<b>Title &nbsp; &nbsp; &nbsp;"+ productTitle +"<b><br>"; // here will put prodcutImage details from json object 

					// create span for display price of product and add with innerDivFirst
					var innerSpanSecond = document.createElement('span');
					innerSpanSecond.className = ''; // will put class name later if required
					innerDivFirst.appendChild(innerSpanSecond);
					innerSpanSecond.innerHTML = "<b>Price &nbsp; &nbsp; $ &nbsp;" + prodcutPrice	 + "</b>" // here will put product price details from json object 

					//  cretae second div for add Cart button and add with innerDiv
					var innerDivSecond = document.createElement('div');
					innerDivSecond.className = ''; // will put class name after
					innerDivSecond.id = tabIdName+'_ButtonDiv_'+id;
					innerDiv.appendChild(innerDivSecond);   
					// add cart button id
					var buttonId = addCartId; // Uniqe id for all prduct
					// pass button id as a paramter
					document.getElementById(tabIdName+'_ButtonDiv_'+id).innerHTML = '<input type="button" id = '+ buttonId +' class="image-footer-button" title = "Add To CART" value="ADD TO CART" onclick="addToCart(\'' + buttonId + '\')" />'; 
					// only we wll create load more item  button  in tab contaion (no for searching)
					if(flag == true){
					//    logic for create dynamic load more product button condition based-:  it will display every 8 product
						if((i+1) % 8 == 0 && (i+1) < sizeOfJson) {
							// creating div only for  more display product  button div or span (no more data availables); 
							var moreProductDiv = document.createElement('div');
							moreProductDiv.className = 'moreItem'; // if required will add later
							moreProductDiv.id = tabIdName+'_moreLoad_'+id;  
							document.getElementById(tabIdName).appendChild(moreProductDiv);
					
								var moreButtonId = tabIdName+'_moreLoad_'+id;
								var nextPage = i+1;
								// pass counter as a parameter for next 8 product
								document.getElementById(moreButtonId).innerHTML = '<input type="button" id = "load-moreProduct"  class="more-product-button" title = "load more Product" value="LOAD MORE" onclick="displayProduct(\'' + tabIdName + '\', '+nextPage+', \'' + moreButtonId + '\')" />';
							}
							else if((i+1) == sizeOfJson){
								// creating div only for  more display product  button div or span (no more data availables); 
								var moreProductDiv = document.createElement('div');
								moreProductDiv.className = 'moreItem'; // if required will add later
								moreProductDiv.id = tabIdName+'_moreLoad_'+id;  
								document.getElementById(tabIdName).appendChild(moreProductDiv);
								console.log("no more product call");
								// display message no more prodcut availables
								var span = document.createElement('span');
								span.className = "no-more-product";
								span.style = "font-weight: bold;"
								span.id = "no-moreProduct";
								moreProductDiv.appendChild(span);
								document.getElementById("no-moreProduct").innerHTML = "No More Prodcut Available";
						
							} // end if
				
				}
		      } // end for loop
   }
   // this is for display total number of cart item and disabled add to cart button based on the itemId
   function totalItemCartValue(){
	   // 
			var param = {};
			//  call servcice  for fetch only cart item list
			serviceCall('GET', displayTotalNumberItem_apiUrl, param, function(response) {
				if(response.status == 200){
				var totalItem = response.itemId.length;
				if(totalItem > 0){
					document.getElementById("total-item-cart").innerHTML= totalItem ;
					for(var i = 0; i < totalItem; i++){
						var itemId = response.itemId[i].itemId;
						document.getElementById(itemId).disabled = true;
						document.getElementById(itemId).style = 'cursor: not-allowed;';
					}
			   	}
				}else if(response.status == 500){
						console.log("error message"+ response.msg);
				}else{
						console.log("server down..... please check server connection");
				}

			});
   }

   function addToCart(buttonId){
	   // add entry in magCart_tbl using buttonId (Key)
	   var params = {productId: buttonId};
	   serviceCall('GET', addTocart_apiUrl, params, function(response) {
            console.log("totalItem is --- "+ response.cart_totalItem);
			if(response.status == 200){
				document.getElementById(buttonId).disabled = true;
				document.getElementById(buttonId).style = 'cursor: not-allowed;';
				document.getElementById("total-item-cart").innerHTML= response.cart_totalItem ;
			
			}else if(response.status == 500){
                  console.log("error message"+ response.msg);
			}else{
                  console.log("server down..... please check Server connection");
			}
	   });
	  
   }

   /**
	*  this is used for fetch cart item data from DB and creat pop-up div and display fetch data item on pop-up 
	*/
   function displayCartItem(){ 
	//    document.getElementById("myDIV").style.opacity = "0.5";
       document.getElementsByTagName("section")[0].style = "cursor: not-allowed";
       document.getElementsByTagName("section")[0].style.opacity = "0.5";
	//    document.getElementsByClassName('item')[0].style = 'cursor: not-allowed';
	   // refresh page .........pop-up and again create based on json data
	    document.getElementById('cart-pop-up-display').innerHTML = '';
	    // varibles for id and class name
	    var cartPopId = "cart-pop-up-display";
		var shoppingCartHeader = "shopping-cart-header";
		var cartContainer = "cart-container";
		var cartItem_list = "cart-item-list";
		// display pop-up for cart item
        document.getElementById('cart-pop-up-display').style.display = 'block';
	    // its for headershoppingcart Div  
		var outHeaderDiv = document.createElement('div');
		outHeaderDiv.className = shoppingCartHeader;
		document.getElementById(cartPopId).appendChild(outHeaderDiv);
		// Inside of outerDiv wil create two tow more div one for heading and another for subtotal checkout button 
	   // -: first div
	   var innerHeaderDiv = document.createElement('div');
	   innerHeaderDiv.id = "cartTage";
       outHeaderDiv.appendChild(innerHeaderDiv);
	   document.getElementById("cartTage").innerHTML = "Your Shopping Cart";
       // -:  second div
	   var headerButtonDiv = document.createElement('div');
	   headerButtonDiv.id = "headingButtonId";
	   headerButtonDiv.className = "checkout-details";
       outHeaderDiv.appendChild(headerButtonDiv);
	   // create span 
	   var subTspan = document.createElement('span');
	   subTspan.id = "spanId";
	   headerButtonDiv.appendChild(subTspan);
	   document.getElementById("spanId").innerHTML = "SubTotal &nbsp; &nbsp";
	   // creae innerdiv for display subtotal price of all item 
	   var subtotalDiv = document.createElement('div');
	   subtotalDiv.className = "sub-total-price";
	   subtotalDiv.id = "sub-total-price-item";
	   headerButtonDiv.appendChild(subtotalDiv);
	   document.getElementById("sub-total-price-item").innerHTML = "$0"; // add main price varible for all item 
	   // button div subtotal
	   var subToatalButton = document.createElement('div');
	   subToatalButton.id = "SubTotal-id";
	   outHeaderDiv.appendChild(subToatalButton);
	   document.getElementById("SubTotal-id").innerHTML = '<input type="button" id = "Proceed_id" class="button-input" title="Proceed to checkout" onclick = "checkOut()" value="Proceed to checkout">';
       // close pop-up window
	   var closePopUpDiv = document.createElement('div');
	   closePopUpDiv.className = "cart-pop-up-button";
	   outHeaderDiv.appendChild(closePopUpDiv);
	   // create inner span and append with uper div 
	   var innerPopUpSpan = document.createElement('span');
	   innerPopUpSpan.className = "cart-hide-pop-up";
	   innerPopUpSpan.onclick = function(){closePopUp()};
	   closePopUpDiv.appendChild(innerPopUpSpan);
	   
		// end heading section now started contains of cart item
		// <!--product container-->
		
		var cartContainerDiv = document.createElement('div');
		cartContainerDiv.className = cartContainer;
		cartContainerDiv.id = "cartContainer-id";
		var cartContainer_id = "cartContainer-id";
		document.getElementById(cartPopId).appendChild(cartContainerDiv);
		// servcice call for getting item list from DB 
		var params = { };
	    serviceCall('GET', displayPopUpItem_apiUrl, params, function(response) {
			if(response.status == 200){
				var itemListLength = response.itemList.length;
				// if no item in cart then display no item Available
				if(itemListLength == 0){
					noItemPopUP(cartContainer_id); 
					document.getElementById('Proceed_id').disabled = true;
				    document.getElementById('Proceed_id').style = 'cursor: not-allowed;';
				}
				var totalPrice = 0;
				// <!-- Product -->
				for(var i = 0; i < itemListLength; i++){
					// varibale decleration
					var itemId = response.itemList[i].id;
					var imageUrl = response.itemList[i].productUrl;
					var productTitle = response.itemList[i].productTitle;
					var productColor = response.itemList[i].productColor;
					var cartProductQuantity = response.itemList[i].cartProductQuantity;
					var quantityPrice = response.itemList[i].updatedProductPrice;
					totalPrice = totalPrice + quantityPrice;
	
					var cartItemListDiv = document.createElement('div');
					cartItemListDiv.className = cartItem_list;
					cartItemListDiv.id = "cart-list-"+itemId;
					var cartListItemId = "cart-list-"+itemId;
					cartContainerDiv.appendChild(cartItemListDiv);        
					
					//  <!--display image product-->
					var imgDiv = document.createElement('div');
					imgDiv.className = "image";
					cartItemListDiv.appendChild(imgDiv);
					//  cretae img and append with upper div
					var img = document.createElement('img');
					img.src = imageUrl; // this is prodcut url 
					img.alt = "";
					imgDiv.appendChild(img);

					// <!--product description-DIV->
					var descriptionDiv = document.createElement('div');
					descriptionDiv.className = "cart-description";
					cartItemListDiv.appendChild(descriptionDiv);
					//  now we wil create two more span inside of descriptionDiv......
					var productNameSpan = document.createElement('span');
					productNameSpan.id = "productName_"+i;
					descriptionDiv.appendChild(productNameSpan);
					document.getElementById("productName_"+i).innerHTML = productTitle; // put  here main product details 

					var colorSpan = document.createElement('span');
					colorSpan.id = "productColor_"+i;
					descriptionDiv.appendChild(colorSpan);
					document.getElementById("productColor_"+i).innerHTML = productColor; // put  here main product details 

					// <!--quantity buttons for product-->
					var quantityDiv = document.createElement('div');
					quantityDiv.className = "cart-quantity";
					quantityDiv.id = "quantity_"+i;
					var quantity_id = "quantity_"+i;
					cartItemListDiv.appendChild(quantityDiv);

					// inside of quantity -: <!--increase button-->
					var plusSpan = document.createElement('span');
					plusSpan.id = "plusId_"+itemId
					quantityDiv.appendChild(plusSpan);
					document.getElementById("plusId_"+ itemId).innerHTML = '<button class="plus-btn" id="plus-btn_0" type="button" onclick="quantityPlusBtn(\'' + itemId + '\')"><img src="./images/plus.svg" alt=""></button>';
					
					// <!-- display product counter in input box-->
					var inputBox = document.createElement("input");
					inputBox.type = "text";
					inputBox.id = "itemCounter"+itemId;
					inputBox.value = cartProductQuantity;
					quantityDiv.appendChild(inputBox);

					// inside of quantity -: <!--decrease button-->
					var minusSpan = document.createElement('span');
					minusSpan.id = "minusId_"+ itemId
					quantityDiv.appendChild(minusSpan);
					document.getElementById("minusId_"+ itemId).innerHTML = '<button class="minus-btn" id="minus-btn_0" type="button" onclick="quantityMinusBtn(\'' + itemId + '\')"><img src="./images/minus.svg" alt=""></button>';
					
					// end quantity section
					var totalPriceDiv = document.createElement('div');
					totalPriceDiv.className = "cart-total-price";
					totalPriceDiv.id = "total-price-item-"+itemId;
					cartItemListDiv.appendChild(totalPriceDiv);
					document.getElementById("total-price-item-"+itemId).innerHTML = "$"+quantityPrice; // add total price for partiular item...item 
			
					// <!--its cancel button(remove product from card list)-->
					var removeButtonDiv = document.createElement('div');
					removeButtonDiv.className = "cart-buttons";
					removeButtonDiv.id = "remove-btn_"+ itemId;
					var removeId = "remove-btn_"+ itemId;
					cartItemListDiv.appendChild(removeButtonDiv); 
					// create inner spna for delete btn img '<span class="cart-delete-btn" onclick="removeItemFromCatList(\'' + removeId + '\')"></span>'
					document.getElementById(removeId).innerHTML = '<span class="cart-delete-btn" onclick="removeItemFromCatList(\'' + itemId + '\' )"></span>';
					//  cretae button for CheckOut particular item from cart list
					var CheckOutPitemDiv = document.createElement('div');
					CheckOutPitemDiv.className = "cart-buttons";
					CheckOutPitemDiv.id = "checkOutBtn_"+i;
					cartItemListDiv.appendChild(CheckOutPitemDiv);
					document.getElementById("checkOutBtn_"+i).innerHTML = '<input type="button" id = "Proceed_id" class ="check-out-btn" onclick = "checkOut()" value="CheckOut" title="check out"/>';
		
				} // end loop
				document.getElementById("sub-total-price-item").innerHTML = "$"+totalPrice;
			}else if(response.status == 500){
                  console.log("error message"+ response.msg);
			}else{
                  console.log("server down..... please check internet connection");
			}
	   });// END serviceCall function
		
  }
  //Proceed for CheckOut item (Proceed to next page)
  function checkOut(){
	  window.location.href="checkout.html";
  }

  // close cart item pop-up window 
  function closePopUp(){
	    document.getElementsByTagName("section")[0].style.opacity = "";
	    document.getElementsByTagName("section")[0].style = "";
		document.getElementById('cart-pop-up-display').style.display = 'none';
		document.getElementsByTagName("body")[0].style.opacity = "";

   }
    // if no item in cart then we will display message on pop-up ....
	function noItemPopUP(cartContainerDiv){
		var cartNoItemDiv = document.createElement('div');
		cartNoItemDiv.className = "cart-no-item";
		document.getElementById(cartContainerDiv).appendChild(cartNoItemDiv);
		// cartContainerDiv.appendChild(cartNoItemDiv);  
		// create span for display message on upper div
		var messageSpan = document.createElement('span'); 
		messageSpan.id = "cart_message";
		cartNoItemDiv.appendChild(messageSpan);
		document.getElementById("cart_message").innerHTML = "No Item In Cart Please add the Item";
		// create div for display cart-icon on pop-up
		var cartIconDiv = document.createElement('div');
		cartIconDiv.className = "no-item-cart-icon";
		document.getElementById(cartContainerDiv).appendChild(cartIconDiv);
		// cartContainerDiv.appendChild(cartIconDiv); 
		// now create I for cart icon frontasom
		var cart_i = document.createElement('i');
		cart_i.className = "fa fa-shopping-cart";  
		cartIconDiv.appendChild(cart_i);	
	}
	// 
	
    function quantityPlusBtn(itemKey){
	  var quantityItmBox_id = "itemCounter"+itemKey;
	  var plus_btn_id = "plus-btn_"+itemKey;
	  var productPrice_id = "total-price-item-"+itemKey;
	  var totalPrice_id = "sub-total-price-item"; 
      var preValue = parseInt(document.getElementById(quantityItmBox_id).value);
	  if(preValue < 5){
		    var params = {productId : itemKey, flag: 'plus' };
	        serviceCall('POST', qauntity_apiUrl, params, function(response) {
			if(response.status == 200){
				var updatedQuantity = response.updatedQuantityList.ProductQuantity;
				var updatedPrice = response.updatedQuantityList.updatedProductPrice;
				var primaryPrice = response.updatedQuantityList.productPrice;
				document.getElementById(quantityItmBox_id).value = updatedQuantity;
			    document.getElementById(productPrice_id).innerHTML = "$"+ updatedPrice;
				var preSubTotal = document.getElementById(totalPrice_id).innerText;
				preSubTotal = preSubTotal.split('$');
				var finalSub = parseInt(preSubTotal[1]) + primaryPrice
				document.getElementById(totalPrice_id).innerHTML = "$"+ finalSub;
			}else if(response.status == 500){
                  console.log("error message"+ response.msg);
			}else{
                  console.log("server down..... please check server connection");
			}
	        });
	  }else{
		  // disabled this button bz its reach limit value;
		  console.log("limit cross");
	  }
	  
   }
// 
   function quantityMinusBtn(itemKey){
        console.log("minus for", itemKey);
		var quantityItmBox_id = "itemCounter"+itemKey;
		var minus_btn_id = "minus-btn_"+itemKey;
		var productPrice_id = "total-price-item-"+itemKey;
		var totalPrice_id = "sub-total-price-item"; 
		var preValue = parseInt(document.getElementById(quantityItmBox_id).value);
		if(preValue > 1){
			var params = {productId : itemKey, flag: 'minus' };
	        serviceCall('POST', qauntity_apiUrl, params, function(response) {
			if(response.status == 200){
				var updatedQuantity = response.updatedQuantityList.ProductQuantity;
				var updatedPrice = response.updatedQuantityList.updatedProductPrice;
				var primaryPrice = response.updatedQuantityList.productPrice;
				document.getElementById(quantityItmBox_id).value = updatedQuantity;
			    document.getElementById(productPrice_id).innerHTML = "$"+ updatedPrice;
				var preSubTotal = document.getElementById(totalPrice_id).innerText;
				preSubTotal = preSubTotal.split('$');
				var finalSub = parseInt(preSubTotal[1]) - primaryPrice
				document.getElementById(totalPrice_id).innerHTML = "$"+ finalSub;
			}else if(response.status == 500){
                  console.log("error message"+ response.msg);
			}else{
                  console.log("server down..... please check internet connection");
			}
	        });
		}
		else{
			// disabled this button bz its reach limit value;
			console.log("limit cross");
		}
   }
//   remove item from  cart list ..
    function removeItemFromCatList(itemKey){
		  
		var cartListItemId = "cart-list-"+itemKey;
		var productPrice_id = "total-price-item-"+itemKey;
		var totalPrice_id = "sub-total-price-item"; 
	    var params = {productId : itemKey, flag: 'remove' };
		serviceCall('POST', qauntity_apiUrl, params, function(response) {
		if(response.status == 200){
			var updatedProductPrice = response.removeData.updatedProductPrice;
			var totalItem = response.removeData.totalItem;
			console.log("total item count is --"+ totalItem);
			var preSubTotal = document.getElementById(totalPrice_id).innerText;
			preSubTotal = preSubTotal.split('$');
			var finalSub = parseInt(preSubTotal[1]) - updatedProductPrice;
			document.getElementById(totalPrice_id).innerHTML = "$"+ finalSub;
			document.getElementById(cartListItemId).remove();
        //    display pop-up no item availables	// 
			if(totalItem == 0){
				noItemPopUP("cartContainer-id");
				document.getElementById('Proceed_id').disabled = true;
			    document.getElementById('Proceed_id').style = 'cursor: not-allowed;';
			}
			// enable add to cart button.....
			document.getElementById(itemKey).disabled = false;
			document.getElementById(itemKey).style = 'cursor: pointer;';
			document.getElementById("total-item-cart").innerHTML= totalItem ;
			
		}else if(response.status == 500){
			  console.log("error message"+ response.msg);
		}else{
			 console.log("server down..... please check internet connection");
		}
		});
	}
	// this is for media device
	function menuList() {
		document.getElementById("myDropdown").classList.toggle("show");
	}
    function hideMenuList(){
		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
		}
	}

   
	// Close the dropdown if the user clicks outside of it
	window.onclick = function(event) {
	if (!event.target.matches('.dropbtn')) {

		var dropdowns = document.getElementsByClassName("dropdown-content");
		var i;
		for (i = 0; i < dropdowns.length; i++) {
		var openDropdown = dropdowns[i];
		if (openDropdown.classList.contains('show')) {
			openDropdown.classList.remove('show');
		}
		}
	}
}

  function serachItem(){
	  var tabIdName = 'search-item';
	  var flag = false;
	  document.getElementById('trending').style.display = 'none';
	  document.getElementById('entertainment').style.display = 'none';
	  document.getElementById('travel').style.display = 'none';
	  document.getElementById('food').style.display = 'none';
	  document.getElementById(tabIdName).style.display = ' ';
	  document.getElementById(tabIdName).innerHTML = '';
	  var productName = document.getElementById("search").value;
	  var params = {prduct_Name: productName};
		      serviceCall('GET', serach_apiUrl, params, function(response) {
			  if(response.status == 200){
				var sizeOfJson = response.tab_data.length;
				console.log("sizeOfJson"+sizeOfJson);
				var prodcutData = response.tab_data;
				var pageProduct = 0;
				console.log("sizeOfJson"+sizeOfJson);
				createDiv(tabIdName, pageProduct, sizeOfJson, prodcutData, flag)
			
			  }else if(response.status == 500){
                  console.log("error message"+ response.msg);
			  }else{
                  console.log("server down..... please check server connection");
			  }
		}); // end sevice call fucntion for fetching data of product .....
	   
  }
  // this is emailSubscribe function
  
  function emailSubscribe(){
    /**
	 * send email to customer (SMTP).,.........and update customer data in over database.....
	 */
	    var emailAddress = document.getElementsByClassName('email-box')[0].value;
		console.log("emial -called"+ emailAddress);
		var params = {email_addess: emailAddress};
		serviceCall('POST', email_subscribe_apiUrl, params, function(response) {
			 console.log(response);
			  if(response.status == 200){
				  alert("successfully email subScribe");
				  document.getElementsByClassName('email-box')[0].value = '';
				  }else if(response.status == 500){
                  console.log("error message"+ response.msg);
			  }else{
                  console.log("server down..... please check server connection");
			  }
		}); // end sevice call fucntion for fetching data of product .....
	   
  }