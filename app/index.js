const guildList = document.getElementById("guild-nav");
const navBar = document.getElementById("navbar");
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountBadges = document.getElementById('badge-location');
const currentGuildDisplay = document.getElementById('chat_inner_container');
let nameVar = ''
let guildVar = ''
let profileVar = ''

const setupBadges = (user) => {
  if(user){
    store.collection('users').doc(user.uid).collection('badges').get().then(doc => {
      doc.forEach(dig => {
        const badger = `${dig.data().badge}`;
        accountBadges.innerHTML += badger
      })
    })
  } else{
    accountBadges.innerHTML = ''
  }
}

const setupUI = (user) => {
  if(user){
    store.collection('users').doc(user.uid).get().then(doc => {
      nameVar = `${doc.data().name}`
      profileVar = `${doc.data().img}`
      const html = `
        <div><img src="${doc.data().img}" title="Profile Image" style="height: 48px; width: 48px;"></div>
        <div>Logged in as ${doc.data().name}</div>
        <div>${user.email}</div> 
      `; //user is only readable by user, compared to doc, which is readable to any user logged in (and authorised to view said data).
      accountDetails.innerHTML = html;
    })
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    if(window.innerWidth > '900'){
      return;
    } else{
      document.getElementById("delete-account").innerHTML += `<button class="btn btn-secondary" onclick="mobileDevTools()">Mobile Dev Tools</button>`;
    }
  } else {
    accountDetails.innerHTML = ''
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupGuilds = (data) => {

  if(data.length){
    navBar.style.display = 'block'
    let html = '';
    data.forEach(doc => {
      const guild = doc.data();
      const li = `
        <li>
          <button alt="${guild.title}" title="${guild.title}" style="display: block; color: #000; padding; 8px 16px;" onclick="${guild.display}"><img alt="${guild.title}" src="${guild.img}" style="width: 48px; height: 48px;"></button>
        </li>
      `;
      html += li;
    });
    guildList.innerHTML = html
  } else {
    guildList.style.display = 'none'
    navBar.style.display = 'none'
    
  }
};

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
