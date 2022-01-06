import firebase from "firebase/compat/app";
import "firebase/compat/auth"

const NavbarAuth = () => {

	return (

		<nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded">
			<div class="container mx-auto flex flex-wrap items-center justify-between">
				<a href="/" class="flex">
					<img src="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" class="h-14 mr-3" viewBox="0 0 52 72" />
				</a>
				<button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-500 hover:bg-gray-100focus:outline-none focus:ring-2 focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
				<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
						<li>
							<a href="/sign-out" class="md:bg-transparent text-black block pl-3 pr-4 py-2 md:p-0 rounded  " aria-current="page">Sign out</a>
						</li>
					</ul>
				</button>
				<div class="hidden md:block w-full md:w-auto" id="mobile-menu">
					<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
						<li>
							<a href="/sign-out" class="bg-blue-700 md:bg-transparent text-black block pl-3 pr-4 py-2 md:p-0 rounded  " aria-current="page">Sign out</a>
						</li>
					</ul>				</div>
			</div>
		</nav>

	)
}

export default NavbarAuth