import Head from 'next/head'

function HeadTag({ title, keywords, img }) {
	const temptitle = title
	const ogTitle = temptitle + " on Indians Who Freelance"
	const metaDesc = "Explore " + title + "'s properties on Indians Who Freelance. India's shop listing platform which lets you explore shops easily and efficiently. Explore commercial shops now."
	return (
		<Head>
			<title>{title} - Indians Who Freelance</title>
			<meta name="description" content={metaDesc} />
			<meta name="og:title" property="og:title" content={ogTitle} />
			<meta name="twitter:title" content={ogTitle} />

			<meta name="og:description" property="og:description" content={metaDesc} />
			<meta name="twitter:description" content={metaDesc} />

			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91"/>
			<meta name="twitter:image" content="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />
			<meta name="keywords" content={keywords} />

			<meta property="og:site_name" content="Indians Who Freelance" />
			<meta property="og:type" content="website" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@dukandetails" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />

			<link rel="apple-touch-icon" href="https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91" />

		</Head>
	)
}

export default HeadTag