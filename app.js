// Plain ES5 for old TV browsers: var and function only.

// EDIT THIS LIST to change your tiles. Each tile opens a website.
var TILES = [
  { name: "YouTube", url: "https://www.youtube.com" },
  { name: "Prime Video", url: "https://www.primevideo.com" },
  { name: "Netflix", url: "https://www.netflix.com" },
  { name: "Google", url: "https://www.google.com" },
  { name: "News", url: "https://www.bbc.com/news" },
  { name: "Weather", url: "https://www.weather.com" }
];

var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var MONTHS = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

var focusIndex = 0;
var tileEls = [];

function pad(n) {
  return n < 10 ? "0" + n : "" + n;
}

function updateClock() {
  var d = new Date();
  var h = d.getHours();
  var ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) { h = 12; }
  document.getElementById("time").textContent = h + ":" + pad(d.getMinutes());
  document.getElementById("ampm").textContent = ampm;
  document.getElementById("date").textContent =
    DAYS[d.getDay()] + ", " + d.getDate() + " " + MONTHS[d.getMonth()];
}

function setFocus(i) {
  var j;
  for (j = 0; j < tileEls.length; j++) {
    tileEls[j].className = "tile";
  }
  focusIndex = i;
  tileEls[i].className = "tile focus";
}

function makeHoverHandler(i) {
  return function () { setFocus(i); };
}

function buildTiles() {
  var holder = document.getElementById("tiles");
  var i, a;
  for (i = 0; i < TILES.length; i++) {
    a = document.createElement("a");
    a.className = "tile";
    a.href = TILES[i].url;
    a.textContent = TILES[i].name;
    a.addEventListener("mouseover", makeHoverHandler(i));
    holder.appendChild(a);
    tileEls.push(a);
  }
  setFocus(0);
}

function move(step) {
  var next = focusIndex + step;
  if (next < 0) { next = 0; }
  if (next > tileEls.length - 1) { next = tileEls.length - 1; }
  setFocus(next);
}

document.addEventListener("keydown", function (e) {
  var k = e.keyCode;
  if (k === 37) {            // left
    move(-1);
    e.preventDefault();
  } else if (k === 39) {     // right
    move(1);
    e.preventDefault();
  } else if (k === 38 || k === 40) {  // up/down: keep the page from scrolling
    e.preventDefault();
  } else if (k === 13) {     // OK / Enter
    window.location.href = TILES[focusIndex].url;
    e.preventDefault();
  }
});

buildTiles();
updateClock();
setInterval(updateClock, 1000);