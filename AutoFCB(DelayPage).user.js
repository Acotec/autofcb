// ==UserScript==
// @name         AutoFCB(DelayPageorClose)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.7
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
(function () {
    'use strict';
    // Your code here...
    var msg,error1052,alreadyVisit,success ;
    var delayOn = GM_SuperValue.get('delayOn', [])
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\..*/ig, '')
    var autofcb = /auto.*.*/.test(host)
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"
    var navigate = performance.getEntriesByType("navigation")[0].redirectCount
    var redirect = document.referrer.includes('shortlinks/visited/')
    var referrer = document.referrer.replace(/https:\/\/|www\.|\..*/ig, '')

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelayorClose(element) {
        msg = element
        error1052 = msg && msg.innerText.includes('action is marked as suspicious')
        alreadyVisit = msg && msg.innerText.includes('already visited this link!')
        success= msg && msg.innerText.includes('successfully passed the shortlink'
                                              )
        if (error1052 && !(referrer.includes('auto') || delayOn.includes(referrer) || referrer == '' )) {
            delayOn.push(referrer)
            GM_SuperValue.set('delayOn', delayOn);
        } else if (referrer == '' && !alreadyVisit) {
            window.history.go(-1)
            window.history.back()
            //window.close()
        } else if(!(error1052) && (navigate == 1 || redirect == true || success == true)) {
            // window.close()
            // window.close()
        }

    }

    if (autofcb) {
        waitForKeyElements(
            "div.alert",
            (element) => {addDelayorClose(element)},
            true,
            300,
            100
        );

    }
    else if (back && !(delayOn.includes(host) || autofcb)) {
        delayOn.push(host)
        GM_SuperValue.set('delayOn', delayOn);
    }
    else if(delayOn.includes(host)){
        sleep(16);
    }

})();
