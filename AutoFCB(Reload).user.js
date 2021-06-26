// ==UserScript==
// @name         AutoFCB(Reload)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.0.4
// @description  relaod page if cease for more than a certain time
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @include      *autobitco*/dashboard/shortlinks/visited*
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';
    document.title='R-'+document.title
    setTimeout(()=>{location.reload(false)},1000*15)

})();
