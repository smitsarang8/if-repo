import React from 'react'
import Head from 'next/head'

import { useRouter } from 'next/router'

const ProductPageUI = ({ product }) => {
	const router = useRouter()
	const { pSlug } = router.query
	return (
		<>
			<Head>
				<title>product</title>
				<meta name="description" content="Explore  on Real Dukaan. " />
				<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			</Head>
			<h1>this is : {product}</h1>

			<p></p>
		</>
	)
}

export default ProductPageUI
