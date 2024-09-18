// onionring.js is made up of four files - onionring-widget.js (this one!), onionring-index.js, onionring-variables.js and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// Modifications by Sertimus (https://sertimus.xyz/), including the addition of onionring-functions.js

/*  One extra thing to note is that the order in which you load the scripts are very important. It should be as follows:
    1) onionring-functions    
    2) onionring-variables
    3) onionring-widget, onionring-index 
    
    Failure to follow this script order may result in weird errors. */

var tag = document.getElementById(chaoring.ringID); //find the widget on the page

var cleanSlate = document.getElementsByTagName('head')[0].appendChild(document.createElement('link'));
cleanSlate.setAttribute('rel', 'stylesheet');

// Loading Cleanslate from same directory this script is being loaded from!
var thisScriptURL = new URL(document.currentScript.src);
thisScriptURL = thisScriptURL.host + thisScriptURL.pathname;
thisScriptURL = thisScriptURL.split("/");
thisScriptURL.pop();
thisScriptURL = thisScriptURL.toString().replaceAll(',', '/');

cleanSlate.setAttribute('href', chaoring.thisProtocol + "://" + thisScriptURL + '/cleanslate.css');

tag.classList.add("cleanslate");

tag.insertAdjacentHTML('afterbegin', `<style type="text/css">
  /* onionring.js is made up of four files - onionring-widget.js, onionring-index.js, onionring-variables.js and onionring.css (this one!)
  // it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
  // it was originally made by joey + mord of allium (蒜) house, last updated 2020-10-24 */
  
  /* Modifications by Sertimus (https://sertimus.xyz/), including the addition of onionring-functions.js */
  
  /* === ONIONRING.CSS === */
  /* this file affects the style of the widget. remember to replace all instances of #webringid with whatever value you have for ringID in the onionring-widget.js file. make sure it still has the # at the front, though! probably easiest to use find+replace to do it */
  
  #chao-ring {
    font-family: 'Open Sans', sans-serif !important;
    font-size: 12pt !important;
    color: #000 !important;
    background-color: #79bef2 !important;
    margin: 0 auto !important;
    width: 250px !important;
  }

  #chao-ring .widget {
    display: grid !important;
    grid-template-columns: 33% 33% 33% !important;
    align-items: center !important;
  }
  
  #chao-ring .widget .item a {
    color: #000 !important;
  }
  
  #chao-ring .widget .item a:hover {
    color: #c1e299 !important;
  }
  
  #chao-ring .widget .item a:active {
    color: #fff !important;
  }
  
  #chao-ring .widget .item {
    padding: 5px !important;
  }
  
  #chao-ring .widget .item.next a, #chao-ring .widget .item.prev a {
    text-decoration: solid !important;
  }
  
  #chao-ring .widget .item p {
    margin-top: 0 !important;
    margin-bottom: 0.25em !important;
    line-height: 1.25em !important;
  }
  
  #chao-ring .widget .item img {
    width: 100% !important;
    height: auto !important;
    image-rendering: auto !important;
  }
  
  #chao-ring .widget .item.prev, #chao-ring .widget .item.next {
    font-size: 2em !important;
  }
  
  #chao-ring .widget .item.header {
    text-align: center !important;
    grid-column: 1 / 4 !important;
  }
  
  #chao-ring .widget .item.prev {
    text-align: right !important;
  }
  
  #chao-ring .widget .item.info {
    font-size: 0.75em !important;
    padding: 5px !important;
    text-align:center !important;
  }
  
  #chao-ring .widget .item.next {
    text-align: left !important;
  }
  
  #chao-ring .widget .item .links {
    font-size: 0.75em !important;
  }
  
  #chao-ring .widget .item.disclaimer {
    grid-column: 1 / 4 !important;
    font-size: 0.75em !important;
    text-align: center !important;
  }
  
  #chao-ring .widget .item.warning {
    text-align: center !important;
    grid-column: 1 / 4 !important;
  }
  </style>`);

// go through the site list to see if this site is on it and find its position

for (let i = 0; i < chaoring.sitesArray.length; i++) {
  for (const protocol of chaoring_f.getSiteProtocols(chaoring.sitesArray[i])) {
    if (chaoring.thisSite.startsWith(protocol + "://" + chaoring.sitesArray[i])) { //we use startswith so this will match any subdirectory, users can put the widget on multiple pages
      chaoring.thisIndex = i;
      break; //when we've found the site, we don't need to search any more, so stop the loop
    }
  }
}

//if we didn't find the site in the list, the widget displays a warning instead
if (chaoring.thisIndex == null) {
  tag.insertAdjacentHTML('beforeend', `
  <div class="widget">
    <div class="item warning">
      <img src="//sertimus.xyz/chaoring/img/chao%20ring.png" alt="Chao Ring logo">
      <p>It appears that this web site is not in the webring yet. Please contact the
      <a href="//sertimus.xyz/contact.html" target="_top">webmaster</a> if you have any further questions.</p>
    </div>
  </div>
  `);
}
else {
  //find the 'next' and 'previous' sites in the ring. this code looks complex
  //because it's using a shorthand version of an if-else statement to make sure
  //the first and last sites in the ring join together correctly
  
  previousIndex = (chaoring.thisIndex-1 < 0) ? chaoring.sitesArray.length-1 : chaoring.thisIndex-1;
  nextIndex = (chaoring.thisIndex+1 >= chaoring.sitesArray.length) ? 0 : chaoring.thisIndex+1;

  indexText = ""
  //if you've chosen to include an index, this builds the link to that
  if (chaoring.useIndex) {
    indexText = `<a href='${chaoring.indexPage}' target='_blank'>index</a> | `;
  }

  randomText = ""
  //if you've chosen to include a random button, this builds the link that does that
  if (chaoring.useRandom) {
    randomText = `<a href='javascript:void(0)' onclick='chaoring_f.randomSite()'>random</a>`;
  }

  //this is the code that displays the widget - EDIT THIS if you want to change the structure
  tag.insertAdjacentHTML('beforeend', `
  <div class="widget">
    <div class="item header">
      <p>This site is part of</p>
    </div>
    <div class="item prev">
      <a href='${chaoring.thisProtocol}://${chaoring.sitesArray[previousIndex]}' target='_top'>&#x25c4;&#x2022;&#x2022;&#x2022;</a>
    </div>
    <div class="item info">
      <img src="//sertimus.xyz/chaoring/img/chao%20ring%20full.png" alt="Chao Ring logo">
      <span class="links">
        ${randomText}
        ${indexText}
      </span>
    </div>
    <div class="item next">
      <a href='${chaoring.thisProtocol}://${chaoring.sitesArray[nextIndex]}' target='_top'>&#x2022;&#x2022;&#x2022;&#x25ba;</a>
    </div>
    <div class="item disclaimer">
      <a href='https://garlic.garden/onionring/' target='_blank'>what is this?</a> |
      <a href='//sertimus.xyz/chaoring.html' target='_blank'>info/apply</a>
    </div>
  </div>
  `);
}
