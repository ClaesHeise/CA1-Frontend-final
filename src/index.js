const SERVER_URL = "http://onebrightcreation.com:8081/CA-1/api/";

const formButton = document.getElementById("form");

function getPersons(apiCall) {
    if (apiCall === undefined){
        apiCall = "person"
    }
    fetch(SERVER_URL+apiCall)
    .then((res) => handleHttpErrors(res))
    .then((data) => personToTable(data))
    .catch(err => {console.log(err);});
}

function getZips(apiCall) {
    if (apiCall === undefined){
        apiCall = "person"
    }
    fetch(SERVER_URL+apiCall)
    .then((res) => handleHttpErrors(res))
    .then((data) => zipToTable(data))
    .catch(err => {console.log(err);});
}

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

const handleHttpErrors = function(response) {
  if(!response.ok){
    throw (response.status + ': ' + response.statusText);
  }
  return response.json();
}

document.getElementById("getAll").addEventListener("click", async () => {
    getPersons("person/");
});

document.getElementById("getAllZip").addEventListener("click", async () => {
    getZips("person/zips");
});

document.getElementById("searchHobby").addEventListener("click", async () => {
    const input = document.getElementById("Input 1").value;
    getPersons("hobby/"+input);
});

document.getElementById("searchPhone").addEventListener("click", async () => {
    const input = document.getElementById("Input 1").value;
    getPersons("person/phone/"+input);
});

const personToTable = function (request) {
  let persons = request;
  console.log(persons[0].phone[0].number);
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
      const personRowsAsString = personRows.join("");
      document.getElementById("table__body").innerHTML = personRowsAsString;
}

const zipToTable = function (request) {
    let zips = request;
    // console.log(persons[0].phone[0].number);
      const zipRows = zips.map(
          (zip) => `
          <tr>
              <td scope="row">${zip.nr}</td>
              <td>${zip.navn}</td>
          </tr>
          `
        );
        const zipRowsAsString = zipRows.join("");
        document.getElementById("table__body_zip").innerHTML = zipRowsAsString;
  }

function hideAllShowOne(idToShow)
{
  document.getElementById("home_html").style = "display:none"
  document.getElementById("zip_html").style = "display:none"
//   document.getElementById("ex2_html").style = "display:none"
//   document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt)
{
  const id = evt.target.id;
  switch (id)
  {
    case "link-1": hideAllShowOne("home_html"); break
    case "link-2": hideAllShowOne("zip_html"); break
    // case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("home_html"); break
  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("home_html");

getPersons("person/");