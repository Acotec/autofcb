// ==UserScript==
// @name         AutoFCB(Close)
// @namespace    https://github.com/Acotec/autofcb
// @version      1.0.2
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

    function Nav(){
        var checkRedirection = window.performance.navigation.redirectCount
        if(checkRedirection==1){
            window.close()
            window.close()
            window.close()

        }
    }

    var close = ()=>{ setInterval(window.close())}

    Nav()

    var inter= setInterval(()=>{
        try{
            if(document.getElementsByClassName('alert-success').length>0||document.getElementsByClassName('alert-danger').length>0){
               clearInterval(inter)
               close()
               }
        }catch(err){
         null
}
    },)
    //Nav()

})();
