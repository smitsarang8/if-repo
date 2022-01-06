import React from 'react'
import { useRouter } from 'next/router'

const Owner = ({ children }) => {
	const router = useRouter()
	const { owner } = router.query
	return (
		<>
			<h1>this is : {owner}</h1>
		</>
	)
}

export default Owner
