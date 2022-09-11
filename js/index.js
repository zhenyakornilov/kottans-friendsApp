const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=3&nat=ua,us,de,dk,fr,gb&inc=gender,name,dob,registered,cell,picture,nat,email";

const allUsers = document.getElementById("allUsers");
const searchByName = document.getElementById("searchByName");
const filterForm = document.getElementById("filterForm");
const resetFilter = document.getElementById("resetFilter");
const loader = document.getElementById("loader");
let users = [];
let usersCopy = [];

function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}

async function fetchUsers(url) {
  try {
    const res = await fetch(url);
    errorHandledResponse = handleErrors(res);
    usersData = await errorHandledResponse.json();
    return usersData.results;
  } catch (err) {
    console.error(err);
  }
}

function removeLoader() {
  loader.classList.add("remove");
}

function renderUsers(usersData) {
  let allUsersHTML = usersData
    .map(({ gender, name, dob, cell, picture, email }) => {
      let userFullName = `${name.first} ${name.last}`;
      let imageSrc = picture.large;
      return `
        <li class="user-profile-card">
          <img src="${imageSrc}" class="profile-photo" alt="photo of ${userFullName}">
          <div class="user-main-info">
            <span class="user-info user-name">${userFullName}</span>
            <span class="user-info">${gender}, ${dob.age} y.o.</span>
          </div>
          <div class="user-contacts">
            <span class="user-contact">Phone: ${cell}</span>
            <span class="user-contact">Email: ${email}</span>
          </div>
        </li>
          `;
    })
    .join("");

  allUsers.innerHTML = allUsersHTML;
}

function sortByName(firstUser, secondUser) {
  const firtUserFullName = `${firstUser.name.first} ${firstUser.name.last}`;
  const secondUserFullName = `${secondUser.name.first} ${secondUser.name.last}`;
  return firtUserFullName.localeCompare(secondUserFullName);
}

function sortByAge(firstUser, secondUser) {
  return firstUser.dob.age - secondUser.dob.age;
}

function sortByNameOrAge(target, usersToSort) {
  let sortedUsers = [...usersToSort];
  switch (target.value) {
    case "nameAsc":
      sortedUsers.sort(sortByName);
      break;
    case "nameDesc":
      sortedUsers.sort((firstUser, secondUser) =>
        sortByName(secondUser, firstUser)
      );
      break;
    case "ageAsc":
      sortedUsers.sort(sortByAge);
      break;
    case "ageDesc":
      sortedUsers.sort((firstUser, secondUser) =>
        sortByAge(secondUser, firstUser)
      );
      break;
  }

  return sortedUsers;
}

function filterByGender(target, usersToFilter) {
  let filteredUsers = [...usersToFilter];
  if (target.value === "both") {
    return usersToFilter;
  } else if (target.value === "male" || target.value === "female") {
    usersToFilter = usersToFilter.filter(
      ({ gender }) => gender === `${target.value}`
    );
    return usersToFilter;
  }
  return filteredUsers;
}

function searchByUserName() {
  let searchInput = document.getElementById("searchByName").value.toLowerCase();
  const usersCards = allUsers.querySelectorAll(".user-profile-card");

  usersCards.forEach((user) => {
    let userName = user.querySelector(".user-name");
    if (!userName.textContent.toLocaleLowerCase().includes(searchInput)) {
      user.closest(".user-profile-card").classList.add("hidden");
    } else {
      user.closest(".user-profile-card").classList.remove("hidden");
    }
  });
}

function handleFormEvents({ target }) {
  let usersToRender = [...usersCopy];
  usersToRender = sortByNameOrAge(target, usersToRender);
  usersToRender = filterByGender(target, usersToRender);
  renderUsers(usersToRender);
  searchByUserName();
}

function resetForm() {
  renderUsers(users);
  usersCopy = [...users];
  filterForm.reset();
}

async function main() {
  const fakeUsers = await fetchUsers(RANDOM_USERS_URL);

  removeLoader();
  renderUsers(fakeUsers);
  users = [...fakeUsers];
  usersCopy = [...users];

  filterForm.addEventListener("input", handleFormEvents);
  resetFilter.addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", main);
