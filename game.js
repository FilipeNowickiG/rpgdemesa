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
		userId = firebase.auth().currentUser.uid;
		getUserData();
		getAbilities();
	} else {
		console.log('No user logged.');
	}
});

//MENU
var currentTab = 'characterTab';

function showTab(tab){
	var oldTab = document.getElementById(currentTab);
	oldTab.style.display = 'none';
	var newTab = document.getElementById(tab);
	currentTab = tab;
	newTab.style.display = 'block';
}

//PERSONAGEM
function editLine(line){
	var editableLineName = line + 'Edit';
	document.getElementById(editableLineName).style.display = 'block';
	var displayLineName = line + 'Line';
	document.getElementById(displayLineName).style.display = 'none';
}

function nameUpdate() {
	var characterInput = document.getElementById('character-input');
	firebase.database().ref('players/' + userId + '/Character').update({'name': characterInput.value});
	document.getElementById('characterLine').style.display = 'block';
	document.getElementById('characterEdit').style.display = 'none';
}

function raceUpdate() {
	var raceInput = document.getElementById('race-input');
	firebase.database().ref('players/' + userId + '/Character').update({'race': raceInput.value});
	document.getElementById('raceLine').style.display = 'block';
	document.getElementById('raceEdit').style.display = 'none';
	setRaceModifiers(raceInput.value);
}

function setRaceModifiers(race) {
	switch (race) {
		case 'Humana':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'race': -1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'race': 1});
		firebase.database().ref('players/' + userId + '/Constitution/mind/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/spirit/race').remove();
		break;
		case 'Élfica':
		firebase.database().ref('players/' + userId + '/Constitution/body/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/movement/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'race': 1});
		firebase.database().ref('players/' + userId + '/Constitution/spirit').update({'race': -1});
		break;
		case 'Anânica':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'race': 1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'race': -1});
		firebase.database().ref('players/' + userId + '/Constitution/mind/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/spirit/race').remove();
		break;
		case 'Orc':
		firebase.database().ref('players/' + userId + '/Constitution/body/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/movement/race').remove();
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'race': -1});
		firebase.database().ref('players/' + userId + '/Constitution/spirit').update({'race': 1});
		break;
	}
}

function sizeUpdate() {
	var sizeInput = document.getElementById('size-input');
	firebase.database().ref('players/' + userId + '/Character').update({'size': sizeInput.value});
	document.getElementById('sizeLine').style.display = 'block';
	document.getElementById('sizeEdit').style.display = 'none';
	setSizeModifiers(sizeInput.value);
}

function setSizeModifiers(size){
	switch (size) {
		case 'Esguio':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'size': -1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'size': 1});
		break;
		case 'Padrão':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'size': 0});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'size': 0});
		break;
		case 'Musculoso':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'size': 1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'size': -1});
		break;
		case 'Corpulento':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'size': 2});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'size': -2});
		break;
		case 'Brutamontes':
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'size': 3});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'size': -3});
		break;
	}
}

function ageUpdate() {
	var ageInput = document.getElementById('age-input');
	firebase.database().ref('players/' + userId + '/Character').update({'age': ageInput.value});
	document.getElementById('ageLine').style.display = 'block';
	document.getElementById('ageEdit').style.display = 'none';
	setAgeModifiers(ageInput.value);
}

function setAgeModifiers(age){
	switch(true){
		case (age < 20):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 100});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': 2});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': 2});
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'age': 2});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': 3});
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'age': 2});
		break;
		case (age < 30):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 150});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': 1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': 1});
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'age': 1});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': 2});
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'age': 1});
		break;
		case (age < 40):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 200});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': 1});
		break;
		case (age < 50):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 250});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -1});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -1});
		break;
		case (age < 60):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 300});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -2});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -2});
		break;
		case (age < 70):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 350});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': -1});
		break;
		case (age < 80):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 400});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'age': -1});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': -2});
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'age': -1});
		break;
		case (age < 90):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 450});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'age': -2});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'age': -2});
		break;
		case (age < 100):
		firebase.database().ref('players/' + userId + '/Abilities').update({'experience': 500});
		firebase.database().ref('players/' + userId + '/Constitution/body').update({'age': -4});
		firebase.database().ref('players/' + userId + '/Constitution/movement').update({'age': -4});
		firebase.database().ref('players/' + userId + '/Constitution/mind').update({'age': -3});
		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'age': -4});
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'age': -3});
		break;
		default:
		console.log('maior')
		break;
	}
}

