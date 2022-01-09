import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
import LandingArea from '../components/LandingArea';

const Contact = ({ products }) => {

	return (
		<><Head>
			<title>Contact us - Indians Who Freelance</title>
			<meta name="description" content="Contact us" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:title" content="Contact us - Indians Who Freelance" />
			<meta property="og:description" content="Indians Who Freelance is India's " />
			<meta property="og:url" content="https://if-repo.vercel.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
      <LandingArea/>
			<div className="bg-black row">
			<section
      class="container mx-auto  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-600 body-font overflow-hidden"
    >
      <div class="container px-5 py-6 mx-auto">
        <div class="-my-8 divide-y-2 divide-gray-100">
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-white title-font mb-2">
                Contact us
              </h2>
              <p class="text-white leading-relaxed">
                To enable the use of technology at its fullest. We are completely remote
                company. You can always reach to us via email / socials.
              </p>
              <p class="py-6 text-white leading-relaxed">
               Email : <br/>
               Twitter : <br/>
               Instagram :

              </p>

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
