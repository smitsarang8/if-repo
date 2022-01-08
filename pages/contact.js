import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';

const Contact = ({ products }) => {

	return (
		<><Head>
			<title>Contact us - Indians Who Freelance</title>
			<meta name="description" content="Contact us" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="Contact us - Indians Who Freelance" />
			<meta property="og:description" content="Indians Who Freelance is India's " />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
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
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Contact us
              </h2>
              <p class="leading-relaxed">
                To enable the use of technology at its fullest. We are completely remote
                company. You can always reach to us via email / call.
              </p>
            </div>
          </div>

          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Reach us on
              </h2>
              <p class="leading-relaxed">
                Email : <a href="mailto:" > x </a>
              </p>
               <p class="leading-relaxed">
                Call : <a href="tel:">x </a>
              </p>
            </div>
          </div>

          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <div class="bg-white w-full mx-auto p-8">
                <p
                  class="text-gray-600 w-full md:w-2/3 m-auto text-center text-lg md:text-3xl"
                >
                  <span class="font-bold text-indigo-500"> “ </span>
                  We are here to make it happen and allow you to explore shops, In an
                  easier and efficient way.<span class="font-bold text-indigo-500">
                    ”
                  </span>
                </p>
                <div class="flex items-center justify-center mt-8">
                  <span>&#128640;</span>
                  <div class="flex ml-2 items-center justify-center">
                    <span class="font-semibold text-indigo-500 mr-2 text-lg">
                      Team Indians Who Freelance</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

			</div>
			<Footer />
		</>
	)
}

export default Contact
