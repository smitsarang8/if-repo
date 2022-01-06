import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
let app = null;

const firebaseConfig = {
	apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
	authDomain: 'ddetails-47db8.firebaseapp.com',
	projectId: 'ddetails-47db8',
	storageBucket: 'ddetails-47db8.appspot.com',
	messagingSenderId: '231286919067',
	appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
}
app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
try {
	firebase.auth().signOut().then((response) => {
		// window.location.href = "/";
	});
} catch (err) {
	console.error(err);
}

const SignOut = ({ children }) => {
	
	return (
		<>
		
		</>
	)
}

export default SignOut
