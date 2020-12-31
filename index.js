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
const playerBtn = document.getElementById('player-btn');
const masterBtn = document.getElementById('master-btn');

playerBtn.addEventListener('click', function(){
	window.location.href = "login.html";
});

masterBtn.addEventListener('click', function(){
	window.location.href = "login-master.html";
});