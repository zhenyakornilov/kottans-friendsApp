const RANDOM_USERS_URL =
  "https://randomuser.me/api/1.4/?results=10&nat=ua,us,de,dk,fr,gb&inc=gender,name,age,registered,phone,cell,picture,nat,email";

async function fetchText(url) {
  let response = await fetch(url);
  let data = await response.json();
  console.log(data.results);
}

fetchText(RANDOM_USERS_URL)