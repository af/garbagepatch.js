(function() {
    "use strict";
    // Common library names. If we see these names on the page, we *guess* that
    // the variable is pointing to a library:
    var LIB_NAMES = [
        'jQuery', '$', '$$', 'YUI',                     // DOM libs
        'FB', 'twttr', 'goog',                          // Social services
        'Modernizr', 'Cufon', 'Raphael',
        'Backbone', '_', 'Ember', 'io',
        'Handlebars', 'Mustache',
        'swfobject', '_V_', 'VideoJS',
        'StyleFix', 'PrefixFree',                       // PrefixFree
        '_gaq', '_gat', 'gaGlobal', 'ga', 'gaGlobal',   // GA
        'mixpanel', 'segment'                           // Misc analytics
    ];
    var globals = { browser: [],
                    libs: [],
                    app: [] };

    // Get the list of global variables created by the browser by checking
    // which globals are available in a fresh <iframe>
    function getBrowserGlobals() {
        var i = document.createElement('iframe');
        i.style.display = 'none';
        document.body.appendChild(i);
        var builtins = Object.keys(i.contentWindow);
        document.body.removeChild(i);
        return builtins;
    }

    function _contains(list, item) {
        return (list.indexOf(item) !== -1);
    }

    // Very basic template system
    // Adapted from http://mir.aculo.us/2011/03/09/little-helpers-a-tweet-sized-javascript-templating-engine/
    function _template(str, d){
        for(var p in d) {
            // Small addition to make '{foo.length}' work in templates:
            if (p.length) str = str.replace(new RegExp('{'+p+'.length}', 'g'), d[p].length);
            str = str.replace(new RegExp('{'+p+'}','g'), d[p]);
        }
        return str;
    }

    function testOutput() {
        var allGlobals = Object.keys(window);
        var browserGlobals = getBrowserGlobals();

        // Sort the globals based on their (inferred) origin:
        allGlobals.forEach(function(name) {
            if (_contains(browserGlobals, name)) globals.browser.push(name);
            else if (_contains(LIB_NAMES, name)) globals.libs.push(name);
            else globals.app.push(name);
        });

        var template = '<b>Global variables on this page:</b><br />' +
                       'browser ({browser.length}): {browser}<br />' +
                       'libvars ({libs.length}): {libs}<br />' +
                       'appvars ({app.length}): {app}';

        // Display the results in a div at the top of the page:
        var myDiv = document.createElement('div');
        myDiv.innerHTML = _template(template, globals);
        myDiv.style.cssText = 'position:fixed; top:10px; right:10px; opacity:0.9; z-index:1500; max-width:90%; padding:10px;' +
                              'background:#eee; cursor:pointer; font:14px monospace; color:#333; text-align:left; word-wrap:break-word';
        document.body.appendChild(myDiv);
        myDiv.addEventListener('click', function() { myDiv.parentNode.removeChild(myDiv); });
    }

    testOutput();
}());

