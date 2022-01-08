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
			<title>On board - Indians Who Freelance</title>
			<meta name="description" content="On board" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="On board - Indians Who Freelance" />
			<meta property="og:description" content="Indians Who Freelance is India's " />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
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
