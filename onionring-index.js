// onionring.js is made up of four files - onionring-widget.js, onionring-index.js (this one!), onionring-variables.js, and onionring.css
// it's licensed under the cooperative non-violent license (CNPL) v4+ (https://thufie.lain.haus/NPL.html)
// it was originally made by joey + mord of allium (蒜) house, last updated 2020-11-24

// Modifications by Sertimus (https://sertimus.xyz/), including the addition of onionring-functions.js

/*  One extra thing to note is that the order in which you load the scripts are very important. It should be as follows:
    1) onionring-functions    
    2) onionring-variables
    3) onionring-widget, onionring-index 
    
    Failure to follow this script order may result in weird errors. */

// === ONIONRING-INDEX ===
//this file builds the list of sites in the ring for displaying on your index page

var tag = document.getElementById('chaoring-index');
let sitesArrayIndex = chaoring_f.getSitesProtocolAgnostic();

list = "";
for (i = 0; i < sitesArrayIndex.length; i++) {
  // list += `<li><a href='${sitesArray[i]}' target='_blank'>${sitesArray[i].replace(regex, "")}</a></li>`;
  list += `<li>${sitesArrayIndex[i]}`;

  for (const protocol of chaoring_f.getSiteProtocols(sitesArrayIndex[i])) {
    list += ` (<a href='${protocol}://${sitesArrayIndex[i]}' target='_blank'>${protocol}</a>)`;
  }

  list += "</li>";
}

tag.insertAdjacentHTML('afterbegin', `
<ul>
${list}
</ul>
`);
