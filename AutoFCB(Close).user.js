// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.5
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @include     *auto*/dashboard/shortlinks
// @grant        window.close
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
//// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==
(function () {
    'use strict';
    var Nav=(()=>{var e=performance.getEntriesByType("navigation")[0].redirectCount,r=document.referrer.includes("shortlinks/visited/");1==e||1==r?(window.close(),window.close()):waitForKeyElements("div.alert-success",e=>{window.close()})})();
    })();
