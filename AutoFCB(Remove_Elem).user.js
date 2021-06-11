// ==UserScript==
// @name         AutoFCB(Remove_Elem)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.4.4
// @description   Remove Element from Page
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Remove_Elem).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Remove_Elem).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @include      *auto*/dashboard*
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';
    var h = window.location.href

    function removeElement(element){
        var elem = element.parentElement.parentElement
        elem.parentNode.removeChild(elem)//remove log-out button from every where;

        if(h.includes('withdraw/')){
            var ele = Array.from(document.querySelectorAll('option'))
            ele.forEach(element =>{if(element.innerHTML.toLowerCase().includes('expresscrypto')){element.remove()}});; //remove withdrawal to ExpressCrypto
        }
    }

    waitForKeyElements(".anticon-logout", (element) => {
        removeElement(element)
    }, );



})();
