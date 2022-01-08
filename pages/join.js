import React from 'react'
import Head from 'next/head'
import Navbar from '/components/Navbar'
import Router, { useRouter } from 'next/router'
import Footer from '/components/Footer';
import { useCookies } from "react-cookie"
import { useEffect, useState, useRef } from 'react';
import airtableAuth from '../airtableAuth'

let app = null;
Date().toLocaleString()


const SignUp = () => {

	useEffect(()=>{
		let unmounted = false;
	
		
		return () => {
			unmounted = true;
		};
			},)

	const [isSuccess, enqPlaced] = React.useState(false);

	const joinUsRequest = async event => {
		event.preventDefault();
		
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		const res = fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/join_req', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							name: "sm sara",
							location:"123",
							photoUrl : [{ url: "https://img.icons8.com/fluency/344/person-male.png" }],
							twitter: "t",
							linkedin:"l",
							skills:"a,b,c",
							about: "ab text",
							status:"pending",
							slug: "sm sara".toLowerCase().replace(/\s/g, ""),
							slugUrl: "/" + "sm sara".toLowerCase().replace(/\s/g, ""),
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
			enqPlaced(true)
		
	}
	

	
	return (
		<><Head>
			<title>Join - Indians Who Freelance</title>
			<meta name="description" content="" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="Indians Who Freelance" />
			<meta property="og:description" content="Indians Who Freelance is India's " />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			
					<div class="container mx-auto min-h-full flex items-left justify-left py-12 px-4 sm:px-6 lg:px-8">
						<div class="max-w-md w-full space-y-8">
							<div>
								<h2 class="mt-6 text-left text-3xl font-extrabold text-gray-900">
									Join us
								</h2>
								<p class="mt-2 text-left text-sm text-gray-600">
									Let's grow together.
								</p>
							</div>
							<div>
								<div class="md:gap-6">
									<div class="mt-5 md:mt-0 md:col-span-2">
										<form onSubmit={joinUsRequest} method="POST">
											<div class="shadow overflow-hidden sm:rounded-md">
											
																<div class="px-4 py-3 text-right sm:px-6">
																	<button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
																		Submit
																	</button>
																	<br />
																</div>
											</div>
										</form>
									</div>
								</div>
							</div>

						</div>
						{/* {isSuccess ? (
							<>
								<div
									className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
								>
									<div className="relative w-auto my-6 mx-auto max-w-sm">
										<div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
											<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
												Thanks for choosing us.

											</div>

											<div class="rounded-2xl p-4 bg-white w-64 m-auto">
												<div class="w-full h-full text-center">
													<div class="flex h-full flex-col justify-between">

														<p class="text-gray-600 text-md py-2 px-6">
															Request is placed. We will review it shortly.
														</p>
														<div class="flex items-center justify-between gap-4 w-full mt-8">
															<a href="/#"
																type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																Continue exploring
															</a>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null} */}
					</div>

			

			<Footer />
		</>
	)
}

export default SignUp
