var firebaseConfig = {
    //read & writes are restricted to the URL of https://common-codes.github.io/Crispy
    apiKey: "AIzaSyAMo9JcJdFEsXlKh3bHc5H-hX8fq41vIaU",
    authDomain: "crispy-chat.firebaseapp.com",
    databaseURL: "https://crispy-chat-default-rtdb.firebaseio.com",
    projectId: "crispy-chat",
    storageBucket: "crispy-chat.appspot.com",
    messagingSenderId: "284700911258",
    appId: "1:284700911258:web:dc392a5fee18897892e123"
  };

firebase.initializeApp(firebaseConfig);
var db = firebase.database()