// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.7
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @require      https://github.com/Acotec/require/raw/master/cookie_sg_min.js
// @include      *auto*/dashboard/shortlinks
// @grant        window.close
// @run-at       document-start
// ==/UserScript==

(function () {
    var c = getCookie("visited");
    if (c === "yes") {
         window.close();window.close();window.close();window.close();window.close();window.close()
    }
    setCookie("visited", "yes",300)
})();
