import Head from 'next/head'

function HeadTag({ title, keywords, img }) {
	const temptitle = title
	const ogTitle = temptitle + " on Real Dukaan"
	const metaDesc = "Visit " + title + " on Real Dukaan. India's shop listing platform which lets you explore shops easily and efficiently. Explore commercial shops now."
	return (
		<Head>
			<title>{title} - Real Dukaan</title>
			<meta name="description" content={metaDesc} />
			<meta name="og:title" property="og:title" content={ogTitle} />
			<meta name="twitter:title" content={ogTitle} />

			<meta name="og:description" property="og:description" content={metaDesc} />
			<meta name="twitter:description" content={metaDesc} />

			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content={img} />
			<meta name="twitter:image" content={img} />
			<meta name="keywords" content={keywords} />

			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@dukandetails" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />

			<link rel="apple-touch-icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />

		</Head>
	)
}

export default HeadTag