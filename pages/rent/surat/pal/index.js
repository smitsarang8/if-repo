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
	const pricings = (index) => {
		if (product.records[index].fields.purpose == "sell") {
			return <p class=""><span class="text-semibold text-xl">₹ {product.records[index].fields.sellPrice}</span></p>;
		} else if (product.records[index].fields.purpose == "rent") {
			return <p>
				<span class="text-semibold text-xl">₹ {product.records[index].fields.rentMonthly} Monthly</span>
			</p>;
		} else if (product.records[index].fields.purpose == "Both") {
			return <p>
				Sell: ₹ {product.records[index].fields.sellPrice}<br />
				Rent: ₹
				{product.fields.records[index].rentMonthly} (monthly)
			</p>;
		}
	}
	const purpose = (index) => {
		if (product.records[index].fields.purpose == "sell") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
				;
		} else if (product.records[index].fields.purpose == "rent") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>;
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

					
<div class="px-4 py-2">
<a
				href={`/p/${product.fields.slug}`}
				class="group relative"
			>
				<div class="max-w-md w-full lg:flex">
					<div class="wrapper antialiased text-gray-900">
						<div>

							<img src={product.fields.get_thumbnail_url[0].thumbnails.large.url}
								alt=" random imgee" class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  w-full object-cover object-center rounded-lg shadow-md" />

							<div class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 relative px-4 -mt-16  ">
								<div class="bg-white p-6 rounded-lg shadow-lg">
									<div class="flex items-baseline">
										{purpose(index)} <span class="inline-block rounded-md text-black py-1 px-1 text-xs"> - In {product.fields.address_1}</span>
										<div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
										</div>
									</div>

									<h4 class="mt-1 text-xl font-semibold leading-tight truncate">{product.fields.name}</h4>
									<div class="mt-1 text-gray-500">
										{product.fields.shortAddress}
									</div>
									{pricings(index)}
								</div>
							</div>

						</div>
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
	
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({purpose}='Rent',{city}='surat',{area}='pal')", {
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
