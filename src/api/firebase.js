
import fbConfig from '../config/firebase';
import firebase from 'firebase'

firebase.initializeApp(fbConfig);

export const database = firebase.database();
