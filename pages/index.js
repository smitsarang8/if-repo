import Head from 'next/head'
import React from 'react'
import TrendingShopsComp from "../components/TrendingShopsComp";

import LandingArea from '../components/LandingArea';
import Categories from '../components/Categories';
import Router from 'next/router'

import WhyUs from '../components/WhyUs';
import BuildersJoiningUs from '../components/BuildersJoiningUs';
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { useCookies } from "react-cookie"
import TrendingShops from '../components/TrendingShops';

export default function Home(products) {
  const [count, setCount] = React.useState(0);

  const [cookie, setCookie, removeCookie] = useCookies(["user"])
  removeCookie("user")
  const [isLoggedIn, setIsChecked] = React.useState(false);
  const [addedToFav, setAddedToFav] = React.useState(false);
  const [isLoggedOut, signOutDone] = React.useState(false);
  let app = null;
  const firebaseConfig = {
    apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
    authDomain: 'ddetails-47db8.firebaseapp.com',
    projectId: 'ddetails-47db8',
    storageBucket: 'ddetails-47db8.appspot.com',
    messagingSenderId: '231286919067',
    appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
  }
  app = firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setIsChecked(true)
    }
    else {
    }
  });

  const buyinsurat = () => {
    Router.push('search/buy-in-surat')
  }
  const ddClick = () => {
    setAddedToFav(!addedToFav);
  }
  const signOut = () => {
    try {
      firebase.auth().signOut().then((response) => {
        setCookie("user", JSON.stringify("/"), {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        })
        signOutDone(true)
        Router.push("/")
      });
    } catch (err) {
    }
  }

  return (
    <div>
      <Head>
        <title>Real Dukaan - Explore dukaan near you</title>
        <meta name="description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
        <meta property="og:title" content="Real Dukaan" />
        <meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
        <meta property="og:url" content="https://rdtesting.netlify.app/" />
        <meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
        <meta property="og:site_name" content="Real Dukaan" />
        <meta property="og:type" content="website" />

        <meta property="apple-mobile-web-app-title" content="Real Dukaan" />

        <link rel="icon" href="/icon.png" />

      </Head>
      <span>
        <LandingArea />
        
      </span>
      <main className="container mx-auto">
        <h1
          class="text-center py-6 sm:text-md text-md sm-title text-gray-900"
        >
          Quick search
        </h1>
        <div class="py-2 flex justify-center items-center">

          <a href="/search/buy-in-surat"
            type="button"
            class="px-4 py-3 rounded-md text-black outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
          >
            <span class="ml-2">Buy in Surat</span>
          </a>
          <a href="/search/rent-in-surat"
            type="button"
            class="px-4 py-3 rounded-md text-black outline-none focus:ring-4 shadow-lg transform active:scale-x-75 transition-transform mx-5 flex"
          >
            <span class="ml-2">Rent in Surat</span>
          </a>

        </div>
        <Categories />
        <div>
          <div className="row">

            <div class="max-w-2xl mx-auto py-12 sm:py-12 lg:py-12 lg:max-w-none">
                <TrendingShops products={products.products.records}/>
            </div>
          </div>

        </div>
        {/* <TrendingShops products={products.products.records} /> */}

        {/* <ShopInArcade products={products.shopinarcade.records} /> */}
        <WhyUs />

        <BuildersJoiningUs />
      </main>

      <Footer />
    </div>
  )
}
export const getStaticProps = async () => {
  const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?maxRecords=15&filterByFormula=AND({status}='approved',{propertyType}='shop',{isTrending}='yes')", {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bearer keyLRae2Fru3dnFqr',
    }),
  })
  const products = await res.json()
  const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?maxRecords=15&filterByFormula=AND({status}='approved',{propertyType}='shop',{propertySubType}='Shop in arcade')", {
    method: 'get',
    headers: new Headers({
      'Authorization': 'Bearer keyLRae2Fru3dnFqr',
    }),
  })
  const shopinarcade = await ress.json()
  return {
    props: {
      products,
      shopinarcade
    },
  }
}