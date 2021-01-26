const {product_id} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

	$.ajax({
		url: "/api/single-product?product_id="+product_id,
		type: "get",
        dataType: 'JSON',
		success: function(response){
            outputProduct(response)
		},
		error: function(){
			alert("An error occured")
		}
    })
    
    var outputProduct = (product)=>{
        $(".product-name").text(product.name)
        $(".product-description").text(product.description)
        $(".product-price").text(product.price)
        $(".product-quantity").text(product.quantity)
        $(".product-sold").text(product.sold)
        $(".product-manufacturer").text(product.manufacturer)
        $(".product-image").attr("href", product.image)
        $(".product-image1").attr("src", product.image)
    }