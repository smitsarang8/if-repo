import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Router from 'next/router'
import Footer from '../../components/Footer'
import firebase from "firebase/compat/app";
import { useEffect, useState, useRef } from 'react';
import airtableAuth from '../../airtableAuth'
import ProductItem from '../../components/ProductItem'
import axios from 'axios'
import useSWR from 'swr'

import "firebase/compat/auth"
let email = "123123"
Router.push

const favourite = ({ }) => {
	const [area, setArea] = useState('all')
	const [areaLOV, setAreaLOV] = useState([])
	const [pType, setType] = useState('all')
	const [product, setProduct] = useState([])


	useEffect(() => {
		let unmounted = false;
		let address = ""
		console.log("render = " + pType + area)

		setAreaLOV([
			{ value: 'adajan', name: 'Adajan' },
			{ value: 'pal', name: 'Pal' }
		])
		if (pType === 'all' && area === "all") {
			address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{purpose}='sell',{city}='surat')`;
		} else if (pType != 'all' && area === "all") {
			address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='${pType}',{purpose}='sell',{city}='surat')`;
		}
		else if (pType != 'all' && area != "all") {
			address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='${pType}',{purpose}='sell',{area}='${area}',{city}='surat')`;
		} else if (pType == 'all' && area != "all") {
			address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{purpose}='sell',{area}='${area}',{city}='surat')`;
		}
		fetch(address, {
			method: 'get',
			headers: new Headers({
				'Authorization': airtableAuth.token
			}),
		}).then((res) => res.json()).then(json => {
			if (!unmounted) {
				setProduct(json)
				console.log(json)
			}
		});
		return () => {
			unmounted = true;
		};
	}, [area, pType])
	const areaChanged = (e) => {
		setArea(e)
	}

	const typeChanged = (e) => {
		setType(e)

	}
	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{purpose}='sell')";

	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data } = useSWR(address, fetcher);

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
	if (!data) return <div>	<Navbar /><div class="flex py-12 flex-col">
		<div class="flex flex-col">
			<div class="bg-white w-1/2 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
				<div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse">
				</div>
				<div class="flex flex-col flex-1 gap-5 sm:p-2">
					<div class="flex flex-1 flex-col gap-3">
						<div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
					</div>
					<div class="mt-auto flex gap-3">
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
						</div>
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
						</div>
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto">
						</div>
					</div>
				</div>
			</div>
		</div> </div>		<Footer />
	</div>
	return (
		<><Head>
			<title>Buy in Surat - Real Dukaan</title>
			<meta name="description" content="Sign in" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Buy in Surat - RealDukaan" />
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
						<h1 class="px-4 sm:text-2xl text-xl sm-title text-gray-900">
							Properties available to buy in Surat
						</h1>
						<span class="text-2xl sm-title text-gray-900">
							<div class="py-4 px-4 flex">

								<div class="mb-3 ml-4 xl:w-96">
									<label class="pl-1 font-regular text-sm text-black" htmlFor="purpose">
										Type
									</label>
									<select
										onChange={(e) => typeChanged(e.target.value)}
										class="form-select
										block
										w-full
										px-3
										py-1.5
										text-base
										font-normal
										text-gray-700
										bg-white bg-clip-padding bg-no-repeat
										border border-solid border-gray-300
										rounded
										transition
										ease-in-out
										m-0
										focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
										<option value="all" selected>All</option>
										<option value="shop">Shops</option>
										<option value="office">Offices</option>
										<option value="land-plot">Lands and plot</option>
										<option value="storage">Godowns</option>
										<option value="hospitality">Hospitality spaces</option>

									</select>
								</div>
								<div class="mb-3 ml-4 xl:w-96">
									<label class="pl-1 font-regular text-sm text-black" htmlFor="purpose">
										Area

									</label>
									<select
										onChange={(e) => areaChanged(e.target.value)}
										class="form-select
										block
										w-full
										px-3
										py-1.5
										text-base
										font-normal
										text-gray-700
										bg-white bg-clip-padding bg-no-repeat
										border border-solid border-gray-300
										rounded
										transition
										ease-in-out
										m-0
										focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
										<option value="all" selected>All</option>
										{areaLOV.map((e, key) => {
											return <option key={key} value={e.value}>{e.name}</option>;
										})}
									</select>
								</div>

							</div>
						</span>
					</div>
					{/* <div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
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

					</div> */}
					<div class="lg:space-y-0 lg:grid lg:grid-cols-3">
						{product.records ? product.records.map((product, index) => (<div key={product.index}>
							<ProductItem product={product} />
						</div>)) : data.records.map((product, index) => (<div key={product.index}>
							<ProductItem product={product} />
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

export default favourite
