// onionring.js is made up of four files - onionring-widget.js, onionring-index.js, onionring-variables.js (this one!), and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// Modifications by Sertimus (https://sertimus.xyz/), including the addition of onionring-functions.js

/*  One extra thing to note is that the order in which you load the scripts are very important. It should be as follows:
    1) onionring-functions    
    2) onionring-variables
    3) onionring-widget, onionring-index 
    
    Failure to follow this script order may result in weird errors. */

// === ONIONRING-VARIABLES ===
//this file contains the stuff you edit to set up your specific webring

let chaoring = {
    sites: {
        'sertimus.xyz': ['http', 'https'],
        'rachychel.neocities.org': ['https'],
	    'mysticwish.monster': ['http'],
	    'obspogon.neocities.org': ['https']
    },
    ringName: 'Chao Ring',
    ringID: 'chao-ring',
    useIndex: false,
    indexPage: 'https://example.com/index.html',
    useRandom: true,
    // Runtime variables, don't touch!
    thisSite: window.location.href,
    thisProtocol: window.location.protocol.replace(':',''),
    thisIndex: null,
    sitesArray: null
}

chaoring.sitesArray = chaoring_f.getSites(chaoring.thisProtocol);