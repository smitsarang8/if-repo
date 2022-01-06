import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
const OnBoard = ({ children }) => {
	const router = useRouter()
	const { pSlug } = router.query
	return (
		<><Head>
			<title>On board - Real Dukaan</title>
			<meta name="description" content="On board" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="On board - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full space-y-8">
					<div>
						<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Create an account
						</h2>
						<p class="mt-2 text-center text-sm text-gray-600"></p>
					</div>
					<form class="mt-8 space-y-6" method="get">
					

						<div>
							<a
							href="/seller/sign-up"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								As a seller
							</a>
						</div>
						<div>
							<a
							href="/buyer/sign-up"
							class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								As a buyer
							</a>
						</div>
						<div class="flex items-center justify-between">
							<div class="text-sm">
								<a
									href="/sign-in"
									class="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Already have an account ?
								</a>
							</div>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	)
}

export default OnBoard
