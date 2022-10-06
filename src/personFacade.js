// import { SERVER_URL } from "./constants";
const SERVER_URL = "http://onebrightcreation.com:8081/CA-1/api/";
// const SERVER_URL = "http://localhost:8080/devops_starter_war_exploded/";
// const SERVER_URL = "http://onebrightcreation.com:8081/CA-1/";

const formButton = document.getElementById("form");

// function getPersons(apiCall) {
//     return fetch(SERVER_URL+apiCall, {
//         method: "GET",
//         mode: "cors",
//         cache: "no-cache",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//             "Accept": "application/json",
//         }
//     })
//     .then(res => handleHttpErrors(res));
//     // .then((res) => handleHttpErrors(res));
//     // .then((data) => console.log(data))
//     // .catch(err => {console.log(err);});
// }

function getPersons(apiCall) {
    // let output;
    if (apiCall === undefined){
        apiCall = "person"
    }
    fetch(SERVER_URL+apiCall)
    .then((res) => handleHttpErrors(res))
    .then((data) => personToTable(data))
    // .then((data) => output = data)
    // .catch(err => {console.log(err);});
    // console.log("From get: "+output);
    
    // return output;
}

// function getPersons(apiCall) {
//     if (apiCall === undefined){
//         apiCall = "person"
//     }
//     return fetch(SERVER_URL+apiCall)
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

// function handleHttpErrors(res) {
//     if(!res.ok) {
//         console.log("Hello from error");
//         return Promise.reject({status: res.status, fullError: res.json()})
//     }
//     console.log(res.json());
//     return res.json()
// }

const handleHttpErrors = function(response) {
  if(!response.ok){
    throw (response.status + ': ' + response.statusText);
  }
//   console.log(response.json())
  return response.json();
}

// let personFacade = {
//     getPersons
// }

// formButton.addEventListener("search", async () => {
//     console.log("Hello");
//     await getPersons();
// });

// document.getElementById("form").addEventListener("submit", (event) => {
//     event.preventDefault();
//   });

document.getElementById("searchHobby").addEventListener("click", async () => {
    const input = document.getElementById("Input 1").value;
    personFacade = await getPersons("hobby/"+input);
});

document.getElementById("searchPhone").addEventListener("click", async () => {
    const input = document.getElementById("Input 1").value;
    getPersons("person/phone/"+input);
});

const personToTable = function (request) {
  let persons = request;
  console.log(persons[0].phone[0].number);
//   let personRows = "";
//   persons.array.forEach(person => {
//     personRows += 
//     `<tr>
//             <td scope="row">${person.email}</td>
//             <td>${person.firstName}</td>
//             <td>${person.lastName}</td>
//             <td>${person.phone.phoneNumber}</td>
//             <td>${person.hobby.name}</td>
//             <td>${person.address.street}</td>
//             <td>${person.address.additionalInfo}</td>
//         </tr>
//         `
//   });
    const personRows = persons.map(
        (person) => `
        <tr>
            <td scope="row">${person.email}</td>
            <td>${person.firstName}</td>
            <td>${person.lastName}</td>
            <td>${person.phone[0].number}</td>
            <td>${person.hobbies[0].hobby_name}</td>
            <td>${person.address.street}</td>
            <td>${person.address.additionalInfo}</td>
        </tr>
        `
      );
                  // <td>${person.hobby.name}</td>
            // <td>${person.address.street}</td>
            // <td>${person.address.additionalInfo}</td>
      const personRowsAsString = personRows.join("");
      document.getElementById("table__body").innerHTML = personRowsAsString;
    //   document.getElementById("table__head").innerHTML = `<tr><th scope="col">Email</th><th scope="col">First Name</th><th scope="col">Last Name</th><th scope="col">Phone</th><th scope="col">Hobbies</th><th scope="col">Street Name</th><th scope="col">Street Additional Info</th></tr>`;
//   document.getElementById("ex2output").innerHTML = chuckQuote.value;
}

getPersons("person/");

// export default personFacade