// onionring.js is made up of four files - onionring-widget.js, onionring-index.js, onionring-variables.js, and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// Modifications by Sertimus (https://sertimus.xyz/), including the addition of onionring-functions.js (this file)

/*  One extra thing to note is that the order in which you load the scripts are very important. It should be as follows:
    1) onionring-functions    
    2) onionring-variables
    3) onionring-widget, onionring-index 
    
    Failure to follow this script order may result in weird errors. */

// === ONIONRING-FUNCTIONS ===
//this file contains the code which defines the functions which may aid in the creation of the widget or building the webring list.

let chaoring_f = {
  objToKeyArray: function(obj) {
    return Object.keys(obj);
  },
  getValueAtNumIndex: function(obj, i) {
    myArray = objToKeyArray(obj);
    myKey = myArray[i];
    return obj[myKey];
  },
  siteExists: function(siteName) {
    return siteName in chaoring.sites;
  },
  getSiteProtocols: function(siteName) {
    return chaoring.sites[siteName];
  },
  getSites: function(protocol) {
    sitesArray = []
    sitesObjArray = this.objToKeyArray(chaoring.sites);
  
    for (let i=0 ; i < sitesObjArray.length ; i++) {
      if (this.siteHasProtocol(sitesObjArray[i], protocol)) {
        sitesArray.push(sitesObjArray[i]);
      }
    }
  
    return sitesArray;
  },
  getSitesProtocolAgnostic: function() {
    return this.objToKeyArray(chaoring.sites);
  },
  siteHasProtocol: function(siteName, protocolName) {
    if (this.siteExists(siteName)) {
      for (let i=0; i < this.getSiteProtocols(siteName).length; i++) {
        if (protocolName === this.getSiteProtocols(siteName)[i]) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  },
  randomSite: function() {
    otherSites = chaoring.sitesArray.slice(); //create a copy of the sites list
    otherSites.splice(chaoring.thisIndex, 1); //remove the current site so we don't just land on it again
    randomIndex = Math.floor(Math.random() * otherSites.length);
    window.top.location.href = chaoring.thisProtocol + "://" + otherSites[randomIndex]; // Open site in same window/tab, while accounting for iframes
  }
}