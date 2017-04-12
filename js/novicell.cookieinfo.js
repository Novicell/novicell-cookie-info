'use strict';
/**
* @desc Cookie info dialog plugin
* @author Danni Larsen - DLA & Michael Sølvsteen - MSL
* @example novicell.cookieInfo.init();
* @requires none
*/

var novicell = novicell || {};
novicell.cookieInfo = novicell.cookieInfo || new function () {

    this.init = function() {
        var body = document.querySelector("body");    
        var cookieInfo = document.querySelector('#js-cookie-info');
        var cookieClose = document.querySelector('#js-cookie-info-close');
        var cookieOpen = document.querySelector('#js-cookie-info-open');

        if (cookieInfo) {
            // If we have displayed it once, set cookie for one year
            if (getCookie("cookieAccept") === "displayed") {
                setCookie("cookieAccept", "accepted", 365);
            }

            // Check if the cookie info has been displayed, if not set session cookie
            if (getCookie("cookieAccept") === "") {
                setCookie("cookieAccept", "displayed");

                setTimeout(function() {
                    body.classList.add('cookie-info-show');
                }, 1000);
            }

            // Button eventlisteners
            if(cookieOpen) {
                cookieOpen.addEventListener('click', function(e) {
                    showInfo();
                });
            }

            if(cookieClose) {
                cookieClose.addEventListener('click', function(e) {
                    hideInfo();
                    setCookie("cookieAccept", "accepted", 365);
                });
            }
        }
    };
}();

// Functions for opening an closing the cookie-info
function showInfo(){
    var body = document.querySelector("body");    
    body.classList.add('cookie-info-show');
}

function hideInfo(){
    var body = document.querySelector("body");    
    body.classList.remove('cookie-info-show');
}

/* Cookie helper functions
*******************************/

// Get cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' '){ c = c.substring(1); }
        if (c.indexOf(name) === 0){ return c.substring(name.length,c.length); }
    }
    return "";
}

// Set cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 60 * 1000 * 24));
    var expires = "expires=" + d.toUTCString() + ";";
    var path = "path=/";
    document.cookie = cname + "=" + cvalue + "; " + expires + path;
}