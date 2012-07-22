(function() {
    "use strict";
    var LIB_NAMES = ['jQuery', '$', 'Backbone', '_', 'YUI', 'FB', 'twttr'];
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

    function testOutput() {
        var allGlobals = Object.keys(window);
        var browserGlobals = getBrowserGlobals();

        // Sort the globals based on their (inferred) origin:
        allGlobals.forEach(function(name) {
            if (_contains(browserGlobals, name)) globals.browser.push(name);
            else if (_contains(LIB_NAMES, name)) globals.libs.push(name);
            else globals.app.push(name);
        });

        document.write('browser: ', globals.browser);
        document.write('<br />libvars: ', globals.libs);
        document.write('<br />appvars: ', globals.app);
    }

    testOutput();
}());

