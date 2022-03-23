auth.onAuthStateChanged(user => {
    if (user) {
      store.collection('guilds').get().then(snapshot => {
        setupGuilds(snapshot.docs);
        setupUI(user);
        setupBadges(user);
      }, err => {
        window.alert(err.message)
      });
    } else {
      setupGuilds([])
      setupUI();
    }
  })

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return store.collection('users').doc(cred.user.uid).set({
      name: signupForm['signup-name'].value,
      email: signupForm['signup-email'].value
    });
  }).then(() => {
    //making people verify emails... maybe...
    firebase.auth().currentUser.sendEmailVerification();
    //ok, not quite there yet...
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
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
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});