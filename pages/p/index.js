import React from 'react'
import { useRouter } from 'next/router'

const Product = ({ children }) => {
	const router = useRouter()
	const { pSlug } = router.query
	return (
		<>
			<h1>this is : {pSlug}</h1>
		</>
	)
}

export default Product
