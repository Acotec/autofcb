// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.4
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @include      *auto*/dashboard/shortlinks
// @grant        window.close
// @grant        unsafeWindow
// @run-at       document-start
// ==/UserScript==

(function () {
    'use strict';
    var Nav=(()=>{var e=performance.getEntriesByType("navigation")[0].redirectCount,r=document.referrer.includes("shortlinks/visited/");1==e||1==r?(window.close(),window.close()):waitForKeyElements("div.alert-success",e=>{window.close()},true,10,-1)})();
    })();
