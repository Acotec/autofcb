// ==UserScript==
// @name         AutoFCB(Remove_Elem)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.4.2
// @description   Remove Element from Page
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Remove_Elem).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Remove_Elem).user.js
// @include     *auto*/dashboard*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        window.close
// @run-at       document-start
// ==/UserScript==


(function() {
    'use strict';
    var h = window.location.href
    // 1. Create the button
    var button = document.createElement("button");
    // 2. Append somewhere

    function removeElement(){
        try{ var elem = document.getElementsByClassName('anticon anticon-logout icon')[0].parentElement.parentElement
        elem.parentNode.removeChild(elem)//remove log-out button from every where;
           }catch(err){null}

        if(h.includes('withdraw/')){
            var ele = Array.from(document.querySelectorAll('option'))
            ele.forEach(element =>{if(element.innerHTML.toLowerCase().includes('expresscrypto')){element.remove()}});; //remove withdrawal to ExpressCrypto
            //document.getElementById('settings').remove()//remove withdrawal settings
        }
    }

    try{
        var inter = setInterval(()=>{
            removeElement()
            clearInterval(inter)

        },)
        }
    catch(err){
        null
        clearInterval(inter)
    }


})();
