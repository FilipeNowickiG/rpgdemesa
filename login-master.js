var config = {
	apiKey: "AIzaSyD_AzO3Lh6CN_CnlilS6ksYGU0FtxQRtVE",
	authDomain: "tablerpg-de9c9.firebaseapp.com",
	databaseURL: "https://tablerpg-de9c9.firebaseio.com",
	projectId: "tablerpg-de9c9",
	storageBucket: "tablerpg-de9c9.appspot.com",
	messagingSenderId: "339042049096",
	appId: "1:339042049096:web:cac1910d581992b9"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		console.log('User logged!');
	} else {
		console.log('No user logged.');
	}
});

// VARIABLES
const postsRef = firebase.database();
let currentTab = 'selection-tab';
const playerBtn = document.getElementById('player-btn');
const masterBtn = document.getElementById('master-btn');
const goSignUp = document.getElementById('go-signup');
const goLogIn = document.getElementById('go-login');
const masterLogInBtn= document.getElementById('master-login-btn');

playerBtn.addEventListener('click', function(){
	window.location.href = "login.html";
});

masterBtn.addEventListener('click', function(){
	window.location.href = "login-master.html";
});

goSignUp.addEventListener('click', function(){
	window.location.href = "signup.html";
});

goLogIn.addEventListener('click', function(){
	window.location.href = "login.html";
});

masterLogInBtn.addEventListener('click', function(){
	loginMaster();
});

function loginUser(){
	var email = document.getElementById('user-email').value;
	var password = document.getElementById('user-password').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(
		function(){
			window.location.replace('game.html');
		}
	)
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	});
}

function loginMaster(){
	const email = document.getElementById('master-email').value;
	const password = document.getElementById('master-password').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then( function(){
		window.location.replace('master.html');
	})
	.catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
	});
}

function logoutUser(){
  firebase.auth().signOut()
  .then(function() {
    window.location.replace('index.html');
  }).catch(function (error) {
    alert("ERRO: " + error.message);
  });
}