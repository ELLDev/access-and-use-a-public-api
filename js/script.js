let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo`;
const employeeList = document.querySelector(".employee-list");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

fetch(urlAPI)
  .then((res) => res.json())
  .then((res) => res.results)
  .then(displayEmployees)
  .catch((err) => console.log(err));

function displayEmployees(employeeData) {
  employees = employeeData;
  let employeeHTML = "";

  employees.forEach((employee, index) => {
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

    employeeList.insertAdjacentHTML('beforeend', employeeHTML);
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
  <p class="address">${location.street}, ${location.state} ${
    location.postcode
  }</p>
  <p>Birthday:
  ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
};

employeeList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const employeeCard = e.target;
    const index = employeeCard.getAttribute("data-index");
    displayModal(index);
  } else if (e.target.parentElement.tagName === "LI") {
    const employeeCard = e.target.parentElement;
    const index = employeeCard.getAttribute("data-index");
    displayModal(index);
  } else if (e.target.parentElement.parentElement.tagName === "LI") {
    const employeeCard = e.target.parentElement.parentElement;
    const index = employeeCard.getAttribute("data-index");
    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
