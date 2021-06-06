// ==UserScript==
// @name         AutoFCB(NextClicker)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.6.2
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
    else if (href.includes('prolinks.xyz')||
             href.includes('linkdesh.xyz')||
             href.includes('bitsfree.xyz')||
             href.includes('dgbauto')
            ){setInterval(()=>{document.querySelector("#mdt").click()},1000)}

    else if(href.includes('step')){document.querySelector("#main-button").disabled=false
                                   setTimeout(()=>{document.querySelector("#main-button").click()},100)}

    else if(href.includes('shortzzy.in')){setInterval( () => {document.querySelector("#btn6").click()},1000)}

    // else if(href.includes('100count.net')){//window.onload=()=>{
    //     setInterval(()=>{ try{location.href=document.getElementById('cl1').querySelector('a').href}
    //                      catch(err){document.getElementsByTagName('button')[0].click()}},1000) } //}
    else if(href.includes('yoshare.net')){setTimeout(()=>{ try{document.querySelector("#yuidea > input.yu-btn.yu-blue").click()}
                                                          catch(err){document.querySelector("#btn6").click()}},1000)}

    else if(href.includes('zegtrends.com')){ try{javascript:document.getElementById('cln').submit()}catch(err){
        btn()}}

    else if(href.includes('techmody.io')||href.includes('ez4mods.com')){
        setInterval(()=>{yuidea1()},2000)
    }
    else if(href.includes('ez4short.com/')){
        window.onload=(e)=>{e.preventDefault;window.stop()}
    }

})();
