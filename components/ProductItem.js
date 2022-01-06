import Link from 'next/link'

const ProductItem = ({ product }) => {

	const pricings = () => {
		if (product.fields.purpose == "sell") {
			return <div class="mt-1 text-lg">
				₹ {product.fields.sellPrice}
			</div>
				;
		} else if (product.fields.purpose == "rent") {
			return <div class="mt-1 text-lg">
				₹ {product.fields.rentMonthly} (Monthly)
			</div>;
		}
	}
	const purpose = () => {
		if (product.fields.purpose == "sell") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
				;
		} else if (product.fields.purpose == "rent") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>
				;
		}
	}
	return (

		<div class="px-4 py-2">
			<a
				href={`/p/${product.fields.slug}`}
				class="group relative"
			>
				<div class="max-w-md w-full lg:flex">
					<div class="wrapper antialiased text-gray-900">
						<div>

							<img src={product.fields.get_thumbnail_url[0].thumbnails.large.url}
								alt=" random imgee" class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300  w-full object-cover object-center rounded-lg shadow-md" />

							<div class="transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 duration-300 relative px-4 -mt-16  ">
								<div class="bg-white p-6 rounded-lg shadow-lg">
									<div class="flex items-baseline">
										{purpose()} <span class="inline-block rounded-md text-black py-1 px-1 text-xs"> - In {product.fields.address_1}</span>
										<div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
										</div>
									</div>

									<h4 class="mt-1 text-xl font-semibold leading-tight truncate">{product.fields.name}</h4>
									<div class="mt-1 text-gray-500">
										{product.fields.shortAddress}
									</div>
									{pricings()}
								</div>
							</div>

						</div>
					</div>
				</div>

			</a>
		</div>
		// <a
		// 	href={`/p/${product.fields.slug}`}
		// 	class="group relative"
		// >
		// 	<div class="max-w-sm py-5">
		// 		<div
		// 			class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg"
		// 		>
		// 			<img
		// 				class="relative w-full h-60 rounded-t-lg"
		// 				src={product.fields.get_thumbnail_url[0].thumbnails.large.url}
		// 				alt={product.fields.name}
		// 			/>
		// 			<div class="px-1 rounded-lg">
		// 				<div
		// 					class="flex flex-wrap justify-starts items-center py-3 text-xs text-white font-medium"
		// 				>
		// 					<span class="m-1 px-1 py-1 rounded bg-gray-700">
		// 						{product.fields.square_feet} sq.ft
		// 					</span>
		// 				</div>

		// 				<h1
		// 					class="m-1 text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer"
		// 				>
		// 					{product.fields.name}
		// 				</h1>
		// 				<div class="flex text-sm text-gray-500">
		// 					<div class="m-1 flex-1 inline-flex items-center">
		// 						<p class="">{product.fields.shortAddress}</p>
		// 					</div>
		// 				</div>
		// 				<span v-if="product.fields.purpose == 'Sell'">
		// 					<div class="flex py-4 text-sm text-gray-500">
		// 						<div class="m-1 flex-1 inline-flex items-center">
		// 							<p class="">Sell: ₹ {product.fields.sellPrice}</p>
		// 						</div>
		// 					</div>


		// 				</span>
		// 				<span v-if="product.fields.purpose == 'Rent'">
		// 					<div class="flex py-4 text-sm text-gray-500">
		// 						<div class="m-1 flex-1 inline-flex items-center">
		// 							Rent: ₹
		// 							{product.fields.rentMonthly} (monthly)
		// 						</div>
		// 					</div>
		// 					<div class="flex text-lg text-gray-500">
		// 						<div class="flex-1 inline-flex items-center">
		// 							<p class=""></p>
		// 						</div>
		// 					</div>
		// 				</span>
		// 				<span v-if="product.fields.purpose == 'Both'">
		// 					<div class="flex py-4 text-sm text-gray-500">
		// 						<div class="m-1 flex-1 inline-flex items-center">
		// 							<p class="">
		// 								Sell: ₹ {product.fields.sellPrice}<br />
		// 								Rent: ₹
		// 								{product.fields.rentMonthly} (monthly)
		// 							</p>
		// 						</div>
		// 					</div>
		// 					<div class="flex text-lg text-gray-500">
		// 						<div class="flex-1 inline-flex items-center">
		// 							<p class=""></p>
		// 						</div>
		// 					</div>
		// 				</span>
		// 			</div>
		// 			<div class="absolute top-2 left-2 py-2 px-4 bg-white rounded-lg">
		// 				<span v-if="product.fields.purpose == 'Both'" class="text-sm"
		// 				>Sell and Rent</span
		// 				>
		// 				<span v-else class="text-sm">{product.fields.purpose}</span>
		// 			</div>
		// 		</div>
		// 	</div>
		// </a>


	)
}

export default ProductItem