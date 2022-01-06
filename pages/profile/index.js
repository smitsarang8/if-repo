import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import ProductItem from '../../components/ProductItem'
import { list } from 'postcss';
import { useCookies } from "react-cookie"

const favourite = ({ authors,context,products }) => {
	const [cookie, setCookie, removeCookie] = useCookies(["user"])
	const [shareVar, setClipboard] = React.useState(false);
	const [uCode , setUcode] = React.useState('')
	
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
				// products.records.map((n) => { if (n.fields.email == cEmail) { console.log(user.email) } });
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

	const loadProperties = () => {
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
				products.records.map((n) => { if (n.fields.email == cEmail) { setUcode('HUB41202240') } });
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
				console.log(...new Set(whichOne))
		})
		const amenitiesArray = "adf,afd,f,dasdsa".split(",")
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

							<img src={products.records[number].fields.get_thumbnail_url[0].thumbnails.large.url}
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
	const pricings = () => {
		if (products.records[0].fields.purpose == "sell") {
			return <div class="mt-1 text-lg">
				₹ {products.records[0].fields.sellPrice}
			</div>
				;
		} else if (products.records[0].fields.purpose == "rent") {
			return <div class="mt-1 text-lg">
				₹ {products.records[0].fields.rentMonthly} (Monthly)
			</div>;
		}
	}
	const purpose = () => {
		if (products.records[0].fields.purpose == "sell") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
				;
		} else if (products.records[0].fields.purpose == "rent") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>
				;
		}
	}
	const loadUserInfo = () => {
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
				authors.records.map((n) => { if (n.fields.email == cEmail) { console.log(user.email) } });
			}
			else {
				console.log()
			}
		})
		let whichOne = []
		authors.records.map((p, index) => {
			if (p.fields.email == cookie.user)
				// console.log(index)
				whichOne.push(index)
		})
		const amenitiesArray = "adf,afd,f,dasdsa".split(",")
		if (amenitiesArray) {
			const listItems = whichOne.map((number) => {
				return <div><img
					src={authors.records[number].fields.thumbnailUrl[0].thumbnails.large.url}
					alt={authors.records[number].fields.name}
					class="avatar shadow w-28 mx-auto rounded-sm"
				/>
					<p class="text-3xl my-2 text-center">
						{authors.records[number].fields.name} <br />
						<span class="text-lg">{authors.records[number].fields.city}</span><br />
						<span class="text-lg">{authors.records[number].fields.about}</span>

					</p>
					<span
						class="font-md py-2 px-4 text-black w-full transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
					</span>
				</div>

					;
			});
			return (
				<div class="">
					{listItems}
				</div>
			);
		}

	}
	const handleShareButton = () => {
		let whichOne = []
		authors.records.map((p, index) => {
			if (p.fields.email == cookie.user)
				// console.log(index)
				whichOne.push(index)
		})
		const listItems = whichOne.map((number) => {
			return authors.records[number].fields.slug;
		});
		// Check if navigator.share is supported by the browser
		if (navigator.share) {
			navigator
				.share({
					url: "https://rdtesting.netlify.app/" + listItems
				})
				.then(() => {
				})
				.catch(() => {
				});
		} else {
			navigator.clipboard.writeText("https://rdtesting.netlify.app/" + listItems)
			setClipboard(true)
		}
	};
	return (
		<><Head>
			<title>Profile - Real Dukaan</title>
			<meta name="description" content="Profile" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Profile - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			<div class="flex py-12 flex-col">
				{loadUserInfo()}

				<div class=" text-center">
					<div class="flex flex-wrap justify-center">
						<div class="w-full lg:w-9/12 px-4">
							<p
								onClick={handleShareButton}
								class="text-sm leading-relaxed text-blueGray-700"
							>
								Share your profile link
							</p>
						</div>
					</div>
				</div>
				{shareVar ? (
					<>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-auto my-6 mx-auto max-w-sm">
								{/*content*/}
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									{/*header*/}
									<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
										Thanks for choosing RealDukaan.
									</div>
									{/*body*/}

									<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
										<div class="w-full h-full text-center">
											<div class="flex h-full flex-col justify-between">

												<p class="text-gray-600 text-md py-2 px-6">
													Sharable link copied.
												</p>
												<div class="flex items-center justify-between gap-4 w-full mt-8">
													<button onClick={() => setClipboard(false)}
														type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														Done
													</button>
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
				
				<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div class="max-w-2xl mx-auto py-16 sm:py-24 lg:py-16 lg:max-w-none">

						<h2 class="text-2xl sm-title text-gray-900">Properties listed</h2>

						{loadProperties()}
					</div>
				</div>
			</div>

			<Footer />
		</>
	)
}

favourite.getInitialProps = async (context) => {

	const resauth = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?&filterByFormula=AND({status}='approved')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	
	const author = await resauth.json()
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	
	return {authors: author ,products:favprops,context : context.query.q}

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