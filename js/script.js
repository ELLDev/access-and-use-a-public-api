let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const employeeList = document.querySelector(".employee-list");

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

    employeeHTML += `
    <li class="employee data-index="${index}">
     <img class="avatar" src="${picture.large}" />
     <div class="employee-details">
       <h3 class="name">${name.first} ${name.last}</h3>
       <span class="email">${email}</span>
       <span class="address">${city}</span>
     </div>
    </li>
    `;
  });

  employeeList.innerHTML = employeeHTML;
}
