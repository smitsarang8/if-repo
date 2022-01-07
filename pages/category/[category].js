import React from 'react'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer';
import airtableAuth from '../../airtableAuth'
import ProductItem from '../../components/ProductItem'
const SearchCategory = () => {
	const router = useRouter()
	const category_name = router.query.category

	let meta_category_name = category_name
	const meta_desc = "Explore " + meta_category_name + " on Real Dukaan.India's shop listing platform which lets you explore shops easily and efficiently. Explore commercial shops now."
	if (category_name == "shops") {
		meta_category_name = "Shops"
	} else if (category_name == "offices") {
		meta_category_name = "Offices"
	} else if (category_name == "land-plots") {
		meta_category_name = "Land and plots"
	} else if (category_name == "storages") {
		meta_category_name = "Godowns"
	} else if (category_name == "hospitalities") {
		meta_category_name = "Hospitality spaces"
	}
	let meta_og_title = "Explore " + meta_category_name + " - Real Dukaan"


	const [purpose, setPurpose] = useState('all')
	const [city, setCity] = useState('all')
	const [area, setArea] = useState('all')

	const [areaLOV, setAreaLOV] = useState([])
	const [product, setProduct] = useState([])
	console.log("render = " + purpose + city + area)

	const cityLOV = [
		{ value: 'surat', name: 'Surat' },
		{ value: 'ahmedabad', name: 'Ahmedabad' }
	]
	const cityChanged = (e) => {
		setCity(e)
		if (e == "surat") {
			setAreaLOV([
				{ value: 'adajan', name: 'Adajan' },
				{ value: 'pal', name: 'Pal' }
			]
			)
		} else if (e == "ahmedabad") {
			setAreaLOV([
				{ value: 'main', name: 'Main' },
			]
			)
		} else if (e == "all") {
			setAreaLOV([])
		}
	}
	const areaChanged = (e) => {
			setArea(e)
			
	}
	let whichCategory = ""
	const assignCategory = (name) => {
		whichCategory = name
	}
	if (category_name == "shops") {
		assignCategory("shop")
	} else if (category_name == "offices") {
		assignCategory("office")
	} else if (category_name == "land-plots") {
		assignCategory("land-plots")
	} else if (category_name == "storages") {
		assignCategory("storage")
	} else if (category_name == "hospitalities") {
		assignCategory("hospitality")
	}

	useEffect(() => {
		let unmounted = false;
		let address = ""
		console.log("onmount")

		if (whichCategory == "shop") {
			if (purpose === "all" && city === "all" && area==="all") {
				console.log("inside all")
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop',{city}='${city}',{area}='${area}')`;
			} 
		}else if (whichCategory == "office") {
			if (purpose === "all" && city === "all" && area==="all") {
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office',{city}='${city}',{area}='${area}')`;
			} 
		}else if (whichCategory == "land-plots") {
			if (purpose === "all" && city === "all" && area==="all") {
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot',{city}='${city}',{area}='${area}')`;
			} 
		}else if (whichCategory == "office") {
			if (purpose === "all" && city === "all" && area==="all") {
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{city}='${city}',{area}='${area}')`;
			} 
		}else if (whichCategory == "storage") {
			if (purpose === "all" && city === "all" && area==="all") {
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage',{city}='${city}',{area}='${area}')`;
			} 
		}
		else if (whichCategory == "hospitality") {
			if (purpose === "all" && city === "all" && area==="all") {
				address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality')";
			} else if (purpose === "sell" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='sell',{city}='${city}')`;
			}else if (purpose === "sell" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='sell',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city != "all" && area == "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='rent',{city}='${city}')`;
			}else if (purpose === "rent" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='rent',{city}='${city}',{area}='${area}')`;
			} else if (purpose === "rent" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='rent')`;
			} else if (purpose === "sell" && city === "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{purpose}='sell')`;
			} else if (purpose === "all" && city != "all" && area=="all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{city}='${city}')`;
			} else if (purpose === "all" && city != "all" && area != "all") {
				address = `https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality',{city}='${city}',{area}='${area}')`;
			} 
		}
		fetch(address, {
			method: 'get',
			headers: new Headers({
				'Authorization': airtableAuth.token
			}),
		}).then((res) => res.json()).then(json => {
			if (!unmounted) {
				setProduct(json)
			}
		});
		return () => {
			unmounted = true;
		};
	}, [purpose, city, area])

	let address =""
	if (whichCategory == "shop") {
	address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='shop')";
	}else if (whichCategory == "office") {
		address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='office')";
	}else if (whichCategory == "land-plots") {
		address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='land-plot')";
	}else if (whichCategory == "storage") {
		address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='storage')";
	}else if (whichCategory == "hospitality") {
		address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{propertyType}='hospitality')";
	}
	const fetcher = async (url) => await axios.get(url, {
		headers: {
			'Authorization': airtableAuth.token
		}
	}).then((res) => res.data);
	const { data, error } = useSWR(address, fetcher);

	const getSearchHeader=()=>{
		if (category_name == "shops") {
			return meta_category_name
		} else if (category_name == "offices") {
			return meta_category_name
		} else if (category_name == "land-plots") {
			return meta_category_name
		} else if (category_name == "storages") {
			return meta_category_name
		} else if (category_name == "hospitalities") {
			return meta_category_name
		}
	}
	if (error) return <div>	<Navbar />failed to load {error}<Footer />
	</div>
	if (!data) return <div>	<Navbar /><div class="flex py-12 flex-col">
		<div class="flex flex-col">
			<div class="bg-white w-1/2 mx-auto p-2 sm:p-4 sm:h-64 rounded-2xl shadow-lg flex flex-col sm:flex-row gap-5 select-none ">
				<div class="h-52 sm:h-full sm:w-72 rounded-xl bg-gray-200 animate-pulse">
				</div>
				<div class="flex flex-col flex-1 gap-5 sm:p-2">
					<div class="flex flex-1 flex-col gap-3">
						<div class="bg-gray-200 w-full animate-pulse h-14 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
						<div class="bg-gray-200 w-full animate-pulse h-3 rounded-2xl">
						</div>
					</div>
					<div class="mt-auto flex gap-3">
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
						</div>
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full">
						</div>
						<div class="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto">
						</div>
					</div>
				</div>
			</div>
		</div> </div>		<Footer />
	</div>
	return (<>

		<Head>
			<title>{meta_category_name} - Real Dukaan</title>
			<meta name="description" content={meta_desc} />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta name="og:title" property="og:title" content={meta_og_title} />
			<meta name="og:description" property="og:description" content={meta_desc} />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />
			<meta name="twitter:title" content={meta_og_title} />
			<link rel="apple-touch-icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:site" content="@dukandetails" />
			<meta name="twitter:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta name="twitter:description" content={meta_desc} />

		</Head>
		<Navbar />
		<div class="container mx-auto flex py-6 flex-col">
			<div class="flex flex-col"></div>
			<div className="row">

				<div class="max-w-2xl mx-auto py-6 sm:py-6 lg:py-6 lg:max-w-none">
					<div class="lg:w-1/2 w-full py-6 lg:mb-0">
						<h1 class="px-4 sm:text-3xl text-2xl sm-title text-gray-900">
							{getSearchHeader()}
						</h1>
						<span class="text-2xl sm-title text-gray-900">
							<div class="py-4 px-4 flex">
								<div class="mb-3 ml-4 xl:w-96">
									<label class="pl-1 font-regular text-sm text-black" htmlFor="purpose">
										Purpose
									</label>
									<select
										onChange={(e) => setPurpose(e.target.value)}
										class="form-select
										block
										w-full
										px-3
										py-1.5
										text-base
										font-normal
										text-gray-700
										bg-white bg-clip-padding bg-no-repeat
										border border-solid border-gray-300
										rounded
										transition
										ease-in-out
										m-0
										focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
										<option value="all" selected>All</option>
										<option value="sell">Buy</option>
										<option value="rent">Rent</option>
									</select>
								</div>
								<div class="mb-3 ml-4 xl:w-96">
									<label class="pl-1 font-regular text-sm text-black" htmlFor="purpose">
										City

									</label>
									<select
										onChange={(e) => cityChanged(e.target.value)}
										class="form-select
										block
										w-full
										px-3
										py-1.5
										text-base
										font-normal
										text-gray-700
										bg-white bg-clip-padding bg-no-repeat
										border border-solid border-gray-300
										rounded
										transition
										ease-in-out
										m-0
										focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
										<option value="all" selected>All</option>

										{cityLOV.map((e, key) => {
											return <option key={key} value={e.value}>{e.name}</option>;
										})}
									</select>
								</div>
								<div class="mb-3 ml-4 xl:w-96">
									<label class="pl-1 font-regular text-sm text-black" htmlFor="purpose">
										Area

									</label>
									<select
										onChange={(e) => areaChanged(e.target.value)}
										class="form-select
										block
										w-full
										px-3
										py-1.5
										text-base
										font-normal
										text-gray-700
										bg-white bg-clip-padding bg-no-repeat
										border border-solid border-gray-300
										rounded
										transition
										ease-in-out
										m-0
										focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Default select example">
										<option value="all" selected>All</option>
										{areaLOV.map((e, key) => {
											return <option key={key} value={e.value}>{e.name}</option>;
										})}
									</select>
								</div>

							</div>
						</span>
					</div>
					<div class="lg:space-y-0 lg:grid lg:grid-cols-3">
						{product.records ? product.records.map((product, index) => (<div key={product.index}>
							<ProductItem product={product} />
						</div>)) : data.records.map((product, index) => (<div key={product.index}>
							<ProductItem product={product} />
						</div>))}
					</div>
				</div>
			</div>
		</div>

	</>
	)
}

export default SearchCategory