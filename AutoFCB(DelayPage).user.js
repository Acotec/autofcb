// ==UserScript==
// @name         AutoFCB(DelayPageorClose)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.6
// @description  Delay some shortlink page loading time and close it when done
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(DelayPage).user.js
// @require      https://github.com/Acotec/require/raw/master/Super_GM.user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.js
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @match        *://*/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.close
// @run-at       document-end
// ==/UserScript==
(function () {
    'use strict';
    // Your code here...
    var delayOn = GM_SuperValue.get('delayOn', [])
    var msg = document.querySelector('div.alert.alert-danger')
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\..*/ig, '')
    var autofcb = /auto.*.*/.test(host)
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"

    var navigate = performance.getEntriesByType("navigation")[0].redirectCount
    var redirect = document.referrer.includes('shortlinks/visited/')
    var success = document.querySelector('div.alert-success') !== null

    var error1052 = msg && msg.innerText.includes('action is marked as suspicious')
    var alreadyVisit = msg && msg.innerText.includes('already visited this link!')
    var url = document.referrer.replace(/https:\/\/|www\.|\..*/ig, '')

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelayorClose() {
        if (error1052 && !(url.includes('auto') || delayOn.includes(url) || url == '' )) {
            delayOn.push(url)
            GM_SuperValue.set('delayOn', delayOn);
        } else if (url == '' && !alreadyVisit) {
            window.history.go(-1)
            window.history.back()
            //window.close()
        } else if(!(error1052) && navigate == 1 || redirect == true || success == true) {
            // window.close()
            // window.close()
            alert()
        }

    }


    if (autofcb) {
        waitForKeyElements(msg, addDelayorClose)
    }
    else if (back && !(delayOn.includes(host) || autofcb)) {
        delayOn.push(host)
        GM_SuperValue.set('delayOn', delayOn);
    }
    else if(delayOn.includes(host)){
        sleep(16);
    }

})();
