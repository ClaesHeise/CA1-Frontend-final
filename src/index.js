import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import 'regenerator-runtime/runtime'
//import "babel-polyfill"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */
function makeListItem() {
  const jokes = jokeFacade.getJokes();
  let jokeLis = jokes.map(joke => `<li> ${joke} </li>`);
  const listItemAsString = jokeLis.join('');
  document.querySelector("#jokes").innerHTML = listItemAsString;
}
makeListItem();
const jokeButton = document.getElementById("jokeButton");

jokeButton.addEventListener("click", () => {
  console.log("Hello");
  let userInput = document.getElementById("jokeInput").value;
  const joke = jokeFacade.getJokeById(userInput);
  document.getElementById("myTag").innerHTML = joke;
});

const addJokeBtn = document.getElementById("addJokeBtn");

addJokeBtn.addEventListener("click", () => {
  let userInput = document.getElementById("jokesInput").value;
  jokeFacade.addJoke(userInput);
  makeListItem();
});

/* JS For Exercise-2 below */
const chuckBtn = document.getElementById("ex2btn");
const chuckURL = 'https://api.chucknorris.io/jokes/random';
const nrURL = 'https://api.dataforsyningen.dk/postnumre';
const personURL = 'http://onebrightcreation.com:8081/CA-1/api/person/';

async function getPerson() {
  fetch(personURL)
        .then((response) => fetchErrors(response))
        .then((data) => console.log(data))
        .catch(err => {console.log(err);});
}

async function getZip(url) {
  fetch(url)
        .then((response) => fetchErrors(response))
        .then((data) => getZipValues(data))
        .catch(err => {console.log(err);});
}

const getZipValues = function (request) {
  let zip = request;
  // zip.array.forEach(element => {
  //   console.log(element.nr + element.navn);
  // });
  zip.forEach(el => {
    console.log(el.navn + " : " + el.nr)
  });
  console.log(zip[0].navn + zip[0].nr);
  //console.log(chuckQuote[0].name);
  //document.getElementById("ex2output").innerHTML = chuckQuote.value;
}

getZip(nrURL);
//const chuckURL = 'https://jsonplaceholder.typicode.com/users/';


// const getChuck = async (url) => {
//   try {
//     const res = await fetch(
//       url
//     );
//     if (!res.ok) {
//       console.log("status: ", res.status);
//       // carful you don't get an infinite loop
//       await getChuck();
//     }
//     const json = await res.json();
//     getChuckQuote(json);
//     console.log(json);
//   } catch (error) {
//     console.log("catch error", error);
//     // carful you don't get an infinite loop
//     await getChuck();
//   }
// };

const fetchErrors = function(response) {
  if(!response.ok){
    throw (response.status + ': ' + response.statusText);
  }
  return response.json();
}

async function getChuck(url) {
  fetch(chuckURL)
        .then((response) => fetchErrors(response))
        .then((data) => getChuckQuote(data))
        .catch(err => {console.log(err);});
}

chuckBtn.addEventListener("click", async () => {
  // await getChuck(chuckURL);
  await getPerson();

});

const getChuckQuote = function (request) {
  let chuckQuote = request;
  //console.log(chuckQuote[0].name);
  document.getElementById("ex2output").innerHTML = chuckQuote.value;
}

/* JS For Exercise-3 below */


/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow)
{
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("about_html");



