// ==UserScript==
// @name         AutoFCB(Elem_add_rmv)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.4.1
// @description  Auto close Done AutoFCB
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Elem_add_rmv).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Elem_add_rmv).user.js
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
    var parag = document.createElement("p");
    var body = null
    // 2. Append somewhere
    function addElement(){
        try{
            body = document.getElementsByClassName("dropdown-menu dropdown-menu-right dropdown-menu-lg-left show")[0].children[4]
        }catch(err){
            body = document.getElementsByClassName("dropdown-menu dropdown-menu-right dropdown-menu-lg-left")[0].children[4]
            if(localStorage.firstopen == 'yes'){
                button.innerHTML = "FirstVisit";
                parag.innerText='\nNext open of thesame page will be close'

            }else{
                button.innerHTML = "Not Closing"
            };

            body.appendChild(button);
            body.appendChild(parag)
            //alert('First visit')// // 3. Add event handler
            button.addEventListener("click", function () {
                document.cookie = "FirstTimeVisitCookie=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
                console.log('Stop Closing')
                button.innerHTML="Closing Stop"
                parag.innerText="\nPage won't be close"
                body.appendChild(parag)

            });
        }
    }

    function removeElement(){
        if(h.includes('withdraw/')){
            var ele = Array.from(document.querySelectorAll('option'))
            ele.forEach(element =>{if(element.innerHTML.toLowerCase().includes('expresscrypto')){element.remove()}});; //remove withdrawal to ExpressCrypto
            //document.getElementById('settings').remove()//remove withdrawal settings
        }

        try{ var elem = document.getElementsByClassName('anticon anticon-logout icon')[0].parentElement.parentElement
        elem.parentNode.removeChild(elem)//remove log-out button from every where;
           }catch(err){null}
    }

    try{
        var inter = setInterval(()=>{
            removeElement()
            addElement()
            clearInterval(inter)

        },)
        }
    catch(err){
        null
        clearInterval(inter)
    }


})();