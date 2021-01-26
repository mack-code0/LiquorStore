
//Calculating cart in cart.jsp
var cartProductTotal = 0;
document.querySelectorAll(".cart-product-price").forEach(element=>{
	cartProductTotal=cartProductTotal+Number(element.innerText)
})
$(".cart-subtotal").text(`${cartProductTotal}`)
//Calculating shipping fee
var shippingCount = 0;
document.querySelectorAll(".cart-product-quantity").forEach(element=>{
	shippingCount = shippingCount+Number(element.value);
})
var shippingFee = shippingCount*10;
$(".cart-delivery-amount").text(`${shippingFee}`)

var discount = Number(document.querySelector(".cart-discount").innerHTML)

var total = (cartProductTotal+shippingFee)-discount;
$(".calculated-cart-total").text(`${total}`);

// document.querySelector(".ordered").addEventListener("click", function(){
// 	$.ajax({
// 		url: orderUrl,
// 		type: "post",
// 		success: function(response){
// 			alert(response)
// 		},
// 		error: function(){
// 			alert("An error occured")
// 		}
// 	})
// })