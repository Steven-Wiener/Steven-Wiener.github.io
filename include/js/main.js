/**
 * Author:   https://github.com/Steven-Wiener
 * Main URL: https://steven-wiener.github.io
 */
const hitHost = 'Steven-Wiener-analyst';
const pagesThatMatter = ['total-visits', 'linkedin', 'github', 'epic', 'capitalbrewery', 'mfteam', 'visualstudio', 'printmanagement', 'suzanne', 'snake', 'udp', 'java']; // TODO: Make this dynamic, scrub 'a' elements with onclick=hit
let favoriteTrails = ['https://www.alltrails.com/widget/trail/us/new-hampshire/tuckerman-ravine-trail-to-mount-washington', // TODO: Make this dynamic, source https://www.alltrails.com/members/bob-marley-108/favorites
                      'https://www.alltrails.com/widget/trail/us/utah/green-river-canyon-rim-trail',
                      'https://www.alltrails.com/widget/trail/us/south-dakota/little-devils-tower-spur-trail',
                      'https://www.alltrails.com/widget/trail/us/maine/cadillac-mountain-north-ridge-trail-gorge-path',
                      'https://www.alltrails.com/widget/trail/us/wyoming/popo-agie-falls-trail--3',
                      'https://www.alltrails.com/widget/trail/us/new-york/letchworth-state-park-gorge-trail',
                      'https://www.alltrails.com/widget/trail/us/wyoming/tongue-river-canyon',
                      'https://www.alltrails.com/widget/trail/us/wisconsin/howard-temin-lakeshore-path',
                      'https://www.alltrails.com/widget/trail/us/wisconsin/lake-monona-bike-loop'];

if (/.*\/index\.html/.test(window.location.pathname)) { // index.html
  (function() {
    'use strict';

    /**
     * Set src of element with id as input - used for AllTrails iframe loop
     */
    const setSrc = (id, src) => {
      const el = document.getElementById(id);
      el.setAttribute('src', src);
    }

    /**
     * AllTrails iframe loop - shift from the front, then push it back to the end
     */
    setInterval(() => {
      let trail = favoriteTrails.shift();
      setSrc('favoriteTrails', trail);
      favoriteTrails.push(trail);
    }, 7000);

    /**
     * Hit Counter: Increment specific page on anchor/link click
     */
    const hit = (page) => {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.countapi.xyz/hit/${hitHost}/${page}`);
      xhr.responseType = 'json';
      xhr.onload = function() {
        console.log(`${page} has been hit ${this.response.value} times!`);
      }
      xhr.send();
    }

    window.addEventListener('load', () => {
      /**
       * Hit Counter: Increment total-visits
       * API Info:    https://countapi.xyz/
       */
      const hitCounter = document.getElementById('hit-counter');
      hitCounter.style.display = 'none';

      var xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.countapi.xyz/hit/${hitHost}/total-visits`);
      xhr.responseType = 'json';
      xhr.onload = function() {
        hitCounter.textContent = this.response.value;
        hitCounter.style.display = 'inline-block';
      }
      xhr.send();
    });
  })()
} else if (/.*\/hits\.html/.test(window.location.pathname)) { // hits.html
  (function() {
    'use strict';
    /**
     * Hit Counter: Build table
     */
    window.addEventListener('load', () => {
    let hitsInner = '';
    for (const page of pagesThatMatter) {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.countapi.xyz/get/${hitHost}/${page}`);
      xhr.responseType = 'json';
      xhr.onload = function() {
        hitsInner += `<tr><td>${page}</td><td>${this.response.value}</td></tr>`;
        document.getElementById('hits-table').innerHTML = `<table border="1" cellspacing="1" cellpadding="1"><tbody><tr><th>Page</th><th>Hits</th></tr>${hitsInner}</tbody></table>`;
      }
      xhr.send();
    }
    // TODO: after last run, sort resulting table by # of hits? might need to make hitsInner an array
  });
})()
}