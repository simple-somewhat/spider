
API_KEY = "a2c903cc-b31e-4547-9299-b6d07b7631ab"
u  = 1111111111111

function encryptTime(e){
  var n = (1 * e + u).toString().split("")  , r = parseInt(10 * Math.random(), 10)  , t = parseInt(10 * Math.random(), 10)
  , a = parseInt(10 * Math.random(), 10);
return n.concat([r, t, a]).join("")
}

function encryptApi(){
    var e = API_KEY, n = e.split(""), r = n.splice(0, 8);
    return e = n.concat(r).join("")
}

function getApikey(){
    e = (new Date).getTime();
    n = encryptApi();
    e = encryptTime(e);
    var r = "".concat(n, "|").concat(e);
    return btoa(r)
}


