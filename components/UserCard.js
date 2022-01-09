import Link from 'next/link'

const ProductItem = ({ authors }) => {


	const twitterLink = () => {
		if (authors.fields.twitter != "") {
			return <a href={authors.fields.twitter} class="px-2 text-white hover:text-blue-300">
				<svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
					<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
				</svg>
			</a>
				;
		}
	}

	const linkedinLink = () => {
		if (authors.fields.linkedin) {
			return <a href={authors.fields.linkedin} class=" text-white hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="w-6 h-6 bi bi-linkedin" viewBox="0 0 16 16">
				<path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
			</svg>
			</a>;
		}
	}

	const personalWeb = () => {
		if (authors.fields.personalWeb) {
			return <a href={authors.fields.personalWeb} class="px-2 text-white hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
				<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
			</svg>
			</a>;
		}
	}

	const whyThis = () => {
		if (infosArray) {
			var listItems = []
			listItems = infosArray.map((number) => {
				if (number) {
					return <div v-if="p.fields.rera" class="p-2">
						<div class="flex-col flex justify-left items-left">
							<div class="text-left flex flex-col">
								<p class="text-sm font-medium">{number}</p>
							</div>
						</div>
					</div>;
				}
			})
		}
		return (

			<span><a href={authors.fields.personalWeb} class="text-white hover:text-blue-300"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
			<path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
		</svg>
		</a></span>
		);
	}
	return (

		// <div class="px-4 py-2">
		// 	<a
		// 		href={`${authors.fields.slug}`}
		// 		class="group relative"
		// 	>
		// 		<div class="max-w-md w-full lg:flex">
		// 			<div class="wrapper antialiased text-gray-900">
		// 				<div>

		// 					<section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 ">
		// 						<div class=" py-2 flex flex-col justify-center mx-auto sm:py-5">
		// 							<div class="">
		// 								<div class="h-auto py-20 px-10 bg-indigo-500 flex flex-col space-y-5 mx-auto rounded-3xl">

		// 									<div class="flex items-center space-x-4">
		// 										<img src={authors.fields.photoUrl[0].thumbnails.large.url}
		// 											alt={authors.fields.name} width="88" height="88" class="rounded-full  flex-none  bg-gray-100" />
		// 										<div class="min-w-0 flex-auto space-y-1 font-semibold">
		// 											<h2 class="text-white text-2xl leading-6 truncate">
		// 												{authors.fields.name}      </h2>
		// 											<p class="text-white text-sm">
		// 												{authors.fields.location}
		// 											</p>
		// 										</div>

		// 									</div>
		// 									<h2 class="font-normal tracking-wide text-md text-white lg:w-2/5">Connect me for <br /> {authors.fields.skills}</h2>


		// 									<h2 class="font-normal tracking-wide text-xl text-white lg:w-2/5">{authors.fields.about}</h2>
		// 									<div class="flex flex-col">
		// 										<div class="flex justify-start space-x-2">
		// 											{authors.fields.twitter ? twitterLink() : null}
		// 											{authors.fields.linkedin ? linkedinLink() : null}
		// 											{authors.fields.personalWeb ? personalWeb() : null}


		// 										</div>

		// 									</div>

		// 								</div>
		// 							</div>
		// 						</div>

		// 					</section>
		// 				</div>
		// 			</div>
		// 		</div>

		// 	</a>
		// </div>
		<div class="px-4 py-2">

			<a
				href={`/${authors.fields.slug}`}
				class="group relative"
			>
				<div class="max-w-sm py-5">

					<div class="p-4">
						<div class="text-center mb-4 opacity-90">
								<img alt="profil" src={authors.fields.photoUrl[0].thumbnails.large.url} class="mx-auto object-cover rounded-full h-40 w-40 " />
						</div>
						<div class="text-center">
							<p class="text-2xl text-white ">
							{authors.fields.name}  
							</p>
							<p class="text-xl text-white font-light">
							{authors.fields.location}  
							</p>
							<p class="text-md text-gray-400  max-w-xs py-4 ">
							{authors.fields.about}  
							</p>
						</div>
						
						<div class="pt-8 flex w-44 mx-auto text-gray-500 items-center justify-center">
							{authors.fields.twitter ? twitterLink() : null}
							{authors.fields.linkedin ? linkedinLink() : null}
							{authors.fields.personalWeb ? personalWeb() : null}

						</div>
					

					</div>

				</div>
			</a>
		</div>

	)
}

export default ProductItem