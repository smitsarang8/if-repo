import React from 'react'
import Head from 'next/head'
import Navbar from '/components/Navbar'
import Router from 'next/router'
import Footer from '/components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/storage"
import { useCookies } from "react-cookie"

let app = null;
Date().toLocaleString()
let checkArray = []


const signOut = () => {
	try {
		firebase.auth().signOut().then((response) => {
			Router.push("/")
		});
	} catch (err) {
		console.error(err);
	}
}
const SignUp = () => {
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const [image, setImage] = React.useState('');
	const [loader, loadingScreen] = React.useState(false);

	const [avatarURL, setAvatarURL] = React.useState('');
	const [isSeller, isSellerPassed] = React.useState(true);
	const [cuser, setcuser] = React.useState("");
	const [onBoardToSeller, isBuyer] = React.useState(false);
	const currrentEmail = null
	const firebaseConfig = {
		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
		authDomain: 'ddetails-47db8.firebaseapp.com',
		projectId: 'ddetails-47db8',
		storageBucket: 'ddetails-47db8.appspot.com',
		messagingSenderId: '231286919067',
		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
	}
	const [cookie, setCookie, removeCookie] = useCookies(["user"])

	app = firebase.initializeApp(firebaseConfig);
	const auth = app.auth();
	firebase.auth().onAuthStateChanged((user) => {
		if (user) {
			currrentEmail = user.email
			setcuser(user.email)
			setCookie("user", JSON.stringify(user.email), {
				path: "/",
				maxAge: 3600, // Expires after 1hr
				sameSite: true,
			})
		}
	});

const uploadPhoto = () => {
	if (image == null) {
		return;
	}
	loadingScreen(true)
	const storage = firebase.storage();
	storage.ref(`${image.name}`).put(image);
	sleep(10000).then(() => {
		storage.ref(`${image.name}`).getDownloadURL()
			.then(url => {
				setAvatarURL(url);
				loadingScreen(false)
			});;
	});

}
	// const checkAccess = async () => {
	// 	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status}='approved',{userType}='seller',{email}='" + cuser + "')", {
	// 		method: 'get',
	// 		headers: new Headers({
	// 			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
	// 		}),
	// 	})
	// 	const products = await res.json()
	// 	if (products.records.length > 0) {
	// 		isBuyer(false)
	// 	} else {
	// 		isBuyer(true)
	// 	}
	// }
	// if(onBoardToSeller!=false){
	// 	checkAccess()
	// }
	const propertyTypeChange = (e) => {
		console.log(e.target.value);
	}

	const propertyPurpose = (e) => {
		console.log(e.target.value);
	}
	const propertyConstStatus = (e) => {
		console.log(e.target.value);
	}

	const propertyCurrentStatus = (e) => {
		console.log(e.target.value);
	}

	const propertyFurnish = (e) => {
		console.log(e.target.value);
	}
	const propertyFacingChange = (e) => {
		console.log(e.target.value);
	}


	const [isFoundationChecked, setFoundationChecked] = React.useState(false);
	const [isGeneralStructureChecked, setGeneralStructureChecked] = React.useState(false);
	const [isBasementChecked, setBasementChecked] = React.useState(false);
	const [isTermitesChecked, setTermitesChecked] = React.useState(false);
	const [isRoofChecked, setRoofChecked] = React.useState(false);
	const [isWaterLeakChecked, setWaterLeakChecked] = React.useState(false);

	const changeFoundationChecked = () => {
		setFoundationChecked(!isFoundationChecked);
	};
	const changeGSChecked = () => {
		setGeneralStructureChecked(!isGeneralStructureChecked);
	};
	const changeBasementChecked = () => {
		setBasementChecked(!isBasementChecked);
	};
	const changeTermidesChecked = () => {
		setTermitesChecked(!isTermitesChecked);
	};
	const changeRoofChecked = () => {
		setRoofChecked(!isRoofChecked);
	};
	const changeWaterLeakChecked = () => {
		setWaterLeakChecked(!isWaterLeakChecked);
	};

	const [isPlumbingChecked, setPlumbingChecked] = React.useState(false);
	const [isElecChecked, setElecChecked] = React.useState(false);
	const [isAcChecked, setAcChecked] = React.useState(false);
	const [isHotWaterChecked, setHotWaterChecked] = React.useState(false);
	const [isWaterSupplyChecked, setWaterSupplyChecked] = React.useState(false);
	const [isOtherFixturesChecked, setOtherFixturesChecked] = React.useState(false);
	const [isSewageChecked, setSewageChecked] = React.useState(false);
	const [isHeatingChecked, setHeatingChecked] = React.useState(false);

	const changePlumbingChecked = () => {
		setPlumbingChecked(!isPlumbingChecked);
	};
	const changeElecChecked = () => {
		setElecChecked(!isElecChecked);
	};
	const changeAcChecked = () => {
		setAcChecked(!isAcChecked);
	};
	const changeHotWaterChecked = () => {
		setHotWaterChecked(!isHotWaterChecked);
	};
	const changeWaterSupplyChecked = () => {
		setWaterSupplyChecked(!isWaterSupplyChecked);
	};
	const changeOtherFixturesChecked = () => {
		setOtherFixturesChecked(!isOtherFixturesChecked);
	};
	const changeSewageChecked = () => {
		setSewageChecked(!isSewageChecked);
	};
	const changeHeatingChecked = () => {
		setHeatingChecked(!isHeatingChecked);
	};

	const [enqDone, enqPlaced] = React.useState(false);
	const [promotionDone, convertedToSeller] = React.useState(false);

	const listProperty = async event => {
		event.preventDefault();
		console.log(isFoundationChecked ? "Fissue" : "-",)
		console.log(isGeneralStructureChecked ? "GSissue" : "-",)
		console.log(isBasementChecked ? "Bissue" : "-",)
		console.log(isTermitesChecked ? "Tissue" : "-",)
		console.log(isRoofChecked ? "Rissue" : "-",)
		console.log(isWaterLeakChecked ? "Wissue" : "-",)


		console.log(isPlumbingChecked ? "Pl" : "-",)
		console.log(isElecChecked ? "El" : "-",)
		console.log(isAcChecked ? "Ac" : "-",)
		console.log(isHotWaterChecked ? "Hw" : "-",)
		console.log(isWaterSupplyChecked ? "Ws" : "-",)
		console.log(isOtherFixturesChecked ? "Of" : "-",)
		console.log(isSewageChecked ? "Sw" : "-",)
		console.log(isHeatingChecked ? "Hea" : "-",)
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		const res = fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_req', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							owner: event.target.ownerName.value,
							reference: event.target.ownerReference.value,
							ownerAddress: event.target.ownerAddress.value,
							ownerCity: event.target.ownerCity.value,
							ownerState: event.target.ownerState.value,
							ownerZip: event.target.ownerZip.value,
							ownerPhone: event.target.ownerPhone.value,
							ownerEmail: event.target.ownerEmail.value,
							purpose: event.target.purpose.value,
							propertyType: event.target.propType.value,
							currentlyOperatedBusiness: event.target.currentlyOperatedBusiness.value,
							storeOrBuildingName: event.target.storeOrBuildingName.value,
							shopNo: event.target.shopNo.value,
							fullPropAddress: event.target.fullPropAddress.value,
							nearby: event.target.nearby.value,
							currentStatus: event.target.current.value,
							propCurrentMonthlyRent: event.target.propCurrentMonthlyRent.value,
							propSize: event.target.furnish.value,
							propCarperArea: event.target.propCarperArea.value,
							propertyConstructionStatus: event.target.propertyConstructionStatus.value,
							furnitureStatus: event.target.furnish.value,
							facing: event.target.facing.value,
							builderDeveloper: event.target.builderDeveloper.value,
							possession: event.target.possession.value,
							totalFloor: event.target.totalFloor.value,
							totalUnits: event.target.totalUnits.value,
							rera: event.target.rera.value,
							maintenance: event.target.maintenance.value,
							electricity: event.target.elec.value,
							gas: event.target.gas.value,
							annualCharges: event.target.annualCharges.value,
							otherCharges: event.target.otherCharges.value,
							totalExpense: event.target.totalExpense.value,
							notes: event.target.notes.value,
							buildingSystemChallenges: event.target.buildingSystemChallenges.value,
							email: currrentEmail,
							sellPriceDecided: event.target.sellPriceDecided.value,
							rentDecided: event.target.rentDecided.value,
							foundationSlab: isFoundationChecked ? "issue" : "-",
							generalStructural: isGeneralStructureChecked ? "issue" : "-",
							basement: isBasementChecked ? "issue" : "-",
							termites: isTermitesChecked ? "issue" : "-",
							roof: isRoofChecked ? "issue" : "-",
							waterLeakage: isWaterLeakChecked ? "issue" : "-",
							plumbing: isPlumbingChecked ? "issue" : "-",
							electric: isElecChecked ? "issue" : "-",
							ac: isAcChecked ? "issue" : "-",
							hotWater: isHotWaterChecked ? "issue" : "-",
							waterSupply: isWaterSupplyChecked ? "issue" : "-",
							otherFixtures: isOtherFixturesChecked ? "issue" : "-",
							sewage: isSewageChecked ? "issue" : "-",
							heating: isHeatingChecked ? "issue" : "-",
							timestamp: datetime,
							status: "pending"
						}
					}
				]
			}),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			},
			method: 'POST'
		})

		const result = await res.status
		enqPlaced(true)
	}
	

	const makeBuyerSeller = async event => {
		event.preventDefault();

		try {
			const res = fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la', {
				body: JSON.stringify({
					records: [
						{
							fields: {
								email: currrentEmail,
								thumbnailUrl: [{ url: avatarURL ? avatarURL : "https://img.icons8.com/fluency/344/person-male.png" }],
								status: "approved",
								package: "free",
								businessType: event.target.businessType.value,
								userType: "seller",
								cameAs: "promotion"
							}
						}
					]
				}),
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Bearer keyLRae2Fru3dnFqr',
				},
				method: 'POST'
			})

			const result = await res.status
			isSellerPassed(true)
			isBuyer(false)
			convertedToSeller(true)

		} catch {

		}

	}
	return (
		<><Head>
			<title>List property - Real Dukaan</title>
			<meta name="description" content="" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			{promotionDone ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<div className="relative w-auto my-6 mx-auto max-w-sm">
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									Thanks for choosing RealDukaan.

								</div>

								<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
									<div class="w-full h-full text-center">
										<div class="flex h-full flex-col justify-between">

											<p class="text-gray-600 text-md py-2 px-6">
												You are now seller
											</p>
											<div class="flex items-center justify-between gap-4 w-full mt-8">
												<a href="/list-property"
													type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
													Continue listing
												</a>

											</div>

										</div>
									</div>
								</div>

							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}


			{isSeller ? (
				<>
					<div class="container mx-auto min-h-full flex items-left justify-left py-12 px-4 sm:px-6 lg:px-8">
						<div class="max-w-md w-full space-y-8">
							<div>
								<h2 class="mt-6 text-left text-3xl font-extrabold text-gray-900">
									Property listing form
								</h2>
								<p class="mt-2 text-left text-sm text-gray-600">
									Fill this form in order to list your property
								</p>
							</div>
							<div>
								<div class="md:gap-6">
									<div class="md:col-span-1">
										<div class="px-4 sm:px-0">
											<h3 class="text-lg font-medium leading-6 text-gray-900">Property Information</h3>
										</div>
									</div>
									<div class="mt-5 md:mt-0 md:col-span-2">
										<form onSubmit={listProperty} method="POST">
											<div class="shadow overflow-hidden sm:rounded-md">
												<div class="px-4 py-5 bg-white sm:p-6">
													<div class="grid grid-cols-6 gap-6">
														<div class="col-span-6 sm:col-span-3">
															<label for="first-name" class="block text-sm font-medium text-gray-700">Owner Name(s) <span class="text-red-400">*</span></label>
															<input
																name="ownerName"
																type="text"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>												</div>

														<div class="col-span-6 sm:col-span-3">
															<label for="last-name" class="block text-sm font-medium text-gray-700">Reference (if any)</label>
															<input
																name="ownerReference"
																type="text"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																						</div>



														<div class="col-span-6">
															<label for="street-address" class="block text-sm font-medium text-gray-700">Address of Owner<span class="text-red-400">*</span></label>
															<textarea
																name="ownerAddress"

																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																	</div>

														<div class="col-span-6 sm:col-span-6 lg:col-span-2">
															<label for="city" class="block text-sm font-medium text-gray-700">City<span class="text-red-400">*</span></label>
															<input
																name="ownerCity"
																type="text"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																</div>

														<div class="col-span-6 sm:col-span-3 lg:col-span-2">
															<label for="region" class="block text-sm font-medium text-gray-700">State<span class="text-red-400">*</span></label>
															<input
																name="ownerState"
																type="text"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																</div>

														<div class="col-span-6 sm:col-span-3 lg:col-span-2">
															<label for="postal-code" class="block text-sm font-medium text-gray-700">ZIP / Postal code<span class="text-red-400">*</span></label>
															<input
																name="ownerZip"
																type="tel"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																</div>
														<div class="col-span-6 sm:col-span-3 lg:col-span-3">
															<label for="postal-code" class="block text-sm font-medium text-gray-700">Phone<span class="text-red-400">*</span></label>
															<input
																name="ownerPhone"
																type="tel"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																</div>
														<div class="col-span-6 sm:col-span-3 lg:col-span-3">
															<label for="postal-code" class="block text-sm font-medium text-gray-700">Email<span class="text-red-400">*</span></label>
															<input
																name="ownerEmail"
																type="email"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																</div>
													</div>
												</div>
												<fieldset class="px-4">
													<legend class="text-base font-medium text-gray-900">Purpose<span class="text-red-400">*</span></legend>
													<div class="mt-4 space-y-4">
														<div class="flex items-start">
															<div class="flex items-center h-5">
																<input value="sell" onChange={(e) => propertyPurpose(e)} id="comments" name="purpose" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
															</div>
															<div class="ml-3 text-sm">
																<label for="comments" class="font-medium text-gray-700">Sell</label>
															</div>
														</div>
														<div class="flex items-start">
															<div class="flex items-center h-5">
																<input value="rent" onChange={(e) => propertyPurpose(e)} id="candidates" name="purpose" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
															</div>
															<div class="ml-3 text-sm">
																<label for="candidates" class="font-medium text-gray-700">Rent</label>
															</div>
														</div>
													</div>
												</fieldset>
												<br />

												<div class="px-4 py-5 bg-white sm:p-6">

													<div class="col-span-6 sm:col-span-3">
														<label for="last-name" class="block text-sm font-medium text-gray-700">Currently operated business name</label>
														<input
															name="currentlyOperatedBusiness"
															type="text"
															class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														/>																						</div>
													<br />
													<fieldset>
														<legend class="text-base font-medium text-gray-900">Type of property<span class="text-red-400">*</span></legend>
														<br />
														<div class="bg-white sm:p-2">
															<div class="grid grid-cols-12 gap-6">
																<div class="col-span-6 sm:col-span-2">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="shop" onChange={(e) => propertyTypeChange(e)} id="candidates" name="candidates" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Shop</label>
																		</div>
																	</div>								</div>

																<div class="col-span-6 sm:col-span-3">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="showroom" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Showroom</label>
																		</div>
																	</div>
																</div>
																<div class="col-span-6 sm:col-span-3">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="office" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Office</label>
																		</div>
																	</div>
																</div>

																<div class="col-span-6 sm:col-span-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="commercial-space" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Any commercial space for shop</label>
																		</div>
																	</div>
																</div>
															</div>
															<br />
															<div class="grid grid-cols-12 gap-6">
																<div class="col-span-6 sm:col-span-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="residential-open-plot" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Residential open plot</label>
																		</div>
																	</div>
																</div>

																<div class="col-span-6 sm:col-span-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="industrial-open-plot" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Industrial open plot</label>
																		</div>
																	</div>
																</div>
																<div class="col-span-6 sm:col-span-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="agriculture-open-plot" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Agriculture open plot</label>
																		</div>
																	</div>
																</div>
															</div>
															<br />
															<div class="grid grid-cols-12 gap-6">
																<div class="col-span-6 sm:col-span-6">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="warehouse-godown" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Warehouse / Godown</label>
																		</div>
																	</div>
																</div>

																<div class="col-span-6 sm:col-span-6">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="cold-storage" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Cold storage</label>
																		</div>
																	</div>
																</div>
															</div>
															<br />
															<div class="grid grid-cols-12 gap-6">
																<div class="col-span-6 sm:col-span-3">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="banquet-hall" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Banquet hall</label>
																		</div>
																	</div>								</div>

																<div class="col-span-6 sm:col-span-3">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="cafeteria-restaurant" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Cafeteria / Restaurant</label>
																		</div>
																	</div>
																</div>
															</div>
															<br />
															<div class="grid grid-cols-12 gap-6">
																<div class="col-span-6 sm:col-span-3">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="hospital-space" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Hospital space</label>
																		</div>
																	</div>
																</div>

																<div class="col-span-6 sm:col-span-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="educational-space" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Educational space</label>
																		</div>
																	</div>
																</div>
																<div class="col-span-6 sm:col-span-2">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="co-working-space" onChange={(e) => propertyTypeChange(e)} id="candidates" name="propType" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Co-working space</label>
																		</div>
																	</div>
																</div>
															</div>

														</div>
													</fieldset>
												</div>

												<div class="px-4 py-5 bg-white sm:p-6">
													<div class="grid grid-cols-6 gap-6">
														<div class="col-span-6 sm:col-span-3">
															<label for="first-name" class="block text-sm font-medium text-gray-700">Store or Building name<span class="text-red-400">*</span></label>
															<input
																name="storeOrBuildingName"
																type="text"

																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>												</div>

														<div class="col-span-6 sm:col-span-3">
															<label for="last-name" class="block text-sm font-medium text-gray-700">Shop no<span class="text-red-400">*</span></label>
															<input
																name="shopNo"
																type="tel"
																class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																						</div>



														<div class="col-span-6">
															<label for="street-address" class="block text-sm font-medium text-gray-700">Full Property Address<span class="text-red-400">*</span></label>
															<textarea
																name="fullPropAddress"

																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																	</div>

														<div class="col-span-6">
															<label for="street-address" class="block text-sm font-medium text-gray-700">Nearby Landmark<span class="text-red-400">*</span></label>
															<textarea
																name="nearby"

																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
															/>																	</div>
														<div class="col-span-6">

															<fieldset>
																<legend class="text-base font-medium text-gray-900">Current status of property<span class="text-red-400">*</span></legend>
																<div class="mt-4 space-y-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="self-use" onChange={(e) => propertyCurrentStatus(e)} id="comments" name="current" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="comments" class="font-medium text-gray-700">Self use</label>
																		</div>
																	</div>

																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="already-rented" onChange={(e) => propertyCurrentStatus(e)} id="candidates" name="current" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Already rented</label>
																		</div>
																	</div>
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="not-in-use" onChange={(e) => propertyCurrentStatus(e)} id="comments" name="current" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="comments" class="font-medium text-gray-700">Not in use</label>
																		</div>
																	</div>
																</div>
															</fieldset>
															<br />
															<div>
																<label for="password" class="block text-sm font-medium text-gray-700"
																>Last month rent (if any)
																</label
																>
																<input
																	name="propCurrentMonthlyRent"
																	type="tel"
																	autocomplete="current-password"

																	placeholder=''
																	class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																/>
															</div>
															<div>
																<label for="password" class="block text-sm font-medium text-gray-700"
																>Size ( __ x __ sq.ft.)<span class="text-red-400">*</span>
																</label
																>
																<input
																	name="propSize"
																	type="text"
																	autocomplete="current-password"

																	class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																/>
															</div>
															<div>
																<label for="password" class="block text-sm font-medium text-gray-700"
																>Carpet area (sq. ft.) (Consider “land area” if open plot)<span class="text-red-400">*</span>
																</label
																>
																<input
																	name="propCarperArea"
																	type="tel"
																	autocomplete="current-password"

																	class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																/>
															</div>
															<fieldset>
																<legend class="text-base font-medium text-gray-900">Construction status<span class="text-red-400">*</span></legend>
																<div class="mt-4 space-y-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="under-construction" onChange={(e) => propertyConstStatus(e)} value="under-construction" id="comments" name="propertyConstructionStatus" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="comments" class="font-medium text-gray-700">Under-construction</label>
																		</div>
																	</div>
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="ready-to-use" onChange={(e) => propertyConstStatus(e)} id="candidates" name="propertyConstructionStatus" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Ready to use</label>
																		</div>
																	</div>
																</div>
															</fieldset>
															<br />
															<fieldset>
																<legend class="text-base font-medium text-gray-900">Furniture<span class="text-red-400">*</span></legend>
																<div class="mt-4 space-y-4">
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="furnished" onChange={(e) => propertyFurnish(e)} id="comments" name="furnish" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="comments" class="font-medium text-gray-700">Furnished</label>
																		</div>
																	</div>
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="semi-furnished" onChange={(e) => propertyFurnish(e)} id="candidates" name="furnish" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Semi Furnished</label>
																		</div>
																	</div>
																	<div class="flex items-start">
																		<div class="flex items-center h-5">
																			<input value="fully-furnished" onChange={(e) => propertyFurnish(e)} id="candidates" name="furnish" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																		</div>
																		<div class="ml-3 text-sm">
																			<label for="candidates" class="font-medium text-gray-700">Fully Furnished</label>
																		</div>
																	</div>
																</div>
															</fieldset>
															<br />
															<fieldset>
																<legend class="text-base font-medium text-gray-900">Property facing<span class="text-red-400">*</span></legend>
																<br />
																<div class="bg-white sm:p-2">
																	<div class="grid grid-cols-12 gap-6">
																		<div class="col-span-6 sm:col-span-3">
																			<div class="flex items-start">
																				<div class="flex items-center h-5">
																					<input value="North" onChange={(e) => propertyFacingChange(e)} id="candidates" name="facing" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																				</div>
																				<div class="ml-3 text-sm">
																					<label for="candidates" class="font-medium text-gray-700">North</label>
																				</div>
																			</div>								</div>

																		<div class="col-span-6 sm:col-span-3">
																			<div class="flex items-start">
																				<div class="flex items-center h-5">
																					<input value="East" onChange={(e) => propertyFacingChange(e)} id="candidates" name="facing" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																				</div>
																				<div class="ml-3 text-sm">
																					<label for="candidates" class="font-medium text-gray-700">East</label>
																				</div>
																			</div>
																		</div>
																		<div class="col-span-6 sm:col-span-3">
																			<div class="flex items-start">
																				<div class="flex items-center h-5">
																					<input value="West" onChange={(e) => propertyFurnish(e)} id="candidates" name="facing" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																				</div>
																				<div class="ml-3 text-sm">
																					<label for="candidates" class="font-medium text-gray-700">West</label>
																				</div>
																			</div>
																		</div>

																		<div class="col-span-6 sm:col-span-3">
																			<div class="flex items-start">
																				<div class="flex items-center h-5">
																					<input value="South" onChange={(e) => propertyFurnish(e)} id="candidates" name="facing" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																				</div>
																				<div class="ml-3 text-sm">
																					<label for="candidates" class="font-medium text-gray-700">South</label>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>

															</fieldset>
															<br />

															<div class="">
																<div class="sm:px-0">
																	<h3 class="text-lg font-medium leading-6 text-gray-900">Building Information </h3>
																</div>
															</div>
															<div class="py-5 bg-white">
																<div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>Name of company / developer<span class="text-red-400">*</span>
																	</label
																	>
																	<input
																		name="builderDeveloper"
																		type="text"
																		autocomplete="current-password"

																		placeholder=''
																		class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																	/>
																</div>
																<div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>Possession time<span class="text-red-400">*</span>
																	</label
																	>
																	<input
																		name="possession"
																		type="text"
																		autocomplete="current-password"

																		placeholder=''
																		class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																	/>
																</div>
																<div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>Total floor<span class="text-red-400">*</span>
																	</label
																	>
																	<input
																		name="totalFloor"
																		type="tel"
																		autocomplete="current-password"

																		placeholder=''
																		class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																	/>
																</div>
																<div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>Total units<span class="text-red-400">*</span>
																	</label
																	>
																	<input
																		name="totalUnits"
																		type="tel"
																		autocomplete="current-password"

																		placeholder=''
																		class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																	/>
																</div>
																<div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>REREA No.
																	</label
																	>
																	<input
																		name="rera"
																		type="text"
																		autocomplete="current-password"

																		placeholder=''
																		class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																	/>
																</div>
																<br />
																<fieldset>
																	<legend class="text-md font-medium text-gray-900">Check if there are existing conditions or potential problems with any of the following<span class="text-red-400">*</span></legend>
																	<div class="bg-white sm:p-2">
																		<br />
																		<legend class="text-base font-medium text-gray-900">Building Structure</legend>

																		<br />												<div class="grid grid-cols-12 gap-6">
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isFoundationChecked} onChange={changeFoundationChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Foundations/slab</label>
																					</div>
																				</div>
																			</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isGeneralStructureChecked} onChange={changeGSChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">General structural</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isBasementChecked} onChange={changeBasementChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Basement water/dampness/sump pump</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isTermitesChecked} onChange={changeTermidesChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Termites/ants/pests</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isRoofChecked} onChange={changeRoofChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Roof</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isWaterLeakChecked} onChange={changeWaterLeakChecked} value="issue" id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Water leakage problem</label>
																					</div>
																				</div>
																			</div>
																		</div>

																	</div>
																	<br />
																	<div class="bg-white sm:p-2">
																		<legend class="text-base font-medium text-gray-900">Building System</legend>

																		<br />												<div class="grid grid-cols-12 gap-6">
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isPlumbingChecked} onChange={changePlumbingChecked} value="issue" value="plumbing" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Plumbing</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isElecChecked} onChange={changeElecChecked} value="issue" value="electrical" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Electrical</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isAcChecked} onChange={changeAcChecked} value="issue" value="AC" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Air conditioning</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isHotWaterChecked} onChange={changeHotWaterChecked} value="issue" value="hot water" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Hot water</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isWaterSupplyChecked} onChange={changeWaterSupplyChecked} value="issue" value="water supply" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Water supply</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isOtherFixturesChecked} onChange={changeOtherFixturesChecked} value="issue" value="other fixtures" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Other fixtures</label>
																					</div>
																				</div>
																			</div>
																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isSewageChecked} onChange={changeSewageChecked} value="issue" value="sewage" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Sewage</label>
																					</div>
																				</div>								</div>

																			<div class="col-span-6 sm:col-span-6">
																				<div class="flex items-start">
																					<div class="flex items-center h-5">
																						<input checked={isHeatingChecked} onChange={changeHeatingChecked} value="issue" value="heating" id="candidates" name="buildingSystemChallenges" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
																					</div>
																					<div class="ml-3 text-sm">
																						<label for="candidates" class="font-medium text-gray-700">Heating</label>
																					</div>
																				</div>
																			</div>
																		</div>

																	</div>
																</fieldset>
																<br />
																<div class="">
																	<div class=" sm:px-0">
																		<h5 class="text-md font-medium leading-6 text-gray-900">To hold this property as a Foundation asset, the following income and expenses are anticipated: </h5>
																	</div>
																</div>
																<div class="py-5 bg-white">
																	<legend class="text-base font-medium text-gray-900">Expenses</legend>
																	<br />
																	<div>
																		<label for="password" class="block text-sm font-medium text-gray-700"
																		>Maintenance ₹
																		</label
																		>
																		<input
																			name="maintenance"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<div>
																		<label for="password" class="block text-sm font-medium text-gray-700"
																		>Electricity ₹
																		</label
																		>
																		<input
																			name="elec"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<div>
																		<label for="password" class="block text-sm font-medium text-gray-700"
																		>Gas ₹
																		</label
																		>
																		<input
																			name="gas"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<div>
																		<label for="password" class="block text-sm font-medium text-gray-700"
																		>Yearly Tax ₹
																		</label
																		>
																		<input
																			name="annualCharges"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<div>
																		<label for="password" class="block text-sm font-medium text-gray-700"
																		>Others:₹
																		</label
																		>
																		<input
																			name="otherCharges"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<label for="password" class="block text-sm font-medium text-gray-700"
																	>Total Expenses: ₹
																	</label
																	>															<div>
																		<input
																			name="totalExpense"
																			type="tel"
																			autocomplete="current-password"

																			placeholder=''
																			class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>
																	</div>
																	<br />
																	<div class="md:col-span-1">
																		<div class="px-4 sm:px-0">
																			<h3 class="text-lg font-medium leading-6 text-gray-900">Expected property appreciation</h3>
																		</div>
																	</div>
																	<br />
																	<div class="grid grid-cols-6 gap-6">
																		<div class="col-span-6 sm:col-span-3">
																			<label for="first-name" class="block text-sm font-medium text-gray-700">Expeced return value (if you want to sell)</label>
																			<input
																				name="sellPriceDecided"
																				type="tel"
																				class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																			/>												</div>

																		<div class="col-span-6 sm:col-span-3">
																			<label for="last-name" class="block text-sm font-medium text-gray-700">Expected rent monthly (if you want to rent)</label>
																			<input
																				name="rentDecided"
																				type="tel"
																				class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																			/>																						</div>



																	</div>
																	<div class="col-span-6">
																		<label for="first-name" class="block text-sm font-medium text-gray-700">Additional Notes :</label>
																		<textarea
																			name="notes"

																			class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																		/>																	</div>
																</div>
																<div class="px-4 py-3 text-right sm:px-6">
																	<button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
																		Submit
																	</button>
																	<br />
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>

							{/* <div class="hidden sm:block" aria-hidden="true">
						<div class="py-5">
							<div class="border-t border-gray-200"></div>
						</div>
					</div> */}

							{/* <div class="mt-10 sm:mt-0">
						<div class="md:gap-6">
							<div class="md:col-span-1">
								<div class="px-4 sm:px-0">
									<h3 class="text-lg font-medium leading-6 text-gray-900">Notifications</h3>
									<p class="mt-1 text-sm text-gray-600">
										Decide which communications you'd like to receive and how.
									</p>
								</div>
							</div>
							<div class="mt-5 md:mt-0 md:col-span-2">
								<form action="#" method="POST">
									<div class="shadow overflow-hidden sm:rounded-md">
										<div class="px-4 py-5 bg-white space-y-6 sm:p-6">
											<fieldset>
												<legend class="text-base font-medium text-gray-900">By Email</legend>
												<div class="mt-4 space-y-4">
													<div class="flex items-start">
														<div class="flex items-center h-5">
															<input id="comments" name="comments" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
														</div>
														<div class="ml-3 text-sm">
															<label for="comments" class="font-medium text-gray-700">Comments</label>
															<p class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
														</div>
													</div>
													<div class="flex items-start">
														<div class="flex items-center h-5">
															<input id="candidates" name="candidates" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
														</div>
														<div class="ml-3 text-sm">
															<label for="candidates" class="font-medium text-gray-700">Candidates</label>
															<p class="text-gray-500">Get notified when a candidate applies for a job.</p>
														</div>
													</div>
													<div class="flex items-start">
														<div class="flex items-center h-5">
															<input id="offers" name="offers" type="checkbox" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
														</div>
														<div class="ml-3 text-sm">
															<label for="offers" class="font-medium text-gray-700">Offers</label>
															<p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
														</div>
													</div>
												</div>
											</fieldset>
											<fieldset>
												<div>
													<legend class="text-base font-medium text-gray-900">Push Notifications</legend>
													<p class="text-sm text-gray-500">These are delivered via SMS to your mobile phone.</p>
												</div>
												<div class="mt-4 space-y-4">
													<div class="flex items-center">
														<input id="push-everything" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
														<label for="push-everything" class="ml-3 block text-sm font-medium text-gray-700">
															Everything
														</label>
													</div>
													<div class="flex items-center">
														<input id="push-email" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
														<label for="push-email" class="ml-3 block text-sm font-medium text-gray-700">
															Same as email
														</label>
													</div>
													<div class="flex items-center">
														<input id="push-nothing" name="push-notifications" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
														<label for="push-nothing" class="ml-3 block text-sm font-medium text-gray-700">
															No push notifications
														</label>
													</div>
												</div>
											</fieldset>
										</div>
										<div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
											<button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												Save
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div> */}

						</div>
						{enqDone ? (
							<>
								<div
									className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
								>
									<div className="relative w-auto my-6 mx-auto max-w-sm">
										<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
											<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
												Thanks for choosing RealDukaan.

											</div>

											<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
												<div class="w-full h-full text-center">
													<div class="flex h-full flex-col justify-between">

														<p class="text-gray-600 text-md py-2 px-6">
															Listing request placed. We will review it shortly.
														</p>
														<div class="flex items-center justify-between gap-4 w-full mt-8">
															<a href="/list-property"
																type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																Continue listing
															</a>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
								<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
							</>
						) : null}
					</div>
				</>
			) : null}

			{onBoardToSeller ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<form onSubmit={makeBuyerSeller} method='POST'>
							<div className="relative w-auto my-6 mx-auto max-w-sm">
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									<div className="flex items-start justify-between p-5">
										You need to be a seller
									</div>
									<div className="flex items-start text-sm justify-between px-5">
										Tell us little more about you.
									</div>
									
									{loader ? (
						<>
							<div
								className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
							>
								<div className="relative w-auto my-6 mx-auto max-w-sm">
									<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

										<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
											<div class="w-full h-full text-center">
												<div class="flex h-full flex-col justify-between">

													<p class="text-gray-600 text-md py-2 px-6">
														<div class=" flex justify-center items-center">

															<div>
																<div class="loader bg-white p-5 rounded-full flex space-x-3">
																	<div class="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
																	<div class="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
																	<div class="w-2 h-2 bg-gray-800 rounded-full animate-bounce"></div>
																</div>
																Processing...
															</div>

														</div>

													</p>

												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
							<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
						</>
					) : null}
									<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">

										<div class="w-full h-full text-center">
										<div style={{ display: !avatarURL ? "block" : "none" }}>
										<div>
											<label class="block text-sm font-medium text-gray-700">
												Photo
											</label>
											<div class="mt-1 flex items-center">
												<input type="file" onChange={(e) => { setImage(e.target.files[0]) }} />
												<br />
											</div>
											<br />
										</div>
										<button type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={uploadPhoto}>Upload</button>

									</div>
											<div style={{ display: avatarURL ? "block" : "none" }} class="flex h-full flex-col justify-between">
												<div class="col-span-6 sm:col-span-3">
													<label for="country" class="block text-sm font-medium text-gray-700"
													>You are <span class="text-red-400">*</span></label
													>
													<select

														name="businessType"
														class="mt-2 text-black block w-52 py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
													>
														<option value="Agent" selected>Agent</option>
														<option value="Builder">Builder</option>
														<option value="Individual">Individual</option>
													</select>
												</div>
												<div class="flex items-center justify-between gap-4 w-full mt-8">
													<button
														type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														Submit
													</button>

												</div>
												<a href="/"
													type="button" class="py-4 px-4 pt-4 text-dark w-full transition ease-in duration-200 text-center text-base shadow-mdrounded-lg ">
													Cancel
												</a>
											</div>
										</div>
									</div>

								</div>
							</div>
						</form>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>) : null}
			{/* {onBoardToSeller ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					>
						<form onSubmit={makeBuyerSeller} method='POST'>
							<div className="relative w-auto my-6 mx-auto max-w-sm">
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									<div className="flex items-start justify-between p-5">
										You need to be a seller
									</div>
									<div className="flex items-start text-sm justify-between px-5">
										Tell us little more about you.
									</div>


									<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">

										<div class="w-full h-full text-center">

											<div class="flex h-full flex-col justify-between">
												<div class="col-span-6 sm:col-span-3">
													<label for="country" class="block text-sm font-medium text-gray-700"
													>You are <span class="text-red-400">*</span></label
													>
													<select

														name="businessType"
														class="mt-2 text-black block w-52 py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
													>
														<option value="Agent" selected>Agent</option>
														<option value="Builder">Builder</option>
														<option value="Individual">Individual</option>
													</select>
												</div>
												<div class="flex items-center justify-between gap-4 w-full mt-8">
													<button
														type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														Submit
													</button>

												</div>
												<button onClick={() => isBuyer(false)}
													type="button" class="py-4 px-4 pt-4 text-dark w-full transition ease-in duration-200 text-center text-base shadow-mdrounded-lg ">
													Cancel
												</button>
											</div>
										</div>
									</div>

								</div>
							</div>
						</form>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null} */}

			<Footer />
		</>
	)
}

export default SignUp
