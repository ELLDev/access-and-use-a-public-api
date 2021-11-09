let employees = [];
let employeesCopy = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const employeeList = document.querySelector(".employee-list");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let modalIndex = 0;
let isModalWindowClosed = true;
const header = document.querySelector("header");
header.insertAdjacentHTML(
  "beforeend",
  `
<label for="search" class="name-search">
<span>Search by name</span>
<input id="search" placeholder="Search by name...">
<button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
`
);
const searchBar = document.querySelector("#search");
const searchButton = document.querySelector("label button");

fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

function displayEmployees(employeeData, firstRun = true) {
  if (firstRun) {
    employeesCopy = employeeData;
    employees = employeeData;
  } else {
    employeesCopy = employeeData;
  }

  let employeeHTML = "";
  employeeList.innerHTML = "";

  employeesCopy.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML = `
    <li class="employee" data-index="${index}">
     <img class="avatar" src="${picture.large}" />
     <div class="employee-details">
       <h3 class="name">${name.first} ${name.last}</h3>
       <span class="email">${email}</span>
       <span class="address">${city}</span>
     </div>
    </li>
    `;

    employeeList.insertAdjacentHTML("beforeend", employeeHTML);
  });
}

displayModal = (index) => {
  let { dob, email, location, name, phone, picture } = employees[index];
  let date = new Date(dob.date);
  const modalHTML = `
  <img class="avatar" src="${picture.large}" />
  <div class="text-container">
  <h2 class="name">${name.first} ${name.last}</h2>
  <p class="email">${email}</p>
  <p class="address">${location.city}</p>
  <hr />
  <p>${phone}</p>
  <p class="address">${location.street.number} ${location.street.name}, ${
    location.state
  } ${location.postcode}</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
};

searchName = (list, name) => {
  let regex = new RegExp(name, "i");
  let newList = [];

  for (let index = 0; index < list.length; index++) {
    let fullName = list[index].name.first + " " + list[index].name.last;
    if (
      regex.test(list[index].name.first) ||
      regex.test(list[index].name.last) ||
      regex.test(fullName)
    ) {
      newList.push(list[index]);
    }
  }
  displayEmployees(newList, false);
};

employeeList.addEventListener("click", (e) => {
  isModalWindowClosed = false;

  if (e.target.tagName === "LI") {
    const employeeCard = e.target;
    const index = employeeCard.getAttribute("data-index");
    modalIndex = parseInt(index);
    displayModal(index);
  } else if (e.target.parentElement.tagName === "LI") {
    const employeeCard = e.target.parentElement;
    const index = employeeCard.getAttribute("data-index");
    modalIndex = parseInt(index);
    displayModal(index);
  } else if (e.target.parentElement.parentElement.tagName === "LI") {
    const employeeCard = e.target.parentElement.parentElement;
    const index = employeeCard.getAttribute("data-index");
    modalIndex = parseInt(index);
    displayModal(index);
  }
});

// Use left and right arrow keys to navigate through modal windows

document.addEventListener("keyup", (key) => {
  if (!isModalWindowClosed) {
    if (key.code === "ArrowLeft") {
      modalIndex -= 1;
      if (modalIndex < 0) modalIndex = 0;
      displayModal(modalIndex);
    } else if (key.code === "ArrowRight") {
      modalIndex += 1;
      displayModal(modalIndex);
    }
    if (key.code === "Escape") {
      overlay.classList.add("hidden");
      isModalWindowClosed = true;
      modalIndex = 0;
    }
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
  isModalWindowClosed = true;
  modalIndex = 0;
});

searchBar.addEventListener("keyup", () => {
  searchName(employees, searchBar.value);
});
searchButton.addEventListener("click", () => {
  searchName(employees, searchBar.value);
});
