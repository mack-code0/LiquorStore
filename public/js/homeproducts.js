	$.ajax({
		url: "/api",
		type: "get",
        dataType: 'JSON',
		success: function(response){
            outputProducts(response)
		},
		error: function(){
			alert("An error occured")
		}
	})

function outputProducts(products){

    products.forEach(product=>{
        var div = document.createElement("div")
        div.classList.add("col-md-3","d-flex","product-holder")
        div.innerHTML = `<div class="product ftco-animate fadeInUp ftco-animated">
        <div class="img d-flex align-items-center justify-content-center" style="background-image: url(${product.image});">
            <div class="desc">
                <p class="meta-prod d-flex">
                    <a class="d-flex align-items-center justify-content-center add-to-cart-btn"><span class="flaticon-shopping-bag"></span></a>
                    <a href="#" class="d-flex align-items-center justify-content-center"><span class="flaticon-heart"></span></a>
                    <a href="product-single.html?product_id=${product._id}" class="d-flex align-items-center justify-content-center"><span class="flaticon-visibility"></span></a>
                </p>
            </div>
        </div>
        <div class="text text-center">
            <span class="sale">${product.tag}</span>
            <span class="category">${product.type}</span>
            <h2>${product.name}</h2>
            <small class="d-none product-id">${product._id}</small>
            <p class="mb-0"><span class="price price-sale">$69.00</span> <span class="price">$${product.price}.00</span></p>
        </div>
        </div>`
        console.log(div);
        document.querySelector(".products-holder").appendChild(div)
    })

}
document.querySelectorAll(".product-holder").forEach(element =>{
	element.querySelector(".add-to-cart-btn").addEventListener("click", ()=>{
        alert("Clicked")
    })
})
// Add to cart
// document.querySelectorAll(".product-holder").forEach(element =>{
// 	element.querySelector(".add-to-cart-btn").addEventListener("click", function(){
// 		var param = element.querySelector(".product-id").innerHTML;
// 		$.ajax({
//     		url: "/api/add-to-cart",
//     		type: "post",
//     		data: {id : param},
//     		dataType: 'JSON',
//     		success: function(response){
// 				// $('#cart-number').text(response[response.length-1].quantity)
// 				// loadProducts()
//     			alert("Added to cart")
//     		},
//     		error: function(){
//     			alert("An error occured")
//     		}
//     	})
// 	})
// })

// function showCart(response){
// 	$(".items-in-cart").remove()
// 	var index = -1;
// 	response.forEach(element=>{
// 		index++;
// 		// The iteration stops before the last object in the array, becos the last object in the array is just the total numbers of products in the cart
// 		if(index!==response.length-1){
// 		var htm = '<div class="dropdown-item d-flex align-items-start items-in-cart" href="#">'
// 	    	+'<div class="img" style="background-image: url('+element.image+');"></div>'
// 	    	+'<div class="text pl-3">'
// 	    		+'<h4>'+element.name+'</h4>'
// 	    		+'<p class="mb-0"><a href="#" class="price">$'+element.price+'</a><span class="quantity ml-3">Quantity: '+element.quantity+'</span></p>'
// 	    	+'</div>'
// 	    +'</div>'
// 		$(".parent-cart").append(htm);
// 		}
// 	})
// }
