// ==UserScript==
// @name         AutoFCB(DelayPage)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.10
// @description  Delay some shortlink page loading time and close it when done
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @require      https://github.com/Acotec/require/raw/master/Super_GM.user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.close
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==
(function() {
    'use strict';
    // Your code here...
    var element, error1052, alreadyVisit, success, referrer;
    var default_host =[]
    // ['express-cut.ovh', 'bitlinks.pw', 'neonlink.net', 'faucet.100count.net', 'bitcoinly.in',
    //                'kiiw.icu', 'adbull.me', 'owllink.net', 'pingit.im', 'cashurl.in',
    //                'adshort.co', 'aii.sh', 'riful.com','fc.lc',
    //               ]
    var delayOn = GM_SuperValue.get('delayOn', default_host)
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
    var autofcb = /auto(faucet|claim|bitco)/ig.test(host)
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelayorClose(element) {
        error1052 = element.innerText.toLowerCase().includes('action is marked as suspicious')
        alreadyVisit = element.innerText.toLowerCase().includes('already visited this link!')
        referrer = document.referrer.replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
        if (error1052 && !(referrer.includes('auto') || delayOn.includes(referrer) || referrer == '')) {
            delayOn.push(host)
            GM_SuperValue.set('delayOn', delayOn);
        } else if (referrer == '' && autofcb && !(alreadyVisit  || delayOn.includes(referrer))){
            window.history.go(-1)
            //window.history.back()
        } else {
            window.close()
        }
    }
    if (autofcb) {
        waitForKeyElements("div.alert-danger", (element) => {
            addDelayorClose(element)
        }, );
    } else if (back && document.referrer.includes('auto') && !(delayOn.includes(host) || host.includes('auto'))) {
        delayOn.push(host)
        GM_SuperValue.set('delayOn', delayOn);
    }else if (delayOn.includes(host)) {
        sleep(16);
    }

})();
