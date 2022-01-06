import Router from 'next/router'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import React from 'react'
import { useCookies } from "react-cookie"

const LandingArea = () => {
	const [cookie, setCookie, removeCookie] = useCookies(["user"])
	const [uname, setUname] = React.useState("");

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
	const [isLoggedIn, setIsChecked] = React.useState(false);
	const [addedToFav, setAddedToFav] = React.useState(false);
	const [isLoggedOut, signOutDone] = React.useState(false);
	const [cUser, setCuser] = React.useState('');
	const [cUname, setCuname] = React.useState('');
	const [cDP, setDP] = React.useState('');
	const [cProfileSlug, setProfileSlug] = React.useState('');

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			setIsChecked(true)
			setCuser(user.email)
			getUname(setCuser)
		}
		else {
		}
	});

	const getUname = async()=>{
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?&filterByFormula=AND({status}='approved',{email}='"+cUser+"')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	favprops.records.map((n) => { if (n.fields.email){setCuname(n.fields.name);
		setProfileSlug(n.fields.slug);
		setDP(n.fields.thumbnailUrl[0].thumbnails.small.url)} });
	}
	
	const loadUsername = () => {

		const res = fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status} = 'approved',{email}='smitindi@gmail.com')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		return cUser
	}

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
				Router.push("/sign-in")
			});
		} catch (err) {
			console.error(err);
		}
	}

	const search = async event => {
		event.preventDefault();
		Router.push("/" + event.target.purpose.value + "/" + event.target.city.value + "/" + event.target.area.value)
	}
	return (
		<span class="" >

			<div class="bg-indigo-900 relative overflow-hidden">
				<img src="https://images.unsplash.com/photo-1527584473785-5a11328dd421?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" class="absolute h-full w-full object-cover" />
				<div class="inset-0 bg-black opacity-25 absolute">
				</div>
				<header class="absolute top-0 left-0 right-0 z-20">

				</header>
				<div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-16 xl:py-20">
					<div class="container px-5 py-12 mx-auto">
						<div class="flex flex-col text-center w-full">
							<h1 class="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
								<span class="block xl:inline ">Exploring shops made easy</span>
							</h1>
							<p class="lg:w-2/3  mx-auto leading-relaxed text-white py-3">We are here for you</p>
						</div>
						<div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end">
							<form onSubmit={search} class="mx-auto my-2 lg:flex lg:justify-left">
								<div class="pl-3 mb-3">
									<label class="pl-1 font-regular text-white" htmlFor="purpose">
										Purpose
										<select
											name="purpose"
											class="mt-2 text-black block w-52 py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
										>
											<option value="buy" defaultValue="">Buy</option>
											<option value="rent">Rent</option>
										</select>
									</label>
								</div>
								<div class="pl-4 mb-3">
									<label class="pl-1 text-white" htmlFor="city">
										City
										<select
											name="city"
											v-model="city"
											class="mt-2 text-black block w-52 py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
										>
											<option value="surat" defaultValue="">Surat</option>
										</select>
									</label>
								</div>
								<div class="pl-4 lg:mb-0 lg:w-full lg:max-w-xs">
									<label class="pl-1 text-white" htmlFor="area">
										Area
										<select
											name="area"
											v-model="area"
											class="mt-2 text-black block w-52 py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
										>
											<option value="adajan" defaultValue="">Adajan</option>
											<option value="pal">Pal</option>
										</select>
									</label>
								</div>
								<div class="pl-2 hidden md:block mb-3 py-6">
									<label class="font-regular" htmlFor="purpose">
										<button
											type="submit"
											class="py-2 mt-2 px-4 flex justify-center items-center bg-green-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 w-12 h-12 rounded-md"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="24px"
												viewBox="0 0 24 24"
												width="24px"
												fill="#FFFFFF"
											>
												<path d="M0 0h24v24H0V0z" fill="none" />
												<path
													d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
												/>
											</svg>
										</button>
									</label>
								</div>

								<div class="pl-2 md:hidden mb-3 py-6">
									<label class="font-regular" htmlFor="purpose">
										<button
											type="submit"
											class="mt-2 bg-green-500 text-white block w-56 py-4 px-3  rounded-md "
										>
											Search
										</button>
									</label>
								</div>
							</form>
						</div>
						{/* <div class="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:px-0 items-end">
							<form onSubmit={search} class="mx-auto my-2 lg:flex lg:justify-left">

								<span class="px-4 py-2  text-base rounded-full text-indigo-500 border border-indigo-500 undefined ">
									Hello
								</span>


								<span class="px-4 py-2  text-base rounded-full text-indigo-500 border border-indigo-500 undefined ">
									Hello
								</span>



							</form>
						</div> */}
					</div>
				</div>
			</div>

			<div class="bg-indigo-900">

				<header class="absolute top-0 left-0 right-0 z-10">
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


				</header>

			</div>



		</span>
	)
}


export default LandingArea