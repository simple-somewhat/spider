const xt = require('./webout.js')
a = xt("1c46")
c = xt.n(a)

e = xt("b639")

console.log(e)
var o = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl"
var n = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4"
var t = "Z21kD9ZK1ke6ugku2ccWu4n6eLnvoDT0YgGi0y3g-v0B9sYqg8L9D6UERNozYOHqHSBRP77sXLjd8Jr0qr39tvGXPVIznd418T2D1BFoIc5fWaQMCS-ffE-zZb26Dk694TdKmV2j0rVVSVOJt9YyY9csyHiQtBcQGFRHq_7tjqXS56KIwtmU1YwOECBBvtjT5dkRfWTCYSORewFsiOi84hj02BV3hW-wMV8tHNnY99R3UWZS6Z1eWqXcfXHH0WvIRnx3wtFQggKOlJni6wXDrHxD9NOissZ4lzgSAes9JW7QafHsok-by1XJPj4xrqmxwMS8Heo_55dFvzfJb4pEUBPeSvSlSf61BR8OTmZOPjNTbREsI15t47em1GuqysP7"

function f(e) {
    return c.a.createHash("md5").update(e).digest()
}
T = (t,o,n)=>{
    if (!t)
        return null;
    const a = e.Buffer.alloc(16, f(o))
      , i = e.Buffer.alloc(16, f(n))
      , r = c.a.createDecipheriv("aes-128-cbc", a, i);
    let s = r.update(t, "base64", "utf-8");
    return s += r.final("utf-8"),
    s
}

console.log(T(t, o, n));