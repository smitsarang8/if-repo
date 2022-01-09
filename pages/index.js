import Head from 'next/head'
import React from 'react'
import TrendingShopsComp from "../components/TrendingShopsComp";
import airtableAuth from '../airtableAuth'

import LandingArea from '../components/LandingArea';
import Router from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import { useCookies } from "react-cookie"
import TrendingShops from '../components/TrendingShops';
import FooterCTA from '../components/FooterCTA';
export default function Home(products) {

  return (
    <div>
      <Head>
        <title>Indians Who Freelance - Connecting freelancers made easy</title>
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
      <main >

            <TrendingShops products={products.products.records} />
        
        
        {/* <ShopInArcade products={products.shopinarcade.records} /> */}

       <FooterCTA/>
      </main>

      <Footer />
    </div>
  )
}
export const getStaticProps = async () => {
  const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/join_req?maxRecords=50&filterByFormula=AND({status}='live')", {
    method: 'get',
    headers: new Headers({
			'Authorization': airtableAuth.token
    }),
  })
  const products = await res.json()
  
  return {
    props: {
      products    },
  }
}