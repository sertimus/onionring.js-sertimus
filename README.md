# onionring.js-sertimus

onionring.js-sertimus is a fork of [onionring.js](https://garlic.garden/onionring/) with some modifications designed to work with the author's personal homepage ([sertimus.xyz](https://sertimus.xyz/)), which are as follows:

* Addition of protocol variants to a site.
* Object-encapsulated variables to avoid further collisions with other onionring.js widgets.
* Functions separated into their own `onionring-functions.js` file.
* Styles incorporated into `onionring-widget.js` source.
* Slightly modified navigation.
* Modified `onionring-index.js` to print out the site list in a different format.
* Inclusion of [Cleanslate](http://cleanslatecss.com/) to avoid external styles spilling into the widget as much as possible.

## How to use??

### Hosting setup
1) Download the source, extract and place the files in your directory of choice on the web host. 
2) Edit the `sites` object in `onionring-variables.js` with the member sites in your webring, with protocol variants as appropriate (e.g. http, https, both).
    * The URLs in the `sites` list should only start with the domain part and end without a trailing slash, followed by an array of protocols without the colon. e.g. `'thisis.anexampleurl.com': ['http','https']`
    * More than one site is required for the random site link to work, otherwise it will work weirdly and go to `www.undefined.com`. I'll fix this later. 
    * `ringName` is the name of your webring.
    * `ringID` is the unique identifier for your webring widget designed to avoid conflict with other onionring.js widgets.
3) Edit the embedded CSS in `onionring-widget.js` to your liking, in addition to editing all instances of the `#chao-ring` identifier with the `ringID` set in the `onionring-variables.js` file; make sure it starts with the `#` character. Make sure each CSS property has the `!important` directive at the end of the value.
4) Edit both the 'warning' and the main widget code to your liking, near the bottom of the `onionring-widget.js` file.
5) Replace all instances of `chaoring` and `chaoring_f` variables with your own.
6) Open `sample.html` and see the results!

### Embedding the widget on a web page

1) For the main navigation widget to be fully usable (unless you would like to test the 'warning' message), make sure the widget has your site included in the `onionring-variables.js` file.
2) For the main navigation widget, paste the following code. Make sure to replace the `example-ring` string with the `ringID` you set in `onionring-variables.js`. Also, make sure you replace the `https://example.com/onionring/` portion of the URL with the location of your source code.

```html
<div id="example-ring">
    <script type="text/javascript" src="https://example.com/onionring/onionring-functions.js"></script>
    <script type="text/javascript" src="https://example.com/onionring/onionring-variables.js"></script>
    <script type="text/javascript" src="https://example.com/onionring/onionring-widget.js"></script>
</div>
```
3) Likewise with the 'index' widget as laid out in `onionring-index.js`:

```html
<div id="example-ring-index">
    <script type="text/javascript" src="https://example.com/onionring/onionring-functions.js"></script>
    <script type="text/javascript" src="https://example.com/onionring/onionring-variables.js"></script>
    <script type="text/javascript" src="https://example.com/onionring/onionring-index.js"></script>
</div>
```

4) Have a look at your webpage and see the results!

## License

onionring.js-sertimus and its parent codebase, [onionring.js](https://garlic.garden/onionring/), are licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html).

This codebase may include other projects which may use a different license. [Cleanslate](http://cleanslatecss.com/) uses The MIT License (MIT) (https://opensource.org/licenses/mit-license.php).