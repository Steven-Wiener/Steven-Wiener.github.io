/**
 * Author:   https://github.com/Steven-Wiener
 * Main URL: https://steven-wiener.github.io
 */
const hitHost = 'test';
const pagesThatMatter = ['total-visits', 'linkedin', 'github', 'epic', 'capitalbrewery', 'mfteam', 'visualstudio', 'printmanagement', 'suzanne', 'snake', 'udp', 'java'];

if (/.*\/index\.html/.test(window.location.pathname)) { // index.html
  (function() {
    'use strict';
    /**
     * Hit Counter: Increment total-visits on window load
     * API Info:    https://countapi.xyz/
     * Destination: https://steven-wiener.github.io/hits.html
     */
    window.addEventListener('load', () => {
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
  })()
} else if (/.*\/hits\.html/.test(window.location.pathname)) { // hits.html
  (function() {
    'use strict';
    /**
     * Hit Counter: Build table
     * Destination: https://steven-wiener.github.io/hits.html
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