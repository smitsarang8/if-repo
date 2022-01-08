import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

const TandC = ({ products }) => {

	return (
		<><Head>
			<title>Terms and Conditions - Indians Who Freelance</title>
			<meta name="description" content="Terms and Conditions " />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="Terms and Conditions  - Indians Who Freelance" />
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
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Terms and Conditions
              </h2>
              
            </div>
          </div>
          
        

          
        </div>
      </div>
    </section>``
			</div>
			<Footer />
		</>
	)
}

export default TandC
