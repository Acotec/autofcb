// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.7
// @description  Auto closeDone Auto**/
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Close).user.js
// @include     *auto*/dashboard/shortlinks*
// @grant        window.close
// @grant        GM_setValue
// @grant        GM_getValue
// @run-at       document-start
//// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    var Nav=(()=>{
        var navigate = performance.getEntriesByType("navigation")[0].type
        var redirect = document.referrer.includes('shortlinks/visited/')
        var success = document.getElementsByClassName('alert-success').length>0;
        if(navigate=='navigate'||redirect==true||success==true){
            window.close()
            window.close()
        }

    })()

    })();
