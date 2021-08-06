// ==UserScript==
// @name         Bypass
// @namespace    https://github.com/Acotec/autofcb
// @description  Bypass URL links
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/Bypass.user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/Bypass.user.js
// @include      *
// @resource     key https://raw.githubusercontent.com/Acotec/resources/master/keyEncode.txt
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @run_at       document-start
// @connect      https://api.yuumari.com/
// ==/UserScript==

(function() {
    var key=atob(JSON.parse(GM_getResourceText('key')))
    if(/===$/.test(window.location.href)){
        const baseUrl = 'https://api.yuumari.com/alpha-bypass/';
        const link = window.location.href.replace('===','');
        const u = key;
        const l = link
        fetch(baseUrl, {
            method: 'POST',
            body: new URLSearchParams({u,l})
        }).then(r => r.json())
            .then((d)=>{location=d.result});
    }



})();
