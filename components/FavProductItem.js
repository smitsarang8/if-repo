import Link from 'next/link'

const ProductItem = ({ product }) => {

	const pricings = () => {
		if (product.fields.purpose == "sell") {
			return <p class="">Sell: ₹ {product.fields.sellPrice}</p>;
		} else if (product.fields.purpose == "rent") {
			return <p>
				Rent: ₹
				{product.fields.rentMonthly} (monthly)
			</p>;
		} else if (product.fields.purpose == "Both") {
			return <p>
				Sell: ₹ {product.fields.sellPrice}<br />
				Rent: ₹
				{product.fields.rentMonthly} (monthly)
			</p>;
		}
	}
	const purpose = () => {
		if (product.fields.purpose == "sell") {
			return "Sell";
		} else if (product.fields.purpose == "rent") {
			return "Rent";
		} else if (product.fields.purpose == "Both") {
			return "Sell / Rent";
		}
	}
	return (

		<div>
			<a
				href={`/p/${product.fields.slug}`}
				class="group relative"
			>
				<div class="p-1 max-w-md py-3">
					<div
						class="bg-white relative shadow-lg hover:shadow-xl transition duration-500 rounded-lg"
					>
						<img
							class="relative w-full h-60 rounded-t-lg"
							src={product.fields.get_thumbnail_url}
							alt={product.fields.name}
						/>
						<div class="px-1 rounded-lg">
							<div
								class="flex flex-wrap justify-starts items-center py-3 text-xs text-white font-medium"
							>
								<span class="m-1 px-1 py-1 rounded bg-gray-700">
									{product.fields.square_feet} sq.ft
								</span>
							</div>

							<h1
								class="m-1 text-gray-700 font-bold text-2xl mb-3 hover:text-gray-900 hover:cursor-pointer"
							>
								{product.fields.name}
							</h1>

							<div class="flex text-sm text-gray-500">
								<div class="m-1 flex-1 inline-flex items-center">
									<p class="">{product.fields.shortAddress}</p>
								</div>
							</div>



							<span>
								<div class="flex py-4 text-sm text-gray-500">
									<div class="m-1 flex-1 inline-flex items-center">
										{pricings()}
									</div>
								</div>
							</span>
						</div>
						<div class="absolute top-2 left-2 py-2 px-4 bg-white rounded-lg">
							<span class="text-sm">{purpose()}</span>
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