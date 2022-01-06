import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"

const TandC = ({ products }) => {

	return (
		<><Head>
			<title>Terms and Conditions - Real Dukaan</title>
			<meta name="description" content="Terms and Conditions " />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Terms and Conditions  - RealDukaan" />
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
                Terms and Conditions
              </h2>
              <p class="leading-relaxed">
                Following terms and conditions are applied by and between You and Real
                Dukaan, (“Company”, “We”, or “Us”).<br />
                The following terms and conditions, controls your access and use of
                website including any content, functionality, and services offered on or
                through Real Dukaan, website, apps, social media (Collectively).
              </p>
            </div>
          </div>
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Please read the terms and conditions carefully before you start to use the
                website.
              </h2>
              <p class="leading-relaxed">
                By using website, you accept and agree to follow and abide by these Terms
                and conditions. If you do not want to agree to these terms and conditions
                you must not access or use the website.
              </p>
              <p class="leading-relaxed py-4">
                The website and services are offered and available to users who are 18
                years of age or older. By using the services, you represent that you are
                of legal age to form a contract with the company and compliance all of the
                listed eligibility requirements. If you do not meet all of these
                requirements, you must not access or use website and services.
              </p>
              <p class="leading-relaxed py-4">
                You are solely responsible for ensuring that your use of website and
                services complies with all applicable law.<br />
              </p>
              <p class="leading-relaxed py-4">
                We hold the rights, at our side, to change, modify, add or remove part of
                these terms and conditions , at any time without any prior notice to you.
                <br />
                It is your responsibility to review these at specific time of intervals
                for any new updates or changes.
                <br />
                Your continued use of the website or services will mean that you accept
                and agree to the all the revisions.(made to these terms and conditions
                periodically)
              </p>
            </div>
          </div>
          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Disclaimer related to authenticity of content (should be considered by
                consumer)
              </h2>
              <p class="leading-relaxed">
                Any user should conduct validation and make authenticity of any property,
                or project information. Like its name / build up area / square feet, any
                other details with respect of suitability for buying / renting at his or
                her cost.
              </p>
              <p class="leading-relaxed py-4">
                As Real dukaan providing a platform. It may not or cannot validate the
                authenticity of content in its services. As increased number of content is
                uploaded by the lister on daily basis. If any complaint is made, we will
                try to take required steps of measurements accordingly.
              </p>

              <p class="leading-relaxed py-4">
                Any photographs shown on the website may include producer's impression of
                the property or project. And the actual properties may vary from such
                representations.<br />
                We advise you to visit property personally.
              </p>
              <p class="leading-relaxed py-4">
                For under construction projects or properties , Users should verify the
                accuracy of all concerned information from the RERA website (as and when
                applicable) to ensure the project is registered.
              </p>
              <p class="leading-relaxed py-4">
                Truthfulness and confidentiality of your account information is your
                responsibility.<br />You are responsible for maintaining the
                confidentiality of your password, email, and other account information
                which you provide to us at all times. <br />We are not responsible for
                your personal data transmitted to a third party as a result of an
                incorrect email or loss of passwords from your side.
              </p>
              <p class="leading-relaxed py-4">
                If you show interest for business loan, or any other services which we may
                help you with. You agree and authorize us to share the your identifiable
                information with such companies providing business loan and/or other
                services, and such companies may call, email, or SMS you with reference to
                your interest.
              </p>
            </div>
          </div>

          <div class="py-8 flex flex-wrap md:flex-nowrap">
            <div class="md:flex-grow">
              <h2 class="text-2xl font-medium text-gray-900 title-font mb-2">
                Disclaimer related to authenticity of content (should be considered by
                owner/lister)
              </h2>
              <p class="leading-relaxed">
                You acknowledge that the given information by you while listing any
                property/project is actual and authentic.
              </p>
              <p class="leading-relaxed py-4">
                To list your property you agree that company may request for following
                details in order to approve your listing.
                <br />
                Property name, Price, Rent, Exact location of property or project. Any
                other data that company may require in order to approve and list your
                property .
              </p>

              <p class="leading-relaxed py-4">
                You confirm that you will comply with all the applicable laws while
                uploading listings on the website. <br />
                We advise you to visit property personally to ensure property is genuine
                (in any case if it is applicable)
              </p>
              <p class="leading-relaxed py-4">
                Moreover (if applicable), you confirm that you have all the rights to
                upload the listing and / or content posted on the website and it’s not in
                violation of any of the laws as may be applicable at any time.
              </p>
              <p class="leading-relaxed py-4">
                Company may reserve the right to cancel/remove any content from being
                published on website or in any other mode.
              </p>
              <p class="leading-relaxed py-4">
                As Real Dukaan providing a platform. You agree to give us right to add on
                some more helpful information regarding each of the properties/projects which you
                requested to list. Such as nearby places, most suitable for, and/or other
                related fields which improves understanding of your property listing
                purpose.
              </p>
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


export default TandC
