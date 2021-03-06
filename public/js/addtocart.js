var loadProducts = ()=>{
	$.ajax({
		url: "/display-cart",
		type: "get",
		dataType: 'JSON',
		success: function(response){
			$('#cart-total').text(response[response.length-1]["cartTotal"])
			showCart(response)
		},
		error: function(){
			alert("An error occured")
		}
	})
}

window.addEventListener("load", function(){
	loadProducts()
})

document.querySelectorAll(".add-to").forEach(element =>{
	element.querySelector(".add-to-cart-btn").addEventListener("click", function(){
		var param = element.querySelector(".product-id").innerHTML;
		$.ajax({
    		url: "/add-to-cart",
    		type: "post",
    		data: {id : param},
    		dataType: 'JSON',
    		success: function(response){
				if(response.apiErr){
					$(location).attr('href', "/login?apiErr="+response.apiErr)
				}else{
					loadProducts()
					alertify.set("notifier", "position", "bottom-center");
            		alertify.success(`<img src="./images/checklist.svg" width="30" class="mr-2">${response.name} added to Cart`)
				}
    		},
    		error: function(){
				// console.log(error)
    			alert("An error occured")
    		}
    	})
	})
})

function showCart(response){
	$(".items-in-cart").remove()
	var index = -1;
	response.forEach(element=>{
		index++;
		// The iteration stops before the last object in the array, becos the last object in the array is just the total numbers of products in the cart
		if(index!==response.length-1){
		var htm = '<div class="dropdown-item d-flex align-items-start items-in-cart" href="#">'
	    	+'<div class="img" style="background-image: url('+element.image+');"></div>'
	    	+'<div class="text pl-3">'
	    		+'<h4>'+element.name+'</h4>'
	    		+'<p class="mb-0"><a href="#" class="price">$'+element.price+'</a><span class="quantity ml-3">Quantity: '+element.quantity+'</span></p>'
	    	+'</div>'
	    +'</div>'
		$(".parent-cart").append(htm);
		}
	})
}
