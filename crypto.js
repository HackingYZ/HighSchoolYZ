var CryptoJS = require("crypto-js");
function wpass(e, t="JQEMIC2019CIMEQJ") {
            t = t ? CryptoJS.enc.Utf8.parse(t) : CryptoJS.enc.Utf8.parse("hs489fe897hh78hf");
            var n = CryptoJS.enc.Utf8.parse(e)
              , i = CryptoJS.AES.encrypt(n, t, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            return i.toString()
        }
module.exports=wpass;

/*fetch("https://www.sdei.edu.cn/euc/uc/getkey/LoginGetKey.do?method=getLoginKey", {
  "headers": {
    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://www.sdei.edu.cn/user/sdLogin",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
});
得到key：JQEMIC2019CIMEQJ（貌似是固定的），

密码加密函数（e是字符串形式密码）：*/
//加密环境：<script src="https://unpkg.com/crypto-js@4.1.1/crypto-js.js"></script>