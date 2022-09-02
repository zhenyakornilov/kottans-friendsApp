const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=10&nat=ua,us,de,dk,fr,gb&inc=gender,name,age,registered,phone,cell,picture,nat,email";


async function fetchUsers(url) {
  let res = await fetch(url);
  usersData = await res.json();
  return usersData.results
}

async function renderUsers() {
    let users = await fetchUsers(RANDOM_USERS_URL)
    console.log(users);
}

renderUsers();