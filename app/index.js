const guildList = document.querySelector('.guilds');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountBadges = document.querySelector('.account-badges');
const messageArea = document.querySelector('.message-area')

const setupBadges = (user) => {
  if(user){
    store.collection('users').doc(user.uid).get().then(doc => {
      const html = `
      <div class="_category_sso5v_101">Badges</div>
      <div class="modal-content UserBadges__BadgesBase-sc-1ubexy3-0 gMJfVq" style="display: flex;">
        <div style="display: flex;">
          <img src="https://www.svgrepo.com/show/182103/badge-medal.svg" style="height: 26px; width: 26px;">
        </div>
        <div style="display: flex;">
          <img src="https://www.svgrepo.com/show/193147/badge.svg" style="height: 26px; width: 26px;">
        </div>
      </div>
      `;
      accountBadges.innerHTML = html;
    })
  }
}

const setupUI = (user) => {
  if(user){
    store.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div><img src="https://ggpht.ga/icons/${doc.data().img}?size=full" style="height: 48px; width: 48px;"></div>
        <div>Logged in as ${doc.data().name}</div>
        <div>${doc.data().email}</div>
      `;
      accountDetails.innerHTML = html;
    })
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    accountDetails.innerHTML = ''
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
}

const setupGuilds = (data) => {

  if(data.length){
    let html = '';
    data.forEach(doc => {
      const guild = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guild.title} </div>
          <div class="collapsible-body white"> ${guild.content} 
            <div class="input-field">
              <input type="text" id="message" placeholder="Send a message...">
            </div>
          </div>
        </li>
      `;
      html += li;
    });
    guildList.innerHTML = html
  } else {
    guildList.innerHTML = '<h5 class="center-align">You must first Log In to access Crispy!</h5>'
  }
};

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});