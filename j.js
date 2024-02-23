const fetch=require("node-fetch")
const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
var cookie = require('cookie');
function cookietoString(obj,path){
    //console.log(obj)
    var h="";
    path.forEach(path2=>{
        if(obj[path2]){
            Object.keys(obj[path2]).forEach(e=>{h+=e+"="+obj[path2][e]+"; "})
        }
    })
    if(h.length){
        //console.log(h.slice(0,-2))
        return h.slice(0,-2);
    }else{
        return "";
    }
}
var Cookie={};
var Cookiew={};

w=["domain","encode","expires","httponly","maxage","partitioned","path","priority","samesite","secure"];
function addSetCookie(str,k2="s"){
    var k=cookie.parse(str);
    var keys=Object.keys(k).filter(e=>!w.includes(e.replace("-","").toLowerCase()))[0];
    var path=k["Path"]||k["path"]||"/";
    if(k2=="w"){
        if(!Cookiew[path]){
            Cookiew[path]={};
        }
        Cookiew[path][keys]=k[keys];

    }else{
        if(!Cookie[path]){
            Cookie[path]={};
        }
        Cookie[path][keys]=k[keys];
    }
}
function cookieset(e, t) {
    if(!Cookie["/"]){
        Cookie["/"]={}
    }
    Cookie["/"][e]=t;
}
function headersGetCookie(obj,k2="s"){
    var k=obj.headers.get("set-cookie");
    if(k){
        k.replace(/expires=.+?, .+? [0-9\:]+? [A-Z]+?; /g,"").split(", ").forEach(e=>addSetCookie(e,k2));
    }
}
//console.log(cookietoString(Cookie["/"]))
async function loginA(l,password){
    return await fetch("https://www.sdei.edu.cn/euc/j_hh_security_check?j_username="+l+"&j_password="+password, {
                        "headers": {
                            "accept": "application/json, text/plain, */*",
                            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                            "content-type": "application/json;charset=UTF-8",
                            "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "\"Windows\"",
                            "sec-fetch-dest": "empty",
                            "sec-fetch-mode": "cors",
                            "sec-fetch-site": "same-origin",
                            "x-front-request": "FrontRequest"
                        },
                        "referrer": "https://www.sdei.edu.cn/user/sdLogin",
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": "{\"j_username\":\""+l+"\",\"j_password\":\""+password+"\"}",
                        "method": "POST",
                        "mode": "cors",
                        "credentials": "include"
                        })
                        .then(e=>{
                            headersGetCookie(e,"w")
                            return e.json()
                        })
                        .then(r=>{
                            //console.log(r["data"]["access_token"]);
                            cookieset("token",r["data"]["access_token"])
                            //console.log(Cookie);
                        })
};



h=async function(l){
    return await fetch("https://szpj.sdei.edu.cn/zhszpj/web/jbqk/xsXqDack.do", {
                "headers": {
                    "Cookie":cookietoString(Cookie,["/","/zhszpj"]),
                    "accept": "*/*",
                    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "hhcsrftoken": l,
                    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    "x-requested-with": "XMLHttpRequest"
                },
                "referrer": "https://szpj.sdei.edu.cn/zhszpj/web/jbqk/xsXqDack.htm?stuFlag=1&xn=2023&xq=1",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "method=queryxsJbxx&xsJbxxId=&xn=2023&xq=1",
                "method": "POST",
                "mode": "cors",
                "credentials": "include"
                }).then(e=>{
                    headersGetCookie(e)
                    return e.json()
                });
};
SifegetKey=async function (params) {
    return await fetch("https://szpj.sdei.edu.cn/zhszpj/web/index/xsDackIndex.htm", {
                "headers": {
                    "Cookie":cookietoString(Cookie,["/","/zhszpj"]),
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                    "cache-control": "max-age=0",
                    "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-origin",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1"
                },
                "referrer": "https://szpj.sdei.edu.cn/zhszpj/web/index/xsDackIndex.htm",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": null,
                "method": "GET",
                "mode": "cors",
                "credentials": "include"
                })
                .then(f=>{
                    headersGetCookie(f)
                    return f.text()
                })
                .then(i=>{
                    var k=i.indexOf("jQuery.ajaxSetup({headers:{HHCSRFToken:\"");
                    return(i.slice(k+40,k+76))
                })
};
async function jk(){
    var k=await SifegetKey();
    return await h(k)
};
function km(a){
    var g=new JSDOM(a);
    ak="";
    var v={value:"1"};
    n=1;
    while(v){
        v=g.window.document.querySelector(`input:nth-child(${n++})`);
        if(v){
            ak+=v.name+"="+encodeURIComponent(v.value)+"&"
        }
    }
    return [g.window.document.querySelector("form").action,ak]
}
fkey=0;
hr=async function(a){
    var j=km(a);
    var k=j[1];
    return await fetch(j[0], {
                    "headers": {
                        "Cookie":(()=>{
                            if(fkey==0){
                                fkey=1;
                                return cookietoString(Cookiew,["/","/euc"]);
                            }else{
                                return cookietoString(Cookie,["/","/zhszpj"]);
                            }
                        })(),
                        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
                        "cache-control": "max-age=0",
                        "content-type": "application/x-www-form-urlencoded",
                        "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "\"Windows\"",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "same-site",
                        "upgrade-insecure-requests": "1"
                    },
                    "referrer": "https://szpj.sdei.edu.cn/",
                    "referrerPolicy": "strict-origin-when-cross-origin",
                    "body":  k.slice(0,-1),
                    "method": "POST",
                    "mode": "cors",
                    "credentials": "include"
                    }).then(e=>{
                        //console.log(2)
                        headersGetCookie(e)
                        return e.text()
                    });
}
async function loginB(a,password){
    await loginA(a,password);
    await hr(await hr(await fetch("https://szpj.sdei.edu.cn/zhszpj/ggfwSsoAuth", {
        "headers": {
            "Cookie":`token=${Cookie["/"]["token"]}`,
          "accept": "*/*",
          "accept-language": "zh-CN,zh;q=0.9",
          "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Google Chrome\";v=\"121\", \"Chromium\";v=\"121\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin"
        },
        "referrer": "https://szpj.sdei.edu.cn/zhszpj/web/index/yhIndex.htm",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }).then(e=>{
        headersGetCookie(e)
        //console.log(1)
        return e.text()
    })));
    return await jk()
};

const dimage = async (dest) => {
      const response = await fetch("https://szpj.sdei.edu.cn/zhszpj/web/common/fileShow.do?method=getXsImgFile", {
        "headers": {
            "Cookie":cookietoString(Cookie,["/","/zhszpj"]),
            "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "sec-ch-ua": "\"Not A(Brand\";v=\"99\", \"Microsoft Edge\";v=\"121\", \"Chromium\";v=\"121\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "image",
            "sec-fetch-mode": "no-cors",
            "sec-fetch-site": "same-origin"
        },
        "referrer": "https://szpj.sdei.edu.cn/zhszpj/web/jbqk/xsXqDack.htm?stuFlag=1&xn=2023&xq=1",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
        });
     
      if (!response.ok) {
        throw new Error(`failed to download file: ${response.statusText}`);
      }
     
      const fileStream = fs.createWriteStream(dest);
      await new Promise((resolve, reject) => {
        response.body.pipe(fileStream);
        response.body.on("error", (err) => {
          reject(err);
        });
        fileStream.on("finish", function() {
          resolve();
        });
      });
};
async function down(n,password="CpFmGEymSQvBHcqkErw8DQ=="){
    Cookie={};
    Cookiew={};
    fkey=0;
    fs.writeFileSync("./datak/"+n+".json",JSON.stringify(await loginB(n,password)));
    await dimage("./datak/"+n+".png");
    return 0
};
module.exports=down;