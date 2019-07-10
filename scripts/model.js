// Initialize Firebase database
const firebaseConfig = {
    apiKey: "AIzaSyBY5RRgbzzEAxu3H8PHhLRjMLLC-Fr6RVk",
    authDomain: "npv-calculator-jpc.firebaseapp.com",
    databaseURL: "https://npv-calculator-jpc.firebaseio.com",
    projectId: "npv-calculator-jpc",
    storageBucket: "",
    messagingSenderId: "897313862825",
    appId: "1:897313862825:web:5ec5d63427172545"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database().ref().child('NPV');

async function GetPreviousResults() {
    return database.once('value').then(function(snapshot) {
        return snapshot.val();
    });
}

async function SaveResult(newResults) {
    return database.set(newResults);
}