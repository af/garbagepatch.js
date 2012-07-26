# garbagepatch.js

This is a simple little bookmarklet that checks the global variables in use on
a page and attempts to classify them. It's currently very bare-bones, but it's
already pretty interesting to check your sites' impact on the global environment,
and for deducing what libraries other sites are using.


## Using it

#. Copy the contents of `bookmarklet.js` into the URL field of a new browser bookmark.
#. Click on the bookmark when you're on a page you want to inspect.

## Building it

You'll need node.js and uglify-js to run the build script:

    # With node.js installed:
    npm install -g uglify-js
    ./build.js       # This will save the new build as bookmarklet.js


## TODO

* Detect more popular libraries
* Better output styling
* Add a way to interact with the detected global variables
