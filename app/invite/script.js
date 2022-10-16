window.onload = function(){
    const content = document.getElementById("poster")
    const fragment = new URLSearchParams(window.location.search.slice(1));
    const [code, joined, expiry] = [fragment.get('code'), fragment.get('meta'), fragment.get('expire')];

    if(code != null){
        store.collection("guilds").where("invite", "==", code)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const guild = doc.data()
                if(expiry > Date.now()){
                    content.innerHTML = `<div style="background-color: #EBABAB; width: 100%;"><b style="position: relative;">You have been invited to join ${guild.title} on Crispy!</b><p style="font-size: 9px; color: white;">Rebounce ID: ${guild.uid}</p><br><br><button style="background-color: lightgray; width: 100%; text-transform: uppercase; cursor: pointer; border: none;" onclick="${guild.join}">accept invite</button><div>`;
                    document.title = `Invitation to join ${guild.title} on Crispy!`
                    document.body.style.backgroundImage = `url('${guild.banner}')`;
                } else if(expiry == null){
                    content.innerHTML = `<div style="background-color: #EBABAB; width: 100%;"><b style="text-align: center;">This invite has expired or has no timestamp!!</b><p>All invite links have an expiry timestamp at the end, make sure yours does too.</p><br><br><p style="cursor: pointer; background-color: lightgray; width: 100%; text-transform: uppercase; text-align: center;" onclick="location.href='/app';">ask for a new invite</p><div>`;
                } else{
                    content.innerHTML = `<div style="background-color: #EBABAB; width: 100%;"><b style="text-align: center;">This invite is invalid or has expired!</b><br><br><p style="cursor: pointer; background-color: lightgray; width: 100%; text-transform: uppercase; text-align: center;" onclick="location.href='/app';">ask for a new invite</p><div>`;
                }
                
            });
        })
    } else{
        content.innerHTML = `<div style="background-color: #EBABAB; width: 100%;"><b style="text-align: center;">This invite is invalid or has expired!</b><br><br><p onclick="location.href='/app';" style="cursor: pointer; background-color: lightgray; width: 100%; text-transform: uppercase; text-align: center;">ask for a new invite</p><div>`;
    }
}
