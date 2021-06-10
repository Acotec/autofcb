// ==UserScript==
// @name         AutoFCB(DelayPage)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.8
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
// @run-at       document-end
// ==/UserScript==
(function() {
    'use strict';
    // Your code here...
    var element, error1052, alreadyVisit, success,referrer;
    var def = ['express-cut', 'bitlinks', 'neonlink', 'faucet', 'bitcoinly', 'kiiw', 'adbull', 'linko', 'clickit', 'owllink', 'pingit']
    var delayOn = GM_SuperValue.get('delayOn', def)
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\..*/ig, '')
    var autofcb = /autofaucet.*/.test(host)
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelayorClose(element) {
        error1052 = element.innerText.includes('action is marked as suspicious')
        alreadyVisit = element.innerText.includes('already visited this link!')
        referrer = document.referrer.replace(/https:\/\/|www\.|\..*/ig, '')
        if (error1052 && !(referrer.includes('auto') || delayOn.includes(referrer) || referrer == '')) {
            delayOn.push(referrer)
            GM_SuperValue.set('delayOn', delayOn);
        } else if (referrer == '' && !alreadyVisit) {
            window.history.go(-1)
            //window.history.back()
        } else{ window.close()}
    }

    if (autofcb) {
        waitForKeyElements("div.alert-danger", (element) => {
            addDelayorClose(element)
        });

    } else if (back && !(delayOn.includes(host) || autofcb)) {
        delayOn.push(host)
        GM_SuperValue.set('delayOn', delayOn);
    } else if (delayOn.includes(host)) {
        sleep(16);
    }

})();
