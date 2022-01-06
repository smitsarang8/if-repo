import React from 'react'
import Head from 'next/head'
import Navbar from '../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import FavProductItem from '../components/FavProductItem'

const Contact = ({ products }) => {

	return (
		<><Head>
			<title>Contact us - Real Dukaan</title>
			<meta name="description" content="Contact us" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Contact us - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
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
                Email : <a href="mailto:collab.realdukaan@gmail.com" > collab.realdukaan@gmail.com </a>
              </p>
               <p class="leading-relaxed">
                Call : <a href="tel:+919725995322">+919725995322 </a>
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
                      Team Real Dukaan</span
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
export const getStaticProps = async (context) => {
	let app = null;
	const email = null

	const firebaseConfig = {
		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
		authDomain: 'ddetails-47db8.firebaseapp.com',
		projectId: 'ddetails-47db8',
		storageBucket: 'ddetails-47db8.appspot.com',
		messagingSenderId: '231286919067',
		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
	  }
	app = firebase.initializeApp(firebaseConfig);
	const getEmail = () =>{
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
			  return user.email
			}
			else {
			}
		  })
	
	}

	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?&filterByFormula=AND({status}='active',{email}='"+getEmail()+"')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const favprops = await ress.json()
	return {
		props: {
			products: favprops,
		},
	}
}


export default Contact
