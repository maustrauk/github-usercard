import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/maustrauk
*/
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards');
axios
.get("https://api.github.com/users/maustrauk")
.then (myGitHub => {
  cards.appendChild(gitHubCard(myGitHub.data));
  checkFollowers(myGitHub.data.followers_url);
})
.catch ( err => {
  console.log("Error: ",err);
})

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

let followersArray = ["tetondan","dustinmyers","justsml","luishrd","bigknell"];
followersArray= followersArray.map(follower => `https://api.github.com/users/${follower}`);
followersArray.forEach( follower => {
  axios
  .get(follower)
  .then (myGitHub => {
    cards.appendChild(gitHubCard(myGitHub.data));
    checkFollowers(myGitHub.data.followers_url);
  })
  .catch ( err => {
    console.log("Error: ",err);
  })
})

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function gitHubCard (gitHubObj) {
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const name = document.createElement('h3');
  const username = document.createElement('p');
  const location = document.createElement('p');
  const profile = document.createElement('p');
  const address = document.createElement('a');
  const followers = document.createElement('p');
  const following = document.createElement('p');
  const bio = document.createElement('p');
  const moreInfoButton = document.createElement('button');
  const moreInfo = document.createElement('div');
  
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');
  moreInfo.classList.add('more-info');

  cardImg.setAttribute("src", gitHubObj.avatar_url);
  address.setAttribute("href", gitHubObj.html_url);
 
  name.textContent = gitHubObj.login;
  username.textContent = gitHubObj.name;
  location.textContent = `Location:  ${gitHubObj.location}`;
  profile.textContent = "Profile:";
  address.textContent = gitHubObj.html_url;
  followers.textContent = `Followers: ${gitHubObj.followers}`;
  following.textContent = `Following: ${gitHubObj.following}`;
  bio.textContent = `Bio: ${gitHubObj.bio}`;
  moreInfoButton.textContent = '+';
  moreInfo.textContent = `Created at: ${gitHubObj.created_at}`;

  card.appendChild(cardImg);
  card.appendChild(cardInfo);
  

  cardInfo.appendChild(name);
  cardInfo.appendChild(username);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  cardInfo.appendChild(moreInfoButton);
  cardInfo.appendChild(moreInfo);

  profile.appendChild(address);

  moreInfoButton.addEventListener('click', () => {
    moreInfo.classList.toggle('more-info');
  })

  return card;
}

function checkFollowers (followersURLs) {
  axios
  .get(followersURLs)
  .then( followers => {
    followers.data.forEach( follower => {
      axios
      .get(follower.url)
      .then( followerGitHub => {
        cards.appendChild(gitHubCard(followerGitHub.data));
      })
      .catch ( err => {
        console.log("Error: ",err);
      })
    });
  })
  .catch ( err => {
    console.log("Error: ",err);
  })
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
