import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import Router from 'next/router'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"


const SignIn = ({ children }) => {

	let app = null;
	const [isLoggedIn, setIsChecked] = React.useState(false);

	const firebaseConfig = {
		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
		authDomain: 'ddetails-47db8.firebaseapp.com',
		projectId: 'ddetails-47db8',
		storageBucket: 'ddetails-47db8.appspot.com',
		messagingSenderId: '231286919067',
		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
	}
	app = firebase.initializeApp(firebaseConfig);
	const navigateHome = () => {
		Router.push("/list-property")
	}
	const auth = app.auth();
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			setIsChecked(true)
			navigateHome()

		}
	});


	const signOut = () => {
		try {
			firebase.auth().signOut().then((response) => {
				Router.push("/")
			});
		} catch (err) {
			console.error(err);
		}
	}
	const signIn = async event => {

		event.preventDefault();
		const email = event.target.email.value
		const password = event.target.password.value
		try {
			firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
				navigateHome()
			});
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<><Head>
			<title>Login in- Real Dukaan</title>
			<meta name="description" content="Login in" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Log In - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar/>

			<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full space-y-8">
					<div>
						<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Login in to your account
						</h2>
						<p class="mt-2 text-center text-sm text-gray-600"></p>
					</div>
					<form class="mt-8 space-y-6" onSubmit={signIn}>
						<div class="rounded-md shadow-sm -space-y-px">
							<div>
								<label for="email-address" class="sr-only">Email</label>
								<input
									name="email"
									type="email"
									autocomplete="email"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Email"
								/>
							</div>
							<br />
							<div>
								<label for="password" class="sr-only">Password</label>
								<input
									name="password"
									type="password"
									autocomplete="current-password"
									required
									class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									placeholder="Password"
								/>
							</div>
						</div>

						<div>
							<button
								type="submit"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Log in
							</button>
						</div>
						<div class="flex items-center justify-between">
							<div class="text-sm">
								<a
									href="/on-board"
									class="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Don't have an account ?
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default SignIn
