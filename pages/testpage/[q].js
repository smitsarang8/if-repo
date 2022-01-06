import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Router from 'next/router'
import Footer from '../../components/Footer'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
let email = "123123"

const sr = ({ product, s }) => {
	const [filterClicked, showFilterModal] = React.useState(false)

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
			<title>test - Real Dukaan</title>
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
					<div class="flex items-center">
						<button onClick={() => { showFilterModal(true) }} type="button" class="w-full flex items-center text-base font-medium rounded-l-md text-black bg-white px-4 py-2">
							<img src="https://img.icons8.com/material-sharp/24/000000/filter--v2.png" />
							Filter {s}
						</button>
					</div>
					<div class="lg:w-1/2 w-full py-6 lg:mb-0">

						{filterClicked ? (
							<>
								<div
									className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
								>
									<div className="relative w-auto my-6 mx-auto max-w-sm">
										<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
											<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
												Thanks for choosing RealDukaan.

											</div>

											<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
												<div class="w-full h-full text-center">
													<div class="flex h-full flex-col justify-between">

														<p class="text-gray-600 text-md py-2 px-6">
															Enquiry placed. <br /> We will get back to you soon
														</p>
														<div class="flex items-center justify-between gap-4 w-full mt-8">
															<button onClick={() => showFilterModal(false)}
																type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																Filter
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

						<h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
							Search results for shops
						</h1>
					</div>
					<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
						{product.records.map((product, index) => (


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

// sr.getInitialProps = async (ctcontextx) => {
// }
// export const getServerSideProps = async (context) => {
sr.getInitialProps = async (context) => {
	// var slugs=String(context.query.q).split("-")
	var slugs = []
	slugs = String(context.query.q).split("-")
	if (slugs[0] == "buy") {
		slugs[0] = "sell"
	}
	// if (slugs.length == 1) {
	// 	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='" + slugs[0] + "')", {
	// 		method: 'get',
	// 		headers: new Headers({
	// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
	// 		}),
	// 	})
	// 	const shopsObj = await ress.json()
	// 	return {
	// 		props: {
	// 			product: shopsObj,
	// 		},
	// 	}
	// } 
	// else if (slugs.length == 2) {
	// 	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='" + slugs[0] + "',{city}='" + slugs[1] + "')", {
	// 		method: 'get',
	// 		headers: new Headers({
	// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
	// 		}),
	// 	})
	// 	const shopsObj = await ress.json()
	// 	return {
	// 		props: {
	// 			product: shopsObj,
	// 			slug: slugs
	// 		},
	// 	}
	// } else if (slugs.length == 3) {
	// 	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='" + slugs[0] + "',{city}='" + slugs[1] + "',{area}='" + slugs[2] + "')", {
	// 		method: 'get',
	// 		headers: new Headers({
	// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
	// 		}),
	// 	})
	// 	const shopsObj = await ress.json()
	// 	return {
	// 		props: {
	// 			product: shopsObj,
	// 		},
	// 	}
	// }
	if (slugs[1] == "all" && slugs[2] == "all") {
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{purpose}='" + slugs[0] + "')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const favprops = await ress.json()
		return {
			product: favprops,
			s: slugs
		}
	}else if (slugs[1] != "all" && slugs[2] == "all") {
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{purpose}='" + slugs[0] + "',{city}='" + slugs[1] + "')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const favprops = await ress.json()
		return {
			product: favprops,
			s: slugs
		}
	}else if (slugs[1] != "all" && slugs[2] != "all") {
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{purpose}='" + slugs[0] + "',{city}='" + slugs[1] + "',{area}='" + slugs[2] + "')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const favprops = await ress.json()
		return {
			product: favprops,
			s: slugs
		}
	}else{
		const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{purpose}='" + slugs[0] + "',{city}='" + slugs[1] + "',{area}='" + slugs[2] + "')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const favprops = await ress.json()
		return {
			product: favprops,
			s: slugs
		}
	}
	

}
export default sr
