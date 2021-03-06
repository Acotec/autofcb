// ==UserScript==
// @name         AutoFCB(withdraw)
// @version      0.1
// @description  withdraw
// @author       Acotec
// @include       *auto*/dashboard/claim/manual*
// @include       *auto*/dashboard/withdraw/*
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(withdraw).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(withdraw).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var coinS=GM_getValue("coin",null);
    var loop = 0

    function selectFromDropDown(id,value){
        //alert(value)
        if(String(value)!=='undefined'){
            let element = document.querySelector(id);
            element.value = value;
            element.dispatchEvent(new Event('change'));
        }else{
            console.log('No currency claim yet ')
        }

    }

    waitForKeyElements('#estimatedc', (element) => {
        coinS=element.innerText.replace(/[\W\d]+/,"")
        GM_setValue("coin",coinS)
    },false);
    waitForKeyElements('.toast-message', (element) => {
        if(/payment has been sent/gi.test(element.innerHTML) && /dashboard\/withdraw\/\w+/gi.test(window.location.href)){
            let url='https://'+ window.location.host +'/dashboard/claim/manual'
            window.location=url
        }
        else if(/credited to your balance/gi.test(element.innerHTML) && /claim\/manual/gi.test(window.location.href)){
            let url='https://'+ window.location.host +'/dashboard/withdraw/'+ GM_getValue("coin")
            window.location=url
        }

    },false );


    if(/claim\/manual/gi.test(window.location.href)){
        let inter=setInterval(function () {
            loop+=1
            let token = document.querySelector("#token-amount").value==0
            if(token&&!(loop>=50)){
                document.querySelector("#maxmcla-addon").click()
            }
            else{
                clearInterval(inter);clearInterval(inter)
                if(!token){
                    selectFromDropDown('#currency-select',GM_getValue("coin"))
                    selectFromDropDown('#captcha-select','solvemedia')}
            }
        },100)
        }
    else if(/dashboard\/withdraw\/\w+/gi.test(window.location.href)){
        let inter=setInterval(function () {
            loop+=1
            let amount = document.querySelector("#amount").value==0
            if(amount&&!(loop>=50)){
                document.querySelector("#maxwith-addon").click()
            }
            else{
                clearInterval(inter);clearInterval(inter)
                if(!amount){
                    selectFromDropDown('#processor','34')
                    selectFromDropDown('#captcha-select','solvemedia')}

            }
        },100)
        }
})();
