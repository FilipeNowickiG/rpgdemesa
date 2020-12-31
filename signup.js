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
const signupBtn= document.getElementById('signup-btn');
const goLogIn = document.getElementById('go-login');

goLogIn.addEventListener('click', function(){
	window.location.href = "login.html";
});

signupBtn.addEventListener('click', function(){
	signupUser();
});

function signupUser(){
	var email = document.getElementById('user-email').value;
	var password = document.getElementById('user-password').value;

	firebase.auth().createUserWithEmailAndPassword(email, password)
	.then( function() {
		var firebaseRef = firebase.database().ref('players');
		var userId = firebase.auth().currentUser.uid;
		var nome = document.getElementById('user-name').value;

		//SALVA O DADO INSERIDO NO ID DO USUÁRIO LOGADO
		firebaseRef.child(userId).set({
			Account : {
				name: nome,
			},
			Character: {
				name: "NOME",
				race: "RAÇA",
				size: "PORTE FÍSICO",
				age: 20,
				background: "Um pequeno histórico do personagem.",
			},
			Constitution: {
				body: {
					default: 10
				},
				movement: {
					default: 10
				},
				mind: {
					default: 10
				},
				spirit: {
					default: 10
				},
				vitality: {
					default: 0
				},
				resistance: {
					default: 0
				},
				defense: {
					default: 0
				},
			},
			Abilities: {
				experience: 0,
			}
		})
		.then( function() {
			window.location.href = "game.html";
		})
		.catch( function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			alert(errorCode + ": " + errorMessage);
		});
	})
	.catch( function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		alert(errorCode + ": " + errorMessage);
	});
}