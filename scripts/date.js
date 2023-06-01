//copyright with date
const date = new Date();
// current year
const year = date.getFullYear();
document.querySelector("#year").innerHTML = year;

let dateModified = ('Last updated: ' + document.lastModified);
document.getElementById("date").innerHTML = dateModified;


//Source: https://www.freecodecamp.org/news/javascript-get-current-date-todays-date-in-js/