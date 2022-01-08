import Head from 'next/head'
import React from 'react'
import TrendingShopsComp from "../components/TrendingShopsComp";

import LandingArea from '../components/LandingArea';
import Router from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { useCookies } from "react-cookie"
import TrendingShops from '../components/TrendingShops';

export default function Home(products) {

  return (
    <div>
      <Head>
        <title>Indians Who Freelance - Finding freelancers made easy</title>
        <meta name="description" content="Indians Who Freelance is India's " />
        <meta property="og:title" content="Indians Who Freelance" />
        <meta property="og:description" content="Indians Who Freelance is India's " />
        <meta property="og:url" content="https://if-repo.vercel.app/" />
        <meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
        <meta property="og:site_name" content="Indians Who Freelance" />
        <meta property="og:type" content="website" />

        <meta property="apple-mobile-web-app-title" content="Indians Who Freelance" />

        <link rel="icon" href="/icon.png" />

      </Head>
      <span>
        <Navbar/>
        <LandingArea />

      </span>
      <main className="container mx-auto">

        <div>
          <div className="row">

            <div class="max-w-2xl mx-auto py-12 sm:py-12 lg:py-12 lg:max-w-none">
            {/* <TrendingShopsComp /> */}
            </div>
          </div>

        </div>
        {/* <TrendingShops products={products.products.records} /> */}

        {/* <ShopInArcade products={products.shopinarcade.records} /> */}

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