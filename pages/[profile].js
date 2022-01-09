import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react';
import Head from "../components/CreatorHead"
import Footer from '../components/Footer';
import airtableAuth from '../airtableAuth'
const Owner = ({ authors, products, projects }) => {

	const router = useRouter()
	const { id } = router.query
	const [shareVar, setClipboard] = React.useState(false);

	// const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/join_req?filterByFormula=AND({status}='live',{slug}='" + router.query.profile + "')";
	// const fetcher = async (url) => await axios.get(url, {
	// 	headers: {
	// 		'Authorization': airtableAuth.token
	// 	}
	// }).then((res) => res.data);
	// const { data, error } = useSWR(address, fetcher);

	useEffect(() => {
		let unmounted = false;
		let address = ""
		// if (data) {
		// 	address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{ucode}='" + authors.records[0].fields.ucode + "')";
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
	const twitterLink = () => {
		if (authors.records[0].fields.twitter != "") {
			return <a href={authors.records[0].fields.twitter} class="px-2 text-white hover:text-blue-300">
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
				</svg>
			</a>
				;
		}
	}

	const linkedinLink = () => {
		if (authors.records[0].fields.linkedin) {
			return <a href={authors.records[0].fields.linkedin} class=" text-white hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="w-6 h-6 bi bi-linkedin" viewBox="0 0 16 16">
				<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
			</svg>
			</a>;
		}
	}

	const personalWeb = () => {
		if (authors.records[0].fields.personalWeb) {
			return <a href={authors.records[0].fields.personalWeb} class="px-2 text-white hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
				<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
			</svg>
			</a>;
		}
	}
	const handleShareButton = () => {
		// Check if navigator.share is supported by the browser
		if (navigator.share) {
			navigator
				.share({
					url: "https://if-repo.vercel.app/" + authors.records[0].fields.slug
				})
				.then(() => {
				})
				.catch(() => {
				});
		} else {
			navigator.clipboard.writeText("https://if-repo.vercel.app/" + authors.records[0].fields.slug)
			setClipboard(true)
		}
	};
	if (!authors) return <div>	<Navbar />  <div class="flex py-12 flex-col">
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



	if (!authors) return <div>	<Navbar />  <div class="flex py-12 flex-col"></div></div>
	let meta_desc = authors.records[0].fields.name + "  @(" + authors.records[0].fields.slug + ") - Indians Who Freelance"
	return (<>
		<Head title={authors.records[0].fields.name}  location={authors.records[0].fields.location} slug={authors.records[0].fields.slug} keywords={authors.records[0].fields.keywords} img={authors.records[0].fields.photoUrl[0].thumbnails.large.url} />
		{/* <Head>
			<title> {authors.records[0].fields.name} @({authors.records[0].fields.slug}) - Indians Who Freelance</title>
			<meta name="description" content={meta_desc} />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content={meta_desc} />
			<meta property="og:description" content="Visit this profile on Indians Who Freelance." />
			<meta property="og:url" content="https://if-repo.vercel.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />

		</Head> */}
		<Navbar />
		<div class="flex py-6  bg-black flex-col">
			<div class="flex flex-col">
				<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 ">
					<div class=" py-2 flex flex-col justify-center mx-auto sm:py-5">
						<div class="">
							<div class="h-auto py-20 px-10 bg-indigo-500 flex flex-col space-y-5 mx-auto rounded-3xl">

								<div class="flex items-center space-x-4">
									<img src={authors.records[0].fields.photoUrl[0].thumbnails.large.url}
										alt={authors.records[0].fields.name} width="88" height="88" class="rounded-full  flex-none  bg-gray-100" />
									<div class="min-w-0 flex-auto space-y-1 font-semibold">
										<h2 class="text-white text-2xl leading-6 truncate">
											{authors.records[0].fields.name}      </h2>
										<p class="text-white text-sm">
											{authors.records[0].fields.location}
										</p>
									</div>

								</div>
								<h2 class="font-normal tracking-wide text-md text-white lg:w-2/5">Connect me for <br /> {authors.records[0].fields.skills}</h2>


								<h2 class="font-normal tracking-wide text-xl text-white lg:w-2/5">{authors.records[0].fields.about}</h2>
								<div class="flex flex-col">
									<div class="flex justify-start space-x-2">
									{authors.records[0].fields.twitter ? twitterLink() : null}
							{authors.records[0].fields.linkedin ? linkedinLink() : null}
							{authors.records[0].fields.personalWeb ? personalWeb() : null}


									</div>

									<h1 onClick={handleShareButton} class="py-12 font-medium text-white text-md tracking-wide">Share my profile</h1>

								</div>
								{shareVar ? (
									<>
										<div
											className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
										>
											<div className="relative w-auto my-6 mx-auto max-w-sm">
												<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
													<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
														Thanks for choosing Indians Who Freelance.
													</div>

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

export async function getServerSideProps(context) {

	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/join_req?filterByFormula=AND({status}='live',{slug}='" + context.params.profile + "')", {
		method: 'get',
		headers: new Headers({
			'Authorization': airtableAuth.token
		}),
	})
	const resp = await res.json()
	return {
		props: {
			authors: resp,

		}, // will be passed to the page component as props
	}
}

export default Owner