// ==UserScript==
// @name         AutoFCB(withdraw)
// @version      0.0
// @description  withdraw
// @author       Acotec
// @include       *auto*/dashboard/claim/manual
// @include       *auto*/dashboard/withdraw/*
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(withdraw).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(withdraw).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var coin;
    waitForKeyElements('#estimatedc', (element) => {
        coin=element.innerText.replace(/[\W\d]+/,"")
    }, );
    waitForKeyElements('.toast-title', (element) => {
        if(/Success/gi.test(element.innerHTML)){
            let url='https://'+ window.location.host +'/dashboard/withdraw/'+coin
            window.location=url
        }
    }, );
    waitForKeyElements('.toast-message', (element) => {
        if(/payment has been sent/gi.test(element.innerHTML)){
            let url='https://'+ window.location.host +'/dashboard/claim/manual'
            window.location=url
        }
    }, );

})();
