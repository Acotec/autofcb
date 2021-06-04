// ==UserScript==
// @name         AutoFCB(Mbutt)
// @namespace    https://github.com/Acotec/autofcb
// @version      0.7.8
// @description  Open Remain buttons after Auto(FCB) is run , (optional)
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(Mbutt).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(Mbutt).user.js
// @include      *auto*/shortlinks
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        window.close
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==



(function() {
    'use strict';
    // 1. Create the button
    var button = document.createElement("button");
    // 2. Append somewhere
    var body = document.getElementsByClassName("shortlinks")[0];;

    button.innerHTML = "Run Script";

    function checkButton(){
        button.innerHTML = "Script Run";
        // location.reload()
        ;}

    function runAgain(){
        //check if it as already been run from/inside Auto***
        //if it as already been run (then runvalue from GM_getValue will be greater than 1)
        //then runAgain will run script again and reset it to 0
        let run = GM_getValue("run")
        if (run==1){
            console.log('Script run ',run)
            GM_setValue("run",0)
            main()
        }
    }
    function main(){
        let count = 0
        let run = GM_getValue ("run")
        let visit = document.querySelector("#visit239 > button")
        let getviews = visit.parentElement.parentElement.getElementsByClassName('info')[0].getElementsByTagName('span')[0].innerText
        let viewleft = getviews.replace(getviews.match(/\/.*/),'')
        let viewleftInt = parseInt(viewleft)
        var inter = setInterval(()=>{
            //console.log(visit)
            if(count < viewleftInt && count<50){
                $(visit)[0].click()
                count++
            }else{
                clearInterval(inter)
                //localStorage.closeTabsEnable = 'yes'
                window.close()
                window.top.close()

            }

        },5000)

        }


    body.appendChild(button);
    // // 3. Add event handler

    runAgain()

    button.addEventListener ("click", function() {
        checkButton()
        let run = GM_getValue("run",0)
        if (run==0){
            console.log('Script run from Auto**',run)
            button.innerHTML ='Script was run from Auto** '+run
            GM_setValue("run",1)
            main()
        }
    });
    ////////////////



})();