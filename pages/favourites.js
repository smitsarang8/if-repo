import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import ProductItem from '../components/ProductItem'
import { list } from 'postcss';
import { useCookies } from "react-cookie"

const favourite = ({ products }) => {
	const [cookie, setCookie, removeCookie] = useCookies(["user"])

	let cEmail = null
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
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			setCookie("user", JSON.stringify(user.email), {
				path: "/",
				maxAge: 3600, // Expires after 1hr
				sameSite: true,
			})
		}
		else {
			console.log()
		}
	})


	const getFav = () => {






		let cEmail = null
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
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				products.records.map((n) => { if (n.fields.email == cEmail) { console.log(user.email) } });
			}
			else {
				console.log()
			}
		})
		// {
		// 	products.records.map((p, index) => {
		// 		if (p.fields.email == "smitindi@gmail.com")
		// 			// console.log(index)
		// 			whichOne.push(index)
		// 		// console.log(...new Set(whichOne))
		// 		return "123"
		// 	})
		// }

		whichOne.map((p, index) => { console.log(p) })



	}

	const loadNearBy = () => {
		console.log(cookie.user)
		let cEmail = null
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
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				products.records.map((n) => { if (n.fields.email == cEmail) { console.log(user.email) } });
			}
			else {
				console.log()
			}
		})
		let whichOne = []
		products.records.map((p, index) => {
			if (p.fields.email == cookie.user)
				// console.log(index)
				whichOne.push(index)
		})
		const amenitiesArray = "adf,afd,f,dasdsa".split(",")
		console.log("--->" + whichOne.join())
		if (amenitiesArray) {
			const listItems = whichOne.map((number) => {
				const pricings = (number) => {
					if (products.records[number].fields.purpose == "sell") {
						return <p class=""><span class="text-semibold text-xl">₹ {products.records[number].fields.sellPrice}</span></p>;
					} else if (products.records[number].fields.purpose == "rent") {
						return <p>
							<span class="text-semibold text-xl">₹ {products.records[number].fields.rentMonthly} Monthly</span>
						</p>;
					} else if (products.records[number].fields.purpose == "Both") {
						return <p>
							Sell: ₹ {products.records[number].fields.sellPrice}<br />
							Rent: ₹
							{products.records[number].fields.rentMonthly} (monthly)
						</p>;
					}
				}
				const purpose = (number) => {
					if (products.records[number].fields.purpose == "sell") {
						return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>;
					} else if (products.records[number].fields.purpose == "rent") {
						return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>;
					}
				}
				return <a
					href={`/p/${products.records[number].fields.slug}`}
					class="px-4 py-2 group relative"
				>
					<div class="max-w-md w-full lg:flex">
						<div class="wrapper antialiased text-gray-900">
							<div>

								<img src={products.records[number].fields.get_thumbnail_url}
									alt=" random imgee" class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  w-full object-cover object-center rounded-lg shadow-md" />

								<div class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 relative px-4 -mt-16  ">
									<div class="bg-white p-6 rounded-lg shadow-lg">
										<div class="flex items-baseline">
											{purpose(number)} <span class="inline-block rounded-md text-black py-1 px-1 text-xs"> - In {products.records[number].fields.address_1}</span>
											<div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
											</div>
										</div>

										<h4 class="mt-1 text-xl font-semibold leading-tight truncate">{products.records[number].fields.name}</h4>
										<div class="mt-1 text-gray-500">
											{products.records[number].fields.shortAddress}
										</div>
										{pricings(number)}
									</div>
								</div>
							</div>
						</div>
					</div>

				</a>
					;
			});
			return (
				<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
					{listItems}</div>
			);
		}

	}
	return (
		<><Head>
			<title>Favourites - Real Dukaan</title>
			<meta name="description" content="Sign in" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Search result - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			<div className="container mx-auto row">

				<div class="px-4 max-w-2xl mx-auto py-12 sm:py-12 lg:py-12 lg:max-w-none">
					<div class="lg:w-1/2 w-full py-6 lg:mb-0">
						<h1 class=" sm:text-3xl text-2xl sm-title text-gray-900">
							Favourites
						</h1>
					</div>
					{loadNearBy()}
				</div>

			</div>
			<Footer />
		</>
	)
}

favourite.getInitialProps = async (ctx) => {
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?&filterByFormula=AND({status}='active')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	return { products: favprops }
}
// export const getStaticProps = async (context) => {

// 	let app = null;
// 	const email = null

// 	const firebaseConfig = {
// 		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
// 		authDomain: 'ddetails-47db8.firebaseapp.com',
// 		projectId: 'ddetails-47db8',
// 		storageBucket: 'ddetails-47db8.appspot.com',
// 		messagingSenderId: '231286919067',
// 		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
// 	  }
// 	app = firebase.initializeApp(firebaseConfig);
// 	const getEmail = () =>{
// 		firebase.auth().onAuthStateChanged(function (user) {
// 			if (user) {
// 			  return user.email
// 			}
// 			else {
// 			}
// 		  })

// 	}

// 	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?&filterByFormula=AND({status}='active',{email}='smitindi@gmail.com')", {
// 		method: 'get',
// 		headers: new Headers({
// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 		}),
// 	})
// 	const favprops = await ress.json()
// 	return {
// 		props: {
// 			products: null,
// 		},
// 	}
// }


export default favourite