'use strict';
/**
* @name Novicell Cookie info
* @desc Cookie information dialog used to show a short text about, the use of cookies for the website, due to european laws.
* @author Danni Larsen - DLA & Michael Sølvsteen - MSL
* @example novicell.cookieInfo.init();
* @requires none
*/

var novicell = novicell || {};
novicell.cookieInfo = novicell.cookieInfo || new function () {
    var self = this;

    this.init = function() {
        var body = document.querySelector('body');    
        var cookieInfo = document.querySelector('#js-cookie-info');
        var cookieClose = document.querySelector('#js-cookie-info-close');
        var cookieOpen = document.querySelector('#js-cookie-info-open');
        var cookieAccept = document.querySelector('#js-cookie-info-accept');
        var cookieDecline = document.querySelector('#js-cookie-info-decline');

        if (cookieInfo) {
            // Check if the cookie info has been displayed, if not -> show popup
            if (getCookie('cookieAccept') !== 'accepted') {
                setTimeout(function() {
                    body.classList.add('cookie-info-show');
                }, 1000);
            }
            else {
                cookieInfo.classList.add('cookie-info-accepted');
            }

            // Button eventlisteners
            if(cookieOpen) {
                cookieOpen.addEventListener('click', function(e) {
                    self.showInfo();
                });
            }

            if(cookieClose) {
                cookieClose.addEventListener('click', function(e) {
                    self.hideInfo();
                });
            }

            if(cookieAccept) {
                cookieAccept.addEventListener('click', function(e) {
                    self.hideInfo();
                    setCookie('cookieAccept', 'accepted', 365);
                    cookieInfo.classList.add('cookie-info-accepted');
                });
            }

            if(cookieDecline) {
                cookieDecline.addEventListener('click', function(e) {
                    self.hideInfo();
                    self.declineCookieInfo();
                    cookieInfo.classList.remove('cookie-info-accepted');
                });
            }
        }
    };

    this.showInfo = function(){
        var body = document.querySelector('body');    
        body.classList.add('cookie-info-show');
    }
    
    this.hideInfo = function(){
        var body = document.querySelector('body');    
        body.classList.remove('cookie-info-show');
    }

    this.declineCookieInfo = function() {
        deleteCookie('cookieAccept');
    }
    
    /* Private helper functions
    *******************************/

    /**
    * Get a cookie
    * @param {String} cname, cookie name
    * @return {String} String, cookie value 
    */
    function getCookie(cname) {
        var name = cname + '=';
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' '){ c = c.substring(1); }
            if (c.indexOf(name) === 0){ return c.substring(name.length,c.length); }
        }
        return '';
    }
    
    /**
    * Set a cookie
    * @param {String} cname, cookie name
    * @param {String} cvalue, cookie value
    * @param {Int} exdays, number of days before the cookie expires 
    */
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 60 * 60 * 1000 * 24));
        var expires = 'expires=' + d.toUTCString() + ';';
        var path = 'path=/';
        document.cookie = cname + '=' + cvalue + '; ' + expires + path;
    }

    /**
    * Delete a cookie
    * @param {String} cname, cookie name
    */
    function deleteCookie(cname) {
        var d = new Date(); //Create an date object
        d.setTime(d.getTime() - (1000*60*60*24)); //Set the time to the past. 1000 milliseonds = 1 second
        var expires = 'expires=' + d.toGMTString(); //Compose the expirartion date
        window.document.cookie = cname+'='+'; '+expires;//Set the cookie with name and the expiration date
    }
}();
