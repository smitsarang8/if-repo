import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';

const About = ({ products }) => {

	const router = useRouter()
	return (
		<><Head>
			<title>About us - Indians Who Freelance</title>
			<meta name="description" content="About us" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="About us - Indians Who Freelance" />
			<meta property="og:description" content="Indians Who Freelance is India's " />
			<meta property="og:url" content="https://if-repo.vercel.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			<div className="container mx-auto row">
				<section
					class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 body-font overflow-hidden"
				>
					<div class="container px-5 py-24 mx-auto">
						<div class="-my-8 divide-y-2 divide-gray-100">
							<div class="py-8 flex flex-wrap md:flex-nowrap">
								<div class="md:flex-grow">
									<h2 class="text-2xl font-medium text-gray-900 title-font mb-2">About Us</h2>
									<p class="leading-relaxed">
										At Indians Who Freelance.
									</p>
								</div>
							</div>

							<div class="py-8 flex flex-wrap md:flex-nowrap">
								<div class="md:flex-grow">
									<div class="bg-white  w-full mx-auto p-8">
										<p
											class="text-gray-600  w-full md:w-2/3 m-auto text-center text-lg md:text-3xl"
										>
											<span class="font-bold text-indigo-500"> “ </span>
											We are here to make it happen.<span class="font-bold text-indigo-500">
												”
											</span>
										</p>
										<div class="flex items-center justify-center mt-8">
											<span>&#128640;</span>
											<div class="flex ml-2 items-center justify-center">
												<span class="font-semibold text-indigo-500 mr-2 text-lg"> Team Indians Who Freelance</span>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
						<section class="bg-white dark:bg-gray-900">
							<div class="container px-6 py-10 mx-auto">
								<div class="xl:flex xl:items-center xL:-mx-4">
									<div class="xl:w-1/2 xl:mx-4">
										<h1 class="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">Our Team</h1>

										<p class="max-w-2xl mt-4 text-gray-500 dark:text-gray-300">
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt ex placeat modi magni quia error alias, adipisci rem similique, at omnis eligendi optio eos harum.
										</p>
									</div>

									<div class="grid grid-cols-1 gap-8 mt-8 xl:mt-0 xl:mx-4 xl:w-1/2 md:grid-cols-2">
										<div>
											<img class="object-cover rounded-xl h-64 w-full" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />

											<h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">John Doe</h1>

											<p class="mt-2 text-gray-500 capitalize dark:text-gray-300">Full stack developer</p>
										</div>

										<div>
											<img class="object-cover rounded-xl h-64 w-full" src="https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" alt="" />

											<h1 class="mt-4 text-2xl font-semibold text-gray-700 capitalize dark:text-white">Mia</h1>

											<p class="mt-2 text-gray-500 capitalize dark:text-gray-300">Graphic Designer</p>
										</div>
									</div>
								</div>
							</div>
						</section>
					</div>
				</section>
			</div>
			<Footer />
		</>
	)
}


export default About
