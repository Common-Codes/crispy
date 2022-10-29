const fragment = new URLSearchParams(window.location.search.slice(1));
const guildUid = fragment.get('g');
const currentGuildDisplay = document.getElementById('chat_inner_container');
let guildVar = ''

// Validating URL's with regex
const validIMG = (str) =>{
    var imgregex = /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png|bmp)$/gim;
    if(!imgregex.test(str)){
        return false; //false
    } else{
        return true; //true ^
    }
}

const validURL = (str) =>{
  var regex = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  if(!regex.test(str)){
    return false; //false
  } else {
    return true; //true ^
  }
}

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
  
    ref.on("value", function(snapshot) {
      console.log("WSS: Success");
    }, function (error) {
      console.log("Error: " + error.code);
    });
    
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
  
  if(guildUid != null){
    store.collection('guilds').where("uid", "==", guildUid).get().then((querySnaphot) => {
      querySnaphot.forEach((doc) => {
        const gday = doc.data();
        guildVar = `${gday.uid}`;
        document.getElementById('guild-title-display').innerText = `${gday.title}`;
        document.title = `Nightly | ${gday.title}`
        html = 
        `
        <div id="chat_content_container"></div>
        <div id="chat_input_container">
          <input type="text" id="chat_input" />
          <label for="chat_input">Send Message</label>
          <div id="chat_input_send">
            <button id="chat_attachments" style="display: block; border: none; width: 20px; height: 20px; position: relative; top: -44px; left: -29px;" disabled><img src="https://www.svgrepo.com/show/16233/upload.svg"></button>
          </div>
        </div>
        `
        currentGuildDisplay.innerHTML = html;
        const chat_input = document.getElementById('chat_input');
        const chat_attachment = document.getElementById('chat_attachments')
        var messages = db.ref(`chats/${guildVar}`);
      chat_input.onkeyup  = function(){
        if(chat_input.value.length > 0){
          if (event.keyCode === 13) {
              if(chat_input.value.length <= 0){
                return
              }
              create_load('chat_content_container')
              send_message(chat_input.value)
              chat_input.value = ''
              // Focus on the input there after
              chat_input.focus()
           }
        }
      }

      const user = auth.currentUser
      store.collection("users").doc(user.uid).get().then(doc => {
        document.getElementById('chat_content_container').innerHTML = `<p style="style="color: #151515;">${doc.data().name}, Say Something</p>`
      })
      })
    })
  } else{
    currentGuildDisplay.innerHTML = `<b>Welcome to Crispy!</b><br><br><b>To get you started, here are some useful locations:</b><br><br><button class="btn cyan darken-1 z-depth-1" onclick="location.href='https://common-codes.github.io/crispy-nightly/app/invite?code=commoncodes&expire=3873025738000';">Join official C-C guild</button><br><br><button class="btn cyan darken-1 z-depth-1" onclick="location.href='https://discord.gg/xMVaHBrzu6';">Join the Discord!</button>`
  }
  
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
        message_user.innerHTML = `<img src="${avatar}" style="width: 18px; height: 18px; border-radius: 50%;"><username style="margin-top: -21px; margin-left: 20px; cursor: pointer;">${name}</username>`
  
        var message_content_container = document.createElement('div')
        message_content_container.setAttribute('class', 'message_content_container')
  
        if(validIMG(message)){
          var message_content = document.createElement('div')
          message_content.setAttribute('class', 'message_content')
          message_content.innerHTML = `<p style="text-decoration: underline; cursor: pointer;" onclick="location.href='${message}'">${message}</a>\n<div class="message_embed"><iframe style="height: ${imgtagheight};" src="https://verbose.crispychat.tech/?url_src=${message}&size=40" style="height: 256px; width: 100%;" frameborder="0"></iframe></div>`;
        } else if(validURL(message)){
          var message_content = document.createElement('div')
          message_content.setAttribute('class', 'message_content')
          message_content.innerHTML = `<p style="text-decoration: underline; cursor: pointer;" onclick="location.href='${message}'">${message}</a>\n<div class="message_embed"><iframe style="height: ${imgtagheight};" src="https://verbose.crispychat.tech/?url_src=${message}&size=40" style="height: 256px; width: 100%;" frameborder="0"></iframe></div>`;
        }else{
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
  