class Rand{ 
    random(){
        var ref = "";
        const alphaNumeric = '0 P 2 N 4 L 6 J 8 H A B C D E F G 9 I 7 K 5 M 3 O 1 Q R S T U V W X Y Z'
        const arr = alphaNumeric.split(" ")
        for(var i = 0; i<=6; i++){
            var randomNum = Math.floor(Math.random() * 35)+0
            ref += arr[randomNum]
        }
        return ref
    }
}
module.exports = Rand