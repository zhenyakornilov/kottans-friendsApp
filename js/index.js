const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=20&nat=ua,us,de,dk,fr,gb&inc=gender,name,dob,registered,phone,picture,nat,email";

const allUsers = document.getElementById("allUsers");
const searchByName = document.getElementById("searchByName");
const filterForm = document.getElementById("filterForm");
const resetFilter = document.getElementById("resetFilter");

async function fetchUsers(url) {
  let res = await fetch(url);
  usersData = await res.json();
  return usersData.results;
}

async function renderUsers() {
  let users = await fetchUsers(RANDOM_USERS_URL);
  let usersHTML = users
    .map(({ gender, name, dob, phone, picture, email }) => {
      let userFullName = `${name.first} ${name.last}`;
      let imageSrc = picture.large;
      return `
        <li class="user-profile-card">
          <div class="card-wrapper">
            <img src="${imageSrc}" class="profile-photo" alt="photo of ${userFullName}">
            <div class="user-main-info">
              <span class="user-info user-name">${userFullName}</span>
              <span class="user-info">${gender}, ${dob.age} y.o.</span>
            </div>
            <div class="user-contacts">
              <span class="user-contact">Phone: ${phone}</span>
              <span class="user-contact">Email: ${email}</span>
            </div>
          </div>
        </li>
          `;
    })
    .join("");

  allUsers.innerHTML = usersHTML;
}

renderUsers();

searchByName.addEventListener("keyup", function () {
  let searchInput = document.getElementById("searchByName").value.toLowerCase();
  const usersCards = allUsers.querySelectorAll(".user-profile-card");

  const regex = new RegExp();
  usersCards.forEach((user) => {
    let userName = user.querySelector(".user-name");
    if (!userName.textContent.toLocaleLowerCase().includes(searchInput)) {
      user.closest(".user-profile-card").classList.add("hidden");
    } else {
      user.closest(".user-profile-card").classList.remove("hidden");
    }
  });
});

resetFilter.addEventListener("click", () => {
  filterForm.reset();
  const hiddenElements = allUsers.querySelectorAll('.hidden');
  Array.from(hiddenElements, item => item.classList.remove('hidden'));
});
