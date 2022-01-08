import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import Head from "next/head"
import Footer from '../components/Footer';
import airtableAuth from '../airtableAuth'
const Owner = ({ authors, products, projects }) => {

	const router = useRouter()
	const { id } = router.query
	const [shareVar, setClipboard] = React.useState(false);

	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/join_req?filterByFormula=AND({status}='live',{slug}='" + router.query.profile + "')";
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);

	useEffect(() => {
		let unmounted = false;
		let address = ""
		// if (data) {
		// 	address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{ucode}='" + data.records[0].fields.ucode + "')";
		// }
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
		return () => {
			unmounted = true;
		};

	})

	const handleShareButton = () => {
		// Check if navigator.share is supported by the browser
		if (navigator.share) {
			navigator
				.share({
					url: "https://rdtesting.netlify.app/" + data.records[0].fields.slug
				})
				.then(() => {
				})
				.catch(() => {
				});
		} else {
			navigator.clipboard.writeText("https://rdtesting.netlify.app/" + data.records[0].fields.slug)
			setClipboard(true)
		}
	};
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


	if (error) return <div>	<Navbar />failed to load {error}			<Footer />
	</div>
	if (!data) return <div>	<Navbar />  <div class="flex py-12 flex-col"></div></div>

	return (<>
		{/* <Head title={data.records[0].fields.name} keywords={data.records[0].fields.keywords} img={data.records[0].fields.thumbnailUrl[0].thumbnails.large.url}/> */}
		<Head>
			<title> {data.records[0].fields.name} @({data.records[0].fields.slug}) - Indians Who Freelance</title>
			<meta name="description" content={data.records[0].fields.name} />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content={data.records[0].fields.name} />
			<meta property="og:description" content="Visit this profile on Indians Who Freelance. India's shop listing platform which enables users to explore shops easily and efficiently. Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />

		</Head>
		<Navbar />
		<div class="flex py-12 flex-col">
			<div class="flex flex-col">
				<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 ">
					<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center mx-auto sm:py-5">
						<div class="">
							<div class="h-auto py-20 px-10 bg-indigo-500 flex flex-col space-y-5 mx-auto rounded-3xl  ease-in-out delay-150 hover:translate-y-1 hover:scale-110  transition-transform">
								<div class="w-full md:w-2/5 h-50">
									<img class="object-center object-cover w-full h-full" src={data.records[0].fields.photoUrl[0].thumbnails.large.url}
										alt={data.records[0].fields.name} />
								</div>
								<h1 class=" font-medium text-white text-3xl tracking-wide">{data.records[0].fields.name}</h1>
								<h1 class=" font-medium text-white text-md tracking-wide">{data.records[0].fields.location}</h1>

								<h2 class="font-normal tracking-wide text-xl text-white lg:w-2/5">{data.records[0].fields.about}</h2>
								<div class="flex flex-col">
									<div class="flex justify-start space-x-2">
										<a href="#" class="text-white hover:text-blue-300">
											<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
												<path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path>
											</svg>
										</a>
										<a href="#" class="text-white hover:text-blue-300">
											<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
												<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path>
											</svg>
										</a>
										<a href="#" class="text-white hover:text-blue-300">
											<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
											</svg>
										</a>
										<a href="#" class="text-white hover:text-blue-300">
											<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
												<path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path>
											</svg>
										</a>
									</div>
									
									<h1 onClick={handleShareButton} class="py-4 font-medium text-white text-md tracking-wide">Share my profile</h1>

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
																				Thanks for choosing Indians Who Freelance.
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
																								Hurray
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
							</div>
						</div>
					</div>

				</section>

			</div>


		</div>
		<Footer />

	</>

	)
}

// export const getStaticProps = async (context) => {

// 	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status} = 'approved',{slug} = '" + context.params.profile + "')", {
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
// 		params: { profile: String(user.fields.slug) },

// 	}))

// 	return { paths, fallback: false }
// }

export default Owner