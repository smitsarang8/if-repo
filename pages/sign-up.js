import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
const SignUp = ({ children }) => {
	const router = useRouter()
	const { pSlug } = router.query
	return (
		<><Head>
			<title>Sign up- Indians Who Freelance</title>
			<meta name="description" content="Sign up" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="Sign-Up - Indians Who Freelance" />
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
						<p class="mt-2 text-center text-sm text-gray-600">
							<span>&#128640;</span> Your journey is about to begin.
						</p>
					</div>
					<form class="mt-8 space-y-6" method="get">
						<p class="text-danger">Something wrong</p>
						<div class="rounded-md shadow-sm -space-y-px">
							<div class="col-span-6 sm:col-span-3">
								<label for="country" class="block text-sm font-medium text-gray-700"
								>You are <span class="text-red-400">*</span></label
								>
								<select
									required
									v-model="businessType"
									name="type"
									class="form-select bg-white appearance-none py-2 px-3 border border-solid border-gray-400 rounded w-full"
								>
									<option value="Agent" selected>Agent</option>
									<option value="Builder">Builder</option>
									<option value="Individual">Individual</option>
								</select>
							</div>
							<br />
							<div>
								<label for="email-address" class="block text-sm font-medium text-gray-700"
								>Business name <span class="text-red-400">*</span></label
								>
								<input
									v-model="businessName"
									name="text"
									type="text"
									required
									class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
							</div>
							<div>
								<label class="block text-sm font-medium text-gray-700">
									Photo
								</label>
								<div class="mt-1 flex items-center">
									<span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
										<svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
											<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
										</svg>
									</span>
									<button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Change
									</button>
								</div>
							</div>


							<div class="col-span-6 sm:col-span-3">
								<label for="email-address" class="block text-sm font-medium text-gray-700"
								>Email <span class="text-red-400">*</span></label
								>
								<input
									v-model="email"
									name="email"
									type="text"
									required
									class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
							</div>
							<br />
							<div>
								<label for="password" class="block text-sm font-medium text-gray-700"
								>Set Password (must be 6 character long)
									<span class="text-red-400">*</span></label
								>
								<input
									v-model="password"
									name="password"
									type="password"
									autocomplete="current-password"
									required
									class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
							</div>
							<div>
								<label for="password" class="block text-sm font-medium text-gray-700"
								>Confirm Password <span class="text-red-400">*</span></label
								>
								<input
									v-model="cnfPassword"
									name="cnfPassword"
									type="password"
									required
									class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
							</div>
							<br />
							<div>
								<label for="email-address" class="block text-sm font-medium text-gray-700"
								>City <span class="text-red-400">*</span></label
								>
								<input
									v-model="businessCity"
									name="city"
									type="text"
									required
									class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
								/>
							</div>
							<div>
							<label for="email-address" class="block text-sm font-medium text-gray-700"
                  >About</label
                >
                <input
                  v-model="about"
                  name="about"
                  type="text"
                  class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
							</div>
							<br />
							<div>
							<label for="email-address" class="block text-sm font-medium text-gray-700"
                  >Contact Number <span class="text-red-400">*</span></label
                >
                <input
                  v-if="!this.isProcessing"
                  v-model="contactNumber"
                  name="contact"
                  type="tel"
                  required
                  class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
                <input
                  v-if="this.isProcessing"
                  v-model="contactNumber"
                  disabled
                  type="tel"
                  class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
							</div>
							
						</div>


						<i v-if="this.isProcessing" class="fa fa-upload text-dark" aria-hidden="true"
						>Validating OTP...</i
						>
						<div>
							<button
								type="submit"
								class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Sign in
							</button>
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

export default SignUp
