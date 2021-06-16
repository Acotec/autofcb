// ==UserScript==
// @name         AutoFCB(Reload)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.0.2
// @description  relaod page if cease for more than a certain time
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @include      *auto*/dashboard/shortlinks/visited*
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => window.location.reload(false), 30*1000);
    document.title = 'Reload-' + document.title

})();
