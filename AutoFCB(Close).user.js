// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.5
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @include      *auto*/dashboard/shortlinks
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    var navigate = performance.getEntriesByType("navigation")[0].type == 'navigate'
    var ref_self = /auto(faucet|claim|bitco)/ig.test(document.referrer)
    var referrer = document.referrer.includes("shortlinks/visited/");
    if ((navigate && !ref_self) || referrer ) {
        window.close()
    }else {
        waitForKeyElements("div.alert-success", function(e) {
            window.close();
        }, true, 10, -1);
    }


})();
