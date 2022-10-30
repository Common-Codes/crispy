const menu = document.querySelector(".menu");
const guildList = document.getElementById("guild-nav");
const navBar = document.getElementById("navbar");
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountBadges = document.getElementById('badge-location');
let nameVar = ''
const wwidth = window.innerWidth;
let imgtagheight = ''
let profileVar = ''
let menuVisible = false;

if(wwidth > '915'){
  imgtagheight = '155px'
} else{
  imgtagheight = '133px'
}

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
    store.collection('users').doc(auth.currentUser.uid).collection('joined').get().then(snapshot => {
      setupJoinedGuilds(snapshot.docs);
    });
  } else{
    return;
  }
};

const setupJoinedGuilds = (data) => {
  if(data.length){
    navBar.style.display = 'block'
    let html = ``
    data.forEach(doc => {
      const guild = doc.data().id;
      store.collection('guilds').where("uid", "==", guild).get().then((querySnaphot) => {
        querySnaphot.forEach((doc) => {
          const groode = doc.data();
          guildList.innerHTML += `<li><div><guild title="${groode.title}" style="display: block; color: #000; padding; 8px 16px;" onclick="location.href='?g=${groode.uid}';"><img alt="${groode.title}" src="${groode.img}" style="width: 48px; height: 48px;"></guild></div></li>`;
        })
      })
    })
  } else{
    guildList.style.display = 'none'
    navBar.style.display = 'none'
  }
};

const toggleMenu = command => {
  menu.style.display = command === "show" ? "block" : "none";
  menuVisible = !menuVisible;
};

const setPosition = ({ top, left }) => {
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  toggleMenu("show");
};

window.addEventListener("contextmenu", e => {
  let element = e.target;
  if(element.tagName == "GUILD" || element.tagName == "IMG"){
    e.preventDefault();
    const origin = {
      left: e.pageX,
      top: e.pageY
    };
    setPosition(origin);
    return false;
  }
});

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
