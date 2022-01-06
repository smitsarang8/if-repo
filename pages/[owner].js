import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';

import Footer from '../components/Footer';
import TrendingShopComp from '../components/TrendingShopsComp'
import airtableAuth from '../airtableAuth'
import ProductCardOwner from '../components/ProductCardOwner'
const Owner = ({ authors, products, projects }) => {

	const router = useRouter()
	const { id } = router.query
	const [vcDone, vcPlaced] = React.useState(false);
	const [product, setProduct] = useState([])


	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status}='approved',{slug}='" + router.query.owner + "')";
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);
	useEffect(() => {
	// let address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status} = 'approved',{ucode} = '" + data.records[0].fields.ucode + "')" 
	// alert(address)
	// fetch(address, {
		// 	method: 'get',
		// 	headers: new Headers({
		// 		'Authorization': airtableAuth.token
		// 	}),
		// }).then((res) => res.json()).then(json => {
		// 	if (!unmounted) {
		// 		setProduct(json)
		// 	}
		// });
		// return () => {
		// 	unmounted = true;
		// };
	},)

	if (error) return <div>	<Navbar />failed to load {error}			<Footer />
	</div>
	if (!data) return <div>	<Navbar />  <div class="flex py-12 flex-col">
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
	const placeBEnq = async event => {
		event.preventDefault();
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/business_inquiry', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							name: event.target.name.value,
							contactNumber: event.target.number.value,
							business_slug: router.query.owner,
							status: "pending",
							timestamp: datetime
						}
					}
				]


			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			},
			method: 'POST'
		})

		const result = await res.status
		vcPlaced(true)
	}

	
	if (error) return <div>	<Navbar />failed to load {error}			<Footer />
	</div>
	if (!data) return <div>	<Navbar />  <div class="flex py-12 flex-col">dsadadsa</div></div>
	
	return (<>
		<Head>
			<title> {data.records[0].fields.name} - Real Dukaan</title>
			<meta name="description" content={data.records[0].fields.name} />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content={data.records[0].fields.name} />
			<meta property="og:description" content="Visit this profile on Real Dukaan. India's shop listing platform which enables users to explore shops easily and efficiently. Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
		<Navbar />
		<div class="flex py-12 flex-col">
			<div class="flex flex-col">
				<div class="flex py-12 flex-col">
					<img
						src={data.records[0].fields.thumbnailUrl[0].thumbnails.large.url}
						alt={data.records[0].fields.name}
						class="avatar shadow w-28 mx-auto rounded-sm"
					/>
					<p class="text-3xl my-2 text-center">
						{data.records[0].fields.name}
					</p>
					<span
						class="font-md py-2 px-4 text-black w-full transition ease-in duration-200 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
					>
						<span class="text-lg">{data.records[0].fields.city}</span>
					</span>

				</div>
			</div>


			<div class=" text-center">
				<div class="flex flex-wrap justify-center">
					<div class="w-full lg:w-9/12 px-4">
						<p
							class="text-sm leading-relaxed text-blueGray-700"
						>
							Connect now.
						</p>
					</div>
				</div>
			</div>
			<div class="flex items-center justify-center mt-4">
				<form
					onSubmit={placeBEnq}
					method="get"
					class="flex flex-col md:flex-row justify-center"
				>
					<div class="pl-2 relative">
						<input
							required
							type="text"
							name="name"
							class="py-4 my-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
							placeholder="Name"
						/>
					</div>
					<div class="pl-2 relative">
						<input
							required
							type="tel"
							name="number"
							class="py-4 my-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent"
							placeholder="Contact number"
						/>
					</div>
					<button
						class="py-4 my-2 flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-green-400"
						type="submit"
					>
						Connect
					</button>
				</form>
			</div>
			{vcDone ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div className="relative w-auto my-6 mx-auto max-w-sm">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									Thanks for connecting.

								</div>
								{/*body*/}

								<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
									<div class="w-full h-full text-center">
										<div class="flex h-full flex-col justify-between">

											<p class="text-gray-600 text-md py-2 px-6">
												We will get back to you soon.
											</p>
											<div class="flex items-center justify-between gap-4 w-full mt-8">
												<button onClick={() => vcPlaced(false)}
													type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
													Thanks
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
					<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
					{typeof(product)}
					{/* {loadProperties()} */}
					</div>
				</div>
			</div>
		</div>
		<Footer />

	</>

	)
}

// export const getStaticProps = async (context) => {

// 	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status} = 'approved',{slug} = '" + context.params.owner + "')", {
// 		method: 'get',
// 		headers: new Headers({
// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 		}),
// 	})
// 	const resp = await res.json()
// 	const ucode = resp.records[0].fields.ucode

// 	const propres = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status} = 'approved',{ucode} = '" + ucode + "')", {
// 		method: 'get',
// 		headers: new Headers({
// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 		}),
// 	})
// 	const propresp = await propres.json()


// 	const projres = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/projects?filterByFormula=AND({status} = 'approved',{ucode} = '" + ucode + "')", {
// 		method: 'get',
// 		headers: new Headers({
// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 		}),
// 	})
// 	const projresp = await projres.json()

// 	return {
// 		props: {
// 			authors: resp,
// 			products: propresp,
// 			projects :projresp
// 		},
// 	}
// }

// export async function getStaticPaths() {
// 	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status} = 'approved')", {
// 		method: 'get',
// 		headers: new Headers({
// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 		}),
// 	})
// 	const products = await res.json()

// 	const paths = products.records.map((user) => ({
// 		params: { owner: String(user.fields.slug) },

// 	}))

// 	return { paths, fallback: false }
// }

export default Owner