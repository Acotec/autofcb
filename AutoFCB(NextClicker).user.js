// ==UserScript==
// @name         AutoFCB(NextClicker)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.6.1
// @description  Auto click next button on shortlink sites.
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(NextClicker).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(NextClicker).user.js
// @match        *://*/*
// @run-at       document-idle
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var href = window.location.href
    if(href.includes('dogemate.com')||href.includes('faupto.com')){$("#bdt").click()}
    else if (href.includes('theblogcash')){document.getElementsByClassName("btn btn-info text-white btn-lg next-button")[0].click()}
    else if (href.includes('orangeptc')){setTimeout( ()=>{document.querySelector("input").click()},4002)}
    else if (href.includes('konstantinova')){document.querySelector("#makingdifferenttimer").click()}//setTimeout(function(){document.querySelector("#makingdifferenttimer").click()},7002)}
    else if (href.includes('prolinks.xyz')||
             href.includes('linkdesh.xyz')||
             href.includes('bitsfree.xyz')||
             href.includes('dgbauto')||
             href.includes('faucet.100count.net')

            ){setInterval(()=>{document.querySelector("#mdt").click()},1000)}

    else if(href.includes('step')){document.querySelector("#main-button").disabled=false
                                   setTimeout(()=>{document.querySelector("#main-button").click()},100)}

    else if(href.includes('shortzzy.in')){setInterval( () => {document.querySelector("#btn6").click()},1000)}

    // else if(href.includes('dutchycorp')){setInterval(()=>{document.querySelector("#proceed").click()
    //                                                       document.querySelector("#cl1 > center > a").click()},2000)}

    // else if(href.includes('short.fc-lc')){window.open(window.location.href.replace('short.',""),"_self")}

    else if(href.includes('100count.net')){//window.onload=()=>{
        setInterval(()=>{ try{location.href=document.getElementById('cl1').querySelector('a').href}
                         catch(err){document.getElementsByTagName('button')[0].click()}},1000) } //}

    else if (href.includes('youtube.com/redirect')){ document.getElementById('invalid-token-redirect-goto-site-button').click()}

    else if (href.includes('warn')||href.includes(' flx')){document.querySelector("#u_0_1").click()
                                                           setTimeout(function(){document.querySelector("_56bz _54k8 _56bs _56bv _52jh").click()},1000)}

    else if(href.includes('zagl.info')){
        document.querySelector("body > section > div > div > div > div.box-main > div.col-md- > a").click()}

    else if (href.includes('goldpricing.club')||href.includes('healthy4pepole')||href.includes('mobi2c.com')){
        setInterval(()=>{
            try{
                document.querySelector("#ytimer > button").click()
                document.querySelector("#mainlink > a").click()
            }catch(err){null}
        },1000)
        //             let a = href.match(/=.*\&/)[0]
        //             let b = a.replace('=','/').replace('&','?').replace('&','')
        //             let url = 'https//try2link.net'+ b
        //             location.replace(url)
    }

    else if(href.includes('yoshare.net')){setTimeout(()=>{ try{document.querySelector("#yuidea > input.yu-btn.yu-blue").click()}
                                                          catch(err){document.querySelector("#btn6").click()}},1000)}
    else if(href.includes('clickhouse')){document.querySelector("body > div > div > div > div > div > div > div > div > div > div.btn-div > a").click()}

    else if(href.includes('coin.vip/claim')){ setInterval(()=>{
        document.querySelector("#main-button").click() },6005)}

    else if(href.includes('zegtrends.com')){ try{javascript:document.getElementById('cln').submit()}catch(err){
        btn()}}

    else if(href.includes('short-zero.com')){document.querySelector('#btn-get-link').click()}
    else if(href.includes('techmody.io')||href.includes('ez4mods.com')){
        setInterval(()=>{yuidea1()},2000)
    }
    else if(href.includes('ez4short.com/')){
        window.onload=(e)=>{e.preventDefault;window.stop()}
    }

 })();