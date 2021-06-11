// ==UserScript==
// @name         AutoFCB(Reload)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.1
// @description  relaod page if still for more than a certain time
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Reload).user.js
// @include      *auto*/dashboard/shortlinks/visited*
// ==/UserScript==

(function() {
    'use strict';
      setTimeout(() => window.location.reload(), 30000);
})();