function backgroundUpdate() {
	var backgroundInput = document.getElementById('background-input');
	firebase.database().ref('players/' + userId + '/Character').update({'background': backgroundInput.value});
	document.getElementById('backgroundLine').style.display = 'block';
	document.getElementById('backgroundEdit').style.display = 'none';
}

function abilitiesSwitch(tab){
	switch(tab){
		case 'abilitiesHTML':
		document.getElementById('myAbilitiesHTML').style.display = 'none';
		document.getElementById('abilitiesHTML').style.display = 'block';
		break;
		case 'myAbilitiesHTML':
		document.getElementById('abilitiesHTML').style.display = 'none';
		document.getElementById('myAbilitiesHTML').style.display = 'block';
		break;
	}
}

function showAbilities(){
	document.getElementById('myAbilitiesHTML').style.display = 'block';
	document.getElementById('abilitiesHTML').style.display = 'none';
}

function buyAbilities(){
	document.getElementById('abilitiesHTML').style.display = 'block';
	document.getElementById('myAbilitiesHTML').style.display = 'none';
}

function getUserData() {
	firebase.database().ref('players/' + userId).on('value', function(snapshot) {
		// PERSONAGEM
		document.getElementById('character').innerHTML = snapshot.val().Character.name;
		document.getElementById('character-input').value = snapshot.val().Character.name;
		document.getElementById('race').innerHTML = snapshot.val().Character.race;
		document.getElementById('size').innerHTML = snapshot.val().Character.size;
		document.getElementById('age').innerHTML = snapshot.val().Character.age;
		document.getElementById('background').innerHTML = snapshot.val().Character.background;
		document.getElementById('background-input').value = snapshot.val().Character.background;
		// CONSTITUIÇÃO
		document.getElementById('body').innerHTML = sum(snapshot.val().Constitution.body);
		document.getElementById('movement').innerHTML = sum(snapshot.val().Constitution.movement);
		document.getElementById('mind').innerHTML = sum(snapshot.val().Constitution.mind);
		document.getElementById('spirit').innerHTML = sum(snapshot.val().Constitution.spirit);

		firebase.database().ref('players/' + userId + '/Constitution/vitality').update({'default': sum(snapshot.val().Constitution.body) });
		firebase.database().ref('players/' + userId + '/Constitution/resistance').update({'default': sum(snapshot.val().Constitution.body) });
		firebase.database().ref('players/' + userId + '/Constitution/defense').update({'default': sum(snapshot.val().Constitution.movement) });

		document.getElementById('vitality').innerHTML = sum(snapshot.val().Constitution.vitality) * 5;
		document.getElementById('resistance').innerHTML = sum(snapshot.val().Constitution.resistance) * 5;
		document.getElementById('defense').innerHTML = sum(snapshot.val().Constitution.defense);
		// ABILITIES
		document.getElementById('experience').innerHTML = snapshot.val().Abilities.experience;

		abilities = snapshot.val().Abilities.acquired;
		myAbilities = '';

		if (abilities) {
			console.log('got abilities');
		} else {
			console.log('got nothing :(');
		}
	});
}

function getAbilities() {
	firebase.database().ref('abilities/').on('value', function(snapshot) {
		console.log(snapshot.val());
	});
}

function sum(obj) {
  return Object.keys(obj).reduce((sum,key)=>sum+parseFloat(obj[key]||0),0);
}

function logoutUser(){
  firebase.auth().signOut()
  .then( function() {
    window.location.replace('index.html');
  }).catch( function (error) {
    alert("ERRO: " + error.message);
  });
}