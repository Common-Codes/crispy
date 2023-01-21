window.onload = function(){
    const content = document.querySelector(".details")
    const fragment = new URLSearchParams(window.location.search.slice(1));
    const [code, joined] = [fragment.get('code'), fragment.get('meta')];

    if(code != null){
        store.collection("invites").doc(code).get().then(doc => {
            console.log(doc.data())
            const guild = doc.data()
            const expiry = guild.expire
            if(expiry > Date.now()){
                content.innerHTML = `<h1>Join ${guild.title} on Crispy!</h1><h6>Rebounce ID: ${doc.id}</h6><br><br><button onclick="joinFunction()">accept invite</button>`;
                document.title = `Invitation to join ${guild.title} on Crispy!`
                document.body.style.backgroundImage = `url('${guild.banner}')`;
            } else{
                content.innerHTML = `<div style="background-color: #EBABAB; width: 100%;"><h1 style="text-align: center;">This invite has expired!</h1><br><br><p style="cursor: pointer; background-color: lightgray; width: 100%; text-transform: uppercase; text-align: center;" onclick="location.href='/app';">ask for a new invite</p><div>`;
            }
        }, err => {
            window.alert(err.message)
          })
    } else{
        content.innerHTML = `<h1 style="text-align: center;">Invalid invite!</h1><br><br><p onclick="location.href='/app';" style="cursor: pointer; background-color: lightgray; width: 100%; text-transform: uppercase; text-align: center;">ask for a new invite</p>`;
    }
}

function joinFunction(){
    let currentGuild = ''
    const user = auth.currentUser;
    const fragment = new URLSearchParams(window.location.search.slice(1));
    const code = fragment.get('code');
    if(code != null){
        if(user != null){
            store.collection('guilds').where("invite", "==", code).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    currentGuild = doc.data().uid;
                    store.collection('users').doc(auth.currentUser.uid).collection('joined').doc(code).set({
                        id: `${currentGuild}`
                    })
                })
            })
            setTimeout(function(){location.href=`/app/?g=${currentGuild}`}, 2000)
        } else{
            location.href='/app#'
        }
    } else{
        return;
    }
}
