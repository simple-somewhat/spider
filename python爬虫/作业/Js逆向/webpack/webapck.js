!function (e) {
    var t = {};
    function n(r) {
        if(t[r]){
            console.log("2222");
            console.log(t[r].exports);
            return t[r].exports
        }

        console.log(1111)
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports
    }

    n(0)
    //n(0)
}([
        function () {
            console.log('123456')
        },
        function () {
            console.log('11111')
        }

    ])