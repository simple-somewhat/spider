
const cry = require('crypto-js')

hashs = {
    'md5':function (val){
        return cry.MD5(val).toString()
    },
    'sha1':function (val){
        return cry.SHA1(val).toString()
    },
    'sha256':function (val){
        return cry.SHA256(val).toString()
    },
    'sha512':function (val){
        return cry.SHA512(val).toString()
    },
}

var _0xa0ea67 = new Date();
 function _0x3966b9(_0x1ba57f, _0x6178fa) {
    var _0x4c93dd = _0x1b4fda["chars"]["length"];
    for (var _0x5bafc2 = 0; _0x5bafc2 < _0x4c93dd; _0x5bafc2++) {
      for (var _0xd83677 = 0; _0xd83677 < _0x4c93dd; _0xd83677++) {
        var _0x37f01a = _0x6178fa[0] + _0x1b4fda["chars"]["substr"](_0x5bafc2, 1) + _0x1b4fda["chars"]["substr"](_0xd83677, 1) + _0x6178fa[1];
          if (hashs[_0x1b4fda['ha']](_0x37f01a) == _0x1ba57f) {
          return [_0x37f01a, new Date() - _0xa0ea67];
        }
      }
    }
  }

_0x1b4fda = {
  "bts": ["1679665043.506|0|QiX", "K%2Fw7nIv90FXK93QM%2FHKaNQ%3D"],
  "chars": "cvvGgPbekvuPXLPmUYLsYk",
  "ct": "9014cce7956a05ac5f661947e9fdcea0",
  "ha": "md5",
  "tn": "__jsl_clearance_s",
  "vt": "3600",
  "wt": "1500"
}
// var _0x538030 = _0x55af6a['iqgWp'](_0x3966b9, _0x1b4fda['ct'], _0x1b4fda['bts']);

var _0x538030 = _0x3966b9(_0x1b4fda['ct'], _0x1b4fda['bts']);

console.log(_0x538030)
