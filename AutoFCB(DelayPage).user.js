// ==UserScript==
// @name         AutoFCB(DelayPage)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.4
// @description  Delay some shortlink page loading time
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @match        *://*/*
// @run-at      document-start
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
   var delayOn = ['express-cut','bitlinks','neonlink.net','faucet.100count.net','bitcoinly.in',
                   'kiiw.icu','adbull.me','Linko','Clickit','owllink.net','pingit','cashurl',
                   'adshort','aii.sh','fc.lc','riful']
    var host= window.location.host.toLowerCase().replace(/https:\/\/|www\./,'')
    function sleep (seconds) {
        var start = new Date().getTime();
        while (new Date() < start + seconds*1000){};
        return 0;
    }
    for(const link of delayOn){
        if(host.includes(link.toLowerCase() ) ){
            sleep(16);
        }
    }


})();
