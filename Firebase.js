import * as firebase from 'firebase';
import firestore from 'firebase/firestore'

//const settings = {timestampsInSnapshots: true};


//const firestore = firebase.firestore();
//yconst settings = {timestampsInSnapshots: true};
const settings = {};



const config = {
    apiKey: "AIzaSyAezcYVS2L35ZM784qz0TAiGaAWDDsSSTM",
    authDomain: "mycruddy-ddde5.firebaseapp.com",
    databaseURL: "https://mycruddy-ddde5.firebaseio.com",
    projectId: "mycruddy-ddde5",
    storageBucket: "mycruddy-ddde5.appspot.com",
    messagingSenderId: "54126816958"
    
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);
//firestore.settings(settings);
//firebase.firestore.settings({ timestampsInSnapshots: true }); 

export default firebase;




