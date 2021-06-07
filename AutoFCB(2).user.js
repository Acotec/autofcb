// ==UserScript==
// @name         AutoFCB(2)
// @namespace    https://github.com/Acotec/autofcb
// @version      2.1.6
// @description  AutomateButtons
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb/raw/master/AutoFCB(2).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/AutoFCB(2).user.js
// @include      *auto*/shortlinks
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        unsafeWindow
// @grant        window.close
// @require      http://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==
(function () {
    'use strict';
    //Dont click the link in this list
    var _DontOpen = ['LootLinks', 'bestshort', 'SkipAz', 'try2link']
    var _open_link_fast = []
    var _alreadyRun = GM_getValue("_alreadyRun")
    var _available_link = parseInt(document.getElementsByClassName('amount')[1].textContent)
    var _views_ToVisit = $('span#views').toArray()
    var _totalLink = _views_ToVisit.length - _DontOpen.length;
    var _num_ofLink_toVisit = []
    var _sort_and_Re_Dup = []
    var _ordered_LinkToVisitOnPage = []
    var _order_ByName = []

    /* variable for appearFunction */
    var i = 0; //index (for looping purpose)
    var s = 10; //index
    var interval; //for setInterval
    var duration; //for setInterval duration
    var multiplier = 500 //GM_getValue('speed',500)
    var speed = 1500 //GM_getValue('speed',1500); //the duration speed
    if (GM_getValue('speed') == null) {
        GM_setValue('speed', speed)
    }
    if (GM_getValue('multiplier') == 'null') {
        GM_setValue(multiplier, multiplier)
    }

    // 1. Create the button
    var button = document.createElement("button");
    var speed_add = document.createElement("button");
    var speed_sub = document.createElement("button");
    var mult_add = document.createElement("button");
    var mult_sub = document.createElement("button");
    var dis = document.createElement("p");
    var dis1 = document.createElement("p");
    // 2. Append somewhere
    var body = document.getElementsByClassName('col item')[1].getElementsByClassName('content-box')[0]
    var body1 = document.getElementsByClassName('col item')[0].getElementsByClassName('content-box')[0]
    //button.innerHTML = "Run Script";

    function checkButton() {
        if (GM_getValue("_alreadyRun") == true) {
            GM_setValue("_alreadyRun", false);
            //button.innerHTML = "Run Script";
            button.innerHTML = "Script Run [" + _totalLink + "] Links will Open";
            location.reload()
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))
        } else {
            GM_setValue("_alreadyRun", false);
            button.innerHTML = "Script Stop";
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))

        };
    }

    function pageR() {
        //reload
        var reloading = sessionStorage.getItem("reloading");
        if (reloading) {
            sessionStorage.removeItem("reloading");
            if (_alreadyRun == false) {
                button.innerHTML = "Script Run(Click to Run Again)";
            } else {
                button.innerHTML = "Script Not Running--Total Button=" + _views_ToVisit.length;

            }
        }
    }

    function reloadP() {
        sessionStorage.setItem("reloading", "true");

    }

    function Rclick() {
        //document.querySelector("body > div.content-area > button").click()

        if (Number(GM_getValue("Reload")) < 1) {
            var R = Number(GM_getValue("Reload"))
            GM_setValue("_alreadyRun", false);
            GM_setValue("Reload", R + 1);
            window.close()
            window.top.close()
            window.location.reload()
        } else {
            GM_setValue("_alreadyRun", true);
            GM_setValue("Reload", 0)

            button.innerHTML = "Auto Click Done(" + GM_getValue("Reload") + ")"

            setInterval(() => {
                document.querySelector("body > div.content-area > div.shortlinks > button").click()
            }, 1000)
        }

    }

    function ViewsOnPage() {
        for (let i = 0; i < _views_ToVisit.length; i++) {
            //console.log(views[i])
            let getViewsLeft = _views_ToVisit[i].textContent // get the views_left
            let exTotalNum = getViewsLeft.match(/\d*\//)[0] // extract views_left number with /
            let totalView = getViewsLeft.replace(exTotalNum, '') // replace / with ''
            _num_ofLink_toVisit.push(parseInt(totalView)) // add to _num_ofLink_toVisit
        }
    }

    function Sort_And_Remove_Duplicate() {
        let uniq = _num_ofLink_toVisit.map((name) => {
                return {
                    count: 1,
                    name: name
                }
            })
            .reduce((a, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})

        let sorted = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])
        _sort_and_Re_Dup = sorted

        //console.log(sorted)
    }

    function Ordered_LinkToView() {
        for (let i = 0; i < _sort_and_Re_Dup.length; i++) {

            for (let j = 0; j < _views_ToVisit.length; j++) {
                let b = _views_ToVisit[j].textContent.includes(_sort_and_Re_Dup[i])
                let ext_name = _views_ToVisit[j].parentElement.parentElement.getElementsByClassName('name')[0].innerText
                let check = ext_name.replace(ext_name.match(/\sFCT*\d*.*/), '')
                //use this to extract only the link name without it FctToken [ext_name.replace(ext_name.match(/\s*\d* .*/), '')]


                if (_order_ByName.includes(check) == false) {
                    _ordered_LinkToVisitOnPage.push(_views_ToVisit[j])
                    _order_ByName.push(check)

                }

            }

        }
    }

    function DontOpen_LinkByName(link) {
        let Lower_DontOpen = _DontOpen.map(item => item.toLowerCase())
        let getName = link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim()
        //console.log(getName)
        let isit = getName.replace(getName.match(/\s*\d* .*/), '')
        //console.log(isit)
        if (Lower_DontOpen.includes(isit.toLowerCase())) {
            //console.log('DontOpen - ', isit)
            return true
        }
    }

    function appear() { //define a function
        let limit = _ordered_LinkToVisitOnPage.length
        // if(limit>30){limit = 30 //_available_link}; i += 1; //increment the index ; duration = i*speed ; console.log('First',duration)
        interval = setInterval(() => {
            // console.log(i)
            try {
                let _getlink = _ordered_LinkToVisitOnPage.splice(0, 1)[0],
                    open_link = _getlink.parentNode.parentNode.parentNode.querySelector("button"),
                    exLinkInfo = _getlink.parentNode.parentNode.getElementsByClassName("name")[0].innerText.trim(),
                    linkName = exLinkInfo.replace(exLinkInfo.match(/\s*\d* .*/), ""),
                    lower_open_link_fast = _open_link_fast.map(e => e.toLowerCase());
                if (_available_link <= 1000) {
                    _getlink = _getlink.textContent;
                    let exFirstNum = _getlink.match(/\/\d*/)[0],
                        first_number = _getlink.replace(exFirstNum, "");
                    if (DontOpen_LinkByName(open_link)) {
                        //console.log('Shortlink Among Dont Open')
                        limit++
                        //console.log('wont ',limit)
                    } else {
                        if (first_number == 1 || lower_open_link_fast.includes(linkName.toLowerCase())) {
                            i += s
                            duration = GM_getValue('multiplier') + i //duration
                            //console.log('duration reset ',duration)
                            //console.log('Link is open fast -- ',linkName)

                        } else {

                            i += 1; //increment the index
                            duration = i * GM_getValue('speed')

                            let value = 9000
                            if (duration >= value) {
                                //console.log(duration,'>=',value)
                                duration = 5000 //duration

                            }

                        }
                        var inter = setInterval(() => {
                            first_number--
                            if (first_number >= 0) {
                                open_link.click()
                                // console.log('a', open_link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim())
                                clearInterval(interval)
                                appear() // re-run
                            }
                        }, duration)
                    }
                } else {
                    duration = i * GM_getValue('speed')


                    if (DontOpen_LinkByName(open_link)) {
                        //console.log('Shortlink Among Dont Open')
                        limit++
                    } else {
                        open_link.click()
                        //console.log('b', open_link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim())
                    }
                }
                clearInterval(interval); //clear
            } catch (err) {
                null
            }
            clearInterval(interval); //clear
            // console.log(limit)
            //console.log('duration using is', duration)
            if (!limit == 0) {
                appear(); //re-run
            } else {
                i = 0; //reset
                //console.log('Done opening')
                button.innerHTML = 'Done opening-Click to Run Again'
                clearInterval(interval)
                //Rclick()
                //window.close()
                //window.close()
            }
        }, duration);
    }


    function main() {

        GM_setValue("_alreadyRun", true);
        //console.log("GM_value is now set to-" + GM_getValue("_alreadyRun"))
        ViewsOnPage()
        Sort_And_Remove_Duplicate()
        Ordered_LinkToView()
        appear();
    }


    body.appendChild(button);

    body1.appendChild(speed_add);
    speed_add.innerHTML = 'Speed+'
    body1.appendChild(speed_sub);
    speed_sub.innerHTML = 'speed-'
    body1.appendChild(dis);

    body1.appendChild(mult_add);
    mult_add.innerHTML = 'mult+'
    body1.appendChild(mult_sub);
    mult_sub.innerHTML = 'mult-'
    body1.appendChild(dis1);

    dis.innerHTML = 'DS - ' + GM_getValue('speed', speed) //DS=default Speed
    dis1.innerHTML = 'DM - ' + GM_getValue('multiplier', multiplier) //DM=default Speed
    // // 3. Add event handler
    button.addEventListener("click", function () {
        checkButton()
    });
    speed_add.addEventListener("click", function () {
        speed = GM_getValue('speed') + 50
        GM_setValue("speed", speed);
        dis.innerHTML = 'CS - ' + GM_getValue('speed') // CS = current setSpeed
    });
    speed_sub.addEventListener("click", function () {
        if (!(speed <= 50)) {
            speed = GM_getValue('speed') - 50
            GM_setValue("speed", speed);
            dis.innerHTML = 'CS - ' + GM_getValue('speed')
        }
    });
    /////MuLT Button
    mult_add.addEventListener("click", function () {
        multiplier = GM_getValue('multiplier') + 50
        GM_setValue("multiplier", multiplier);
        dis1.innerHTML = 'CM - ' + GM_getValue('multiplier') // CS = current setSpeed
    });
    mult_sub.addEventListener("click", function () {
        if (!(multiplier <= 50)) {
            multiplier = GM_getValue('multiplier') - 50
            GM_setValue("multiplier", multiplier);
            dis1.innerHTML = 'CM - ' + GM_getValue('multiplier')
        }


    });
    //////////////////

    window.onload = function () {
        pageR()

    }
    reloadP();
    if (!_alreadyRun) {
        main()
    }


})();
