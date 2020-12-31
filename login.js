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
		window.location.href = "game.html";
	} else {
		console.log('No user logged.');
	}
});

// VARIABLES
const loginBtn = document.getElementById('login-btn');
const goSignUp = document.getElementById('go-signup');

goSignUp.addEventListener('click', function(){
	window.location.href = "signup.html";
});

loginBtn.addEventListener('click', function(){
	loginUser();
});

function loginUser(){
	var email = document.getElementById('user-email').value;
	var password = document.getElementById('user-password').value;

	firebase.auth().signInWithEmailAndPassword(email, password)
	.then( function(){
		window.location.href = "game.html";
	})
	.catch( function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorCode + ": " + errorMessage);
	});
}