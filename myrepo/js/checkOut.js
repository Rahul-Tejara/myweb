// service  call for all GET AND POST METHOD 
	   function serviceCall(method, URL, params, callback) {
        return $.ajax({
        url: URL,
        type: method,
        cache: false,
        data: params,
        }).done(callback).fail(function(jqXHR, textStatus, errorThrown) {
        // Handle error
		     console.log("Server Down Please check internet conection ");
      });
    }

$(function(){
    displayProcceedItem();
})

function displayProcceedItem(){
    // servcice call for getting item list from DB 
		var params = { };
	    serviceCall('GET', displayPopUpItem_apiUrl, params, function(response) {
            console.log("totalItem is --- "+ response.itemList);
			if(response.status == 200){
                var totalItem = response.itemList.length;
				// if no item in cart then display no item Available
				// if(itemListLength == 0){
				
				// }
				var totalPrice = 0;
				// <!-- Product -->
				for(var i = 0; i < totalItem; i++){
					// varibale decleration
					var itemId = response.itemList[i].id;
					var imageUrl = response.itemList[i].productUrl;
					var productTitle = response.itemList[i].productTitle;
					var productColor = response.itemList[i].productColor;
					var cartProductQuantity = response.itemList[i].cartProductQuantity;
					var quantityPrice = response.itemList[i].updatedProductPrice;
					totalPrice = totalPrice + quantityPrice;

                    var listDiv = document.createElement('div');
                    listDiv.className = "check-cart-item-list";
                    listDiv.id = "cart-list-"+itemId
                    document.getElementById("cartContainer-id").appendChild(listDiv);

                    var imgDiv = document.createElement('div');
                    imgDiv.className = "check-image";
                    listDiv.appendChild(imgDiv);

                    var img = document.createElement('img');
                    img.src = imageUrl;
                    img.alt = "";
                    imgDiv.appendChild(img);
                    
                    var descriptionDiv = document.createElement('div');
                    descriptionDiv.className = "check-cart-description";
                    listDiv.appendChild(descriptionDiv);

                    var pSpan = document.createElement('span');
                    pSpan.id = "productName_"+itemId;
                    var spanId = "productName_"+itemId;
                    descriptionDiv.appendChild(pSpan);
                    document.getElementById(spanId).innerHTML = productTitle;


                    var pSpan_1 = document.createElement('span');
                    pSpan_1.id = "productColor_"+itemId;
                    var SpanId1 = "productColor_"+itemId;
                    descriptionDiv.appendChild(pSpan_1);
                    document.getElementById(SpanId1).innerHTML = productColor;
                
                    var quantityDiv = document.createElement('div');
                    quantityDiv.className = "check-cart-quantity";
                    quantityDiv.id = "quantity_"+itemId;
                    var quantity_id = "quantity_"+itemId;
                    listDiv.appendChild(quantityDiv);
                    
                    var qspan =  document.createElement('span');
                    qspan.id = "qspan_id"+itemId;
                    quantityDiv.appendChild(qspan);
                    document.getElementById("qspan_id"+itemId).innerHTML = 'Quantity';

                    var inputBox = document.createElement("input");
                    inputBox.type = "text";
                    inputBox.id = "itemCounter"+itemId;
                    inputBox.value = cartProductQuantity; // initiallize 
                    quantityDiv.appendChild(inputBox);

                    var totalPriceDiv = document.createElement('div');
                    totalPriceDiv.className = "check-cart-total-price";
                    totalPriceDiv.id = "total-price-item-"+itemId;
                    listDiv.appendChild(totalPriceDiv);
                    document.getElementById("total-price-item-"+itemId).innerHTML = "$"+quantityPrice; // add total price for partiular item...item 

                } // for loop end .......
                document.getElementById("final-item").innerHTML = "Price ("+ totalItem +"&nbsp;&nbsp;Items)"; 
                document.getElementById("final-price").innerHTML = "$"+totalPrice;
                var deliveryCharge = document.getElementById("delivery-charge").innerHTML;
                var deliveryCharge = deliveryCharge.split('$');
                var totalFinal = totalPrice +parseInt(deliveryCharge[1])
                document.getElementById("suTotal").innerHTML = "&nbsp&nbsp&nbsp$"+totalFinal; 
            }else if(response.status == 500){
                  console.log("error message"+ response.msg);
			}else{
                  console.log("server down..... please check internet connection");
			}
             
        });

    //   for(var itemId = 0; itemId < 7; itemId ++){
        
    //   }
     

}