auth.onAuthStateChanged(user => {
  if (user) {
    store.collection('guilds').get().then(snapshot => {
      setupGuilds(snapshot.docs, user);
      setupUI(user);
      setupBadges(user);
      document.getElementById('chat_container').style.display = `flex`
    }, err => {
      window.alert(err.message)
    });
  } else {
    setupGuilds([])
    setupUI();
    document.getElementById('guild-title-display').innerText = 'You Must First Log In To Access Crispy'
    document.getElementById('chat_container').style.display = `none`
  }
})

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;
const username = signupForm['signup-name'].value;

auth.createUserWithEmailAndPassword(email, password).then(cred => {
  return store.collection('users').doc(cred.user.uid).set({
    name: signupForm['signup-name'].value,
    img: 'https://tallerthanshort.github.io/ut3.ggpht/icons/crispy.png'
  });
}).then(() => {
  //making people verify emails... maybe...
  firebase.auth().currentUser.sendEmailVerification();
  //ok, not quite there yet...
  const modal = document.querySelector('#modal-signup');
  M.Modal.getInstance(modal).close();
  signupForm.reset();
})
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
e.preventDefault();
auth.signOut().then(() => {
  document.location.href = 'https://common-codes.github.io/crispy/';
})
});

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = loginForm['login-email'].value;
const password = loginForm['login-password'].value;

auth.signInWithEmailAndPassword(email, password).then((cred) => {
  localStorage.setItem('login', Date.now())
  const modal = document.querySelector('#modal-login');
  M.Modal.getInstance(modal).close();
  loginForm.reset();
}).then(function(){location.reload()}, 5000);
});

function reAuthenticate() {
  const modal1 = document.querySelector('#modal-account');
  const modal2 = document.querySelector('#modal-reauth');
  M.Modal.getInstance(modal1).close();
  M.Modal.getInstance(modal2).open();
}

const deleteForm = document.querySelector('#reauth-form');
deleteForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const password = deleteForm['reauth-password'].value;
  const user = firebase.auth().currentUser;
  
  const credential = firebase.auth.EmailAuthProvider.credential(
    user.email, 
    password
  );

  user.reauthenticateWithCredential(credential).then(() => {
    store.collection("users").doc(user.uid).delete();
    M.Modal.getInstance(document.querySelector('#modal-reauth')).close();
    user.delete();
  }).catch((error) => {
    document.getElementById("rerrtext").innerText = `ERROR: ${error}`
  });
});
