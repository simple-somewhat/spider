CryptoJs = require('crypto-js')

//console.log("DSSS")
function get_sign(value) {
    sign = CryptoJs.HmacSHA256(value,"abfc8f9dcf8c3f3d8aa294ac5f2cf2cc7767e5592590f39c3f503271dd68562b").toString()
    return sign
}
