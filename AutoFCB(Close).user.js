// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.3
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @include     *auto*/dashboard/shortlinks*
// @grant        window.close
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-end
//// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==
(function () {
    'use strict';
    var Nav = (() => {
        var navigate = performance.getEntriesByType("navigation")[0].redirectCount
        var redirect = document.referrer.includes('shortlinks/visited/')
        var success = document.querySelector('div.alert-success') !== null
        if (navigate == 1 || redirect == true || success == true) {
            window.close()
            window.close()
        }

    })()

})();
