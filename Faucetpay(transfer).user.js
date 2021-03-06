// ==UserScript==
// @name         Faucetpay(transfer)
// @description  Make Transfer easy by filling the required forms automatically
// @author       Acotec
// @include      *faucetpay.io/page/user-admin*
// @include      *faucetpay.io/transfer*
// @updateURL    https://github.com/Acotec/autofcb/raw/master/Faucetpay(transfer).user.js
// @downloadURL  https://github.com/Acotec/autofcb/raw/master/Faucetpay(transfer).user.js
// @require      https://github.com/Acotec/require/raw/master/waitForKeyElements.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==


(function() {

    function getAmount(){
        let getindex = Cryptocurrency[0].selectedIndex
        let getvalue = Cryptocurrency[0].options[getindex].innerText.toLowerCase()

        Cryptocurrency[1].value = GM_getValue(getvalue)
        Cryptocurrency[1].dispatchEvent(new Event('change'));
        GM_setValue('defaultCrypto',getvalue)
    }

    if(/transfer/gi.test(window.location.href)){
        var Cryptocurrency = document.querySelectorAll('.form-control');
        Cryptocurrency[0].addEventListener('change',getAmount);
        var defaultCrypto = GM_getValue('defaultCrypto',null);
        if(defaultCrypto){
            for (let i = 0; i <= Cryptocurrency[0].length-1; i++){
                if (Cryptocurrency[0][i].innerText.toLowerCase().includes(defaultCrypto)){
                    Cryptocurrency[0][i].selected = true
                    Cryptocurrency[0].dispatchEvent(new Event('change'));
                };
            };
            Cryptocurrency[1].value = GM_getValue(defaultCrypto)
            Cryptocurrency[1].dispatchEvent(new Event('change'));
        }
        Cryptocurrency[2].value = 'harfho77@gmail.com'
        Cryptocurrency[2].dispatchEvent(new Event('change'));
    };
    if(/user-admin/gi.test(window.location.href)){
        var payouttoday = parseInt(document.querySelector(".media.mg-t-20.mg-sm-t-0.mg-sm-l-15.mg-md-l-40 > div.media-body").innerText.replace(/[^\d].*\n/,''))
        if(payouttoday>=3){
            waitForKeyElements(".crypto", (element) => {
                if(element){
                    GM_setValue(element.innerText.match(/.*\n/gi)[0].replace(/\n/,'').toLowerCase(),element.innerText.replace(/^.*\n/gi,''))
                }
            },false,100,1);

            location = 'https://faucetpay.io/transfer'
        }else{
            alert('You have not withdraw from all the faucet sites')
        }
    }    
})();
