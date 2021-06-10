// ==UserScript==
// @name         AutoFCB(DelayPage)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.5
// @description  Delay some shortlink page loading time
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
    var error = document.querySelector('div.alert.alert-danger')
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\./ig, '')
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelay() {
        let error1052 = error.innerText.includes('action is marked as suspicious')
        let alreadyVisit = error.innerText.includes('already visited this link!')
        let url = document.referrer.replace(/https:\/\/|www.|\//ig, '')
        if (error1052 && !(url.includes('auto')) && !(delayOn.includes(url)) && !(url == '')) {
            delayOn.push(url)
            GM_SuperValue.set('delayOn', delayOn);
        } else if (url == '' && !alreadyVisit) {
            window.history.back()
            //window.close()
        } else {
            window.close()
        }
    }

    if (back && !(delayOn.includes(host))) {
        delayOn.push(host)
        GM_SuperValue.set('delayOn', delayOn);
    }

    if (host.includes('auto')) {
        waitForKeyElements(error, addDelay);
    } else {
        for (const link of delayOn) {
            if (host.includes(link.toLowerCase())) {
                sleep(16);

            }
        }
    }
})();
