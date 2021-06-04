// ==UserScript==
// @name         AutoFCB(DelayPage)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.0
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
    var delayOn = ['express-cut','bitlinks','neonlink.net','100count.net','bitcoinly.in',
                   'kiiw.icu','adbull.me','Linko','Clickit','owllink.net','pingit','cashurl',
                   'adshort','aii.sh','fc.lc','riful']
    //     var href = window.location.href.match(/(http|https)\:\/\/[a-zA-Z0-9\-\.]*/gi)[0]
    //     var getProt = href.match(/(http|https|).*\/\/|www./gi)
    //     var h = href.replace(getProt.join(''),'').toLowerCase()

    //     function sleep (seconds) {
    //         var start = new Date().getTime();
    //         while (new Date() < start + seconds*1000){};
    //         return 0;
    //     }
    //     //for(let i=0 ; i<=delayOn.length ; i++){}
    //     for(const link of delayOn){
    //         if(h.startsWith(link.toLowerCase() ) ){
    //             sleep(15);
    //         }
    //     }
    var href=window.location.href.match(/(http|https)\:\/\/[a-zA-Z0-9\-\.]*/gi)[0],getProt=href.match(/(http|https|).*\/\/|www./gi),h=href.replace(getProt.join(""),"").toLowerCase();function sleep(t){for(var e=(new Date).getTime();new Date<e+1e3*t;);return 0}for(const t of delayOn)h.startsWith(t.toLowerCase())&&sleep(20);
})();