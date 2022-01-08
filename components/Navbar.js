import React from 'react'



const Navbar = () => {

	return (
		<span>
			<nav class="bg-black border-white px-2 sm:px-4 py-2.5 ">
				<div class="container mx-auto flex flex-wrap items-center justify-between">
					<a href="/" class="flex">
						{/* <h2 class="font-bold text-black text-4xl">If.</h2> */}
						<img src='https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91' class="h-14 mr-3" viewBox="0 0 52 72" />
					</a>
					<a href="/" class="flex">
						<style jsx>{`
						
						  .typing-demo {
							width: 20ch;
							animation: typing 2s steps(22), blink .5s step-end infinite alternate;
							white-space: nowrap;
							overflow: hidden;
							border-right: 3px solid transparent;
							font-family: 'Poppins', sans-serif;
							font-size: 1em;
							color:white
						  }
						  
						  @keyframes typing {
							from {
							  width: 0
							}
						  }
							  
						  @keyframes blink-caret {
							
							50% {
								border-color: white
							  }
						  }

						`}

						</style>
						<h2 className="typing-demo">Indians Who Freelance</h2>
						{/* <img src='https://dl.airtable.com/.attachmentThumbnails/7de6d2eac1a6b4ad469100d497acbb77/f570db91' class="h-14 mr-3" viewBox="0 0 52 72" /> */}
					</a>
				
					<button data-collapse-toggle="mobile-menu" type="button" class="md:hidden ml-3 text-gray-500 focus:outline-none focus:ring-none focus:ring-gray-200 rounded-lg text-sm p-2 inline-flex items-center" aria-controls="mobile-menu-2" aria-expanded="false">
						<a href="/join"
							class=" font-md py-2 px-4 text-black w-full transition ease-in duration-200 text-center shadow-md focus:outline-none focus:ring-none focus:ring-offset-2 rounded-lg"
						>
							
							<span class="text-white"
							>Join Us
							
							</span>
						</a>
					</button>
					
					<div class="hidden md:block w-full md:w-auto" id="mobile-menu">
						<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
							<ul class="flex-col md:flex-row flex md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
								<li>
									<p
										class=" font-md py-2 px-4 bg-black text-black w-full transition ease-in duration-200 text-center rounded-lg"
									>
										<a a
											href="/join" class="flex">

											<span class="pt-2 py-2 text-sm">
												<span class="text-white"
												>Join Us
												
												</span></span>
										</a>
									</p>
								</li>
							</ul>
						</ul>				</div>
				</div>
			</nav>
		</span>

	)
}

export default Navbar