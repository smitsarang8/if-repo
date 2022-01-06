import React from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import airtableAuth from '../airtableAuth'
import ProductItem from '../components/ProductItem'
const Storages = () => {

	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage')";
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);
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
	return (<>
		<Head>
			<title>Storages - Real Dukaan</title>
			<meta name="description" content="Storages at Real dukaan" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Storages at Real dukaan" />
			<meta property="og:description" content="Explore storages at Real Dukaan. India's shop listing platform which enables users to explore shops easily. Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
		<Navbar />
		<div class="container mx-auto flex py-12 flex-col">
			<div class="flex flex-col"></div>
			<div className="row">

				<div class="max-w-2xl mx-auto py-12 sm:py-12 lg:py-12 lg:max-w-none">
					<div class="lg:w-1/2 w-full py-6 lg:mb-0">
						<h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
							Storages
						</h1>
					</div>
					<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">

						{data.records.map((product, index) => (<div key={product.index}>

							<ProductItem product={product} />
						</div>))}

					</div>
				</div>
			</div>
		</div>

	</>
	)
}

export default Storages