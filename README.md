# Novicell Cookie Info
**Cookie information dialog used to show a short text about, the use of cookies for the website, due to european laws.**

## Usage

Written in pure Vanilla JS, it has *no dependencies*. It ships with a sample LESS file, for easy implementation with the [novicell-frontend setup](https://github.com/Novicell/novicell-frontend). Use the styles for inspiration and then make your own styles.

### Install with npm

```bash
npm install novicell-cookie-info --save
```

## Setup

First include the js file in your js bundle or in your HTML like this:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-cookie-info/js/novicell.cookieinfo.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-cookie-info/js/novicell.cookieinfo.js"></script>
```

Then call the `init`-method from your `master.js`:
```javascript

document.addEventListener("DOMContentLoaded", function() {
    novicell.cookieInfo.init();
    ...
});
```

## Extension

When extending the script, make sure to make a singleton for the `novicell` and the `novicell.cookieInfo` objects before adding your own methods.

```javascript
'use strict';

var novicell = novicell || {};
novicell.cookieInfo = novicell.cookieInfo || {};
novicell.cookieInfo.extentions = novicell.cookieInfo.extentions || new function () {
    this.test = function() {
        console.log('test');
    };
}();
```
Next you need to include your js-files in your js bundle or in your HTML, and then call the `init`-method from your `master.js`.
Make sure to load you:

**JS bundle**
```javascript
scripts: [
    vendorPath + "novicell-cookie-info/js/novicell.cookieinfo.js"
    projectPath + "/components/novicell.cookieinfo.extentions.js"
    ...
]
```

**HTML**
```html
    <script src="/node_modules/novicell-cookie-info/js/novicell.cookieinfo.js"></script>
    <script src="/js/components/novicell.cookieinfo.extentions.js"></script>
```

Then call the `init`-method from your `master.js`:
```javascript

document.addEventListener("DOMContentLoaded", function() {
    novicell.cookieInfo.init();
    novicell.cookieInfo.extentions.test();
    ...
});
```