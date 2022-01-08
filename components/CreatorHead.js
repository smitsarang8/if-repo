import Head from 'next/head'

function HeadTag({ title, slug ,location, keywords, img }) {
	const temptitle = title
	const ogTitle = temptitle +" (@"+slug+") - Indians Who Freelance"
	const metaDesc = "Hi, This is " + title + " from "+location+". View my profile on Indians Who Freelance. Directory of India's best freelancers. Connecting freelancers made easy."
	return (
		<Head>
			<title>{ogTitle}</title>
			<meta name="description" content={metaDesc} />
			<meta name="og:title" property="og:title" content={ogTitle} />
			<meta name="twitter:title" content={ogTitle} />

			<meta name="og:description" property="og:description" content={metaDesc} />
			<meta name="twitter:description" content={metaDesc} />

			<meta property="og:url" content="https://if-repo.vercel.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/647f38a1a3e55134d20a064fedc4fb31/1077495c"/>
			<meta name="twitter:image" content="https://dl.airtable.com/.attachmentThumbnails/647f38a1a3e55134d20a064fedc4fb31/1077495c" />
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