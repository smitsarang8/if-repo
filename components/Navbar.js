import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import Router from 'next/router'
import React from 'react'
import { useCookies } from "react-cookie"

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



const Navbar = () => {

	let app = null;
	const [cookie, setCookie, removeCookie] = useCookies(["user"])

	const [isLoggedIn, setIsChecked] = React.useState(false);
	const [addedToFav, setAddedToFav] = React.useState(false);
	const [isLoggedOut, signOutDone] = React.useState(false);
	const [cUser, setCuser] = React.useState('');
	const [cUname, setCuname] = React.useState('');
	const [cDP, setDP] = React.useState('');
	const [cProfileSlug, setProfileSlug] = React.useState('');
	const firebaseConfig = {
		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
		authDomain: 'ddetails-47db8.firebaseapp.com',
		projectId: 'ddetails-47db8',
		storageBucket: 'ddetails-47db8.appspot.com',
		messagingSenderId: '231286919067',
		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
	}
	app = firebase.initializeApp(firebaseConfig);
	const getUname = async()=>{
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?&filterByFormula=AND({status}='approved',{email}='"+cUser+"')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	favprops.records.map((n) => { if (n.fields.email){
		setCuname(n.fields.name);
		setProfileSlug(n.fields.slug)
		try{
			if(n.fields.thumbnailUrl[0].thumbnails.small.url){
				setDP(n.fields.thumbnailUrl[0].thumbnails.small.url)
			}else{
				setDP("https://img.icons8.com/fluency/344/person-male.png")
			}
		}
		catch(err){

		}
		
		} });
	}
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			setCuser(user.email)
			getUname(setCuser)
			
			setIsChecked(true)
		}
		else {
		}
	});

	const ddClick = () => {
		setAddedToFav(!addedToFav);
	}
	const signOut = () => {
		try {
			firebase.auth().signOut().then((response) => {
				if (cookie.user) {
					removeCookie("user")
				}
				signOutDone(true)
				Router.push("/")
			});
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<span>
			{isLoggedIn ? <nav class="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5">
				<div class="container mx-auto flex flex-wrap items-center justify-between">
					<a href="/" class="flex">
						<h2 class="font-bold text-4xl text-white">Rd.</h2>
						{/* <img src='https://dl.airtable.com/.attachmentThumbnails/efc813d6d96cc18435e43ec3660d46d1/354de663' class="h-14 mr-3" viewBox="0 0 52 72" /> */}
					</a>
					<button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-500 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
						<div class="ml-3 relative">
							<div>
								<ul class="flex-col md:flex-row flex md:space-x-8 mt-2 md:mt-0 md:text-sm md:font-medium">
									<li>
										<p
											onClick={ddClick}
											class="font-md py-2 bg-gray-800 px-4 text-white w-full transition ease-in duration-200 text-center rounded-lg"
										>
											<div class="flex">
										<div class="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
											<img src={cDP} alt={cUname} />
										</div>
										<span class="pt-1 ml-2 text-white text-sm">{cUname}</span>
									</div>

										</p>

										{addedToFav ? (
											<>
											
												<div class=" ropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
													<div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
													
													<div class="py-1">
															<a href={cProfileSlug} class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >View my profile</a></div>
														<div class="py-1">
															<a href="/list-property" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >List property</a></div>
														<div class="py-1">
															<a href="/favourites" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Favourite properties</a></div>
														<div class="py-1">
															<p onClick={signOut} class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Log out</p></div>
												
													</div>
												</div>
												
											</>
											
										) : null}
									</li>

								</ul>
							</div>



						</div>
					</button>
					{isLoggedOut ? (
						<>
							<div
								className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
							>
								<div className="relative w-auto my-6 mx-auto max-w-sm">
									<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
										<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">

										</div>

										<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
											<div class="w-full h-full text-center">
												<div class="flex h-full flex-col justify-between">

													<p class="text-gray-600 text-md py-2 px-6">
														Successfully logged out
													</p>
													<div class="flex items-center justify-between gap-4 w-full mt-8">
														<a href="/"
															type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
															Continue
														</a>

													</div>

												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}
					<div class="hidden md:block w-full md:w-auto" id="mobile-menu">
						<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
							<li>
								<button type="button" class="ml-3 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
									<a href="/sign-in"
										class="font-md py-2 px-4 bg-white w-full transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
									>
										<span
											class="animate-ping relative inline-flex rounded-full h-2 w-2 bg-red-600"
										></span>
										<span class="pl-2 text-black"
										>Start Listing
											<span
												class="px-1 py-1 ml-2 text-xs rounded text-white bg-red-600 font-medium"
											>
												FREE
											</span>
										</span>
									</a>
								</button>
							</li>
							<li>
								<p
									class="font-md py-3 px-4 text-white w-full transition ease-in duration-200 text-center rounded-lg"
								>
									<a href={cProfileSlug} class="flex">
										<div class="rounded-full h-8 w-8 flex items-center justify-center overflow-hidden">
											<img src={cDP} alt={cUname} />
										</div>
										<span class="pt-1 ml-2 text-white text-sm">{cUname}</span>
									</a>
								</p>

								{addedToFav ? (
									<>
										<div class="dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
											<div class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md outline-none" aria-labelledby="headlessui-menu-button-1" id="headlessui-menu-items-117" role="menu">
												<div class="py-1">
													<a href="/list-property" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >List property</a></div>
												<div class="py-1">
													<a href="/favourites" class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Favourite properties</a></div>
												<div class="py-1">
													<p onClick={signOut} class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left" >Log out</p></div>
											</div>
										</div>
									</>
								) : null}
							</li>
							<li>
								<p
									class="font-md py-3 px-4 text-black w-full transition ease-in duration-200 text-center rounded-lg"
								>
									<div class="flex">

										<a href="/favourites" class="pt-1 py-2 text-white text-sm">Favourites</a>
									</div>
								</p>
							</li>
							<li>
								<p onClick={signOut}
									class="font-md py-3 px-4 text-black w-full transition ease-in duration-200 text-center rounded-lg"
								>
									<div class="flex">

										<span class="pt-1 py-2 font-bold text-white text-sm">Log out</span>
									</div>
								</p>
							</li>
							<li>
								<span class="h-14 w-14 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
									<img src="https://img.icons8.com/color/48/ffffff/india.png" />
								</span>
							</li>
						</ul>				</div>
				</div>
			</nav> : <nav class="bg-gray-800 border-gray-200 px-2 sm:px-4 py-2.5 ">
				<div class="container mx-auto flex flex-wrap items-center justify-between">
					<a href="/" class="flex">
						<h2 class="font-bold text-white text-4xl">Rd.</h2>
						{/* <img src='https://dl.airtable.com/.attachmentThumbnails/efc813d6d96cc18435e43ec3660d46d1/354de663' class="h-14 mr-3" viewBox="0 0 52 72" /> */}
					</a>
				
					<button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
						<a href="/sign-in"
							class="font-md py-2 px-4 text-white w-full transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
						>
							<span
								class="animate-ping relative inline-flex rounded-full h-2 w-2 bg-red-600"
							></span>
							<span class="pl-2 text-white"
							>Start Listing
								<span
									class="px-1 py-1 ml-2 text-xs rounded text-white bg-red-600 font-medium"
								>
									FREE
								</span>
							</span>
						</a>
					</button>
					
					<div class="hidden md:block w-full md:w-auto" id="mobile-menu">
						<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
							<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
								<li>
									<p
										class="bg-gray-800 font-md py-2 px-4 bg-white text-black w-full transition ease-in duration-200 text-center rounded-lg"
									>
										<a a
											href="/sign-in" class="flex">

											<span class="pt-2 py-2 text-sm"><span
												class="animate-ping relative inline-flex rounded-full h-2 w-2 bg-red-600"
											></span>
												<span class="pl-2 text-white"
												>Start Listing
													<span
														class="px-1 py-1 ml-2 text-xs rounded text-white bg-red-600 font-medium"
													>
														FREE
													</span>
												</span></span>
										</a>
									</p>
								</li>
								<li>
									<button type="button" class="text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
										<a href="/sign-in"
											class="font-md py-2 bg-white px-4 w-full transition ease-in duration-200 text-center rounded-lg"
										>
											<span class=" text-black"
											>Login
											</span>

										</a>
									</button>
								</li>
								<li>
									<span class="h-14 w-14 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
										<img src="https://img.icons8.com/color/48/ffffff/india.png" />
									</span>
								</li>
							</ul>
						</ul>				</div>
				</div>
			</nav>}
		</span>

	)
}

export default Navbar