// ==UserScript==
// @name         AutoFCB(2)
// @namespace    https://github.com/Acotec/autofcb
// @version      2.1.17
// @description  AutomateButtons
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb_meta/raw/master/AutoFCB(2).user.js
// @downloadURL  https://github.com/Acotec/autofcb_meta/raw/master/AutoFCB(2).user.js
//// @require      http://code.jquery.com/jquery-3.5.1.min.js
// @connect      gist.github.com
// @connect      gist.githubusercontent.com
// @connect      api.github.com
// @resource     _DontOpen https://gist.githubusercontent.com/Harfho/8f5a3bd519f0ebf94708ad624ffd76d2/raw/_DontOpen.txt
// @resource     shortlinks_name https://gist.githubusercontent.com/Harfho/8f5a3bd519f0ebf94708ad624ffd76d2/raw/shortlinks_name.txt
// @include      *auto*/shortlinks
// @include      *auto*/shortlinks?*
// @noframes
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @grant        window.close
// @grant        GM_xmlhttpRequest
//// @require      https://github.com/Acotec/autofcb_script/raw/master/AutoFCB(2).user.js
// ==/UserScript==
(function () {
    var _DontOpen = GM_getResourceText("_DontOpen").replace(/'|"|\[|\]|\s/ig, '').split(',').filter(e => e),
        shortlinks_name = GM_getResourceText("shortlinks_name").replace(/'|"|\[|\]|\s/ig, '').split(',').filter(e => e),
        _open_link_fast = [].map(e => e.toLowerCase()),
        _alreadyRun = GM_getValue("_alreadyRun"),
        _available_link = parseInt(document.getElementsByClassName('amount')[1].textContent),
        _views_ToVisit = Array.from(document.querySelectorAll('span#views')),
        _num_ofLink_toVisit = [],
        _sort_and_Re_Dup = [],
        _ordered_LinkToVisitOnPage = [],
        _order_ByName = [],
        button = document.createElement("button"),
        body = document.getElementsByClassName('col item')[1].getElementsByClassName('content-box')[0],
        gist_id = "8f5a3bd519f0ebf94708ad624ffd76d2",
        hideVisitedShortlinks = document.querySelector("div.shide").querySelector(".cwrapper");
    /checked/gi.test(hideVisitedShortlinks.innerHTML) || (setTimeout(() => {
        hideVisitedShortlinks.click();
        hideVisitedShortlinks.dispatchEvent(new Event("change"))
    }, 2000)); //check if visited shortlink is hide or not.
    function AutoUpdateDontOpen() {
        var AutoUpdateB = document.createElement("button"),
            AutoUpdate = document.getElementsByClassName('col item')[2].getElementsByClassName('content-box')[0];
        AutoUpdate.appendChild(AutoUpdateB);
        try {
            if (GM_getValue("AutoUpdate", true)) {
                AutoUpdateB.innerHTML = 'AutoUpdate_ON';
                AutoUpdateB.style = "background-color:Violet;color:white"
            } else {
                GM_setValue("AutoUpdate", false)
                AutoUpdateB.innerHTML = 'AutoUpdate_OFF';
                AutoUpdateB.style = "background-color:black;color:white"
            }
            AutoUpdateB.addEventListener('click', function (e) {
                if (GM_getValue("AutoUpdate", true)) {
                    GM_setValue("AutoUpdate", false);
                    AutoUpdateB.innerHTML = 'AutoUpdate_OFF';
                    AutoUpdateB.style = "background-color:black;color:white"
                } else {
                    GM_setValue("AutoUpdate", true);
                    AutoUpdateB.innerHTML = 'AutoUpdate_ON'
                    AutoUpdateB.style = "background-color:Violet;color:white"
                }
            });
        } catch (err) {}
    }

    function checkButton() {
        if (GM_getValue("_alreadyRun") == true) {
            GM_setValue("_alreadyRun", false);
            button.innerHTML = "Script Run";
            localStorage.removeItem("close")
            location.reload()
            localStorage.removeItem("close")
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))
        } else {
            GM_setValue("_alreadyRun", true);
            button.innerHTML = "Script Stop";
            localStorage.removeItem("close")
            location.reload()
        }
    }

    function static_speed() {
        let staticB = document.createElement("button"),
            static = document.getElementsByClassName('col item')[0].getElementsByClassName('content-box')[0];
        static.appendChild(staticB);
        try {
            if (GM_getValue("static", true)) {
                staticB.innerHTML = 'Static_ON';
                staticB.style = "background-color:Violet;color:white"
            } else {
                GM_setValue("static", false)
                staticB.innerHTML = 'Static_OFF';
                staticB.style = "background-color:black;color:white"
            }
            staticB.addEventListener('click', function (e) {
                if (GM_getValue("static", true)) {
                    GM_setValue("static", false);
                    staticB.innerHTML = 'Static_OFF';
                    staticB.style = "background-color:black;color:white"
                } else {
                    GM_setValue("static", true);
                    staticB.innerHTML = 'Static_ON'
                    staticB.style = "background-color:Violet;color:white"
                }
            });
        } catch (err) {}
    }

    function SpeedCtr() {
        var speed = GM_getValue('speed', 0.1); //the duration speed
        "undefined" != String(speed) && "NaN" != String(speed) && "null" != String(GM_getValue(speed)) || GM_setValue("speed", 0.1);
        var body1 = document.getElementsByClassName('col item')[0].getElementsByClassName('content-box')[0],
            dis = document.createElement("p"),
            speed_add = document.createElement("button"),
            speed_sub = document.createElement("button");
        body1.appendChild(speed_add);
        speed_add.innerHTML = 'speed +'
        body1.appendChild(speed_sub);
        speed_sub.innerHTML = 'speed -'
        body1.appendChild(dis);
        dis.innerHTML = 'DS - ' + speed + ' Seconds' //DS=default Speed
        speed_add.addEventListener("click", function () {
            speed = parseFloat((speed + 0.01).toFixed(2))
            GM_setValue("speed", speed);
            dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds' // CS = current setSpeed
        })
        speed_sub.addEventListener("click", function () {
            if (!(GM_getValue('speed') < 0.05)) {
                speed = parseFloat((speed - 0.01).toFixed(2))
                GM_setValue("speed", speed);
            }
            dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds'
        });
        static_speed()
    }

    function DelayShort() {
        var ShortDelayButton = document.createElement("button"), //create button to enable/disable the Delay of some shortlink b4 they open
            ShortDelay = document.getElementsByClassName("shortlinks")[0]; //Append somewhere
        ShortDelay.appendChild(ShortDelayButton)
        try {
            if (GM_getValue("delayShort")) {
                ShortDelayButton.innerHTML = 'Delay';
            } else {
                GM_setValue("delayShort", false)
                ShortDelayButton.innerHTML = 'Dnt_Delay';
            }
            ShortDelayButton.addEventListener('click', function (e) {
                if (GM_getValue("delayShort", true)) {
                    GM_setValue("delayShort", false);
                    ShortDelayButton.innerHTML = 'Dnt_Delay';
                } else {
                    GM_setValue("delayShort", true);
                    ShortDelayButton.innerHTML = 'Delay'
                }
                //console.log(GM_getValue("delayShort"))
            });
        } catch (err) {}
    }
    AutoUpdateDontOpen() //run
    //function to get the shortlinks that should not be open
    if (GM_getValue("_alreadyRun") != true) {
        GM_setValue("_alreadyRun", true);
        if (GM_getValue("AutoUpdate")) {
            GM_xmlhttpRequest({
                method: 'GET',
                url: 'https://gist.github.com/Harfho/' + gist_id + '/raw/shortlinks_name.txt?timestamp=' + (+new Date()),
                fetch: false,
                nocache: false,
                onload: get_Shortlinks_and_DontOpen,
                onerror: window.location.reload
            })

            function get_Shortlinks_and_DontOpen(response) {
                let get_shortlinks_name = response.responseText.replace(/'|"|\[|\]|\s/ig, '').split(',').filter(e => e);
                shortlinks_name = get_shortlinks_name.map(item => item.replace(/'/ig, '"').toLowerCase());
                //console.log(shortlinks_name)
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: 'https://gist.github.com/Harfho/' + gist_id + '/raw/_DontOpen.txt?timestamp=' + (+new Date()),
                    fetch: false,
                    nocache: false,
                    onload: Runcode,
                    onerror: window.location.reload
                });
            }
        } else {
            Runcode()
        }
    } else {
        SpeedCtr()
        body.appendChild(button);
        button.innerHTML = "Script Not Running -- SHORTLINKS=" + _views_ToVisit.length;
        DelayShort()
        button.addEventListener("click", function () {
            checkButton()
        });
    }

    function Runcode(response = null) {
        /* variable for appearFunction */
        var i = 0, //index (for looping purpose)
            interval, //for setInterval
            duration; //for setInterval duration
        localStorage.setItem("close", "true")
        if (GM_getValue('AutoUpdate')) {
            let getDontOpen = response.responseText.replace(/'|"|\[|\]|\s/ig, '').split(',').filter(e => e);
            _DontOpen = getDontOpen.map(item => item.replace(/'/ig, '"').toLowerCase())
        } else {
            _DontOpen = _DontOpen.map(item => item.replace(/'/ig, '"').toLowerCase());
            shortlinks_name = shortlinks_name.map(item => item.replace(/'/ig, '"').toLowerCase());
        }
        if (_views_ToVisit.length >= _DontOpen.length) {
            var _totalLink = _views_ToVisit.length - _DontOpen.length;
        } else if (_DontOpen.length >= _views_ToVisit.length) {
            _totalLink = 'NO'
        } else {
            _totalLink = _views_ToVisit.length;
        }
        if (/404|400/ig.test(_DontOpen + shortlinks_name)) {
            window.location.reload();
            throw new Error("!! Stop JS")
        } else {
            //console.log(_DontOpen)
            //console.log(shortlinks_name)
        }
        //function to check when the page is reloaded
        function pageR() {
            //reload
            var reloading = sessionStorage.getItem("reloading");
            if (reloading) {
                sessionStorage.removeItem("reloading");
                if (_alreadyRun == false) {
                    button.innerHTML = "Script Run(Click to Run Again)";
                    localStorage.setItem("close", "true") //AutoFCB(Close)
                } else {
                    button.innerHTML = "Script Not Running -- SHORTLINKS=" + _views_ToVisit.length;
                }
            }
        }

        //function to reload the page
        function reloadP() {
            sessionStorage.setItem("reloading", "true");
        }

        //function to re-run the script
        function Re_run() {
            let reRun = Number(GM_getValue("Re_run", 0)) //
            let time = 2
            if (reRun < time) {
                GM_setValue("_alreadyRun", false);
                GM_setValue("Re_run", reRun + 1); //
                localStorage.setItem("close", "true")
                window.close()
            } else {
                GM_setValue("Re_run", 0); //
                GM_setValue("_alreadyRun", true);
                localStorage.removeItem("close")
                window.close()
            }
        }

        function ViewsOnPage() {
            for (let i = 0; i < _views_ToVisit.length; i++) {
                //console.log(views[i])
                let getViewsLeft = _views_ToVisit[i].textContent, // get the views_left
                    exTotalNum = getViewsLeft.match(/\d*\//)[0], // extract views_left number with /
                    totalView = getViewsLeft.replace(exTotalNum, ''); // replace / with ''
                _num_ofLink_toVisit.push(parseInt(totalView)) // add to _num_ofLink_toVisit
            }
        }

        function Sort_And_Remove_Duplicate() {
            let uniq = _num_ofLink_toVisit.map((name) => {
                return {
                    count: 1,
                    name: name
                }
            }).reduce((a, b) => {
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
                    let b = _views_ToVisit[j].textContent.includes(_sort_and_Re_Dup[i]),
                        ext_name = _views_ToVisit[j].parentElement.parentElement.getElementsByClassName('name')[0].innerText,
                        check = ext_name.replace(ext_name.match(/\sFCT*\d*.*/), '');
                    //use this to extract only the link name without it FctToken [ext_name.replace(ext_name.match(/\s*\d* .*/), '')]
                    if (_order_ByName.includes(check) == false) {
                        _ordered_LinkToVisitOnPage.push(_views_ToVisit[j])
                        _order_ByName.push(check)
                    }
                }
            }
        }

        function DontOpen_LinkByName(linkName) {
            let check = _DontOpen.some((link) => {
                return new RegExp('^' + link + '$', "ig").test(linkName)
            }) //check if linkName is among _DontOpen
            if (check) {
                //alert('Dontopen '+linkName)
                return true
            } else {
                return false
            }
        }

        function update_DontOpen(linkName) {
            _DontOpen.push(linkName.toLowerCase())
            shortlinks_name.push(linkName)
            var access_token = atob('Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw=='), //get access_token and de_encrpt it btoa to atob
                discription = window.location.host + " added " + linkName + " to _DontOpen and shortlinks_name"
            access_token = "Bearer " + access_token
            //console.log(access_token)
            const myHeaders = new Headers({
                "accept": "application/vnd.github.v3+json",
                'Authorization': access_token,
                "Content-Type": "application/json"
            })
            var raw = JSON.stringify({
                "description": discription,
                "files": {
                    "shortlinks_name.txt": {
                        "content": JSON.stringify(shortlinks_name)
                    },
                    "_DontOpen.txt": {
                        "content": JSON.stringify(_DontOpen)
                    }
                }
            });
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.github.com/gists/" + gist_id, requestOptions)
                .then(response => response.text())
                .then(result => console.log(discription)) //console.log(result)
                .catch(error => console.log('error', error));
        }

        function clickOnEle(el) {
            var simulateMouseEvent = function (element, eventName, coordX, coordY) {
                element.dispatchEvent(new MouseEvent(eventName, {
                    //view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: coordX,
                    clientY: coordY,
                    button: 0
                }));
            };
            var theButton = el;
            var box = theButton.getBoundingClientRect(),
                coordX = box.left + (box.right - box.left) / 2,
                coordY = box.top + (box.bottom - box.top) / 2;
            simulateMouseEvent(theButton, "mousedown", coordX, coordY);
            simulateMouseEvent(theButton, "mouseup", coordX, coordY);
            simulateMouseEvent(theButton, "click", coordX, coordY);
        }
        Array.prototype.shuffle = function () {
            let m = this.length,
                i;
            while (m) {
                i = (Math.random() * m--) >>> 0;
                [this[m], this[i]] = [this[i], this[m]]
            }
            return this;
        }

        function getRandom(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        }

        function appear() { //define a function
            let limit = _ordered_LinkToVisitOnPage.length
            interval = setInterval(() => {
                try {
                    let _ordered_LinkToVisitOnPage_Shuffle = _ordered_LinkToVisitOnPage.shuffle()
                    let _getlink = _ordered_LinkToVisitOnPage_Shuffle.splice(0, 1)[0],
                        open_link = _getlink.parentNode.parentNode.parentNode.querySelector("button"),
                        exLinkInfo = _getlink.parentNode.parentNode.getElementsByClassName("name")[0].innerHTML.trim(),
                        linkName = exLinkInfo.replace(/(<|\s).*/, '') //exLinkInfo.replace(exLinkInfo.match(/\s*\d* .*/), "");
                    if (_available_link <= 1000) {
                        _getlink = _getlink.textContent;
                        let exFirstNum = _getlink.match(/\/\d*/)[0],
                            views_left = _getlink.replace(exFirstNum, "");
                        if (DontOpen_LinkByName(linkName)) {
                            //console.log('Shortlink Among Dont Open')
                            limit++
                            //console.log('wont open',linkName,limit)
                        } else {
                            //console.log(shortlinks_name,linkName.toLowerCase(),shortlinks_name.includes(linkName.toLowerCase()))
                            if (shortlinks_name.includes(linkName.toLowerCase())) {
                                //console.log(linkName)
                                i++; //increment the index
                                if (GM_getValue("use_static", '') && GM_getValue("static")) {
                                    var time = new Date();
                                    time = time.toLocaleString('en-US', {
                                        hour: 'numeric',
                                        hour12: true
                                    }).replace(/\s+/ig, '')
                                    if (/(12|0[0-8]|[1-8])am/ig.test(time)) {
                                        duration = 1 * 1000
                                    } //time is around 12am-8am
                                    else if (/(9|1[0-1])am/ig.test(time)) {
                                        duration = getRandom(2, 3) * 1000
                                    } //time is around 9am-11am
                                    else if (/(12|(0|1[0-9]|[1-9]))pm/ig.test(time)) {
                                        duration = getRandom(2, 5) * 1000
                                    } //time is around 12pm-11pm
                                    else {
                                        duration = getRandom(1, 5) * 1000
                                    }
                                } else {
                                    duration = i * GM_getValue('speed') * 1000
                                    GM_setValue("use_static", true)
                                }
                                //console.log(i)
                                var inter = setInterval(() => {
                                    views_left--
                                    if (views_left >= 0) {
                                        clickOnEle(open_link)
                                        //console.log('a',linkName)
                                        clearInterval(interval)
                                        appear() // re-run
                                    }
                                }, duration)
                            } else {
                                console.log(linkName.toLowerCase(), 'Is not among shortlinks to open')
                                update_DontOpen(linkName)
                            }

                        }
                    } //end
                    //if Available link is greater than 1000
                    else {
                        duration = i * GM_getValue('speed')
                        if (DontOpen_LinkByName(open_link)) {
                            //console.log('Shortlink Among Dont Open')
                            limit++
                        } else {
                            clickOnEle(open_link)
                            //console.log('b', linkName)
                        }
                    } //end
                    clearInterval(interval); //clear
                } catch (err) {
                    null
                }
                clearInterval(interval); //clear
                //console.log(limit);//console.log('duration using is', (duration / 1000).toFixed(2))
                if (limit != 0) {
                    appear(); //re-run
                } else {
                    i = 0; //reset
                    //console.log('Done opening')
                    button.innerHTML = 'Done opening-Click to Run Again'
                    clearInterval(interval)
                    GM_setValue("use_static", false)
                    Re_run()
                    //window.close();//window.close()
                }
            }, duration);
        }

        ViewsOnPage()
        Sort_And_Remove_Duplicate()
        Ordered_LinkToView()
        SpeedCtr()
        DelayShort()
        //console.log(_ordered_LinkToVisitOnPage);console.log(_num_ofLink_toVisit);console.log(_sort_and_Re_Dup);console.log(_order_ByName)

        function main() {
            GM_setValue("_alreadyRun", true);
            appear();
        }
        body.appendChild(button);
        // Add event handler
        button.addEventListener("click", function () {
            checkButton()
        });
        //////////////////
        pageR()
        reloadP()
        if (!_alreadyRun) {
            button.innerHTML = "Script Run [" + _totalLink + "] Links will Open";
            localStorage.setItem("close", "true") //AutoFCB(Close) 'Allow tab to close if codes rerun without pressing - var(button)'
            main()
        }
    }
})();
