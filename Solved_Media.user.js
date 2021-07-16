// ==UserScript==
// @name        Solved_Media
// @namespace   https://github.com/Acotec/autofcb
// @description Autocompletion for Solve Media image CAPTCHAs.
// @author      Acotec
// @license     MIT
// @include     *auto*.*
// @run-at      document-end
// @require     https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @resource    _phrases https://github.com/Acotec/resources/raw/master/_phrases.txt
// @updateURL   https://github.com/Acotec/autofcb/raw/master/Solve_Media.user.js
// @downloadURL https://github.com/Acotec/autofcb/raw/master/Solve_Media.user.js
// @grant       GM_getResourceText
// ==/UserScript==

(function() {
    'use strict';
    try{
        var _phrases=JSON.parse(GM_getResourceText("_phrases"))
        }catch(err){}


    function setup(input) {
        var datalist = document.createElement('datalist');
        datalist.setAttribute('id', 'adcopy__phrases');

        for (var i = 0; i < _phrases.length; ++i) {
            datalist.appendChild(document.createElement('option')).appendChild(document.createTextNode(_phrases[i]));
        }

        input.parentNode.insertBefore(datalist, input.nextSibling);
        input.setAttribute('list', datalist.id);
    }

    function Suggest(){
        document.querySelector("#adcopy_response").setAttribute('autocomplete','on')
        document.querySelector("#adcopy_response").setAttribute('autocorrect','on')
        document.body.addEventListener('keydown', function handler(event) {
            if (event.target.id.indexOf('adcopy_response') == 0) {
                this.removeEventListener(event.type, handler);
                var input = event.target;
                setup(input);
                input.blur();
                input.focus();
            }
        })}
    waitForKeyElements('#adcopy-puzzle-image', (element) => {
        Suggest()
    },true,);

})();
