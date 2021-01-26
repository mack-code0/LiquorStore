module.exports = (cart, id)=>{
    var Ref = require("../functions/orderId")
    var main_ref_num = new Ref().random()+"-"+((new Ref().random()).substring(0, 3))
    console.log(main_ref_num);
    const orderObj = {
        order_by: id,
        orders: [],
        quantity: 0,
        total_price: 0,
        ref_num: main_ref_num
    }
    cart.forEach((product, index)=>{
        orderObj.orders[index] = {
            name:product.name,
            product_id: product.product_id,
            price: product.price,
            quantity: product.quantity
        }

        orderObj.quantity += product.quantity
        orderObj.total_price += (product.price*product.quantity)
    })

    var delivery_fee = orderObj.quantity*10
    orderObj.total_price += delivery_fee

    return orderObj
}