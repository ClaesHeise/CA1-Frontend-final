// import { SERVER_URL } from "./constants";
const SERVER_URL = "http://onebrightcreation.com:8081/CA-1/api/person";
// const SERVER_URL = "http://localhost:8080/devops_starter_war_exploded/";
// const SERVER_URL = "http://onebrightcreation.com:8081/CA-1/";

const formButton = document.getElementById("form");

function getPersons() {
    return fetch(SERVER_URL, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Acces-Contol-Allow-Origin": "*"
        }
    })
    .then(res => handleHttpErrors(res))
    // .then((res) => handleHttpErrors(res));
    .then((data) => console.log(data))
    .catch(err => {console.log(err);});
}

// function getPersons() {
//     return fetch(SERVER_URL)
//     .then((res) => handleHttpErrors(res))
//     .then((data) => console.log(data))
//     .catch(err => {console.log(err);});
// }

// function getPersons() {
//     return fetch(SERVER_URL)
//     .then(handleHttpErrors);
// }

function makeOptions(method, body) {
    const opts = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }
    if (body) {
        opts.body = JSON.stringify(body)
    }
    return opts
}

function handleHttpErrors(res) {
    if(!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json()
}

const personFacade = {
    getPersons
}

// formButton.addEventListener("search", async () => {
//     console.log("Hello");
//     await getPersons();
// });

export default personFacade
