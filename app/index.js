const guildList = document.getElementById("guild-nav");
const navBar = document.getElementById("navbar");
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountBadges = document.querySelector('.account-badges');
const currentGuildDisplay = document.getElementById('chat_inner_container');
let nameVar = ''
let guildVar = ''
let profileVar = ''

const validURL = (str) =>{
  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  if(!regex.test(str)){
      return false; //false
  } else {
      return true; //true
  }
}

const setupBadges = (user) => {
  if(user){
    store.collection('users').doc(user.uid).get().then(doc => {
      const badges = doc.data(); 
      const badge = `
      <div class="_category_sso5v_101">Badges</div>
      <div class="modal-content UserBadges__BadgesBase-sc-1ubexy3-0 gMJfVq" style="display: flex;">
        <div style="display: flex;">
          <img title="Kickstarter" src="https://www.svgrepo.com/show/182103/badge-medal.svg" style="height: 28px; width: 28px;">
        </div>
        <div style="display: none;">
          <img title="Bug Hunter" src="https://www.svgrepo.com/show/193147/badge.svg" style="height: 28px; width: 28px;">
        </div>
      </div>
      `;
      accountBadges.innerHTML = badge;
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
        <div><img src="${doc.data().img}" title="Profile" style="height: 48px; width: 48px;"></div>
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
    navBar.style.display = 'block'
    let html = '';
    data.forEach(doc => {
      const guild = doc.data();
      const li = `
        <li>
          <div> <button alt="${guild.title}" title="${guild.title}" style="transform: rotate(-90deg);" onclick="${guild.display}"><img alt="${guild.title}" src="${guild.img}" style="width: 48px; height: 48px;"></button> </div>
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

const create_load = (id) =>{
  var parent = this;
  var container = document.getElementById(id)
  container.innerHTML = ''

  var loader_container = document.createElement('div')
  loader_container.setAttribute('class', 'loader_container')

  var loader = document.createElement('div')
  loader.setAttribute('class', 'loader')

  loader_container.append(loader)
  container.append(loader_container)

}

const send_message = (message) => {
  var parent = this

  var ref = firebase.database().ref();
  
  if(nameVar == null && message == null){
    return
  }

  var messages = db.ref(`chats/${guildVar}`);
  messages.once('value', function(snapshot) {
    var index = parseFloat(snapshot.numChildren()) + 1
    db.ref('chats/' + `${guildVar}` + `/message_${index}`).set({
      name: nameVar,
      message: message,
      avatar: profileVar,
      index: index
    })
    .then(function(){
      refresh_chat()
    })
  })
}

const displayActiveChat = () => {
  guildVar = 'creak'
  document.getElementById('guild-title-display').innerText = 'TallerThanShort\'s Crack Den'
    html = 
    `
    <div id="chat_input_container">
      <input type="text" id="chat_input" />
      <label for="chat_input">Send Message</label>
      <div id="chat_input_send">
        <button id="chat_input_send" style="display: none;">
      </div>
    </div>
    `
    currentGuildDisplay.innerHTML += html
    const chat_input = document.getElementById('chat_input');
    const chat_input_send = document.getElementById('chat_input_send')
    var messages = db.ref(`chats/${guildVar}`);
    chat_input.onkeyup  = function(){
      if(chat_input.value.length > 0){
        if (event.keyCode === 13) {
          document.getElementById("chat_input_send").click();
         }
        chat_input_send.removeAttribute('disabled')
        chat_input_send.classList.add('enabled')
        chat_input_send.onclick = function(){
          chat_input_send.setAttribute('disabled', true)
          chat_input_send.classList.remove('enabled')
          if(chat_input.value.length <= 0){
            return
          }
          create_load('chat_content_container')
          send_message(chat_input.value)
          chat_input.value = ''
          // Focus on the input there after
          chat_input.focus()
        }
      }else{
        chat_input_send.classList.remove('enabled')
      }
    }




    document.getElementById('chat_content_container').innerHTML = `<p style="style="color: #151515;">${nameVar}, Say Something</p>`
};

const displayNotifChat = () => {
  guildVar = 'common'
  document.getElementById('guild-title-display').innerText = 'Common-Codes'
    html = 
    `
    <div id="chat_input_container">
      <input type="text" id="chat_input" />
      <label for="chat_input">Send Message</label>
      <div id="chat_input_send">
        <button id="chat_input_send" style="display: none;">
      </div>
    </div>
    `
    currentGuildDisplay.innerHTML += html
    const chat_input = document.getElementById('chat_input');
    const chat_input_send = document.getElementById('chat_input_send')
    var messages = db.ref(`chats/${guildVar}`);
    chat_input.onkeyup  = function(){
      if(chat_input.value.length > 0){
        if (event.keyCode === 13) {
          document.getElementById("chat_input_send").click();
         }
        chat_input_send.removeAttribute('disabled')
        chat_input_send.classList.add('enabled')
        chat_input_send.onclick = function(){
          chat_input_send.setAttribute('disabled', true)
          chat_input_send.classList.remove('enabled')
          if(chat_input.value.length <= 0){
            return
          }
          create_load('chat_content_container')
          send_message(chat_input.value)
          chat_input.value = ''
          // Focus on the input there after
          chat_input.focus()
        }
      }else{
        chat_input_send.classList.remove('enabled')
      }
    }




    document.getElementById('chat_content_container').innerHTML = `<p style="style="color: #151515;">${nameVar}, Say Something</p>`
};

const displayNewGuild = () => {
  guildVar = 'coolkidsclub'
  document.getElementById('guild-title-display').innerText = 'VTC - Very Terrible Code'
    html = 
    `
    <div id="chat_input_container">
      <input type="text" id="chat_input" />
      <label for="chat_input">Send Message</label>
      <div id="chat_input_send">
        <button id="chat_input_send" style="display: none;">
      </div>
    </div>
    `
    currentGuildDisplay.innerHTML += html
    const chat_input = document.getElementById('chat_input');
    const chat_input_send = document.getElementById('chat_input_send')
    var messages = db.ref(`chats/${guildVar}`);
    chat_input.onkeyup  = function(){
      if(chat_input.value.length > 0){
        if (event.keyCode === 13) {
          document.getElementById("chat_input_send").click();
         }
        chat_input_send.removeAttribute('disabled')
        chat_input_send.classList.add('enabled')
        chat_input_send.onclick = function(){
          chat_input_send.setAttribute('disabled', true)
          chat_input_send.classList.remove('enabled')
          if(chat_input.value.length <= 0){
            return
          }
          create_load('chat_content_container')
          send_message(chat_input.value)
          chat_input.value = ''
          // Focus on the input there after
          chat_input.focus()
        }
      }else{
        chat_input_send.classList.remove('enabled')
      }
    }




    document.getElementById('chat_content_container').innerHTML = `<p style="style="color: #151515;">${nameVar}, Say Something</p>`
};

const refresh_chat = () => {
  var chat_content_container = document.getElementById('chat_content_container')

  var messages = db.ref(`chats/${guildVar}`);
  messages.on('value', function(snapshot) {
    chat_content_container.innerHTML = ''
    if(snapshot.numChildren() == 0){
      return
    }
    var values = Object.values(snapshot.val());
    var guide = []
    var unordered = []
    var ordered = []
    for (var i, i = 0; i < values.length; i++) {
      guide.push(i+1)
      unordered.push([values[i], values[i].index]);
    }

    guide.forEach(function(key) {
      var found = false
      unordered = unordered.filter(function(item) {
        if(!found && item[1] == key) {
          ordered.push(item[0])
          found = true
          return false
        }else{
          return true
        }
      })
    })

    ordered.forEach(function(data) {
      var name = data.name
      var avatar = data.avatar
      var message = data.message

      var message_container = document.createElement('div')
      message_container.setAttribute('class', 'message_container')

      var message_inner_container = document.createElement('div')
      message_inner_container.setAttribute('class', 'message_inner_container')

      var message_user_container = document.createElement('div')
      message_user_container.setAttribute('class', 'message_user_container')

      var message_user = document.createElement('div')
      message_user.setAttribute('class', 'message_user')
      message_user.innerHTML = `<img src="${avatar}" style="width: 18px; height: 18px; border-radius: 50%;"> ${name}`

      var message_content_container = document.createElement('div')
      message_content_container.setAttribute('class', 'message_content_container')

      if(validURL(message)) {
        var message_content = document.createElement('div')
        message_content.setAttribute('class', 'message_content')
        message_content.innerHTML = `<p style="text-decoration: underline; cursor: pointer;" onclick="location.href='${message}'">${message}</a>\n<div class="message_embed"><iframe src="https://verbose.crispychat.tech/#url_src=${message}&size=46" style="height: 252px; width: 100%;" frameborder="0"></iframe></div>`;
      } else {
        var message_content = document.createElement('p')
        message_content.setAttribute('class', 'message_content')
        message_content.textContent = `${message}`;
      }

      message_user_container.append(message_user)
      message_content_container.append(message_content)
      message_inner_container.append(message_user_container, message_content_container)
      message_container.append(message_inner_container)

      chat_content_container.append(message_container)
    });
    chat_content_container.scrollTop = chat_content_container.scrollHeight;
  })
}

document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
