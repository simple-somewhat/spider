window = global
navigator = global

var passport = passport || window.passport || {}
    passport = passport || {},
    passport.lib = passport.lib || {},
    passport.lib.RSAExport = {},
    function(e) {
        function t(e, t, n) {
            null != e && ("number" == typeof e ? this.fromNumber(e, t, n) : null == t && "string" != typeof e ? this.fromString(e, 256) : this.fromString(e, t))
        }
        function n() {
            return new t(null)
        }
        function i(e, t, n, i, s, o) {
            for (; --o >= 0; ) {
                var a = t * this[e++] + n[i] + s;
                s = Math.floor(a / 67108864),
                n[i++] = 67108863 & a
            }
            return s
        }
        function s(e, t, n, i, s, o) {
            for (var a = 32767 & t, r = t >> 15; --o >= 0; ) {
                var c = 32767 & this[e]
                  , l = this[e++] >> 15
                  , d = r * c + l * a;
                c = a * c + ((32767 & d) << 15) + n[i] + (1073741823 & s),
                s = (c >>> 30) + (d >>> 15) + r * l + (s >>> 30),
                n[i++] = 1073741823 & c
            }
            return s
        }
        function o(e, t, n, i, s, o) {
            for (var a = 16383 & t, r = t >> 14; --o >= 0; ) {
                var c = 16383 & this[e]
                  , l = this[e++] >> 14
                  , d = r * c + l * a;
                c = a * c + ((16383 & d) << 14) + n[i] + s,
                s = (c >> 28) + (d >> 14) + r * l,
                n[i++] = 268435455 & c
            }
            return s
        }
        function a(e) {
            return Ln.charAt(e)
        }
        function r(e, t) {
            var n = xn[e.charCodeAt(t)];
            return null == n ? -1 : n
        }
        function c(e) {
            for (var t = this.t - 1; t >= 0; --t)
                e[t] = this[t];
            e.t = this.t,
            e.s = this.s
        }
        function l(e) {
            this.t = 1,
            this.s = 0 > e ? -1 : 0,
            e > 0 ? this[0] = e : -1 > e ? this[0] = e + DV : this.t = 0
        }
        function d(e) {
            var t = n();
            return t.fromInt(e),
            t
        }
        function u(e, n) {
            var i;
            if (16 == n)
                i = 4;
            else if (8 == n)
                i = 3;
            else if (256 == n)
                i = 8;
            else if (2 == n)
                i = 1;
            else if (32 == n)
                i = 5;
            else {
                if (4 != n)
                    return void this.fromRadix(e, n);
                i = 2
            }
            this.t = 0,
            this.s = 0;
            for (var s = e.length, o = !1, a = 0; --s >= 0; ) {
                var c = 8 == i ? 255 & e[s] : r(e, s);
                0 > c ? "-" == e.charAt(s) && (o = !0) : (o = !1,
                0 == a ? this[this.t++] = c : a + i > this.DB ? (this[this.t - 1] |= (c & (1 << this.DB - a) - 1) << a,
                this[this.t++] = c >> this.DB - a) : this[this.t - 1] |= c << a,
                a += i,
                a >= this.DB && (a -= this.DB))
            }
            8 == i && 0 != (128 & e[0]) && (this.s = -1,
            a > 0 && (this[this.t - 1] |= (1 << this.DB - a) - 1 << a)),
            this.clamp(),
            o && t.ZERO.subTo(this, this)
        }
        function g() {
            for (var e = this.s & this.DM; this.t > 0 && this[this.t - 1] == e; )
                --this.t
        }
        function p(e) {
            if (this.s < 0)
                return "-" + this.negate().toString(e);
            var t;
            if (16 == e)
                t = 4;
            else if (8 == e)
                t = 3;
            else if (2 == e)
                t = 1;
            else if (32 == e)
                t = 5;
            else {
                if (4 != e)
                    return this.toRadix(e);
                t = 2
            }
            var n, i = (1 << t) - 1, s = !1, o = "", r = this.t, c = this.DB - r * this.DB % t;
            if (r-- > 0)
                for (c < this.DB && (n = this[r] >> c) > 0 && (s = !0,
                o = a(n)); r >= 0; )
                    t > c ? (n = (this[r] & (1 << c) - 1) << t - c,
                    n |= this[--r] >> (c += this.DB - t)) : (n = this[r] >> (c -= t) & i,
                    0 >= c && (c += this.DB,
                    --r)),
                    n > 0 && (s = !0),
                    s && (o += a(n));
            return s ? o : "0"
        }
        function m() {
            var e = n();
            return t.ZERO.subTo(this, e),
            e
        }
        function f() {
            return this.s < 0 ? this.negate() : this
        }
        function h(e) {
            var t = this.s - e.s;
            if (0 != t)
                return t;
            var n = this.t;
            if (t = n - e.t,
            0 != t)
                return this.s < 0 ? -t : t;
            for (; --n >= 0; )
                if (0 != (t = this[n] - e[n]))
                    return t;
            return 0
        }
        function b(e) {
            var t, n = 1;
            return 0 != (t = e >>> 16) && (e = t,
            n += 16),
            0 != (t = e >> 8) && (e = t,
            n += 8),
            0 != (t = e >> 4) && (e = t,
            n += 4),
            0 != (t = e >> 2) && (e = t,
            n += 2),
            0 != (t = e >> 1) && (e = t,
            n += 1),
            n
        }
        function y() {
            return this.t <= 0 ? 0 : this.DB * (this.t - 1) + b(this[this.t - 1] ^ this.s & this.DM)
        }
        function _(e, t) {
            var n;
            for (n = this.t - 1; n >= 0; --n)
                t[n + e] = this[n];
            for (n = e - 1; n >= 0; --n)
                t[n] = 0;
            t.t = this.t + e,
            t.s = this.s
        }
        function w(e, t) {
            for (var n = e; n < this.t; ++n)
                t[n - e] = this[n];
            t.t = Math.max(this.t - e, 0),
            t.s = this.s
        }
        function E(e, t) {
            var n, i = e % this.DB, s = this.DB - i, o = (1 << s) - 1, a = Math.floor(e / this.DB), r = this.s << i & this.DM;
            for (n = this.t - 1; n >= 0; --n)
                t[n + a + 1] = this[n] >> s | r,
                r = (this[n] & o) << i;
            for (n = a - 1; n >= 0; --n)
                t[n] = 0;
            t[a] = r,
            t.t = this.t + a + 1,
            t.s = this.s,
            t.clamp()
        }
        function C(e, t) {
            t.s = this.s;
            var n = Math.floor(e / this.DB);
            if (n >= this.t)
                return void (t.t = 0);
            var i = e % this.DB
              , s = this.DB - i
              , o = (1 << i) - 1;
            t[0] = this[n] >> i;
            for (var a = n + 1; a < this.t; ++a)
                t[a - n - 1] |= (this[a] & o) << s,
                t[a - n] = this[a] >> i;
            i > 0 && (t[this.t - n - 1] |= (this.s & o) << s),
            t.t = this.t - n,
            t.clamp()
        }
        function S(e, t) {
            for (var n = 0, i = 0, s = Math.min(e.t, this.t); s > n; )
                i += this[n] - e[n],
                t[n++] = i & this.DM,
                i >>= this.DB;
            if (e.t < this.t) {
                for (i -= e.s; n < this.t; )
                    i += this[n],
                    t[n++] = i & this.DM,
                    i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; n < e.t; )
                    i -= e[n],
                    t[n++] = i & this.DM,
                    i >>= this.DB;
                i -= e.s
            }
            t.s = 0 > i ? -1 : 0,
            -1 > i ? t[n++] = this.DV + i : i > 0 && (t[n++] = i),
            t.t = n,
            t.clamp()
        }
        function T(e, n) {
            var i = this.abs()
              , s = e.abs()
              , o = i.t;
            for (n.t = o + s.t; --o >= 0; )
                n[o] = 0;
            for (o = 0; o < s.t; ++o)
                n[o + i.t] = i.am(0, s[o], n, o, 0, i.t);
            n.s = 0,
            n.clamp(),
            this.s != e.s && t.ZERO.subTo(n, n)
        }
        function D(e) {
            for (var t = this.abs(), n = e.t = 2 * t.t; --n >= 0; )
                e[n] = 0;
            for (n = 0; n < t.t - 1; ++n) {
                var i = t.am(n, t[n], e, 2 * n, 0, 1);
                (e[n + t.t] += t.am(n + 1, 2 * t[n], e, 2 * n + 1, i, t.t - n - 1)) >= t.DV && (e[n + t.t] -= t.DV,
                e[n + t.t + 1] = 1)
            }
            e.t > 0 && (e[e.t - 1] += t.am(n, t[n], e, 2 * n, 0, 1)),
            e.s = 0,
            e.clamp()
        }
        function I(e, i, s) {
            var o = e.abs();
            if (!(o.t <= 0)) {
                var a = this.abs();
                if (a.t < o.t)
                    return null != i && i.fromInt(0),
                    void (null != s && this.copyTo(s));
                null == s && (s = n());
                var r = n()
                  , c = this.s
                  , l = e.s
                  , d = this.DB - b(o[o.t - 1]);
                d > 0 ? (o.lShiftTo(d, r),
                a.lShiftTo(d, s)) : (o.copyTo(r),
                a.copyTo(s));
                var u = r.t
                  , g = r[u - 1];
                if (0 != g) {
                    var p = g * (1 << this.F1) + (u > 1 ? r[u - 2] >> this.F2 : 0)
                      , m = this.FV / p
                      , f = (1 << this.F1) / p
                      , h = 1 << this.F2
                      , v = s.t
                      , y = v - u
                      , _ = null == i ? n() : i;
                    for (r.dlShiftTo(y, _),
                    s.compareTo(_) >= 0 && (s[s.t++] = 1,
                    s.subTo(_, s)),
                    t.ONE.dlShiftTo(u, _),
                    _.subTo(r, r); r.t < u; )
                        r[r.t++] = 0;
                    for (; --y >= 0; ) {
                        var w = s[--v] == g ? this.DM : Math.floor(s[v] * m + (s[v - 1] + h) * f);
                        if ((s[v] += r.am(0, w, s, y, 0, u)) < w)
                            for (r.dlShiftTo(y, _),
                            s.subTo(_, s); s[v] < --w; )
                                s.subTo(_, s)
                    }
                    null != i && (s.drShiftTo(u, i),
                    c != l && t.ZERO.subTo(i, i)),
                    s.t = u,
                    s.clamp(),
                    d > 0 && s.rShiftTo(d, s),
                    0 > c && t.ZERO.subTo(s, s)
                }
            }
        }
        function k(e) {
            var i = n();
            return this.abs().divRemTo(e, null, i),
            this.s < 0 && i.compareTo(t.ZERO) > 0 && e.subTo(i, i),
            i
        }
        function R(e) {
            this.m = e
        }
        function L(e) {
            return e.s < 0 || e.compareTo(this.m) >= 0 ? e.mod(this.m) : e
        }
        function x(e) {
            return e
        }
        function P(e) {
            e.divRemTo(this.m, null, e)
        }
        function A(e, t, n) {
            e.multiplyTo(t, n),
            this.reduce(n)
        }
        function M(e, t) {
            e.squareTo(t),
            this.reduce(t)
        }
        function B() {
            if (this.t < 1)
                return 0;
            var e = this[0];
            if (0 == (1 & e))
                return 0;
            var t = 3 & e;
            return t = t * (2 - (15 & e) * t) & 15,
            t = t * (2 - (255 & e) * t) & 255,
            t = t * (2 - ((65535 & e) * t & 65535)) & 65535,
            t = t * (2 - e * t % this.DV) % this.DV,
            t > 0 ? this.DV - t : -t
        }
        function O(e) {
            this.m = e,
            this.mp = e.invDigit(),
            this.mpl = 32767 & this.mp,
            this.mph = this.mp >> 15,
            this.um = (1 << e.DB - 15) - 1,
            this.mt2 = 2 * e.t
        }
        function $(e) {
            var i = n();
            return e.abs().dlShiftTo(this.m.t, i),
            i.divRemTo(this.m, null, i),
            e.s < 0 && i.compareTo(t.ZERO) > 0 && this.m.subTo(i, i),
            i
        }
        function V(e) {
            var t = n();
            return e.copyTo(t),
            this.reduce(t),
            t
        }
        function N(e) {
            for (; e.t <= this.mt2; )
                e[e.t++] = 0;
            for (var t = 0; t < this.m.t; ++t) {
                var n = 32767 & e[t]
                  , i = n * this.mpl + ((n * this.mph + (e[t] >> 15) * this.mpl & this.um) << 15) & e.DM;
                for (n = t + this.m.t,
                e[n] += this.m.am(0, i, e, t, 0, this.m.t); e[n] >= e.DV; )
                    e[n] -= e.DV,
                    e[++n]++
            }
            e.clamp(),
            e.drShiftTo(this.m.t, e),
            e.compareTo(this.m) >= 0 && e.subTo(this.m, e)
        }
        function q(e, t) {
            e.squareTo(t),
            this.reduce(t)
        }
        function U(e, t, n) {
            e.multiplyTo(t, n),
            this.reduce(n)
        }
        function H() {
            return 0 == (this.t > 0 ? 1 & this[0] : this.s)
        }
        function F(e, i) {
            if (e > 4294967295 || 1 > e)
                return t.ONE;
            var s = n()
              , o = n()
              , a = i.convert(this)
              , r = b(e) - 1;
            for (a.copyTo(s); --r >= 0; )
                if (i.sqrTo(s, o),
                (e & 1 << r) > 0)
                    i.mulTo(o, a, s);
                else {
                    var c = s;
                    s = o,
                    o = c
                }
            return i.revert(s)
        }
        function W(e, t) {
            var n;
            return n = 256 > e || t.isEven() ? new R(t) : new O(t),
            this.exp(e, n)
        }
        function K() {
            var e = n();
            return this.copyTo(e),
            e
        }
        function j() {
            if (this.s < 0) {
                if (1 == this.t)
                    return this[0] - this.DV;
                if (0 == this.t)
                    return -1
            } else {
                if (1 == this.t)
                    return this[0];
                if (0 == this.t)
                    return 0
            }
            return (this[1] & (1 << 32 - this.DB) - 1) << this.DB | this[0]
        }
        function Q() {
            return 0 == this.t ? this.s : this[0] << 24 >> 24
        }
        function J() {
            return 0 == this.t ? this.s : this[0] << 16 >> 16
        }
        function G(e) {
            return Math.floor(Math.LN2 * this.DB / Math.log(e))
        }
        function z() {
            return this.s < 0 ? -1 : this.t <= 0 || 1 == this.t && this[0] <= 0 ? 0 : 1
        }
        function Z(e) {
            if (null == e && (e = 10),
            0 == this.signum() || 2 > e || e > 36)
                return "0";
            var t = this.chunkSize(e)
              , i = Math.pow(e, t)
              , s = d(i)
              , o = n()
              , a = n()
              , r = "";
            for (this.divRemTo(s, o, a); o.signum() > 0; )
                r = (i + a.intValue()).toString(e).substr(1) + r,
                o.divRemTo(s, o, a);
            return a.intValue().toString(e) + r
        }
        function Y(e, n) {
            this.fromInt(0),
            null == n && (n = 10);
            for (var i = this.chunkSize(n), s = Math.pow(n, i), o = !1, a = 0, c = 0, l = 0; l < e.length; ++l) {
                var d = r(e, l);
                0 > d ? "-" == e.charAt(l) && 0 == this.signum() && (o = !0) : (c = n * c + d,
                ++a >= i && (this.dMultiply(s),
                this.dAddOffset(c, 0),
                a = 0,
                c = 0))
            }
            a > 0 && (this.dMultiply(Math.pow(n, a)),
            this.dAddOffset(c, 0)),
            o && t.ZERO.subTo(this, this)
        }
        function X(e, n, i) {
            if ("number" == typeof n)
                if (2 > e)
                    this.fromInt(1);
                else
                    for (this.fromNumber(e, i),
                    this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), rt, this),
                    this.isEven() && this.dAddOffset(1, 0); !this.isProbablePrime(n); )
                        this.dAddOffset(2, 0),
                        this.bitLength() > e && this.subTo(t.ONE.shiftLeft(e - 1), this);
            else {
                var s = new Array
                  , o = 7 & e;
                s.length = (e >> 3) + 1,
                n.nextBytes(s),
                o > 0 ? s[0] &= (1 << o) - 1 : s[0] = 0,
                this.fromString(s, 256)
            }
        }
        function et() {
            var e = this.t
              , t = new Array;
            t[0] = this.s;
            var n, i = this.DB - e * this.DB % 8, s = 0;
            if (e-- > 0)
                for (i < this.DB && (n = this[e] >> i) != (this.s & this.DM) >> i && (t[s++] = n | this.s << this.DB - i); e >= 0; )
                    8 > i ? (n = (this[e] & (1 << i) - 1) << 8 - i,
                    n |= this[--e] >> (i += this.DB - 8)) : (n = this[e] >> (i -= 8) & 255,
                    0 >= i && (i += this.DB,
                    --e)),
                    0 != (128 & n) && (n |= -256),
                    0 == s && (128 & this.s) != (128 & n) && ++s,
                    (s > 0 || n != this.s) && (t[s++] = n);
            return t
        }
        function tt(e) {
            return 0 == this.compareTo(e)
        }
        function nt(e) {
            return this.compareTo(e) < 0 ? this : e
        }
        function it(e) {
            return this.compareTo(e) > 0 ? this : e
        }
        function st(e, t, n) {
            var i, s, o = Math.min(e.t, this.t);
            for (i = 0; o > i; ++i)
                n[i] = t(this[i], e[i]);
            if (e.t < this.t) {
                for (s = e.s & this.DM,
                i = o; i < this.t; ++i)
                    n[i] = t(this[i], s);
                n.t = this.t
            } else {
                for (s = this.s & this.DM,
                i = o; i < e.t; ++i)
                    n[i] = t(s, e[i]);
                n.t = e.t
            }
            n.s = t(this.s, e.s),
            n.clamp()
        }
        function ot(e, t) {
            return e & t
        }
        function at(e) {
            var t = n();
            return this.bitwiseTo(e, ot, t),
            t
        }
        function rt(e, t) {
            return e | t
        }
        function ct(e) {
            var t = n();
            return this.bitwiseTo(e, rt, t),
            t
        }
        function lt(e, t) {
            return e ^ t
        }
        function dt(e) {
            var t = n();
            return this.bitwiseTo(e, lt, t),
            t
        }
        function ut(e, t) {
            return e & ~t
        }
        function gt(e) {
            var t = n();
            return this.bitwiseTo(e, ut, t),
            t
        }
        function pt() {
            for (var e = n(), t = 0; t < this.t; ++t)
                e[t] = this.DM & ~this[t];
            return e.t = this.t,
            e.s = ~this.s,
            e
        }
        function mt(e) {
            var t = n();
            return 0 > e ? this.rShiftTo(-e, t) : this.lShiftTo(e, t),
            t
        }
        function ft(e) {
            var t = n();
            return 0 > e ? this.lShiftTo(-e, t) : this.rShiftTo(e, t),
            t
        }
        function ht(e) {
            if (0 == e)
                return -1;
            var t = 0;
            return 0 == (65535 & e) && (e >>= 16,
            t += 16),
            0 == (255 & e) && (e >>= 8,
            t += 8),
            0 == (15 & e) && (e >>= 4,
            t += 4),
            0 == (3 & e) && (e >>= 2,
            t += 2),
            0 == (1 & e) && ++t,
            t
        }
        function vt() {
            for (var e = 0; e < this.t; ++e)
                if (0 != this[e])
                    return e * this.DB + ht(this[e]);
            return this.s < 0 ? this.t * this.DB : -1
        }
        function bt(e) {
            for (var t = 0; 0 != e; )
                e &= e - 1,
                ++t;
            return t
        }
        function yt() {
            for (var e = 0, t = this.s & this.DM, n = 0; n < this.t; ++n)
                e += bt(this[n] ^ t);
            return e
        }
        function _t(e) {
            var t = Math.floor(e / this.DB);
            return t >= this.t ? 0 != this.s : 0 != (this[t] & 1 << e % this.DB)
        }
        function wt(e, n) {
            var i = t.ONE.shiftLeft(e);
            return this.bitwiseTo(i, n, i),
            i
        }
        function Et(e) {
            return this.changeBit(e, rt)
        }
        function Ct(e) {
            return this.changeBit(e, ut)
        }
        function St(e) {
            return this.changeBit(e, lt)
        }
        function Tt(e, t) {
            for (var n = 0, i = 0, s = Math.min(e.t, this.t); s > n; )
                i += this[n] + e[n],
                t[n++] = i & this.DM,
                i >>= this.DB;
            if (e.t < this.t) {
                for (i += e.s; n < this.t; )
                    i += this[n],
                    t[n++] = i & this.DM,
                    i >>= this.DB;
                i += this.s
            } else {
                for (i += this.s; n < e.t; )
                    i += e[n],
                    t[n++] = i & this.DM,
                    i >>= this.DB;
                i += e.s
            }
            t.s = 0 > i ? -1 : 0,
            i > 0 ? t[n++] = i : -1 > i && (t[n++] = this.DV + i),
            t.t = n,
            t.clamp()
        }
        function Dt(e) {
            var t = n();
            return this.addTo(e, t),
            t
        }
        function It(e) {
            var t = n();
            return this.subTo(e, t),
            t
        }
        function kt(e) {
            var t = n();
            return this.multiplyTo(e, t),
            t
        }
        function Rt() {
            var e = n();
            return this.squareTo(e),
            e
        }
        function Lt(e) {
            var t = n();
            return this.divRemTo(e, t, null),
            t
        }
        function xt(e) {
            var t = n();
            return this.divRemTo(e, null, t),
            t
        }
        function Pt(e) {
            var t = n()
              , i = n();
            return this.divRemTo(e, t, i),
            new Array(t,i)
        }
        function At(e) {
            this[this.t] = this.am(0, e - 1, this, 0, 0, this.t),
            ++this.t,
            this.clamp()
        }
        function Mt(e, t) {
            if (0 != e) {
                for (; this.t <= t; )
                    this[this.t++] = 0;
                for (this[t] += e; this[t] >= this.DV; )
                    this[t] -= this.DV,
                    ++t >= this.t && (this[this.t++] = 0),
                    ++this[t]
            }
        }
        function Bt() {}
        function Ot(e) {
            return e
        }
        function $t(e, t, n) {
            e.multiplyTo(t, n)
        }
        function Vt(e, t) {
            e.squareTo(t)
        }
        function Nt(e) {
            return this.exp(e, new Bt)
        }
        function qt(e, t, n) {
            var i = Math.min(this.t + e.t, t);
            for (n.s = 0,
            n.t = i; i > 0; )
                n[--i] = 0;
            var s;
            for (s = n.t - this.t; s > i; ++i)
                n[i + this.t] = this.am(0, e[i], n, i, 0, this.t);
            for (s = Math.min(e.t, t); s > i; ++i)
                this.am(0, e[i], n, i, 0, t - i);
            n.clamp()
        }
        function Ut(e, t, n) {
            --t;
            var i = n.t = this.t + e.t - t;
            for (n.s = 0; --i >= 0; )
                n[i] = 0;
            for (i = Math.max(t - this.t, 0); i < e.t; ++i)
                n[this.t + i - t] = this.am(t - i, e[i], n, 0, 0, this.t + i - t);
            n.clamp(),
            n.drShiftTo(1, n)
        }
        function Ht(e) {
            this.r2 = n(),
            this.q3 = n(),
            t.ONE.dlShiftTo(2 * e.t, this.r2),
            this.mu = this.r2.divide(e),
            this.m = e
        }
        function Ft(e) {
            if (e.s < 0 || e.t > 2 * this.m.t)
                return e.mod(this.m);
            if (e.compareTo(this.m) < 0)
                return e;
            var t = n();
            return e.copyTo(t),
            this.reduce(t),
            t
        }
        function Wt(e) {
            return e
        }
        function Kt(e) {
            for (e.drShiftTo(this.m.t - 1, this.r2),
            e.t > this.m.t + 1 && (e.t = this.m.t + 1,
            e.clamp()),
            this.mu.multiplyUpperTo(this.r2, this.m.t + 1, this.q3),
            this.m.multiplyLowerTo(this.q3, this.m.t + 1, this.r2); e.compareTo(this.r2) < 0; )
                e.dAddOffset(1, this.m.t + 1);
            for (e.subTo(this.r2, e); e.compareTo(this.m) >= 0; )
                e.subTo(this.m, e)
        }
        function jt(e, t) {
            e.squareTo(t),
            this.reduce(t)
        }
        function Qt(e, t, n) {
            e.multiplyTo(t, n),
            this.reduce(n)
        }
        function Jt(e, t) {
            var i, s, o = e.bitLength(), a = d(1);
            if (0 >= o)
                return a;
            i = 18 > o ? 1 : 48 > o ? 3 : 144 > o ? 4 : 768 > o ? 5 : 6,
            s = 8 > o ? new R(t) : t.isEven() ? new Ht(t) : new O(t);
            var r = new Array
              , c = 3
              , l = i - 1
              , u = (1 << i) - 1;
            if (r[1] = s.convert(this),
            i > 1) {
                var g = n();
                for (s.sqrTo(r[1], g); u >= c; )
                    r[c] = n(),
                    s.mulTo(g, r[c - 2], r[c]),
                    c += 2
            }
            var p, m, f = e.t - 1, h = !0, v = n();
            for (o = b(e[f]) - 1; f >= 0; ) {
                for (o >= l ? p = e[f] >> o - l & u : (p = (e[f] & (1 << o + 1) - 1) << l - o,
                f > 0 && (p |= e[f - 1] >> this.DB + o - l)),
                c = i; 0 == (1 & p); )
                    p >>= 1,
                    --c;
                if ((o -= c) < 0 && (o += this.DB,
                --f),
                h)
                    r[p].copyTo(a),
                    h = !1;
                else {
                    for (; c > 1; )
                        s.sqrTo(a, v),
                        s.sqrTo(v, a),
                        c -= 2;
                    c > 0 ? s.sqrTo(a, v) : (m = a,
                    a = v,
                    v = m),
                    s.mulTo(v, r[p], a)
                }
                for (; f >= 0 && 0 == (e[f] & 1 << o); )
                    s.sqrTo(a, v),
                    m = a,
                    a = v,
                    v = m,
                    --o < 0 && (o = this.DB - 1,
                    --f)
            }
            return s.revert(a)
        }
        function Gt(e) {
            var t = this.s < 0 ? this.negate() : this.clone()
              , n = e.s < 0 ? e.negate() : e.clone();
            if (t.compareTo(n) < 0) {
                var i = t;
                t = n,
                n = i
            }
            var s = t.getLowestSetBit()
              , o = n.getLowestSetBit();
            if (0 > o)
                return t;
            for (o > s && (o = s),
            o > 0 && (t.rShiftTo(o, t),
            n.rShiftTo(o, n)); t.signum() > 0; )
                (s = t.getLowestSetBit()) > 0 && t.rShiftTo(s, t),
                (s = n.getLowestSetBit()) > 0 && n.rShiftTo(s, n),
                t.compareTo(n) >= 0 ? (t.subTo(n, t),
                t.rShiftTo(1, t)) : (n.subTo(t, n),
                n.rShiftTo(1, n));
            return o > 0 && n.lShiftTo(o, n),
            n
        }
        function zt(e) {
            if (0 >= e)
                return 0;
            var t = this.DV % e
              , n = this.s < 0 ? e - 1 : 0;
            if (this.t > 0)
                if (0 == t)
                    n = this[0] % e;
                else
                    for (var i = this.t - 1; i >= 0; --i)
                        n = (t * n + this[i]) % e;
            return n
        }
        function Zt(e) {
            var n = e.isEven();
            if (this.isEven() && n || 0 == e.signum())
                return t.ZERO;
            for (var i = e.clone(), s = this.clone(), o = d(1), a = d(0), r = d(0), c = d(1); 0 != i.signum(); ) {
                for (; i.isEven(); )
                    i.rShiftTo(1, i),
                    n ? (o.isEven() && a.isEven() || (o.addTo(this, o),
                    a.subTo(e, a)),
                    o.rShiftTo(1, o)) : a.isEven() || a.subTo(e, a),
                    a.rShiftTo(1, a);
                for (; s.isEven(); )
                    s.rShiftTo(1, s),
                    n ? (r.isEven() && c.isEven() || (r.addTo(this, r),
                    c.subTo(e, c)),
                    r.rShiftTo(1, r)) : c.isEven() || c.subTo(e, c),
                    c.rShiftTo(1, c);
                i.compareTo(s) >= 0 ? (i.subTo(s, i),
                n && o.subTo(r, o),
                a.subTo(c, a)) : (s.subTo(i, s),
                n && r.subTo(o, r),
                c.subTo(a, c))
            }
            return 0 != s.compareTo(t.ONE) ? t.ZERO : c.compareTo(e) >= 0 ? c.subtract(e) : c.signum() < 0 ? (c.addTo(e, c),
            c.signum() < 0 ? c.add(e) : c) : c
        }
        function Yt(e) {
            var t, n = this.abs();
            if (1 == n.t && n[0] <= Pn[Pn.length - 1]) {
                for (t = 0; t < Pn.length; ++t)
                    if (n[0] == Pn[t])
                        return !0;
                return !1
            }
            if (n.isEven())
                return !1;
            for (t = 1; t < Pn.length; ) {
                for (var i = Pn[t], s = t + 1; s < Pn.length && An > i; )
                    i *= Pn[s++];
                for (i = n.modInt(i); s > t; )
                    if (i % Pn[t++] == 0)
                        return !1
            }
            return n.millerRabin(e)
        }
        function Xt(e) {
            var i = this.subtract(t.ONE)
              , s = i.getLowestSetBit();
            if (0 >= s)
                return !1;
            var o = i.shiftRight(s);
            e = e + 1 >> 1,
            e > Pn.length && (e = Pn.length);
            for (var a = n(), r = 0; e > r; ++r) {
                a.fromInt(Pn[Math.floor(Math.random() * Pn.length)]);
                var c = a.modPow(o, this);
                if (0 != c.compareTo(t.ONE) && 0 != c.compareTo(i)) {
                    for (var l = 1; l++ < s && 0 != c.compareTo(i); )
                        if (c = c.modPowInt(2, this),
                        0 == c.compareTo(t.ONE))
                            return !1;
                    if (0 != c.compareTo(i))
                        return !1
                }
            }
            return !0
        }
        function en() {
            this.i = 0,
            this.j = 0,
            this.S = new Array
        }
        function tn(e) {
            var t, n, i;
            for (t = 0; 256 > t; ++t)
                this.S[t] = t;
            for (n = 0,
            t = 0; 256 > t; ++t)
                n = n + this.S[t] + e[t % e.length] & 255,
                i = this.S[t],
                this.S[t] = this.S[n],
                this.S[n] = i;
            this.i = 0,
            this.j = 0
        }
        function nn() {
            var e;
            return this.i = this.i + 1 & 255,
            this.j = this.j + this.S[this.i] & 255,
            e = this.S[this.i],
            this.S[this.i] = this.S[this.j],
            this.S[this.j] = e,
            this.S[e + this.S[this.i] & 255]
        }
        function sn() {
            return new en
        }
        function on(e) {
            Bn[On++] ^= 255 & e,
            Bn[On++] ^= e >> 8 & 255,
            Bn[On++] ^= e >> 16 & 255,
            Bn[On++] ^= e >> 24 & 255,
            On >= $n && (On -= $n)
        }
        function an() {
            on((new Date).getTime())
        }
        function rn() {
            if (null == Mn) {
                for (an(),
                Mn = sn(),
                Mn.init(Bn),
                On = 0; On < Bn.length; ++On)
                    Bn[On] = 0;
                On = 0
            }
            return Mn.next()
        }
        function cn(e) {
            var t;
            for (t = 0; t < e.length; ++t)
                e[t] = rn()
        }
        function ln() {}
        function dn(e, n) {
            return new t(e,n)
        }
        function un(e, n) {
            if (n < e.length + 11)
                return console.error("Message too long for RSA"),
                null;
            for (var i = new Array, s = e.length - 1; s >= 0 && n > 0; ) {
                var o = e.charCodeAt(s--);
                128 > o ? i[--n] = o : o > 127 && 2048 > o ? (i[--n] = 63 & o | 128,
                i[--n] = o >> 6 | 192) : (i[--n] = 63 & o | 128,
                i[--n] = o >> 6 & 63 | 128,
                i[--n] = o >> 12 | 224)
            }
            i[--n] = 0;
            for (var a = new ln, r = new Array; n > 2; ) {
                for (r[0] = 0; 0 == r[0]; )
                    a.nextBytes(r);
                i[--n] = r[0]
            }
            return i[--n] = 2,
            i[--n] = 0,
            new t(i)
        }
        function gn() {
            this.n = null,
            this.e = 0,
            this.d = null,
            this.p = null,
            this.q = null,
            this.dmp1 = null,
            this.dmq1 = null,
            this.coeff = null
        }
        function pn(e, t) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
            this.e = parseInt(t, 16)) : console.error("Invalid RSA public key")
        }
        function mn(e) {
            return e.modPowInt(this.e, this.n)
        }
        function fn(e) {
            var t = un(e, this.n.bitLength() + 7 >> 3);
            if (null == t)
                return null;
            var n = this.doPublic(t);
            if (null == n)
                return null;
            var i = n.toString(16);
            return 0 == (1 & i.length) ? i : "0" + i
        }
        function hn(e, t) {
            for (var n = e.toByteArray(), i = 0; i < n.length && 0 == n[i]; )
                ++i;
            if (n.length - i != t - 1 || 2 != n[i])
                return null;
            for (++i; 0 != n[i]; )
                if (++i >= n.length)
                    return null;
            for (var s = ""; ++i < n.length; ) {
                var o = 255 & n[i];
                128 > o ? s += String.fromCharCode(o) : o > 191 && 224 > o ? (s += String.fromCharCode((31 & o) << 6 | 63 & n[i + 1]),
                ++i) : (s += String.fromCharCode((15 & o) << 12 | (63 & n[i + 1]) << 6 | 63 & n[i + 2]),
                i += 2)
            }
            return s
        }
        function vn(e, t, n) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
            this.e = parseInt(t, 16),
            this.d = dn(n, 16)) : console.error("Invalid RSA private key")
        }
        function bn(e, t, n, i, s, o, a, r) {
            null != e && null != t && e.length > 0 && t.length > 0 ? (this.n = dn(e, 16),
            this.e = parseInt(t, 16),
            this.d = dn(n, 16),
            this.p = dn(i, 16),
            this.q = dn(s, 16),
            this.dmp1 = dn(o, 16),
            this.dmq1 = dn(a, 16),
            this.coeff = dn(r, 16)) : console.error("Invalid RSA private key")
        }
        function yn(e, n) {
            var i = new ln
              , s = e >> 1;
            this.e = parseInt(n, 16);
            for (var o = new t(n,16); ; ) {
                for (; this.p = new t(e - s,1,i),
                0 != this.p.subtract(t.ONE).gcd(o).compareTo(t.ONE) || !this.p.isProbablePrime(10); )
                    ;
                for (; this.q = new t(s,1,i),
                0 != this.q.subtract(t.ONE).gcd(o).compareTo(t.ONE) || !this.q.isProbablePrime(10); )
                    ;
                if (this.p.compareTo(this.q) <= 0) {
                    var a = this.p;
                    this.p = this.q,
                    this.q = a
                }
                var r = this.p.subtract(t.ONE)
                  , c = this.q.subtract(t.ONE)
                  , l = r.multiply(c);
                if (0 == l.gcd(o).compareTo(t.ONE)) {
                    this.n = this.p.multiply(this.q),
                    this.d = o.modInverse(l),
                    this.dmp1 = this.d.mod(r),
                    this.dmq1 = this.d.mod(c),
                    this.coeff = this.q.modInverse(this.p);
                    break
                }
            }
        }
        function _n(e) {
            if (null == this.p || null == this.q)
                return e.modPow(this.d, this.n);
            for (var t = e.mod(this.p).modPow(this.dmp1, this.p), n = e.mod(this.q).modPow(this.dmq1, this.q); t.compareTo(n) < 0; )
                t = t.add(this.p);
            return t.subtract(n).multiply(this.coeff).mod(this.p).multiply(this.q).add(n)
        }
        function wn(e) {
            var t = dn(e, 16)
              , n = this.doPrivate(t);
            return null == n ? null : hn(n, this.n.bitLength() + 7 >> 3)
        }
        function En(e) {
            var t, n, i = "";
            for (t = 0; t + 3 <= e.length; t += 3)
                n = parseInt(e.substring(t, t + 3), 16),
                i += qn.charAt(n >> 6) + qn.charAt(63 & n);
            for (t + 1 == e.length ? (n = parseInt(e.substring(t, t + 1), 16),
            i += qn.charAt(n << 2)) : t + 2 == e.length && (n = parseInt(e.substring(t, t + 2), 16),
            i += qn.charAt(n >> 2) + qn.charAt((3 & n) << 4)); (3 & i.length) > 0; )
                i += Un;
            return i
        }
        function Cn(e) {
            var t, n, i = "", s = 0;
            for (t = 0; t < e.length && e.charAt(t) != Un; ++t)
                v = qn.indexOf(e.charAt(t)),
                0 > v || (0 == s ? (i += a(v >> 2),
                n = 3 & v,
                s = 1) : 1 == s ? (i += a(n << 2 | v >> 4),
                n = 15 & v,
                s = 2) : 2 == s ? (i += a(n),
                i += a(v >> 2),
                n = 3 & v,
                s = 3) : (i += a(n << 2 | v >> 4),
                i += a(15 & v),
                s = 0));
            return 1 == s && (i += a(n << 2)),
            i
        }
        var Sn, Tn = 0xdeadbeefcafe, Dn = 15715070 == (16777215 & Tn);
        Dn && "Microsoft Internet Explorer" == navigator.appName ? (t.prototype.am = s,
        Sn = 30) : Dn && "Netscape" != navigator.appName ? (t.prototype.am = i,
        Sn = 26) : (t.prototype.am = o,
        Sn = 28),
        t.prototype.DB = Sn,
        t.prototype.DM = (1 << Sn) - 1,
        t.prototype.DV = 1 << Sn;
        var In = 52;
        t.prototype.FV = Math.pow(2, In),
        t.prototype.F1 = In - Sn,
        t.prototype.F2 = 2 * Sn - In;
        var kn, Rn, Ln = "0123456789abcdefghijklmnopqrstuvwxyz", xn = new Array;
        for (kn = "0".charCodeAt(0),
        Rn = 0; 9 >= Rn; ++Rn)
            xn[kn++] = Rn;
        for (kn = "a".charCodeAt(0),
        Rn = 10; 36 > Rn; ++Rn)
            xn[kn++] = Rn;
        for (kn = "A".charCodeAt(0),
        Rn = 10; 36 > Rn; ++Rn)
            xn[kn++] = Rn;
        R.prototype.convert = L,
        R.prototype.revert = x,
        R.prototype.reduce = P,
        R.prototype.mulTo = A,
        R.prototype.sqrTo = M,
        O.prototype.convert = $,
        O.prototype.revert = V,
        O.prototype.reduce = N,
        O.prototype.mulTo = U,
        O.prototype.sqrTo = q,
        t.prototype.copyTo = c,
        t.prototype.fromInt = l,
        t.prototype.fromString = u,
        t.prototype.clamp = g,
        t.prototype.dlShiftTo = _,
        t.prototype.drShiftTo = w,
        t.prototype.lShiftTo = E,
        t.prototype.rShiftTo = C,
        t.prototype.subTo = S,
        t.prototype.multiplyTo = T,
        t.prototype.squareTo = D,
        t.prototype.divRemTo = I,
        t.prototype.invDigit = B,
        t.prototype.isEven = H,
        t.prototype.exp = F,
        t.prototype.toString = p,
        t.prototype.negate = m,
        t.prototype.abs = f,
        t.prototype.compareTo = h,
        t.prototype.bitLength = y,
        t.prototype.mod = k,
        t.prototype.modPowInt = W,
        t.ZERO = d(0),
        t.ONE = d(1),
        Bt.prototype.convert = Ot,
        Bt.prototype.revert = Ot,
        Bt.prototype.mulTo = $t,
        Bt.prototype.sqrTo = Vt,
        Ht.prototype.convert = Ft,
        Ht.prototype.revert = Wt,
        Ht.prototype.reduce = Kt,
        Ht.prototype.mulTo = Qt,
        Ht.prototype.sqrTo = jt;
        var Pn = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 911, 919, 929, 937, 941, 947, 953, 967, 971, 977, 983, 991, 997]
          , An = (1 << 26) / Pn[Pn.length - 1];
        t.prototype.chunkSize = G,
        t.prototype.toRadix = Z,
        t.prototype.fromRadix = Y,
        t.prototype.fromNumber = X,
        t.prototype.bitwiseTo = st,
        t.prototype.changeBit = wt,
        t.prototype.addTo = Tt,
        t.prototype.dMultiply = At,
        t.prototype.dAddOffset = Mt,
        t.prototype.multiplyLowerTo = qt,
        t.prototype.multiplyUpperTo = Ut,
        t.prototype.modInt = zt,
        t.prototype.millerRabin = Xt,
        t.prototype.clone = K,
        t.prototype.intValue = j,
        t.prototype.byteValue = Q,
        t.prototype.shortValue = J,
        t.prototype.signum = z,
        t.prototype.toByteArray = et,
        t.prototype.equals = tt,
        t.prototype.min = nt,
        t.prototype.max = it,
        t.prototype.and = at,
        t.prototype.or = ct,
        t.prototype.xor = dt,
        t.prototype.andNot = gt,
        t.prototype.not = pt,
        t.prototype.shiftLeft = mt,
        t.prototype.shiftRight = ft,
        t.prototype.getLowestSetBit = vt,
        t.prototype.bitCount = yt,
        t.prototype.testBit = _t,
        t.prototype.setBit = Et,
        t.prototype.clearBit = Ct,
        t.prototype.flipBit = St,
        t.prototype.add = Dt,
        t.prototype.subtract = It,
        t.prototype.multiply = kt,
        t.prototype.divide = Lt,
        t.prototype.remainder = xt,
        t.prototype.divideAndRemainder = Pt,
        t.prototype.modPow = Jt,
        t.prototype.modInverse = Zt,
        t.prototype.pow = Nt,
        t.prototype.gcd = Gt,
        t.prototype.isProbablePrime = Yt,
        t.prototype.square = Rt,
        en.prototype.init = tn,
        en.prototype.next = nn;
        var Mn, Bn, On, $n = 256;
        if (null == Bn) {
            Bn = new Array,
            On = 0;
            var Vn;
            if ("Netscape" == navigator.appName && navigator.appVersion < "5" && window.crypto && window.crypto.random) {
                var Nn = window.crypto.random(32);
                for (Vn = 0; Vn < Nn.length; ++Vn)
                    Bn[On++] = 255 & Nn.charCodeAt(Vn)
            }
            for (; $n > On; )
                Vn = Math.floor(65536 * Math.random()),
                Bn[On++] = Vn >>> 8,
                Bn[On++] = 255 & Vn;
            On = 0,
            an()
        }
        ln.prototype.nextBytes = cn,
        gn.prototype.doPublic = mn,
        gn.prototype.setPublic = pn,
        gn.prototype.encrypt = fn,
        gn.prototype.doPrivate = _n,
        gn.prototype.setPrivate = vn,
        gn.prototype.setPrivateEx = bn,
        gn.prototype.generate = yn,
        gn.prototype.decrypt = wn,
        function() {
            var e = function(e, i, s) {
                var o = new ln
                  , a = e >> 1;
                this.e = parseInt(i, 16);
                var r = new t(i,16)
                  , c = this
                  , l = function() {
                    var i = function() {
                        if (c.p.compareTo(c.q) <= 0) {
                            var e = c.p;
                            c.p = c.q,
                            c.q = e
                        }
                        var n = c.p.subtract(t.ONE)
                          , i = c.q.subtract(t.ONE)
                          , o = n.multiply(i);
                        0 == o.gcd(r).compareTo(t.ONE) ? (c.n = c.p.multiply(c.q),
                        c.d = r.modInverse(o),
                        c.dmp1 = c.d.mod(n),
                        c.dmq1 = c.d.mod(i),
                        c.coeff = c.q.modInverse(c.p),
                        setTimeout(function() {
                            s()
                        }, 0)) : setTimeout(l, 0)
                    }
                      , d = function() {
                        c.q = n(),
                        c.q.fromNumberAsync(a, 1, o, function() {
                            c.q.subtract(t.ONE).gcda(r, function(e) {
                                0 == e.compareTo(t.ONE) && c.q.isProbablePrime(10) ? setTimeout(i, 0) : setTimeout(d, 0)
                            })
                        })
                    }
                      , u = function() {
                        c.p = n(),
                        c.p.fromNumberAsync(e - a, 1, o, function() {
                            c.p.subtract(t.ONE).gcda(r, function(e) {
                                0 == e.compareTo(t.ONE) && c.p.isProbablePrime(10) ? setTimeout(d, 0) : setTimeout(u, 0)
                            })
                        })
                    };
                    setTimeout(u, 0)
                };
                setTimeout(l, 0)
            };
            gn.prototype.generateAsync = e;
            var i = function(e, t) {
                var n = this.s < 0 ? this.negate() : this.clone()
                  , i = e.s < 0 ? e.negate() : e.clone();
                if (n.compareTo(i) < 0) {
                    var s = n;
                    n = i,
                    i = s
                }
                var o = n.getLowestSetBit()
                  , a = i.getLowestSetBit();
                if (0 > a)
                    return void t(n);
                a > o && (a = o),
                a > 0 && (n.rShiftTo(a, n),
                i.rShiftTo(a, i));
                var r = function() {
                    (o = n.getLowestSetBit()) > 0 && n.rShiftTo(o, n),
                    (o = i.getLowestSetBit()) > 0 && i.rShiftTo(o, i),
                    n.compareTo(i) >= 0 ? (n.subTo(i, n),
                    n.rShiftTo(1, n)) : (i.subTo(n, i),
                    i.rShiftTo(1, i)),
                    n.signum() > 0 ? setTimeout(r, 0) : (a > 0 && i.lShiftTo(a, i),
                    setTimeout(function() {
                        t(i)
                    }, 0))
                };
                setTimeout(r, 10)
            };
            t.prototype.gcda = i;
            var s = function(e, n, i, s) {
                if ("number" == typeof n)
                    if (2 > e)
                        this.fromInt(1);
                    else {
                        this.fromNumber(e, i),
                        this.testBit(e - 1) || this.bitwiseTo(t.ONE.shiftLeft(e - 1), rt, this),
                        this.isEven() && this.dAddOffset(1, 0);
                        var o = this
                          , a = function() {
                            o.dAddOffset(2, 0),
                            o.bitLength() > e && o.subTo(t.ONE.shiftLeft(e - 1), o),
                            o.isProbablePrime(n) ? setTimeout(function() {
                                s()
                            }, 0) : setTimeout(a, 0)
                        };
                        setTimeout(a, 0)
                    }
                else {
                    var r = new Array
                      , c = 7 & e;
                    r.length = (e >> 3) + 1,
                    n.nextBytes(r),
                    c > 0 ? r[0] &= (1 << c) - 1 : r[0] = 0,
                    this.fromString(r, 256)
                }
            };
            t.prototype.fromNumberAsync = s
        }();
        var qn = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
          , Un = "="
          , Hn = Hn || {};
        Hn.env = Hn.env || {};
        var Fn = Hn
          , Wn = Object.prototype
          , Kn = "[object Function]"
          , jn = ["toString", "valueOf"];
        Hn.env.parseUA = function(e) {
            var t, n = function(e) {
                var t = 0;
                return parseFloat(e.replace(/\./g, function() {
                    return 1 == t++ ? "" : "."
                }))
            }, i = navigator, s = {
                ie: 0,
                opera: 0,
                gecko: 0,
                webkit: 0,
                chrome: 0,
                mobile: null,
                air: 0,
                ipad: 0,
                iphone: 0,
                ipod: 0,
                ios: null,
                android: 0,
                webos: 0,
                caja: i && i.cajaVersion,
                secure: !1,
                os: null
            }, o = e || navigator && navigator.userAgent, a = window && window.location, r = a && a.href;
            return s.secure = r && 0 === r.toLowerCase().indexOf("https"),
            o && (/windows|win32/i.test(o) ? s.os = "windows" : /macintosh/i.test(o) ? s.os = "macintosh" : /rhino/i.test(o) && (s.os = "rhino"),
            /KHTML/.test(o) && (s.webkit = 1),
            t = o.match(/AppleWebKit\/([^\s]*)/),
            t && t[1] && (s.webkit = n(t[1]),
            / Mobile\//.test(o) ? (s.mobile = "Apple",
            t = o.match(/OS ([^\s]*)/),
            t && t[1] && (t = n(t[1].replace("_", "."))),
            s.ios = t,
            s.ipad = s.ipod = s.iphone = 0,
            t = o.match(/iPad|iPod|iPhone/),
            t && t[0] && (s[t[0].toLowerCase()] = s.ios)) : (t = o.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/),
            t && (s.mobile = t[0]),
            /webOS/.test(o) && (s.mobile = "WebOS",
            t = o.match(/webOS\/([^\s]*);/),
            t && t[1] && (s.webos = n(t[1]))),
            / Android/.test(o) && (s.mobile = "Android",
            t = o.match(/Android ([^\s]*);/),
            t && t[1] && (s.android = n(t[1])))),
            t = o.match(/Chrome\/([^\s]*)/),
            t && t[1] ? s.chrome = n(t[1]) : (t = o.match(/AdobeAIR\/([^\s]*)/),
            t && (s.air = t[0]))),
            s.webkit || (t = o.match(/Opera[\s\/]([^\s]*)/),
            t && t[1] ? (s.opera = n(t[1]),
            t = o.match(/Version\/([^\s]*)/),
            t && t[1] && (s.opera = n(t[1])),
            t = o.match(/Opera Mini[^;]*/),
            t && (s.mobile = t[0])) : (t = o.match(/MSIE\s([^;]*)/),
            t && t[1] ? s.ie = n(t[1]) : (t = o.match(/Gecko\/([^\s]*)/),
            t && (s.gecko = 1,
            t = o.match(/rv:([^\s\)]*)/),
            t && t[1] && (s.gecko = n(t[1]))))))),
            s
        }
        ,
        Hn.env.ua = Hn.env.parseUA(),
        Hn.isFunction = function(e) {
            return "function" == typeof e || Wn.toString.apply(e) === Kn
        }
        ,
        Hn._IEEnumFix = Hn.env.ua.ie ? function(e, t) {
            var n, i, s;
            for (n = 0; n < jn.length; n += 1)
                i = jn[n],
                s = t[i],
                Fn.isFunction(s) && s != Wn[i] && (e[i] = s)
        }
        : function() {}
        ,
        Hn.extend = function(e, t, n) {
            if (!t || !e)
                throw new Error("extend failed, please check that all dependencies are included.");
            var i, s = function() {};
            if (s.prototype = t.prototype,
            e.prototype = new s,
            e.prototype.constructor = e,
            e.superclass = t.prototype,
            t.prototype.constructor == Wn.constructor && (t.prototype.constructor = t),
            n) {
                for (i in n)
                    Fn.hasOwnProperty(n, i) && (e.prototype[i] = n[i]);
                Fn._IEEnumFix(e.prototype, n)
            }
        }
        ,
        "undefined" != typeof KJUR && KJUR || (KJUR = {}),
        "undefined" != typeof KJUR.asn1 && KJUR.asn1 || (KJUR.asn1 = {}),
        KJUR.asn1.ASN1Util = new function() {
            this.integerToByteHex = function(e) {
                var t = e.toString(16);
                return t.length % 2 == 1 && (t = "0" + t),
                t
            }
            ,
            this.bigIntToMinTwosComplementsHex = function(e) {
                var n = e.toString(16);
                if ("-" != n.substr(0, 1))
                    n.length % 2 == 1 ? n = "0" + n : n.match(/^[0-7]/) || (n = "00" + n);
                else {
                    var i = n.substr(1)
                      , s = i.length;
                    s % 2 == 1 ? s += 1 : n.match(/^[0-7]/) || (s += 2);
                    for (var o = "", a = 0; s > a; a++)
                        o += "f";
                    var r = new t(o,16)
                      , c = r.xor(e).add(t.ONE);
                    n = c.toString(16).replace(/^-/, "")
                }
                return n
            }
            ,
            this.getPEMStringFromHex = function(e, t) {
                var n = CryptoJS.enc.Hex.parse(e)
                  , i = CryptoJS.enc.Base64.stringify(n)
                  , s = i.replace(/(.{64})/g, "$1\r\n");
                return s = s.replace(/\r\n$/, ""),
                "-----BEGIN " + t + "-----\r\n" + s + "\r\n-----END " + t + "-----\r\n"
            }
        }
        ,
        KJUR.asn1.ASN1Object = function() {
            var e = "";
            this.getLengthHexFromValue = function() {
                if ("undefined" == typeof this.hV || null == this.hV)
                    throw "this.hV is null or undefined.";
                if (this.hV.length % 2 == 1)
                    throw "value hex must be even length: n=" + e.length + ",v=" + this.hV;
                var t = this.hV.length / 2
                  , n = t.toString(16);
                if (n.length % 2 == 1 && (n = "0" + n),
                128 > t)
                    return n;
                var i = n.length / 2;
                if (i > 15)
                    throw "ASN.1 length too long to represent by 8x: n = " + t.toString(16);
                var s = 128 + i;
                return s.toString(16) + n
            }
            ,
            this.getEncodedHex = function() {
                return (null == this.hTLV || this.isModified) && (this.hV = this.getFreshValueHex(),
                this.hL = this.getLengthHexFromValue(),
                this.hTLV = this.hT + this.hL + this.hV,
                this.isModified = !1),
                this.hTLV
            }
            ,
            this.getValueHex = function() {
                return this.getEncodedHex(),
                this.hV
            }
            ,
            this.getFreshValueHex = function() {
                return ""
            }
        }
        ,
        KJUR.asn1.DERAbstractString = function(e) {
            KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = e,
                this.hV = stohex(this.s)
            }
            ,
            this.setStringHex = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex && this.setStringHex(e.hex))
        }
        ,
        Hn.extend(KJUR.asn1.DERAbstractString, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERAbstractTime = function() {
            KJUR.asn1.DERAbstractTime.superclass.constructor.call(this),
            this.localDateToUTC = function(e) {
                utc = e.getTime() + 6e4 * e.getTimezoneOffset();
                var t = new Date(utc);
                return t
            }
            ,
            this.formatDate = function(e, t) {
                var n = this.zeroPadding
                  , i = this.localDateToUTC(e)
                  , s = String(i.getFullYear());
                "utc" == t && (s = s.substr(2, 2));
                var o = n(String(i.getMonth() + 1), 2)
                  , a = n(String(i.getDate()), 2)
                  , r = n(String(i.getHours()), 2)
                  , c = n(String(i.getMinutes()), 2)
                  , l = n(String(i.getSeconds()), 2);
                return s + o + a + r + c + l + "Z"
            }
            ,
            this.zeroPadding = function(e, t) {
                return e.length >= t ? e : new Array(t - e.length + 1).join("0") + e
            }
            ,
            this.getString = function() {
                return this.s
            }
            ,
            this.setString = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = e,
                this.hV = stohex(this.s)
            }
            ,
            this.setByDateValue = function(e, t, n, i, s, o) {
                var a = new Date(Date.UTC(e, t - 1, n, i, s, o, 0));
                this.setByDate(a)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
        }
        ,
        Hn.extend(KJUR.asn1.DERAbstractTime, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERAbstractStructured = function(e) {
            KJUR.asn1.DERAbstractString.superclass.constructor.call(this),
            this.setByASN1ObjectArray = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array = e
            }
            ,
            this.appendASN1Object = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.asn1Array.push(e)
            }
            ,
            this.asn1Array = new Array,
            "undefined" != typeof e && "undefined" != typeof e.array && (this.asn1Array = e.array)
        }
        ,
        Hn.extend(KJUR.asn1.DERAbstractStructured, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERBoolean = function() {
            KJUR.asn1.DERBoolean.superclass.constructor.call(this),
            this.hT = "01",
            this.hTLV = "0101ff"
        }
        ,
        Hn.extend(KJUR.asn1.DERBoolean, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERInteger = function(e) {
            KJUR.asn1.DERInteger.superclass.constructor.call(this),
            this.hT = "02",
            this.setByBigInteger = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)
            }
            ,
            this.setByInteger = function(e) {
                var n = new t(String(e),10);
                this.setByBigInteger(n)
            }
            ,
            this.setValueHex = function(e) {
                this.hV = e
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.bigint ? this.setByBigInteger(e.bigint) : "undefined" != typeof e["int"] ? this.setByInteger(e["int"]) : "undefined" != typeof e.hex && this.setValueHex(e.hex))
        }
        ,
        Hn.extend(KJUR.asn1.DERInteger, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERBitString = function(e) {
            KJUR.asn1.DERBitString.superclass.constructor.call(this),
            this.hT = "03",
            this.setHexValueIncludingUnusedBits = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.hV = e
            }
            ,
            this.setUnusedBitsAndHexValue = function(e, t) {
                if (0 > e || e > 7)
                    throw "unused bits shall be from 0 to 7: u = " + e;
                var n = "0" + e;
                this.hTLV = null,
                this.isModified = !0,
                this.hV = n + t
            }
            ,
            this.setByBinaryString = function(e) {
                e = e.replace(/0+$/, "");
                var t = 8 - e.length % 8;
                8 == t && (t = 0);
                for (var n = 0; t >= n; n++)
                    e += "0";
                for (var i = "", n = 0; n < e.length - 1; n += 8) {
                    var s = e.substr(n, 8)
                      , o = parseInt(s, 2).toString(16);
                    1 == o.length && (o = "0" + o),
                    i += o
                }
                this.hTLV = null,
                this.isModified = !0,
                this.hV = "0" + t + i
            }
            ,
            this.setByBooleanArray = function(e) {
                for (var t = "", n = 0; n < e.length; n++)
                    t += 1 == e[n] ? "1" : "0";
                this.setByBinaryString(t)
            }
            ,
            this.newFalseArray = function(e) {
                for (var t = new Array(e), n = 0; e > n; n++)
                    t[n] = !1;
                return t
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.hex ? this.setHexValueIncludingUnusedBits(e.hex) : "undefined" != typeof e.bin ? this.setByBinaryString(e.bin) : "undefined" != typeof e.array && this.setByBooleanArray(e.array))
        }
        ,
        Hn.extend(KJUR.asn1.DERBitString, KJUR.asn1.ASN1Object),
        KJUR.asn1.DEROctetString = function(e) {
            KJUR.asn1.DEROctetString.superclass.constructor.call(this, e),
            this.hT = "04"
        }
        ,
        Hn.extend(KJUR.asn1.DEROctetString, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERNull = function() {
            KJUR.asn1.DERNull.superclass.constructor.call(this),
            this.hT = "05",
            this.hTLV = "0500"
        }
        ,
        Hn.extend(KJUR.asn1.DERNull, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERObjectIdentifier = function(e) {
            var n = function(e) {
                var t = e.toString(16);
                return 1 == t.length && (t = "0" + t),
                t
            }
              , i = function(e) {
                var i = ""
                  , s = new t(e,10)
                  , o = s.toString(2)
                  , a = 7 - o.length % 7;
                7 == a && (a = 0);
                for (var r = "", c = 0; a > c; c++)
                    r += "0";
                o = r + o;
                for (var c = 0; c < o.length - 1; c += 7) {
                    var l = o.substr(c, 7);
                    c != o.length - 7 && (l = "1" + l),
                    i += n(parseInt(l, 2))
                }
                return i
            };
            KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this),
            this.hT = "06",
            this.setValueHex = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = e
            }
            ,
            this.setValueOidString = function(e) {
                if (!e.match(/^[0-9.]+$/))
                    throw "malformed oid string: " + e;
                var t = ""
                  , s = e.split(".")
                  , o = 40 * parseInt(s[0]) + parseInt(s[1]);
                t += n(o),
                s.splice(0, 2);
                for (var a = 0; a < s.length; a++)
                    t += i(s[a]);
                this.hTLV = null,
                this.isModified = !0,
                this.s = null,
                this.hV = t
            }
            ,
            this.setValueName = function(e) {
                if ("undefined" == typeof KJUR.asn1.x509.OID.name2oidList[e])
                    throw "DERObjectIdentifier oidName undefined: " + e;
                var t = KJUR.asn1.x509.OID.name2oidList[e];
                this.setValueOidString(t)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.oid ? this.setValueOidString(e.oid) : "undefined" != typeof e.hex ? this.setValueHex(e.hex) : "undefined" != typeof e.name && this.setValueName(e.name))
        }
        ,
        Hn.extend(KJUR.asn1.DERObjectIdentifier, KJUR.asn1.ASN1Object),
        KJUR.asn1.DERUTF8String = function(e) {
            KJUR.asn1.DERUTF8String.superclass.constructor.call(this, e),
            this.hT = "0c"
        }
        ,
        Hn.extend(KJUR.asn1.DERUTF8String, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERNumericString = function(e) {
            KJUR.asn1.DERNumericString.superclass.constructor.call(this, e),
            this.hT = "12"
        }
        ,
        Hn.extend(KJUR.asn1.DERNumericString, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERPrintableString = function(e) {
            KJUR.asn1.DERPrintableString.superclass.constructor.call(this, e),
            this.hT = "13"
        }
        ,
        Hn.extend(KJUR.asn1.DERPrintableString, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERTeletexString = function(e) {
            KJUR.asn1.DERTeletexString.superclass.constructor.call(this, e),
            this.hT = "14"
        }
        ,
        Hn.extend(KJUR.asn1.DERTeletexString, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERIA5String = function(e) {
            KJUR.asn1.DERIA5String.superclass.constructor.call(this, e),
            this.hT = "16"
        }
        ,
        Hn.extend(KJUR.asn1.DERIA5String, KJUR.asn1.DERAbstractString),
        KJUR.asn1.DERUTCTime = function(e) {
            KJUR.asn1.DERUTCTime.superclass.constructor.call(this, e),
            this.hT = "17",
            this.setByDate = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = e,
                this.s = this.formatDate(this.date, "utc"),
                this.hV = stohex(this.s)
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex ? this.setStringHex(e.hex) : "undefined" != typeof e.date && this.setByDate(e.date))
        }
        ,
        Hn.extend(KJUR.asn1.DERUTCTime, KJUR.asn1.DERAbstractTime),
        KJUR.asn1.DERGeneralizedTime = function(e) {
            KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this, e),
            this.hT = "18",
            this.setByDate = function(e) {
                this.hTLV = null,
                this.isModified = !0,
                this.date = e,
                this.s = this.formatDate(this.date, "gen"),
                this.hV = stohex(this.s)
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.str ? this.setString(e.str) : "undefined" != typeof e.hex ? this.setStringHex(e.hex) : "undefined" != typeof e.date && this.setByDate(e.date))
        }
        ,
        Hn.extend(KJUR.asn1.DERGeneralizedTime, KJUR.asn1.DERAbstractTime),
        KJUR.asn1.DERSequence = function(e) {
            KJUR.asn1.DERSequence.superclass.constructor.call(this, e),
            this.hT = "30",
            this.getFreshValueHex = function() {
                for (var e = "", t = 0; t < this.asn1Array.length; t++) {
                    var n = this.asn1Array[t];
                    e += n.getEncodedHex()
                }
                return this.hV = e,
                this.hV
            }
        }
        ,
        Hn.extend(KJUR.asn1.DERSequence, KJUR.asn1.DERAbstractStructured),
        KJUR.asn1.DERSet = function(e) {
            KJUR.asn1.DERSet.superclass.constructor.call(this, e),
            this.hT = "31",
            this.getFreshValueHex = function() {
                for (var e = new Array, t = 0; t < this.asn1Array.length; t++) {
                    var n = this.asn1Array[t];
                    e.push(n.getEncodedHex())
                }
                return e.sort(),
                this.hV = e.join(""),
                this.hV
            }
        }
        ,
        Hn.extend(KJUR.asn1.DERSet, KJUR.asn1.DERAbstractStructured),
        KJUR.asn1.DERTaggedObject = function(e) {
            KJUR.asn1.DERTaggedObject.superclass.constructor.call(this),
            this.hT = "a0",
            this.hV = "",
            this.isExplicit = !0,
            this.asn1Object = null,
            this.setASN1Object = function(e, t, n) {
                this.hT = t,
                this.isExplicit = e,
                this.asn1Object = n,
                this.isExplicit ? (this.hV = this.asn1Object.getEncodedHex(),
                this.hTLV = null,
                this.isModified = !0) : (this.hV = null,
                this.hTLV = n.getEncodedHex(),
                this.hTLV = this.hTLV.replace(/^../, t),
                this.isModified = !1)
            }
            ,
            this.getFreshValueHex = function() {
                return this.hV
            }
            ,
            "undefined" != typeof e && ("undefined" != typeof e.tag && (this.hT = e.tag),
            "undefined" != typeof e.explicit && (this.isExplicit = e.explicit),
            "undefined" != typeof e.obj && (this.asn1Object = e.obj,
            this.setASN1Object(this.isExplicit, this.hT, this.asn1Object)))
        }
        ,
        Hn.extend(KJUR.asn1.DERTaggedObject, KJUR.asn1.ASN1Object),
        function(e) {
            "use strict";
            var t, n = {};
            n.decode = function(n) {
                var i;
                if (t === e) {
                    var s = "0123456789ABCDEF"
                      , o = " \f\n\r	 \u2028\u2029";
                    for (t = [],
                    i = 0; 16 > i; ++i)
                        t[s.charAt(i)] = i;
                    for (s = s.toLowerCase(),
                    i = 10; 16 > i; ++i)
                        t[s.charAt(i)] = i;
                    for (i = 0; i < o.length; ++i)
                        t[o.charAt(i)] = -1
                }
                var a = []
                  , r = 0
                  , c = 0;
                for (i = 0; i < n.length; ++i) {
                    var l = n.charAt(i);
                    if ("=" == l)
                        break;
                    if (l = t[l],
                    -1 != l) {
                        if (l === e)
                            throw "Illegal character at offset " + i;
                        r |= l,
                        ++c >= 2 ? (a[a.length] = r,
                        r = 0,
                        c = 0) : r <<= 4
                    }
                }
                if (c)
                    throw "Hex encoding incomplete: 4 bits missing";
                return a
            }
            ,
            window.Hex = n
        }(),
        function(e) {
            "use strict";
            var t, n = {};
            n.decode = function(n) {
                var i;
                if (t === e) {
                    var s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
                      , o = "= \f\n\r	 \u2028\u2029";
                    for (t = [],
                    i = 0; 64 > i; ++i)
                        t[s.charAt(i)] = i;
                    for (i = 0; i < o.length; ++i)
                        t[o.charAt(i)] = -1
                }
                var a = []
                  , r = 0
                  , c = 0;
                for (i = 0; i < n.length; ++i) {
                    var l = n.charAt(i);
                    if ("=" == l)
                        break;
                    if (l = t[l],
                    -1 != l) {
                        if (l === e)
                            throw "Illegal character at offset " + i;
                        r |= l,
                        ++c >= 4 ? (a[a.length] = r >> 16,
                        a[a.length] = r >> 8 & 255,
                        a[a.length] = 255 & r,
                        r = 0,
                        c = 0) : r <<= 6
                    }
                }
                switch (c) {
                case 1:
                    throw "Base64 encoding incomplete: at least 2 bits missing";
                case 2:
                    a[a.length] = r >> 10;
                    break;
                case 3:
                    a[a.length] = r >> 16,
                    a[a.length] = r >> 8 & 255
                }
                return a
            }
            ,
            n.re = /-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/,
            n.unarmor = function(e) {
                var t = n.re.exec(e);
                if (t)
                    if (t[1])
                        e = t[1];
                    else {
                        if (!t[2])
                            throw "RegExp out of sync";
                        e = t[2]
                    }
                return n.decode(e)
            }
            ,
            window.Base64 = n
        }(),
        function(e) {
            "use strict";
            function t(e, n) {
                e instanceof t ? (this.enc = e.enc,
                this.pos = e.pos) : (this.enc = e,
                this.pos = n)
            }
            function n(e, t, n, i, s) {
                this.stream = e,
                this.header = t,
                this.length = n,
                this.tag = i,
                this.sub = s
            }
            var i = 100
              , s = "…"
              , o = {
                tag: function(e, t) {
                    var n = document.createElement(e);
                    return n.className = t,
                    n
                },
                text: function(e) {
                    return document.createTextNode(e)
                }
            };
            t.prototype.get = function(t) {
                if (t === e && (t = this.pos++),
                t >= this.enc.length)
                    throw "Requesting byte offset " + t + " on a stream of length " + this.enc.length;
                return this.enc[t]
            }
            ,
            t.prototype.hexDigits = "0123456789ABCDEF",
            t.prototype.hexByte = function(e) {
                return this.hexDigits.charAt(e >> 4 & 15) + this.hexDigits.charAt(15 & e)
            }
            ,
            t.prototype.hexDump = function(e, t, n) {
                for (var i = "", s = e; t > s; ++s)
                    if (i += this.hexByte(this.get(s)),
                    n !== !0)
                        switch (15 & s) {
                        case 7:
                            i += "  ";
                            break;
                        case 15:
                            i += "\n";
                            break;
                        default:
                            i += " "
                        }
                return i
            }
            ,
            t.prototype.parseStringISO = function(e, t) {
                for (var n = "", i = e; t > i; ++i)
                    n += String.fromCharCode(this.get(i));
                return n
            }
            ,
            t.prototype.parseStringUTF = function(e, t) {
                for (var n = "", i = e; t > i; ) {
                    var s = this.get(i++);
                    n += String.fromCharCode(128 > s ? s : s > 191 && 224 > s ? (31 & s) << 6 | 63 & this.get(i++) : (15 & s) << 12 | (63 & this.get(i++)) << 6 | 63 & this.get(i++))
                }
                return n
            }
            ,
            t.prototype.parseStringBMP = function(e, t) {
                for (var n = "", i = e; t > i; i += 2) {
                    var s = this.get(i)
                      , o = this.get(i + 1);
                    n += String.fromCharCode((s << 8) + o)
                }
                return n
            }
            ,
            t.prototype.reTime = /^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/,
            t.prototype.parseTime = function(e, t) {
                var n = this.parseStringISO(e, t)
                  , i = this.reTime.exec(n);
                return i ? (n = i[1] + "-" + i[2] + "-" + i[3] + " " + i[4],
                i[5] && (n += ":" + i[5],
                i[6] && (n += ":" + i[6],
                i[7] && (n += "." + i[7]))),
                i[8] && (n += " UTC",
                "Z" != i[8] && (n += i[8],
                i[9] && (n += ":" + i[9]))),
                n) : "Unrecognized time: " + n
            }
            ,
            t.prototype.parseInteger = function(e, t) {
                var n = t - e;
                if (n > 4) {
                    n <<= 3;
                    var i = this.get(e);
                    if (0 === i)
                        n -= 8;
                    else
                        for (; 128 > i; )
                            i <<= 1,
                            --n;
                    return "(" + n + " bit)"
                }
                for (var s = 0, o = e; t > o; ++o)
                    s = s << 8 | this.get(o);
                return s
            }
            ,
            t.prototype.parseBitString = function(e, t) {
                var n = this.get(e)
                  , i = (t - e - 1 << 3) - n
                  , s = "(" + i + " bit)";
                if (20 >= i) {
                    var o = n;
                    s += " ";
                    for (var a = t - 1; a > e; --a) {
                        for (var r = this.get(a), c = o; 8 > c; ++c)
                            s += r >> c & 1 ? "1" : "0";
                        o = 0
                    }
                }
                return s
            }
            ,
            t.prototype.parseOctetString = function(e, t) {
                var n = t - e
                  , o = "(" + n + " byte) ";
                n > i && (t = e + i);
                for (var a = e; t > a; ++a)
                    o += this.hexByte(this.get(a));
                return n > i && (o += s),
                o
            }
            ,
            t.prototype.parseOID = function(e, t) {
                for (var n = "", i = 0, s = 0, o = e; t > o; ++o) {
                    var a = this.get(o);
                    if (i = i << 7 | 127 & a,
                    s += 7,
                    !(128 & a)) {
                        if ("" === n) {
                            var r = 80 > i ? 40 > i ? 0 : 1 : 2;
                            n = r + "." + (i - 40 * r)
                        } else
                            n += "." + (s >= 31 ? "bigint" : i);
                        i = s = 0
                    }
                }
                return n
            }
            ,
            n.prototype.typeName = function() {
                if (this.tag === e)
                    return "unknown";
                var t = this.tag >> 6
                  , n = (this.tag >> 5 & 1,
                31 & this.tag);
                switch (t) {
                case 0:
                    switch (n) {
                    case 0:
                        return "EOC";
                    case 1:
                        return "BOOLEAN";
                    case 2:
                        return "INTEGER";
                    case 3:
                        return "BIT_STRING";
                    case 4:
                        return "OCTET_STRING";
                    case 5:
                        return "NULL";
                    case 6:
                        return "OBJECT_IDENTIFIER";
                    case 7:
                        return "ObjectDescriptor";
                    case 8:
                        return "EXTERNAL";
                    case 9:
                        return "REAL";
                    case 10:
                        return "ENUMERATED";
                    case 11:
                        return "EMBEDDED_PDV";
                    case 12:
                        return "UTF8String";
                    case 16:
                        return "SEQUENCE";
                    case 17:
                        return "SET";
                    case 18:
                        return "NumericString";
                    case 19:
                        return "PrintableString";
                    case 20:
                        return "TeletexString";
                    case 21:
                        return "VideotexString";
                    case 22:
                        return "IA5String";
                    case 23:
                        return "UTCTime";
                    case 24:
                        return "GeneralizedTime";
                    case 25:
                        return "GraphicString";
                    case 26:
                        return "VisibleString";
                    case 27:
                        return "GeneralString";
                    case 28:
                        return "UniversalString";
                    case 30:
                        return "BMPString";
                    default:
                        return "Universal_" + n.toString(16)
                    }
                case 1:
                    return "Application_" + n.toString(16);
                case 2:
                    return "[" + n + "]";
                case 3:
                    return "Private_" + n.toString(16)
                }
            }
            ,
            n.prototype.reSeemsASCII = /^[ -~]+$/,
            n.prototype.content = function() {
                if (this.tag === e)
                    return null;
                var t = this.tag >> 6
                  , n = 31 & this.tag
                  , o = this.posContent()
                  , a = Math.abs(this.length);
                if (0 !== t) {
                    if (null !== this.sub)
                        return "(" + this.sub.length + " elem)";
                    var r = this.stream.parseStringISO(o, o + Math.min(a, i));
                    return this.reSeemsASCII.test(r) ? r.substring(0, 2 * i) + (r.length > 2 * i ? s : "") : this.stream.parseOctetString(o, o + a)
                }
                switch (n) {
                case 1:
                    return 0 === this.stream.get(o) ? "false" : "true";
                case 2:
                    return this.stream.parseInteger(o, o + a);
                case 3:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseBitString(o, o + a);
                case 4:
                    return this.sub ? "(" + this.sub.length + " elem)" : this.stream.parseOctetString(o, o + a);
                case 6:
                    return this.stream.parseOID(o, o + a);
                case 16:
                case 17:
                    return "(" + this.sub.length + " elem)";
                case 12:
                    return this.stream.parseStringUTF(o, o + a);
                case 18:
                case 19:
                case 20:
                case 21:
                case 22:
                case 26:
                    return this.stream.parseStringISO(o, o + a);
                case 30:
                    return this.stream.parseStringBMP(o, o + a);
                case 23:
                case 24:
                    return this.stream.parseTime(o, o + a)
                }
                return null
            }
            ,
            n.prototype.toString = function() {
                return this.typeName() + "@" + this.stream.pos + "[header:" + this.header + ",length:" + this.length + ",sub:" + (null === this.sub ? "null" : this.sub.length) + "]"
            }
            ,
            n.prototype.print = function(t) {
                if (t === e && (t = ""),
                document.writeln(t + this),
                null !== this.sub) {
                    t += "  ";
                    for (var n = 0, i = this.sub.length; i > n; ++n)
                        this.sub[n].print(t)
                }
            }
            ,
            n.prototype.toPrettyString = function(t) {
                t === e && (t = "");
                var n = t + this.typeName() + " @" + this.stream.pos;
                if (this.length >= 0 && (n += "+"),
                n += this.length,
                32 & this.tag ? n += " (constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (n += " (encapsulates)"),
                n += "\n",
                null !== this.sub) {
                    t += "  ";
                    for (var i = 0, s = this.sub.length; s > i; ++i)
                        n += this.sub[i].toPrettyString(t)
                }
                return n
            }
            ,
            n.prototype.toDOM = function() {
                var e = o.tag("div", "node");
                e.asn1 = this;
                var t = o.tag("div", "head")
                  , n = this.typeName().replace(/_/g, " ");
                t.innerHTML = n;
                var i = this.content();
                if (null !== i) {
                    i = String(i).replace(/</g, "&lt;");
                    var s = o.tag("span", "preview");
                    s.appendChild(o.text(i)),
                    t.appendChild(s)
                }
                e.appendChild(t),
                this.node = e,
                this.head = t;
                var a = o.tag("div", "value");
                if (n = "Offset: " + this.stream.pos + "<br/>",
                n += "Length: " + this.header + "+",
                n += this.length >= 0 ? this.length : -this.length + " (undefined)",
                32 & this.tag ? n += "<br/>(constructed)" : 3 != this.tag && 4 != this.tag || null === this.sub || (n += "<br/>(encapsulates)"),
                null !== i && (n += "<br/>Value:<br/><b>" + i + "</b>",
                "object" == typeof oids && 6 == this.tag)) {
                    var r = oids[i];
                    r && (r.d && (n += "<br/>" + r.d),
                    r.c && (n += "<br/>" + r.c),
                    r.w && (n += "<br/>(warning!)"))
                }
                a.innerHTML = n,
                e.appendChild(a);
                var c = o.tag("div", "sub");
                if (null !== this.sub)
                    for (var l = 0, d = this.sub.length; d > l; ++l)
                        c.appendChild(this.sub[l].toDOM());
                return e.appendChild(c),
                t.onclick = function() {
                    e.className = "node collapsed" == e.className ? "node" : "node collapsed"
                }
                ,
                e
            }
            ,
            n.prototype.posStart = function() {
                return this.stream.pos
            }
            ,
            n.prototype.posContent = function() {
                return this.stream.pos + this.header
            }
            ,
            n.prototype.posEnd = function() {
                return this.stream.pos + this.header + Math.abs(this.length)
            }
            ,
            n.prototype.fakeHover = function(e) {
                this.node.className += " hover",
                e && (this.head.className += " hover")
            }
            ,
            n.prototype.fakeOut = function(e) {
                var t = / ?hover/;
                this.node.className = this.node.className.replace(t, ""),
                e && (this.head.className = this.head.className.replace(t, ""))
            }
            ,
            n.prototype.toHexDOM_sub = function(e, t, n, i, s) {
                if (!(i >= s)) {
                    var a = o.tag("span", t);
                    a.appendChild(o.text(n.hexDump(i, s))),
                    e.appendChild(a)
                }
            }
            ,
            n.prototype.toHexDOM = function(t) {
                var n = o.tag("span", "hex");
                if (t === e && (t = n),
                this.head.hexNode = n,
                this.head.onmouseover = function() {
                    this.hexNode.className = "hexCurrent"
                }
                ,
                this.head.onmouseout = function() {
                    this.hexNode.className = "hex"
                }
                ,
                n.asn1 = this,
                n.onmouseover = function() {
                    var e = !t.selected;
                    e && (t.selected = this.asn1,
                    this.className = "hexCurrent"),
                    this.asn1.fakeHover(e)
                }
                ,
                n.onmouseout = function() {
                    var e = t.selected == this.asn1;
                    this.asn1.fakeOut(e),
                    e && (t.selected = null,
                    this.className = "hex")
                }
                ,
                this.toHexDOM_sub(n, "tag", this.stream, this.posStart(), this.posStart() + 1),
                this.toHexDOM_sub(n, this.length >= 0 ? "dlen" : "ulen", this.stream, this.posStart() + 1, this.posContent()),
                null === this.sub)
                    n.appendChild(o.text(this.stream.hexDump(this.posContent(), this.posEnd())));
                else if (this.sub.length > 0) {
                    var i = this.sub[0]
                      , s = this.sub[this.sub.length - 1];
                    this.toHexDOM_sub(n, "intro", this.stream, this.posContent(), i.posStart());
                    for (var a = 0, r = this.sub.length; r > a; ++a)
                        n.appendChild(this.sub[a].toHexDOM(t));
                    this.toHexDOM_sub(n, "outro", this.stream, s.posEnd(), this.posEnd())
                }
                return n
            }
            ,
            n.prototype.toHexString = function() {
                return this.stream.hexDump(this.posStart(), this.posEnd(), !0)
            }
            ,
            n.decodeLength = function(e) {
                var t = e.get()
                  , n = 127 & t;
                if (n == t)
                    return n;
                if (n > 3)
                    throw "Length over 24 bits not supported at position " + (e.pos - 1);
                if (0 === n)
                    return -1;
                t = 0;
                for (var i = 0; n > i; ++i)
                    t = t << 8 | e.get();
                return t
            }
            ,
            n.hasContent = function(e, i, s) {
                if (32 & e)
                    return !0;
                if (3 > e || e > 4)
                    return !1;
                var o = new t(s);
                3 == e && o.get();
                var a = o.get();
                if (a >> 6 & 1)
                    return !1;
                try {
                    var r = n.decodeLength(o);
                    return o.pos - s.pos + r == i
                } catch (c) {
                    return !1
                }
            }
            ,
            n.decode = function(e) {
                e instanceof t || (e = new t(e,0));
                var i = new t(e)
                  , s = e.get()
                  , o = n.decodeLength(e)
                  , a = e.pos - i.pos
                  , r = null;
                if (n.hasContent(s, o, e)) {
                    var c = e.pos;
                    if (3 == s && e.get(),
                    r = [],
                    o >= 0) {
                        for (var l = c + o; e.pos < l; )
                            r[r.length] = n.decode(e);
                        if (e.pos != l)
                            throw "Content size is not correct for container starting at offset " + c
                    } else
                        try {
                            for (; ; ) {
                                var d = n.decode(e);
                                if (0 === d.tag)
                                    break;
                                r[r.length] = d
                            }
                            o = c - e.pos
                        } catch (u) {
                            throw "Exception while decoding undefined length content: " + u
                        }
                } else
                    e.pos += o;
                return new n(i,a,o,s,r)
            }
            ,
            n.test = function() {
                for (var e = [{
                    value: [39],
                    expected: 39
                }, {
                    value: [129, 201],
                    expected: 201
                }, {
                    value: [131, 254, 220, 186],
                    expected: 16702650
                }], i = 0, s = e.length; s > i; ++i) {
                    var o = new t(e[i].value,0)
                      , a = n.decodeLength(o);
                    a != e[i].expected && document.write("In test[" + i + "] expected " + e[i].expected + " got " + a + "\n")
                }
            }
            ,
            window.ASN1 = n
        }(),
        ASN1.prototype.getHexStringValue = function() {
            var e = this.toHexString()
              , t = 2 * this.header
              , n = 2 * this.length;
            return e.substr(t, n)
        }
        ,
        gn.prototype.parseKey = function(e) {
            try {
                var t = /^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/
                  , n = t.test(e) ? Hex.decode(e) : Base64.unarmor(e)
                  , i = ASN1.decode(n);
                if (9 === i.sub.length) {
                    var s = i.sub[1].getHexStringValue();
                    this.n = dn(s, 16);
                    var o = i.sub[2].getHexStringValue();
                    this.e = parseInt(o, 16);
                    var a = i.sub[3].getHexStringValue();
                    this.d = dn(a, 16);
                    var r = i.sub[4].getHexStringValue();
                    this.p = dn(r, 16);
                    var c = i.sub[5].getHexStringValue();
                    this.q = dn(c, 16);
                    var l = i.sub[6].getHexStringValue();
                    this.dmp1 = dn(l, 16);
                    var d = i.sub[7].getHexStringValue();
                    this.dmq1 = dn(d, 16);
                    var u = i.sub[8].getHexStringValue();
                    this.coeff = dn(u, 16)
                } else {
                    if (2 !== i.sub.length)
                        return !1;
                    var g = i.sub[1]
                      , p = g.sub[0]
                      , s = p.sub[0].getHexStringValue();
                    this.n = dn(s, 16);
                    var o = p.sub[1].getHexStringValue();
                    this.e = parseInt(o, 16)
                }
                return !0
            } catch (m) {
                return !1
            }
        }
        ,
        gn.prototype.getPrivateBaseKey = function() {
            var e = {
                array: [new KJUR.asn1.DERInteger({
                    "int": 0
                }), new KJUR.asn1.DERInteger({
                    bigint: this.n
                }), new KJUR.asn1.DERInteger({
                    "int": this.e
                }), new KJUR.asn1.DERInteger({
                    bigint: this.d
                }), new KJUR.asn1.DERInteger({
                    bigint: this.p
                }), new KJUR.asn1.DERInteger({
                    bigint: this.q
                }), new KJUR.asn1.DERInteger({
                    bigint: this.dmp1
                }), new KJUR.asn1.DERInteger({
                    bigint: this.dmq1
                }), new KJUR.asn1.DERInteger({
                    bigint: this.coeff
                })]
            }
              , t = new KJUR.asn1.DERSequence(e);
            return t.getEncodedHex()
        }
        ,
        gn.prototype.getPrivateBaseKeyB64 = function() {
            return En(this.getPrivateBaseKey())
        }
        ,
        gn.prototype.getPublicBaseKey = function() {
            var e = {
                array: [new KJUR.asn1.DERObjectIdentifier({
                    oid: "1.2.840.113549.1.1.1"
                }), new KJUR.asn1.DERNull]
            }
              , t = new KJUR.asn1.DERSequence(e);
            e = {
                array: [new KJUR.asn1.DERInteger({
                    bigint: this.n
                }), new KJUR.asn1.DERInteger({
                    "int": this.e
                })]
            };
            var n = new KJUR.asn1.DERSequence(e);
            e = {
                hex: "00" + n.getEncodedHex()
            };
            var i = new KJUR.asn1.DERBitString(e);
            e = {
                array: [t, i]
            };
            var s = new KJUR.asn1.DERSequence(e);
            return s.getEncodedHex()
        }
        ,
        gn.prototype.getPublicBaseKeyB64 = function() {
            return En(this.getPublicBaseKey())
        }
        ,
        gn.prototype.wordwrap = function(e, t) {
            if (t = t || 64,
            !e)
                return e;
            var n = "(.{1," + t + "})( +|$\n?)|(.{1," + t + "})";
            return e.match(RegExp(n, "g")).join("\n")
        }
        ,
        gn.prototype.getPrivateKey = function() {
            var e = "-----BEGIN RSA PRIVATE KEY-----\n";
            return e += this.wordwrap(this.getPrivateBaseKeyB64()) + "\n",
            e += "-----END RSA PRIVATE KEY-----"
        }
        ,
        gn.prototype.getPublicKey = function() {
            var e = "-----BEGIN PUBLIC KEY-----\n";
            return e += this.wordwrap(this.getPublicBaseKeyB64()) + "\n",
            e += "-----END PUBLIC KEY-----"
        }
        ,
        gn.prototype.hasPublicKeyProperty = function(e) {
            return e = e || {},
            e.hasOwnProperty("n") && e.hasOwnProperty("e")
        }
        ,
        gn.prototype.hasPrivateKeyProperty = function(e) {
            return e = e || {},
            e.hasOwnProperty("n") && e.hasOwnProperty("e") && e.hasOwnProperty("d") && e.hasOwnProperty("p") && e.hasOwnProperty("q") && e.hasOwnProperty("dmp1") && e.hasOwnProperty("dmq1") && e.hasOwnProperty("coeff")
        }
        ,
        gn.prototype.parsePropertiesFrom = function(e) {
            this.n = e.n,
            this.e = e.e,
            e.hasOwnProperty("d") && (this.d = e.d,
            this.p = e.p,
            this.q = e.q,
            this.dmp1 = e.dmp1,
            this.dmq1 = e.dmq1,
            this.coeff = e.coeff)
        }
        ;
        var Qn = function(e) {
            gn.call(this),
            e && ("string" == typeof e ? this.parseKey(e) : (this.hasPrivateKeyProperty(e) || this.hasPublicKeyProperty(e)) && this.parsePropertiesFrom(e))
        };
        Qn.prototype = new gn,
        Qn.prototype.constructor = Qn;
        var Jn = function(e) {
            e = e || {},
            this.default_key_size = parseInt(e.default_key_size) || 1024,
            this.default_public_exponent = e.default_public_exponent || "010001",
            this.log = e.log || !1,
            this.key = null
        };
        Jn.prototype.setKey = function(e) {
            this.log && this.key && console.warn("A key was already set, overriding existing."),
            this.key = new Qn(e)
        }
        ,
        Jn.prototype.setPrivateKey = function(e) {
            this.setKey(e)
        }
        ,
        Jn.prototype.setPublicKey = function(e) {
            this.setKey(e)
        }
        ,
        Jn.prototype.decrypt = function(e) {
            try {
                return this.getKey().decrypt(Cn(e))
            } catch (t) {
                return !1
            }
        }
        ,
        Jn.prototype.encrypt = function(e) {
            try {
                return En(this.getKey().encrypt(e))
            } catch (t) {
                return !1
            }
        }
        ,
        Jn.prototype.getKey = function(e) {
            if (!this.key) {
                if (this.key = new Qn,
                e && "[object Function]" === {}.toString.call(e))
                    return void this.key.generateAsync(this.default_key_size, this.default_public_exponent, e);
                this.key.generate(this.default_key_size, this.default_public_exponent)
            }
            return this.key
        }
        ,
        Jn.prototype.getPrivateKey = function() {
            return this.getKey().getPrivateKey()
        }
        ,
        Jn.prototype.getPrivateKeyB64 = function() {
            return this.getKey().getPrivateBaseKeyB64()
        }
        ,
        Jn.prototype.getPublicKey = function() {
            return this.getKey().getPublicKey()
        }
        ,
        Jn.prototype.getPublicKeyB64 = function() {
            return this.getKey().getPublicBaseKeyB64()
        }
        ,
        e.JSEncrypt = Jn
    }(passport.lib.RSAExport),
    passport.lib.RSA = passport.lib.RSAExport.JSEncrypt;

    var publickey_baidu = '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDO+7aZi9go+4bbx7wh2yk1TuOJ\nIOf+ekOMFSAPP8RTShezLDMFHvd66qPTlnRUtTIxxcZumxJSQIrKrOiNOQkV8A4g\n4gCL2zkfbaS+5uQJldaKPIjaWNtblilvSQNkNFUUKAgnYrhwcfD3eZy9jrvjmwSO\nOKVq9hr6QkJCQnYtqwIDAQAB\n-----END PUBLIC KEY-----\n'
    passport.lib.RSA.prototype.setKey(publickey_baidu)

    console.log(passport.lib.RSA.prototype.encrypt('1111'));