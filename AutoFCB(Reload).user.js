// ==UserScript==
// @name         AutoFCB(Reload)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.0.2
// @description  relaod page if cease for more than a certain time
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @include      *auto*/dashboard/shortlinks/visited*
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    function countDown(i, callback) {
        callback = callback || function(){};
        var int = setInterval(function() {
            document.title='Reload '+ i
            i-- || (clearInterval(int), callback());
        }, 1000);
    }

    countDown(60, function(){
        window.location.reload(false)
    });

})();
