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