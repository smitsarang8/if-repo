import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Router from 'next/router'
import Footer from '../../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
let email = "123123"

const shop = ({ product, email }) => {
	const [searchTerm, setSearchTerm] = React.useState('')
	const [isChecked, setIsChecked] = React.useState(false);
	const [newArray, setNewArray] = React.useState(product)
	const handleOnChange = (e) => {
		setSearchTerm(e.target.value)
		setIsChecked(!isChecked);
	};
	var hahaha = product
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
		const officesObj = await ress.json()
	}
	loadFav()
	const search = async event => {
		event.preventDefault();
		Router.push("/shop-search/" + event.target.purpose.value + "-" + event.target.city.value + "-" + event.target.area.value)
	}
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
	const filteroffices = async event => {
		event.preventDefault();
		// Router.push("/offices/" + event.target.purpose.value + "-" + event.target.city.value + "-" + event.target.area.value)
		alert(event.target.kw.value)

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
			<title>Land and plots - Real Dukaan</title>
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
					{/* <div class="flex items-center">
						<button onClick={() => { showFilterModal(true) }} type="button" class="w-full flex items-center text-base font-medium rounded-l-md text-black bg-white px-4 py-2">
							<img src="https://img.icons8.com/material-sharp/24/000000/filter--v2.png" />
							Filter
						</button>
					</div> */}
					<div class="lg:w-1/2 w-full py-6 lg:mb-0">

						{filterClicked ? (
							<>
								<div
									className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
								>
									<div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
										<div class="relative bg-white rounded-lg shadow ">
											<div class="flex justify-between items-start p-5 rounded-t border-b ">
												<h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">
													Filter office               </h3>
												<button onClick={() => showFilterModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="default-modal">
													<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
												</button>
											</div>
											<div class="p-6 ">
												<form onSubmit={filteroffice} class="" method="POST">

													<input type="hidden" name="remember" value="true" />
													<div class="rounded-md shadow-sm -space-y-px">
														<div>
															<label class="block text-sm font-medium text-gray-700">
																Purpose <span class="text-red-400">*</span>
															</label>
															<select
																required
																name="purpose"
																class="form-select text-black block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
															>
																<option value="all" >All</option>
																<option value="sell" >Buy</option>
																<option value="rent" >Rent</option>
															</select>
														</div>

														<br />

														<div class="grid grid-cols-6 gap-6">
															<div class="col-span-6 sm:col-span-3">
																<label class="block text-sm font-medium text-gray-700">
																	City <span class="text-red-400">*</span>
																</label>
																<select
																	required
																	name="city"
																	class="form-select text-black block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
																>
																	<option value="all" >All</option>
																	<option value="surat" >Surat</option>
																	<option value="ahmedabad" >Ahmedabad</option>
																</select>
															</div>

															<div class="col-span-6 sm:col-span-3">
																<label class="block text-sm font-medium text-gray-700">
																	Area <span class="text-red-400">*</span>
																</label>
																<select
																	required
																	name="area"
																	class="form-select text-black block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
																>
																	<option value="all" >All</option>
																	<option value="pal" >Pal</option>
																	<option value="adajan" >Adajan</option>
																	<option value="bopal" >Bopal</option>
																</select>																		</div>
														</div>
														<div>
														</div>
													</div>
													<div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
														<button type="submit" class="text-white bg-green-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Apply filter</button>
														<button onClick={() => showFilterModal(false)} data-modal-toggle="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Go back</button>
													</div>
												</form>

											</div>

										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null}

						<h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
							Lands & plots available to buy
						</h1>
						<br/>						
						<p class="px-4 text-gray-800">Suggestions: <a href="/land-plots/rent" class="ml-2 py-2 px-2 rounded-full text-indigo-500 border border-indigo-500">Rent Land & plots</a></p>
						<br/>						
								


					</div>

					<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
						{newArray.records.map((product, index) => (

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
						{/* {product.records.filter((product,index) => {
							if (product.fields.keywords.toLowerCase().includes(searchTerm.toLowerCase())) {
								return product
							}
						}).map((product, index) => {
							return <div class="px-4 py-2">
								{index}-{product.fields.purpose}
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


							</div>
						})} */}

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
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='sell')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const shopsObj = await ress.json()
	return {
		props: {
			product: shopsObj,
		},
	}
}


export default shop
