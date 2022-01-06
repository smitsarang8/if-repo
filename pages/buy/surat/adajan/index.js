import React from 'react'
import Head from 'next/head'
import Navbar from '../../../../components/Navbar'
import Router from 'next/router'
import Footer from '../../../../components/Footer'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
let email = "123123"
Router.push

const favourite = ({ product, email }) => {


	const loadFav = async (context) => {
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
				email = user.email
			}
			else {
			}
		})
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?&filterByFormula=AND({status}='active',{email}='smitindi@gmail.com')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const favprops = await ress.json()
	}
	loadFav()

	const pricings = () => {
		if (product.records[0].fields.purpose == "sell") {
			return <p class=""><span class="text-semibold text-xl">₹ {product.records[0].fields.sellPrice}</span></p>;
		} else if (product.records[0].fields.purpose == "rent") {
			return <p>
				<span class="text-semibold text-xl">₹ {product.records[0].fields.rentMonthly} Monthly</span>
			</p>;
		} else if (product.records[0].fields.purpose == "Both") {
			return <p>
				Sell: ₹ {product.records[0].fields.sellPrice}<br />
				Rent: ₹
				{product.fields.records[0].rentMonthly} (monthly)
			</p>;
		}
	}
	const purpose = () => {
		if (product.records[0].fields.purpose == "sell") {
			return <p class="absolute top-0 bg-green-500 text-white py-1 px-3 rounded-br-lg rounded-tl-lg">SELL</p>;
		} else if (product.records[0].fields.purpose == "rent") {
			return <p class="absolute top-0 bg-blue-500 text-white py-1 px-3 rounded-br-lg rounded-tl-lg">RENT</p>;
		} else if (product.records[0].fields.purpose == "Both") {
			return <p class="absolute top-0 bg-red-500 text-white py-1 px-3 rounded-br-lg rounded-tl-lg">SELL/RENT</p>;
		}
	}
	return (
		<><Head>
			<title>Shops - Real Dukaan</title>
			<meta name="description" content="Sign in" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Sign-In - RealDukaan" />
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
						<h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
							Search results
						</h1>
					</div>
					<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
					{product.records.map(product => (

						<div>
								<a
				href={`/p/${product.fields.slug}`}
				class="group relative"
			>
				<div class="p-1 px-4 max-w-md py-3">
					<div
						class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg"
					>
						<img
							class="relative w-full h-60 rounded-t-lg"
							src={product.fields.get_thumbnail_url[0].thumbnails.large.url}
							alt={product.fields.name}
						/>
						<div class=" rounded-lg">
							{/* <div
								class="flex flex-wrap justify-starts items-center py-3 text-xs text-white font-medium"
							>
								<span class="m-1 px-1 py-1 rounded bg-gray-700">
									{product.fields.square_feet} sq.ft
								</span>
							</div>

							<h1
								class="m-1 text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer"
							>
								{product.fields.name}
							</h1>

							<div class="flex text-sm text-gray-500">
								<div class="m-1 flex-1 inline-flex items-center">
									<p class="">{product.fields.shortAddress}</p>
								</div>
							</div>



							<span>
								<div class="flex py-4 text-sm text-gray-500">
									<div class="m-1 flex-1 inline-flex items-center">
										{pricings()}
									</div>
								</div>
							</span> */}
							<div class="py-2 flex border-box p-1 m-1 flex-col">
							<p class=" text-lg">{product.fields.name}</p>
							<p class="text-sm text-gray-500">{product.fields.shortAddress}</p>

							<p class="py-2">{pricings()}</p>
							{/* <a class="text-center text-sm bg-blue-500 rounded py-2 text-white mt-2">View Item</a> */}
						</div>
						{/* <div class="pl-0 absolute flex-col w-full h-48 top-2">
							<div class="bg-red-500 text-white w-1/4 text-center rounded-r-xl">
								{purpose()}
							</div>						</div>*/}
						</div> 
						{purpose()}


					</div>
				</div>

			</a>

						</div>))}
						
					</div>
				</div>

			</div>
			<Footer />
		</>
	)
}

// export const getServerSideProps = () => {
// 	let app = null;
// 	cons 
// 	const firebaseConfig = {
// 		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
// 		authDomain: 'ddetails-47db8.firebaseapp.com',
// 		projectId: 'ddetails-47db8',
// 		storageBucket: 'ddetails-47db8.appspot.com',
// 		messagingSenderId: '231286919067',
// 		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
// 	  }
// 	app = firebase.initializeApp(firebaseConfig);
// 	firebase.auth().onAuthStateChanged(async user => {
// 		if (user) {
// 			const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?&filterByFormula=AND({status}='active',{email}='smitisndi@gmail.com')", {
// 				method: 'get',
// 				headers: new Headers({
// 					'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 				}),
// 			})
// 			const favprops = await ress.json()

// 		}
// 		else {
// 		}
// 	  })


//   return {
//     props: {products:favprops}
//   }
// }

export const getStaticProps = async (context) => {
	let app = null;
	
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({purpose}='Sell',{city}='surat',{area}='adajan')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	return {
		props: {
			product: favprops,
		},
	}
}


export default favourite
