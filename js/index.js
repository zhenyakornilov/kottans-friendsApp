const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=10&nat=ua,us,de,dk,fr,gb&inc=gender,name,dob,registered,phone,cell,picture,nat,email";

const allUsers = document.getElementById("allUsers");

async function fetchUsers(url) {
  let res = await fetch(url);
  usersData = await res.json();
  return usersData.results;
}

async function renderUsers() {
  let users = await fetchUsers(RANDOM_USERS_URL);
  console.log(users);
  let usersHTML = users
    .map(
      ({ gender, name, dob, registered, phone, cell, picture, nat, email }) => {
        return `
        <li class="user-card">
          <span>${gender}</span>
          <span>${name.first}</span>
          <span>${dob.age}</span>
          <span>${registered.date}</span>
          <span>${phone}</span>
          <span>${cell}</span>
          <img src="${picture.imageUrl}">
          <span>${nat}</span>
          <span>${email}</span>
        </li>
          `;
      }
    )
    .join("");

  allUsers.innerHTML = usersHTML;
}

renderUsers();
