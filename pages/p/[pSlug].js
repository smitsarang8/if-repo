import React from 'react'
import useSWR from 'swr'
import axios from 'axios'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer'
import airtableAuth from '../../airtableAuth'
import Head from '../../components/ProductHead'
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import DatePicker from "react-datepicker";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

import "react-datepicker/dist/react-datepicker.css";


const Product = ({ product, author }) => {
	const images = [
		'https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
		'https://images.unsplash.com/photo-1641057350241-c05da7c70a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
	];
	const [isOpen, setIsOpen] = React.useState(false);
	const [vcScheduleDate, setStartDate] = React.useState(new Date());

	const [showModal, setShowModal] = React.useState(false);
	const [addedToFav, setAddedToFav] = React.useState(false);
	const [alreadyFav, setAlreadyFav] = React.useState(false);

	const [authPopup, askAuth] = React.useState(false);
	const [shareVar, setClipboard] = React.useState(false);
	const [showModalVC, videoCallModal] = React.useState(false);
	const [vcDone, vcPlaced] = React.useState(false);
	const [enqDone, enqPlaced] = React.useState(false);
	const router = useRouter()
	const [imgThumb, modalImgThumbClicked] = React.useState(false);
	const [img1, modalImg1Clicked] = React.useState(false);
	const [img2, modalImg2Clicked] = React.useState(false);
	const [img3, modalImg3Clicked] = React.useState(false);


	const { pSlug } = router.query
	const whyThis = () => {
		const infosArray = product.records[0].fields.infos.split(",")
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

			<span>{listItems}</span>
		);
	}
	const pricings = () => {
		if (product.records[0].fields.purpose == "sell") {
			return "₹" + product.records[0].fields.sellPrice
		} else if (product.records[0].fields.purpose == "rent") {
			return "₹" + product.records[0].fields.rentMonthly + "(monthly)"
		} else if (product.records[0].fields.purpose == "Both") {
			return "₹" + product.records[0].fields.sellPrice
		}
	}

	const projectLaunch = () => {
		if (product.records[0].fields.project_launch_on) {
			return <h3 class="leading-6 text-sm text-gray-900">Project launch : {product.records[0].fields.project_launch_on}</h3>;
		}

	}

	const openModalThumbnail = () => {
		modalImgThumbClicked(true)
	}
	const openModalImg1 = () => {
		modalImg1Clicked(true)
	}
	const openModalImg2 = () => {
		modalImg2Clicked(true)
	}
	const openModalImg3 = () => {
		modalImg3Clicked(true)
	}

	const loadAmenities = () => {

		const amenitiesArray = product.records[0].fields.amenities.split(",")

		if (amenitiesArray) {
			const listItems = amenitiesArray.map((number) => {
				if (number.toString().includes("Water")) {
					return <div class="p-4">
						<div class="flex-col flex justify-center items-center">
							<div class="flex-shrink-0">
								<a href="#" class="block relative">
									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/water.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
								</a>
							</div>
							<div class="mt-2 text-center flex flex-col">

								<span class="text-black text-xs">
									{number}
								</span>
							</div>
						</div>
					</div>
				} else if (number.toString().includes("Power")) {
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-battery-renewable-energy-kmg-design-outline-color-kmg-design.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;

				} else if (number.toString().includes("Parking")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/car.png"
					// /></span>;
					return <div class="p-4">
						<div class="flex-col  flex justify-center items-center">
							<div class="flex-shrink-0">
								<a href="#" class="block relative">
									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/car.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
								</a>
							</div>
							<div class="mt-2 text-center flex flex-col">

								<span class="text-black text-xs">
									{number}
								</span>
							</div>
						</div>
					</div>;

				} else if (number.toString().includes("Solar")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Camera")) {
					// return <span><img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Washroom")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Cleaning Service")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Dustbin")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/delete.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/delete.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Air Condition")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Music")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				} else if (number.toString().includes("Canteen")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				}
				else if (number.toString().includes("Wi-Fi")) {
					// return <span>{number}<img
					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
					// 	src="https://img.icons8.com/plasticine/100/000000/wifi.png"
					// /></span>;
					return <div>
						<img
							class="mx-auto object-cover h-10 w-10 "
							src="https://img.icons8.com/plasticine/100/000000/wifi.png"
						/>
						<div class="p-1 px-4 max-w-md py-3">
							<div
								class="relative transition duration-500 rounded-lg"
							>
								<div class="px-1 rounded-lg">
									<div class="mt-2 text-center flex flex-col">
										<span class="text-black text-xs">
											{number}
										</span>
									</div>
								</div>

							</div>
						</div>
					</div>;
				}
				else {
					return <div class="p-4">
						<div class="flex-col  flex justify-center items-center">
							<div class="flex-shrink-0">
								<a href="#" class="block relative">
									<img alt="profil" src="https://img.icons8.com/color/48/000000/ok--v1.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
								</a>
							</div>
							<div class="mt-2 text-center flex flex-col">

								<span class="text-black text-xs">
									{number}
								</span>
							</div>
						</div>
					</div>
				}
			});
			return (
				<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
					{listItems}</div>
			);
		}

	}

	const nearby = () => {
		const amenitiesArray = product.records[0].fields.nearby_places.split(",")
		if (amenitiesArray) {
			const listItems = amenitiesArray.map((number) => {

				return <li>{number}</li>
					;
			});
			return (
				<ul role="list" class="pl-4 list-decimal text-sm space-y-2">{listItems}</ul>
			);
		}

	}


	const purpose = () => {
		if (product.records[0].fields.purpose == "sell") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
				;
		} else if (product.records[0].fields.purpose == "rent") {
			return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>
				;
		}
	}
	const handleShareButton = () => {
		// Check if navigator.share is supported by the browser
		if (navigator.share) {
			navigator
				.share({
					url: "https://rdtesting.netlify.app/p/" + product.records[0].fields.slug
				})
				.then(() => {
				})
				.catch(() => {
				});
		} else {
			navigator.clipboard.writeText("https://rdtesting.netlify.app/p/" + product.records[0].fields.slug)
			setClipboard(true)
		}
	};
	const requestVideoCall = async event => {
		event.preventDefault();
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/video_call_request', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							name: event.target.vcName.value,
							email: event.target.vcEmail.value,
							contactNumber: event.target.vcNumber.value,
							city: event.target.vcCity.value,
							product_slug: product.records[0].fields.slug,
							date: vcScheduleDate,
							platform: event.target.vcFrom.value,
							status: "pending",
							requirement: event.target.vcReq.value,
							timeSlot: event.target.vcTimeSlot.value,
							timestamp: datetime
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
		if (result === 200) {
			vcPlaced(true)
			videoCallModal(false)
		}
	}
	const [isChecked, setIsChecked] = React.useState(false);
	const [isOnlyPropChecked, setIsOnlyPropChecked] = React.useState(false);
	const [isServicesChecked, setIsServiceChecked] = React.useState(false);
	const handleOnChange = () => {
		setIsChecked(!isChecked);
	};
	const cbOnlyProp = () => {
		setIsOnlyPropChecked(!isOnlyPropChecked);
	};
	const cbService = () => {
		setIsServiceChecked(!isServicesChecked);
	};

	const placePropertyEnquiry = async event => {
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		event.preventDefault();
		const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_inquiries', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							name: event.target.name.value,
							email: event.target.email.value,
							contactNumber: event.target.number.value,
							isAgent: isChecked ? "yes" : "-",
							services: isServicesChecked ? "yes" : "-",
							only_property: isOnlyPropChecked ? "yes" : "-",
							product_slug: product.records[0].fields.slug,
							status: "pending",
							timestamp: datetime
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
		if (result === 200) {
			enqPlaced(true)
		}
	}

	let app = null;
	const isLoggedIn = true
	const firebaseConfig = {
		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
		authDomain: 'ddetails-47db8.firebaseapp.com',
		projectId: 'ddetails-47db8',
		storageBucket: 'ddetails-47db8.appspot.com',
		messagingSenderId: '231286919067',
		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
	}
	app = firebase.initializeApp(firebaseConfig);
	try {
		if (firebase.auth().currentUser.email) {
		} else {
		}
	} catch {

	}


	const addToFav = async event => {
		var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var tok = '';
		for (var i = 0; i < 5; i++) {
			tok += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
		}
		const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?filterByFormula=AND({status}='active',{slug}='" + product.records[0].fields.slug + "',{email}='" + firebase.auth().currentUser.email + "')", {
			method: 'get',
			headers: new Headers({
				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
			}),
		})
		const products = await res.json()
		if (products.records.length > 0) {
			setAlreadyFav(true)
		} else {
			try {
				const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop', {
					body: JSON.stringify({
						records: [
							{
								fields: {
									fav_id: tok,
									email: firebase.auth().currentUser.email,
									slug: product.records[0].fields.slug,
									get_thumbnail_url: product.records[0].fields.get_thumbnail_url[0].thumbnails.large.url,
									square_feet: product.records[0].fields.square_feet,
									name: product.records[0].fields.name,
									shortAddress: product.records[0].fields.shortAddress,
									purpose: product.records[0].fields.purpose,
									rentMonthly: product.records[0].fields.rentMonthly,
									sellPrice: product.records[0].fields.sellPrice,
									status: "active",
									address_1: product.records[0].fields.address_1
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
				if (result === 200) {
					setAddedToFav(true)
				}
			} catch {

			}
		}

	}
	const checkAuth = () => {
		const firebaseConfig = {
			apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
			authDomain: 'ddetails-47db8.firebaseapp.com',
			projectId: 'ddetails-47db8',
			storageBucket: 'ddetails-47db8.appspot.com',
			messagingSenderId: '231286919067',
			appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
		}
		app = firebase.initializeApp(firebaseConfig);
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				addToFav()
			}
			else {
				askAuth(true)
			}
		});
	}
	// const router = useRouter()
	// const { id } = router.query


	// const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{slug}='"+router.query.pSlug+"')";
	// const fetcher = async (url) => await axios.get(url, {
	//   headers: {
	// 	'Authorization': airtableAuth.token
	//   }
	// }).then((res) => res.data);
	// const { data, error } = useSWR(address, fetcher);


	// if (error) return <div><Navbar />failed to load {error}<Footer /></div>
	if (!product) return <div><Navbar />  <div class="flex py-12 flex-col">
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
		</div> </div>		<Footer /></div>

	return (<>
		{product.records.map(p => (
			<span>
				<Head title={p.fields.name} keywords={p.fields.keywords} img={p.fields.get_thumbnail_url[0].thumbnails.large.url}/>
				<Navbar />
				<div>

				</div>
				<div class="bg-white">

					<div class="pt-6">

						<section class="max-w-6xl mx-auto  text-gray-600 body-font overflow-hidden">
						<section class="text-gray-600 body-font">
								<div class="container px-1 mx-auto flex flex-wrap">
									<div class="flex flex-wrap md:-m-2 -m-1">
									<main class="py-6 px-4 sm:p-6 md:py-10 md:px-8">
  <div class="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
    <div class="relative p-3 col-start-1 row-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t from-black/75 via-black/0 sm:bg-none sm:row-start-2 sm:p-0 lg:row-start-1">
      <h1 class="mt-1 text-lg font-semibold text-white sm:text-gray-900 md:text-2xl dark:sm:text-white">{p.fields.name}</h1>
      <p class="text-sm leading-4 font-medium text-black sm:text-white">{purpose()}</p>
   
    </div>
    <div class="grid gap-4 col-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:col-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
      <img onClick={() => openModalThumbnail()} src={p.fields.get_thumbnail_url[0].thumbnails.large.url} alt="" class="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>
      <img onClick={() => openModalImg1()} src={p.fields.image1[0].thumbnails.large.url} alt="" class="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy"/>


      <img onClick={() => openModalImg2()} src={p.fields.image2[0].thumbnails.large.url}  alt="" class=" w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
      <img onClick={() => openModalImg3()} src={p.fields.image3[0].thumbnails.large.url}  alt="" class=" w-full h-52 object-cover rounded-lg md:block lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy"/>
    </div>
    <dl class="mt-4 text-xs font-medium flex items-center row-start-2 sm:mt-1 sm:row-start-3 md:mt-2.5 lg:row-start-2">
      <dd class="flex items-center">
        <svg width="2" height="2" aria-hidden="true" fill="currentColor" class="text-gray-300">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-1 text-gray-400 dark:text-gray-500" aria-hidden="true">
          <path d="M18 11.034C18 14.897 12 19 12 19s-6-4.103-6-7.966C6 7.655 8.819 5 12 5s6 2.655 6 6.034Z" />
          <path d="M14 11a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
        </svg>
		{p.fields.shortAddress}
      </dd>
    </dl>
	
    <div class="mt-4 col-start-1 row-start-3 self-center sm:mt-0 sm:col-start-2 sm:row-start-2 sm:row-span-2 lg:mt-6 lg:col-start-1 lg:row-start-3 lg:row-end-4">
      <button type="button" class="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">Check availability</button>
    </div>
    <p class="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-gray-400">
      This sunny and spacious room is for those traveling light and looking for a comfy and cosy place to lay their head for a night or two. This beach house sits in a vibrant neighborhood littered with cafes, pubs, restaurants and supermarkets and is close to all the major attractions such as Edinburgh Castle and Arthur's Seat.
	  <p class="text-2xl text-gray-900">{pricings()}</p>
													<h3 class="mt-2 text-gray-900">
														Listed on : {p.fields.listed_on}
													</h3>

													<p class="mt-1 text-gray-900">
														{author.records.map(a => (<span>Listed by: <a href={a.fields.slugUrl} class="text-indigo-500">{a.fields.name}</a> </span>))}
													</p>
													{projectLaunch()}

	</p>
	
  </div>
</main>

									</div>
								</div>
							</section>
							<section class="text-gray-600 body-font">
								<div class="container px-1 mx-auto flex flex-wrap">
									<div class="flex flex-wrap md:-m-2 -m-1">
										<div class="flex flex-wrap w-1/2">
											<div onClick={() => openModalThumbnail()} class=" p-1 w-full">
												<img alt="gallery" class="w-full h-full object-cover object-center block" src={p.fields.get_thumbnail_url[0].thumbnails.large.url} />
											</div>
										</div>
										<div class="flex flex-wrap w-1/2">
											<div onClick={() => openModalImg1()} class="md:p-1 p-1 w-full">
												<img alt="gallery" class="w-full h-full object-cover object-center block" src={p.fields.image1[0].thumbnails.large.url} />
											</div>
											<div onClick={() => openModalImg2()} class="md:p-1 p-1 w-1/2">
												<img alt="gallery" class="w-full object-cover h-full object-center block" src={p.fields.image2[0].thumbnails.large.url} />
											</div>
											<div onClick={() => openModalImg3()} class="md:p-1 p-1 w-1/2">
												<img alt="gallery" class="w-full object-cover h-full object-center block" src={p.fields.image3[0].thumbnails.large.url} />
											</div>
										</div>
									</div>
								</div>
							</section>
							{imgThumb ? (
								<>
									(
									<Lightbox
										mainSrc={p.fields.get_thumbnail_url[0].thumbnails.large.url}
										onCloseRequest={() => modalImgThumbClicked(false)}
									/>
									)

								</>
							) : null}
							{img1 ? (
								<>
									<Lightbox
										mainSrc={p.fields.image1[0].thumbnails.large.url}
										onCloseRequest={() => modalImg1Clicked(false)}
									/>

								</>
							) : null}
							{img2 ? (
								<>
									<Lightbox
										mainSrc={p.fields.image2[0].thumbnails.large.url}
										onCloseRequest={() => modalImg2Clicked(false)}
									/>
								</>
							) : null}
							{img3 ? (
								<>
									<Lightbox
										mainSrc={p.fields.image3[0].thumbnails.large.url}
										onCloseRequest={() => modalImg3Clicked(false)}
									/>
								</>
							) : null}
						</section>



						<div class="max-w-2xl mx-auto px-4 py-4 sm:px-2 lg:max-w-7xl lg:pt-16 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
							<div class="lg:col-span-2 lg:pr-8">
								<div>
								
									<div class="px-4">
										<div>
											<dl class="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
												<div class="">
													<div class="flex items-baseline">
														{purpose()}
														<div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
														</div>
													</div>
													<h4 class="text-3xl font-extrabold tracking-tight text-gray-900">{p.fields.name}</h4>
													<div class="mt-1">
														{p.fields.shortAddress}
													</div>
													<p class="text-2xl text-gray-900">{pricings()}</p>
													<h3 class="mt-2 text-gray-900">
														Listed on : {p.fields.listed_on}
													</h3>

													<p class="mt-1 text-gray-900">
														{author.records.map(a => (<span>Listed by: <a href={a.fields.slugUrl} class="text-indigo-500">{a.fields.name}</a> </span>))}
													</p>
													{projectLaunch()}



												</div>


											</dl>

										</div>
									</div>

								</div>
							</div>
							<div class="px-4 sm:px-6 mt-2 lg:mt-0 lg:row-span-4">
								<div class="pr-3 py-2">
									<div class="flex justify-between">
										<div class="">
											<button
												type="button" class="px-2 flex justify-center items-center text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg ">
												<img
													class="py-2 px-4 flex justify-center items-center  bg-green-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg " onClick={() => videoCallModal(true)}
													src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAlUlEQVRIie2UMQ4CIRBF3/ccxs6DaOV6EC+h1zHxXvQmFpb6LYSEbFyLBarllRDeJzMD0FkGto+2g+cRbA9TbsWAAKwL7hgkbf4FuED+FUnJtQVuwEPSnhRQSvQMtu/5WrUA22fbr3FotRJNlW3VQpzTA3IuwPvnTo0Rip6DR2Pa6qFdgaekXfOvIvXgBIS58ni+s1Q+M0tjL3iZLDMAAAAASUVORK5CYII="></img>						</button>
											Video call
											{showModalVC ? (
												<>
													<div
														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
													>
														<div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
															<div class="relative bg-white rounded-lg shadow ">
																<div class="flex justify-between items-start p-5 rounded-t border-b ">
																	<h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">
																		Schedule a video call                </h3>
																	<button onClick={() => videoCallModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="default-modal">
																		<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
																	</button>
																</div>
																<div class="p-6 ">
																	<form onSubmit={requestVideoCall} class="" method="POST">

																		<input type="hidden" name="remember" value="true" />
																		<div class="rounded-md shadow-sm -space-y-px">
																			<div>
																				<label class="block text-sm font-medium text-gray-700">
																					Full Name <span class="text-red-400">*</span>
																				</label>
																				<input
																					required
																					name="vcName"
																					type="text"
																					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																				/>
																			</div>
																			<br />
																			<div>
																				<label class="block text-sm font-medium text-gray-700">
																					Email <span class="text-red-400">*</span>
																				</label>
																				<input
																					name="vcEmail"
																					required
																					type="email"
																					autocomplete="email"
																					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																				/>
																			</div>
																			<br />

																			<div class="grid grid-cols-6 gap-6">
																				<div class="col-span-6 sm:col-span-3">
																					<label for="first-name" class="block text-sm font-medium text-gray-700">																							Phone Number <span class="text-red-400">*</span>
																					</label>
																					<input
																						required
																						name="vcNumber"
																						type="tel"
																						autocomplete="contact"
																						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																					/>										</div>

																				<div class="col-span-6 sm:col-span-3">
																					<label class="block text-sm font-medium text-gray-700">
																						City <span class="text-red-400">*</span>
																					</label>
																					<input
																						name="vcCity"
																						type="text"
																						required
																						autocomplete="city"
																						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																					/>																					</div>
																			</div>
																			<div>

																			</div>
																			<br />
																			<div class="grid grid-cols-6 gap-6">
																				<div class="col-span-6 sm:col-span-3">
																					<label class="block text-sm font-medium text-gray-700">
																						Appointment date <span class="text-red-400">*</span>
																					</label>
																					<span class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
																						<DatePicker selected={vcScheduleDate} onChange={(date) => setStartDate(date)} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
																					</span>
																				</div>

																				<div class="col-span-6 sm:col-span-3">
																					<label for="country" class="block text-sm font-medium text-gray-700"
																					>Time slot<span class="text-red-400">*</span></label
																					>
																					<select
																						required
																						name="vcTimeSlot"
																						class="form-select text-black block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
																					>
																						<option value="10am to 11am" >10am to 11am</option>
																						<option value="11am to 12pm" >11am to 12pm</option>
																						<option value="12pm to 1pm" >12pm to 1pm</option>
																						<option value="1pm to 2pm" >1pm to 2pm</option>
																						<option value="2pm to 3pm" >2pm to 3pm</option>
																						<option value="3pm to 4pm" >3pm to 4pm</option>
																						<option value="4pm to 5pm" >4pm to 5pm</option>
																						<option value="5pm to 6pm">5pm to 6pm</option>

																					</select>																			</div>
																			</div>
																			<br />
																			<div>
																				<label for="country" class="block text-sm font-medium text-gray-700"
																				>Video call from <span class="text-red-400">*</span></label
																				>
																				<select
																					required
																					name="vcFrom"
																					class="form-select mt-2 text-black block py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
																				>
																					<option value="Whatsapp" selected>Whatsapp</option>
																					<option value="Skype">Skype</option>
																					<option value="Google Duo">Google Duo</option>
																					<option value="Zoom">Zoom</option>

																				</select>
																			</div>
																			<br />
																			<div>
																				<label class="block text-sm font-medium text-gray-700">
																					Property requirement
																				</label>
																				<textarea
																					name="vcReq"
																					class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
																				/>
																			</div>
																		</div>
																		<div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
																			<button type="submit" class="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Schedule</button>
																			<button onClick={() => videoCallModal(false)} data-modal-toggle="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Go back</button>
																		</div>
																	</form>

																</div>

															</div>
														</div>
													</div>
													<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
												</>
											) : null}
											{vcDone ? (
												<>
													<div
														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
													>
														<div className="relative w-auto my-6 mx-auto max-w-sm">
															{/*content*/}
															<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
																{/*header*/}
																<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
																	Thanks for choosing RealDukaan.

																</div>
																{/*body*/}

																<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
																	<div class="w-full h-full text-center">
																		<div class="flex h-full flex-col justify-between">

																			<p class="text-gray-600 text-md py-2 px-6">
																				Video call request placed
																			</p>
																			<div class="flex items-center justify-between gap-4 w-full mt-8">
																				<button onClick={() => vcPlaced(false)}
																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																					Done
																				</button>
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

										<div class="">

											<button
												onClick={checkAuth}
												type="button" class="py-2 px-4 flex justify-center items-center  bg-red-400 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
												<img src="https://img.icons8.com/material-outlined/24/ffffff/like--v1.png" />
											</button>
											Mark favourite
											{addedToFav ? (
												<>
													<div
														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
													>
														<div className="relative w-auto my-6 mx-auto max-w-sm">
															{/*content*/}
															<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
																{/*header*/}
																<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
																	Thanks for choosing RealDukaan.

																</div>
																{/*body*/}

																<div class="rounded-2xl p-4 bg-white w-64 m-auto">
																	<div class="w-full h-full text-center">
																		<div class="flex h-full flex-col justify-between">
																			<img class="h-12 w-12 mt-4 m-auto" src="https://img.icons8.com/external-sbts2018-flat-sbts2018/64/000000/external-favorite-social-media-basic-1-sbts2018-flat-sbts2018.png" />

																			<p class="text-gray-600 text-md py-2 px-6">
																				Marked as favourite

																			</p>
																			<div class="flex items-center justify-between gap-4 w-full mt-8">
																				<button onClick={() => setAddedToFav(false)}
																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																					Done
																				</button>
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
											{alreadyFav ? (
												<>
													<div
														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
													>
														<div className="relative w-auto my-6 mx-auto max-w-sm">
															{/*content*/}
															<div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
																{/*header*/}
																<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
																	Thanks for choosing RealDukaan.
																</div>
																{/*body*/}

																<div class="rounded-2xl p-4 bg-white w-64 m-auto">
																	<div class="w-full h-full text-center">
																		<div class="flex h-full flex-col justify-between">

																			<p class="text-gray-600 text-md py-2 px-6">
																				Already marked as favourite
																			</p>
																			<div class="flex items-center justify-between gap-4 w-full mt-8">
																				<a href="/favourites"
																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																					Go to favourites
																				</a>
																			</div>
																			<div class="flex items-center justify-between gap-4 w-full mt-">
																				<button onClick={() => setAlreadyFav(false)}
																					type="button" class="py-2 px-4 text-dark w-full transition ease-in duration-200 text-center text-base  rounded-lg ">
																					Cancel
																				</button>
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
											{authPopup ? (
												<>
													<div
														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
													>
														<div className="relative w-auto my-6 mx-auto max-w-sm">
															{/*content*/}
															<div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

																<div class="rounded-2xl p-4 bg-white w-64 m-auto">
																	<div class="w-full h-full text-center">
																		<div class="flex h-full flex-col justify-between">

																			<p class="text-gray-600 text-md py-2 px-6">
																				You need to login for making this property as favourite

																			</p>
																			<div class="flex items-center justify-between gap-4 w-full mt-8">
																				<a href="/sign-in"
																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																					Login
																				</a>
																			</div>
																			<div class="flex items-center justify-between gap-4 w-full mt-4">
																				<p onClick={() => askAuth(false)}
																					type="button" class="py-2 px-4 text-black w-full transition ease-in duration-200 text-center text-base font-normal rounded-lg ">
																					Go back
																				</p>
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
										<div class="">
											<button onClick={handleShareButton}
												type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-400  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
												<img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-share-network-sharing-those-icons-fill-those-icons.png" />								</button>
											Share
										</div>
										{shareVar ? (
											<>
												<div
													className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
												>
													<div className="relative w-auto my-6 mx-auto max-w-sm">
														{/*content*/}
														<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
															{/*header*/}
															<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
																Thanks for choosing RealDukaan.
															</div>
															{/*body*/}

															<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
																<div class="w-full h-full text-center">
																	<div class="flex h-full flex-col justify-between">

																		<p class="text-gray-600 text-md py-2 px-6">
																			Sharable link copied.
																		</p>
																		<div class="flex items-center justify-between gap-4 w-full mt-8">
																			<button onClick={() => setClipboard(false)}
																				type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																				Done
																			</button>
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
								</div>
								<button
									onClick={() => setShowModal(true)}

									class="px-4 w-full mt-4 bg-gray-800 hover:bg-indigo-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white "
								>
									View Floor Plan
								</button>
								{showModal ? (
									<>
										<div
											className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
										>
											<div className="relative w-auto my-6 mx-auto max-w-sm">
												{/*content*/}
												<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
													{/*header*/}
													<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
														<h3 className="text-3xl font-semibold">
															Modal Title
														</h3>
														<button
															className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
															onClick={() => setShowModal(false)}
														>
															<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
																×
															</span>
														</button>
													</div>
													{/*body*/}
													<div className="relative p-6 flex-auto">
														<div class="relative p-6 flex-auto">

															<img src="https://demo1.wpresidence.net/wp-content/uploads/2015/02/floor_plan_3d1.jpg" />
															<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
																Inside this enchanting home, the great room enjoys a fireplace and
																views of the rear patio. The secluded master suite at the front of
																the home delights in tons of natural light, a splendid bath, a
																sitting room with a fireplace, and a private lanai. Three
																upper-level bedrooms share an optional bonus room, perfect for a
																home gym, playroom, or studio. Click the home to see the layout!
															</p>
														</div>
													</div>
													{/*footer*/}
													<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
														<button
															className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
															type="button"
															onClick={() => setShowModal(false)}
														>
															Close
														</button>
													</div>
												</div>
											</div>
										</div>
										<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
									</>
								) : null}
							</div>

						</div>
						<div class="max-w-2xl mx-auto py-2 sm:px-2 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
							<div class="lg:col-span-2 lg:pr-8">
								<div>
									<h3 class="sr-only">Description</h3>
									<div class="px-4">
										<div class="px-4">
											<div class="mt-6">
												<div class="max-w-4xl mx-auto bg-white rounded-lg">
													<div class="flex items-center">
														<span class="h-8 w-8 relative">
															<img src="https://img.icons8.com/color/48/000000/checked-2--v1.png" />
														</span>
														<p class="text-2xl font-bold text-gray-700 hover:underline">Key specifications</p>
													</div>
													<div class="mt-2">
														<p class="mt-2 text-gray-600">
															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
																{whyThis()}
															</div>

														</p>
													</div>

												</div>
											</div>
											<div class="mt-6">
												<div class="max-w-4xl mx-auto bg-white rounded-lg ">
													<div class="mt-2">
														<p class="text-2xl font-bold text-gray-700 hover:underline">Address</p>

														<p class="mt-2 text-gray-600">
															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
																<div v-if="p.fields.rera" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">Location</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.address_1}
																			</p>
																		</div>
																	</div>
																</div>
																<div v-if="p.fields.square_feet" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">Area</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.area}
																			</p>
																		</div>
																	</div>
																</div>
																<div v-if="p.fields.size" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">City</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.city}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
																<div v-if="p.fields.rera" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">State</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.state}
																			</p>
																		</div>
																	</div>
																</div>
																<div v-if="p.fields.square_feet" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">Zipcode</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.zipcode}
																			</p>
																		</div>
																	</div>
																</div>
																<div v-if="p.fields.size" class="p-4">
																	<div class="flex-col flex justify-left items-left">
																		<div class="text-left flex flex-col">
																			<p class="text-sm font-medium">Country</p>
																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																				{p.fields.country}
																			</p>
																		</div>
																	</div>
																</div>
															</div>
														</p>
													</div>
												</div>
											</div>
											<div class="mt-4"><p class="text-2xl font-bold text-gray-700 hover:underline">About property</p>
												<p class="mt-2 text-gray-600">
													<div class="">
														<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
															<div v-if="p.fields.rera" class="p-4">
																<div class="flex-col flex">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">RERA</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.rera}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.square_feet" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Square feet</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.square_feet}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.size" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Size</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.size}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="">
														<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
															<div v-if="p.fields.construction_status" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Status</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.construction_status}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.floor_no" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Floor</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.floor_no}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.total_floor" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Total floor</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.total_floor}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>

													<div class="">
														<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
															<div v-if="p.fields.property_facing" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Property Facing</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.property_facing}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.side" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Side</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.side}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.age" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Age of property</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.age}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="">
														<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
															<div v-if="p.fields.usage_status" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Usage status</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.usage_status}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.posession" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Possession</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.posession}
																		</p>
																	</div>
																</div>
															</div>
															<div v-if="p.fields.propertyBuilder" class="p-4">
																<div class="flex-col flex justify-left items-left">
																	<div class="text-left flex flex-col">
																		<p class="text-sm font-medium">Property builder</p>
																		<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
																			{p.fields.propertyBuilder}
																		</p>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</p>
											</div>
										</div>
									</div>

								</div>
							</div>
							<div class="px-4 mt-2 lg:mt-0 lg:row-span-4">
								<div class="pr-3 py-2">
									<div class="">
										<div class="lg:row-span-3">

											<form onSubmit={placePropertyEnquiry} class="px-4 mt-2" method="POST">
												<label class="block text-lg font-medium text-gray-700">
													Interested in this property ?
												</label>
												<label class="block text-xs  text-gray-700">
													Place your enquiry now.
												</label>
												{author.records.map(a => (
													<a
														href={a.fields.slugUrl}
														class="flex items-center my-2"
													>
														<img
															src={a.fields.thumbnailUrl[0].thumbnails.large.url}
															alt={a.fields.name}
															class="w-20 h-20 mr-4"
														/>
														<p class="text-black text-sm">{a.fields.name}</p>

													</a>
												))}

												<input type="hidden" name="remember" value="true" />
												<div class="rounded-md -space-y-px">
													<div>
														<label class="block text-sm font-medium text-gray-700">
															Name <span class="text-red-400">*</span>
														</label>
														<input
															required
															name="name"
															type="text"
															class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														/>
													</div>
													<br />
													<div>
														<label class="block text-sm font-medium text-gray-700">
															Email <span class="text-red-400">*</span>
														</label>
														<input
															name="email"
															type="email"
															required
															autocomplete="current-password"
															class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														/>
													</div>
													<br />
													<div>
														<label class="block text-sm font-medium text-gray-700">
															Phone Number <span class="text-red-400">*</span>
														</label>
														<input
															required
															name="number"
															type="tel"
															autocomplete="current-password"
															class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
														/>
													</div>
													<br />
													<div>
														<label class="py-2 block text-sm font-medium text-gray-700">
															Are you real estate agent ?
														</label>
														<label class="inline-flex items-center mt-3 px-4">
															<input
																value="yes"
																checked={isChecked}
																onChange={handleOnChange}
																name="isAgent"
																type="checkbox"
																class="form-checkbox h-5 w-5 text-blue-600"
															/>
															<label class="block text-sm font-medium text-gray-700 pl-2"> I'm real estate agent </label>
														</label>

													</div>
												</div>
												<label class="py-2 block text-sm font-medium text-gray-700">
													Do you want extra services or focusing property only ?
												</label>
												<label class="inline-flex items-center mt-3 px-4">
													<input
														checked={isServicesChecked}
														onChange={cbService}
														value="loan"
														type="checkbox"
														class="form-checkbox h-5 w-5 text-blue-600"
													/>
													<label class="block text-sm font-medium text-gray-700 pl-2">Extra services </label>
												</label>

												<br />
												<label class="inline-flex items-center mt-3 px-4">
													<input
														value="art"
														checked={isOnlyPropChecked}
														onChange={cbOnlyProp}
														type="checkbox"
														class="form-checkbox h-5 w-5 text-blue-600"
													/>
													<label class="block text-sm font-medium text-gray-700 pl-2"> Only property </label>
												</label>
												<button
													type="submit"
													class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"              >
													Enquire
												</button>
											</form>
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
																				Enquiry placed. <br /> We will get back to you soon
																			</p>
																			<div class="flex items-center justify-between gap-4 w-full mt-8">
																				<button onClick={() => enqPlaced(false)}
																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																					Thanks!
																				</button>
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

									</div>
								</div>

							</div>

						</div>



						<div class="max-w-2xl mx-auto pb-8 px-4 sm:px-6 lg:max-w-7xl lg:pt-2 lg:pb-12 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
							<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
							</div>


							<div class="px-4 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
								<div class="">
									<div class="mt-1">
										<div class="max-w-4xl py-6 mx-auto bg-white rounded-lg">
											<div class="mt-2"><p class="text-2xl font-bold text-gray-700 hover:underline">Nearby places</p>
												<p class="mt-2 text-black">
													<div class="">
														<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
															<div class="mt-4 px-4 py-4">
																{nearby()}
															</div>
														</div>
													</div>
												</p>
											</div>
										</div>
									</div>

									<div class="mt-2">
										<div class="max-w-4xl py-6 mx-auto bg-white rounded-lg">
											<div class="mt-2"><p class="text-2xl font-bold text-gray-700 hover:underline">Amenities</p>
												<section class="text-gray-600 body-font">
													<div class="container py-6 mx-auto">

														<div class="">
															{/* <div class="p-4 lg:w-1/3">
																	<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
																		<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">A1</h2>
																	</div>
																</div>
																<div class="p-4 lg:w-1/3">
																	<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
																		<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">A2</h2>
																	</div>
																</div> */}

															<div className="mx-auto ">
																<div class="max-w-2xl mx-auto lg:max-w-none">
																	{loadAmenities()}
																</div>

															</div>

														</div>
													</div>
												</section>
											</div>
										</div>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>
			</span>
		))}
		<Footer />
	</>
	)
}

// export async function getServerSideProps(context) {

// 	const address = "https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{slug}='"+context.params.pSlug+"')";
// 	const fetcher = async (url) => await axios.get(url, {
// 	  headers: {
// 		'Authorization': airtableAuth.token
// 	  }
// 	}).then((res) => res.data);

// 	const { data, error } = useSWR(address, fetcher);

//   return {
//     props: {data:data , error:error}, // will be passed to the page component as props
//   }
// }
// import React from 'react'
// import Head from 'next/head'
// import Navbar from '../../components/Navbar'
// import { useRouter } from 'next/router'
// import Footer from '../../components/Footer';
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth"
// import DatePicker from "react-datepicker";
// import Lightbox from 'react-image-lightbox';
// import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

// import "react-datepicker/dist/react-datepicker.css";
// const Product = ({ product, author }) => {
// 	const images = [
// 		'https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
// 		'https://images.unsplash.com/photo-1641057350241-c05da7c70a9f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
// 	];
// 	const [isOpen, setIsOpen] = React.useState(false);
// 	const [vcScheduleDate, setStartDate] = React.useState(new Date());

// 	const [showModal, setShowModal] = React.useState(false);
// 	const [addedToFav, setAddedToFav] = React.useState(false);
// 	const [alreadyFav, setAlreadyFav] = React.useState(false);

// 	const [authPopup, askAuth] = React.useState(false);
// 	const [shareVar, setClipboard] = React.useState(false);
// 	const [showModalVC, videoCallModal] = React.useState(false);
// 	const [vcDone, vcPlaced] = React.useState(false);
// 	const [enqDone, enqPlaced] = React.useState(false);
// 	const router = useRouter()
// 	const [imgThumb, modalImgThumbClicked] = React.useState(false);
// 	const [img1, modalImg1Clicked] = React.useState(false);
// 	const [img2, modalImg2Clicked] = React.useState(false);
// 	const [img3, modalImg3Clicked] = React.useState(false);


// 	const { pSlug } = router.query
// 	const whyThis = () => {
// 		const infosArray = product.records[0].fields.infos.split(",")
// 		if (infosArray) {
// 			var listItems = []
// 			listItems = infosArray.map((number) => {
// 				if (number) {
// 					return <div v-if="p.fields.rera" class="p-2">
// 						<div class="flex-col flex justify-left items-left">
// 							<div class="text-left flex flex-col">
// 								<p class="text-sm font-medium">{number}</p>
// 							</div>
// 						</div>
// 					</div>;
// 				}
// 			})
// 		}
// 		return (

// 			<span>{listItems}</span>
// 		);
// 	}
// 	const pricings = () => {
// 		if (product.records[0].fields.purpose == "sell") {
// 			return "₹" + product.records[0].fields.sellPrice
// 		} else if (product.records[0].fields.purpose == "rent") {
// 			return "₹" + product.records[0].fields.rentMonthly + "(monthly)"
// 		} else if (product.records[0].fields.purpose == "Both") {
// 			return "₹" + product.records[0].fields.sellPrice
// 		}
// 	}

// 	const projectLaunch = () => {
// 		if (product.records[0].fields.project_launch_on) {
// 			return <h3 class="leading-6 text-sm text-gray-900">Project launch : {product.records[0].fields.project_launch_on}</h3>;
// 		}

// 	}

// 	const openModalThumbnail = () => {
// 		modalImgThumbClicked(true)
// 	}
// 	const openModalImg1 = () => {
// 		modalImg1Clicked(true)
// 	}
// 	const openModalImg2 = () => {
// 		modalImg2Clicked(true)
// 	}
// 	const openModalImg3 = () => {
// 		modalImg3Clicked(true)
// 	}

// 	const loadAmenities = () => {

// 		const amenitiesArray = product.records[0].fields.amenities.split(",")

// 		if (amenitiesArray) {
// 			const listItems = amenitiesArray.map((number) => {
// 				if (number.toString().includes("Water")) {
// 					return <div class="p-4">
// 						<div class="flex-col flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/water.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 				} else if (number.toString().includes("Power")) {
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-battery-renewable-energy-kmg-design-outline-color-kmg-design.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;

// 				} else if (number.toString().includes("Parking")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/car.png"
// 					// /></span>;
// 					return <div class="p-4">
// 						<div class="flex-col  flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/car.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>;

// 				} else if (number.toString().includes("Solar")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Camera")) {
// 					// return <span><img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Washroom")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Cleaning Service")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Dustbin")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/delete.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/delete.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Air Condition")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Music")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Canteen")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				}
// 				else if (number.toString().includes("Wi-Fi")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/wifi.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/wifi.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				}
// 				else {
// 					return <div class="p-4">
// 						<div class="flex-col  flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/color/48/000000/ok--v1.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 				}
// 			});
// 			return (
// 				<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
// 					{listItems}</div>
// 			);
// 		}

// 	}
// 	const loadAmenitiesTrial = () => {

// 		const amenitiesArray = product.records[0].fields.amenities.split(",")

// 		if (amenitiesArray) {
// 			const listItems = amenitiesArray.map((number) => {
// 				if (number.toString().includes("Water")) {
// 					return <div class="p-4">
// 						<div class="flex-col flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/water.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 				} else if (number.toString().includes("Power")) {
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/external-kmg-design-outline-color-kmg-design/32/000000/external-battery-renewable-energy-kmg-design-outline-color-kmg-design.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;

// 				} else if (number.toString().includes("Parking")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/car.png"
// 					// /></span>;
// 					return <div class="p-4">
// 						<div class="flex-col  flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/plasticine/100/000000/car.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>;

// 				} else if (number.toString().includes("Solar")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/quick-mode-on.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Camera")) {
// 					// return <span><img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/bullet-camera.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Washroom")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/wash-your-hands.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Cleaning Service")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/housekeeping.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Dustbin")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/delete.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/delete.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Air Condition")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/air-conditioner.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Music")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/apple-music.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				} else if (number.toString().includes("Canteen")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/restaurant.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				}
// 				else if (number.toString().includes("Wi-Fi")) {
// 					// return <span>{number}<img
// 					// 	class="mx-auto object-cover rounded-full h-10 w-10 "
// 					// 	src="https://img.icons8.com/plasticine/100/000000/wifi.png"
// 					// /></span>;
// 					return <div>
// 						<img
// 							class="mx-auto object-cover h-10 w-10 "
// 							src="https://img.icons8.com/plasticine/100/000000/wifi.png"
// 						/>
// 						<div class="p-1 px-4 max-w-md py-3">
// 							<div
// 								class="relative transition duration-500 rounded-lg"
// 							>
// 								<div class="px-1 rounded-lg">
// 									<div class="mt-2 text-center flex flex-col">
// 										<span class="text-black text-xs">
// 											{number}
// 										</span>
// 									</div>
// 								</div>

// 							</div>
// 						</div>
// 					</div>;
// 				}
// 				else {
// 					return <div class="p-4">
// 						<div class="flex-col  flex justify-center items-center">
// 							<div class="flex-shrink-0">
// 								<a href="#" class="block relative">
// 									<img alt="profil" src="https://img.icons8.com/color/48/000000/ok--v1.png" class="mx-auto object-cover rounded-full h-10 w-10 " />
// 								</a>
// 							</div>
// 							<div class="mt-2 text-center flex flex-col">

// 								<span class="text-black text-xs">
// 									{number}
// 								</span>
// 							</div>
// 						</div>
// 					</div>
// 				}
// 			});
// 			return (
// 				<div class="mt-1 my-1 lg:space-y-0 lg:grid lg:grid-cols-3">
// 					{listItems}</div>
// 			);
// 		}

// 	}


// 	const nearby = () => {
// 		const amenitiesArray = product.records[0].fields.nearby_places.split(",")
// 		if (amenitiesArray) {
// 			const listItems = amenitiesArray.map((number) => {

// 				return <li>{number}</li>
// 					;
// 			});
// 			return (
// 				<ul role="list" class="pl-4 list-decimal text-sm space-y-2">{listItems}</ul>
// 			);
// 		}

// 	}


// 	const purpose = () => {
// 		if (product.records[0].fields.purpose == "sell") {
// 			return <span class="inline-block rounded-md text-black py-1 text-xs">SELL</span>
// 				;
// 		} else if (product.records[0].fields.purpose == "rent") {
// 			return <span class="inline-block rounded-md text-black py-1 text-xs">RENT</span>
// 				;
// 		}
// 	}
// 	const handleShareButton = () => {
// 		// Check if navigator.share is supported by the browser
// 		if (navigator.share) {
// 			navigator
// 				.share({
// 					url: "https://rdtesting.netlify.app/p/" + product.records[0].fields.slug
// 				})
// 				.then(() => {
// 				})
// 				.catch(() => {
// 				});
// 		} else {
// 			navigator.clipboard.writeText("https://rdtesting.netlify.app/p/" + product.records[0].fields.slug)
// 			setClipboard(true)
// 		}
// 	};
// 	const requestVideoCall = async event => {
// 		event.preventDefault();
// 		var currentdate = new Date();
// 		var datetime = currentdate.getDate() + "/"
// 			+ (currentdate.getMonth() + 1) + "/"
// 			+ currentdate.getFullYear() + " @ "
// 			+ currentdate.getHours() + ":"
// 			+ currentdate.getMinutes() + ":"
// 			+ currentdate.getSeconds();
// 		const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/video_call_request', {
// 			body: JSON.stringify({
// 				records: [
// 					{
// 						fields: {
// 							name: event.target.vcName.value,
// 							email: event.target.vcEmail.value,
// 							contactNumber: event.target.vcNumber.value,
// 							city: event.target.vcCity.value,
// 							product_slug: product.records[0].fields.slug,
// 							date: vcScheduleDate,
// 							platform: event.target.vcFrom.value,
// 							status: "pending",
// 							requirement: event.target.vcReq.value,
// 							timeSlot: event.target.vcTimeSlot.value,
// 							timestamp: datetime
// 						}
// 					}
// 				]
// 			}),
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 			},
// 			method: 'POST'
// 		})

// 		const result = await res.status
// 		if (result === 200) {
// 			vcPlaced(true)
// 			videoCallModal(false)
// 		}
// 	}
// 	const [isChecked, setIsChecked] = React.useState(false);
// 	const [isOnlyPropChecked, setIsOnlyPropChecked] = React.useState(false);
// 	const [isServicesChecked, setIsServiceChecked] = React.useState(false);
// 	const handleOnChange = () => {
// 		setIsChecked(!isChecked);
// 	};
// 	const cbOnlyProp = () => {
// 		setIsOnlyPropChecked(!isOnlyPropChecked);
// 	};
// 	const cbService = () => {
// 		setIsServiceChecked(!isServicesChecked);
// 	};

// 	const placePropertyEnquiry = async event => {
// 		var currentdate = new Date();
// 		var datetime = currentdate.getDate() + "/"
// 			+ (currentdate.getMonth() + 1) + "/"
// 			+ currentdate.getFullYear() + " @ "
// 			+ currentdate.getHours() + ":"
// 			+ currentdate.getMinutes() + ":"
// 			+ currentdate.getSeconds();
// 		event.preventDefault();
// 		const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_inquiries', {
// 			body: JSON.stringify({
// 				records: [
// 					{
// 						fields: {
// 							name: event.target.name.value,
// 							email: event.target.email.value,
// 							contactNumber: event.target.number.value,
// 							isAgent: isChecked ? "yes" : "-",
// 							services: isServicesChecked ? "yes" : "-",
// 							only_property: isOnlyPropChecked ? "yes" : "-",
// 							product_slug: product.records[0].fields.slug,
// 							status: "pending",
// 							timestamp: datetime
// 						}
// 					}
// 				]
// 			}),
// 			headers: {
// 				'Content-Type': 'application/json',
// 				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 			},
// 			method: 'POST'
// 		})

// 		const result = await res.status
// 		if (result === 200) {
// 			enqPlaced(true)
// 		}
// 	}

// 	let app = null;
// 	const isLoggedIn = true
// 	const firebaseConfig = {
// 		apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
// 		authDomain: 'ddetails-47db8.firebaseapp.com',
// 		projectId: 'ddetails-47db8',
// 		storageBucket: 'ddetails-47db8.appspot.com',
// 		messagingSenderId: '231286919067',
// 		appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
// 	}
// 	app = firebase.initializeApp(firebaseConfig);
// 	try {
// 		if (firebase.auth().currentUser.email) {
// 		} else {
// 		}
// 	} catch {

// 	}


// 	const addToFav = async event => {
// 		var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
// 		var tok = '';
// 		for (var i = 0; i < 5; i++) {
// 			tok += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
// 		}
// 		const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop?filterByFormula=AND({status}='active',{slug}='" + product.records[0].fields.slug + "',{email}='" + firebase.auth().currentUser.email + "')", {
// 			method: 'get',
// 			headers: new Headers({
// 				'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 			}),
// 		})
// 		const products = await res.json()
// 		if (products.records.length > 0) {
// 			setAlreadyFav(true)
// 		} else {
// 			try {
// 				const res = await fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/fav_prop', {
// 					body: JSON.stringify({
// 						records: [
// 							{
// 								fields: {
// 									fav_id: tok,
// 									email: firebase.auth().currentUser.email,
// 									slug: product.records[0].fields.slug,
// 									get_thumbnail_url: product.records[0].fields.get_thumbnail_url[0].thumbnails.large.url,
// 									square_feet: product.records[0].fields.square_feet,
// 									name: product.records[0].fields.name,
// 									shortAddress: product.records[0].fields.shortAddress,
// 									purpose: product.records[0].fields.purpose,
// 									rentMonthly: product.records[0].fields.rentMonthly,
// 									sellPrice: product.records[0].fields.sellPrice,
// 									status: "active",
// 									address_1 : product.records[0].fields.address_1
// 								}
// 							}
// 						]
// 					}),
// 					headers: {
// 						'Content-Type': 'application/json',
// 						'Authorization': 'Bearer keyLRae2Fru3dnFqr',
// 					},
// 					method: 'POST'
// 				})
// 				const result = await res.status
// 				if (result === 200) {
// 					setAddedToFav(true)
// 				}
// 			} catch {

// 			}
// 		}

// 	}
// 	const checkAuth = () => {
// 		const firebaseConfig = {
// 			apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
// 			authDomain: 'ddetails-47db8.firebaseapp.com',
// 			projectId: 'ddetails-47db8',
// 			storageBucket: 'ddetails-47db8.appspot.com',
// 			messagingSenderId: '231286919067',
// 			appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
// 		}
// 		app = firebase.initializeApp(firebaseConfig);
// 		firebase.auth().onAuthStateChanged(function (user) {
// 			if (user) {
// 				addToFav()
// 			}
// 			else {
// 				askAuth(true)
// 			}
// 		});
// 	}
// 	return (
// 		<>
// 			{product.records.map(p => (
// 				<span>
// 					<Head>
// 						<title>{p.fields.name} - Real Dukaan</title>
// 						<meta name="description" content={p.fields.name} />
// 						<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
// 						<meta property="og:title" content={p.fields.name} />
// 						<meta property="og:description" content="Visit this property on Real Dukaan. India's shop listing platform which enables users to explore shops easily and efficiently. Explore commercial shops now." />
// 						<meta property="og:url" content="https://rdtesting.netlify.app/" />
// 						<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
// 						<meta property="og:site_name" content="Real Dukaan" />
// 						<meta property="og:type" content="website" />

// 					</Head>
// 					<Navbar />
// 					<div>

// 					</div>
// 					<div class="bg-white">

// 						<div class="pt-6">

// 							<section class="max-w-6xl mx-auto  text-gray-600 body-font overflow-hidden">

// 								<section class="text-gray-600 body-font">
// 									<div class="container px-1 mx-auto flex flex-wrap">
// 										<div class="flex flex-wrap md:-m-2 -m-1">
// 											<div class="flex flex-wrap w-1/2">
// 												<div onClick={() => openModalThumbnail()} class=" p-1 w-full">
// 													<img alt="gallery" class="w-full h-full object-cover object-center block" src={p.fields.get_thumbnail_url[0].thumbnails.large.url} />
// 												</div>
// 											</div>
// 											<div class="flex flex-wrap w-1/2">
// 												<div onClick={() => openModalImg1()} class="md:p-1 p-1 w-full">
// 													<img alt="gallery" class="w-full h-full object-cover object-center block" src={p.fields.image1[0].thumbnails.large.url} />
// 												</div>
// 												<div onClick={() => openModalImg2()} class="md:p-1 p-1 w-1/2">
// 													<img alt="gallery" class="w-full object-cover h-full object-center block" src={p.fields.image2[0].thumbnails.large.url} />
// 												</div>
// 												<div onClick={() => openModalImg3()} class="md:p-1 p-1 w-1/2">
// 													<img alt="gallery" class="w-full object-cover h-full object-center block" src={p.fields.image3[0].thumbnails.large.url} />
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</section>
// 								{imgThumb ? (
// 									<>
// 										(
// 										<Lightbox
// 											mainSrc={p.fields.get_thumbnail_url[0].thumbnails.large.url}
// 											onCloseRequest={() => modalImgThumbClicked(false)}
// 										/>
// 										)

// 									</>
// 								) : null}
// 								{img1 ? (
// 									<>
// 										<Lightbox
// 											mainSrc={p.fields.image1[0].thumbnails.large.url}
// 											onCloseRequest={() => modalImg1Clicked(false)}
// 										/>

// 									</>
// 								) : null}
// 								{img2 ? (
// 									<>
// 										<Lightbox
// 											mainSrc={p.fields.image2[0].thumbnails.large.url}
// 											onCloseRequest={() => modalImg2Clicked(false)}
// 										/>
// 									</>
// 								) : null}
// 								{img3 ? (
// 									<>
// 										<Lightbox
// 											mainSrc={p.fields.image3[0].thumbnails.large.url}
// 											onCloseRequest={() => modalImg3Clicked(false)}
// 										/>
// 									</>
// 								) : null}
// 							</section>



// 							<div class="max-w-2xl mx-auto px-4 py-4 sm:px-2 lg:max-w-7xl lg:pt-16 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
// 								<div class="lg:col-span-2 lg:pr-8">
// 									<div>
// 										<h3 class="sr-only">Description</h3>
// 										<div class="px-4">
// 											<div>
// 												<dl class="mt-4 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
// 													<div class="">
// 														<div class="flex items-baseline">
// 															{purpose()}
// 															<div class="ml-2 text-gray-600 uppercase text-xs font-semibold tracking-wider">
// 															</div>
// 														</div>
// 														<h4 class="text-3xl font-extrabold tracking-tight text-gray-900">{p.fields.name}</h4>
// 														<div class="mt-1">
// 															{p.fields.shortAddress}
// 														</div>
// 														<p class="text-2xl text-gray-900">{pricings()}</p>
// 														<h3 class="mt-2 text-gray-900">
// 															Listed on : {p.fields.listed_on}
// 														</h3>

// 														<p class="mt-1 text-gray-900">
// 															{author.records.map(a => (<span>Listed by: <a href={a.fields.slugUrl} class="text-indigo-500">{a.fields.name}</a> </span>))}
// 														</p>
// 														{projectLaunch()}



// 													</div>


// 												</dl>

// 											</div>
// 										</div>

// 									</div>
// 								</div>
// 								<div class="px-4 sm:px-6 mt-2 lg:mt-0 lg:row-span-4">
// 									<div class="pr-3 py-2">
// 										<div class="flex justify-between">
// 											<div class="">
// 												<button
// 													type="button" class="px-2 flex justify-center items-center text-white w-full transition ease-in duration-200 text-center text-base font-semibold rounded-lg ">
// 													<img
// 														class="py-2 px-4 flex justify-center items-center  bg-green-500 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg " onClick={() => videoCallModal(true)}
// 														src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAAAlUlEQVRIie2UMQ4CIRBF3/ccxs6DaOV6EC+h1zHxXvQmFpb6LYSEbFyLBarllRDeJzMD0FkGto+2g+cRbA9TbsWAAKwL7hgkbf4FuED+FUnJtQVuwEPSnhRQSvQMtu/5WrUA22fbr3FotRJNlW3VQpzTA3IuwPvnTo0Rip6DR2Pa6qFdgaekXfOvIvXgBIS58ni+s1Q+M0tjL3iZLDMAAAAASUVORK5CYII="></img>						</button>
// 												Video call
// 												{showModalVC ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div class="relative px-4 w-full max-w-2xl h-full md:h-auto">
// 																<div class="relative bg-white rounded-lg shadow ">
// 																	<div class="flex justify-between items-start p-5 rounded-t border-b ">
// 																		<h3 class="text-xl font-semibold text-gray-900 lg:text-2xl">
// 																			Schedule a video call                </h3>
// 																		<button onClick={() => videoCallModal(false)} type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" data-modal-toggle="default-modal">
// 																			<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
// 																		</button>
// 																	</div>
// 																	<div class="p-6 ">
// 																		<form onSubmit={requestVideoCall} class="" method="POST">

// 																			<input type="hidden" name="remember" value="true" />
// 																			<div class="rounded-md shadow-sm -space-y-px">
// 																				<div>
// 																					<label class="block text-sm font-medium text-gray-700">
// 																						Full Name <span class="text-red-400">*</span>
// 																					</label>
// 																					<input
// 																						required
// 																						name="vcName"
// 																						type="text"
// 																						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 																					/>
// 																				</div>
// 																				<br />
// 																				<div>
// 																					<label class="block text-sm font-medium text-gray-700">
// 																						Email <span class="text-red-400">*</span>
// 																					</label>
// 																					<input
// 																						name="vcEmail"
// 																						required
// 																						type="email"
// 																						autocomplete="email"
// 																						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 																					/>
// 																				</div>
// 																				<br />

// 																				<div class="grid grid-cols-6 gap-6">
// 																					<div class="col-span-6 sm:col-span-3">
// 																						<label for="first-name" class="block text-sm font-medium text-gray-700">																							Phone Number <span class="text-red-400">*</span>
// 																						</label>
// 																						<input
// 																							required
// 																							name="vcNumber"
// 																							type="tel"
// 																							autocomplete="contact"
// 																							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 																						/>										</div>

// 																					<div class="col-span-6 sm:col-span-3">
// 																						<label class="block text-sm font-medium text-gray-700">
// 																							City <span class="text-red-400">*</span>
// 																						</label>
// 																						<input
// 																							name="vcCity"
// 																							type="text"
// 																							required
// 																							autocomplete="city"
// 																							class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 																						/>																					</div>
// 																				</div>
// 																				<div>

// 																				</div>
// 																				<br />
// 																				<div class="grid grid-cols-6 gap-6">
// 																					<div class="col-span-6 sm:col-span-3">
// 																						<label class="block text-sm font-medium text-gray-700">
// 																							Appointment date <span class="text-red-400">*</span>
// 																						</label>
// 																						<span class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
// 																							<DatePicker selected={vcScheduleDate} onChange={(date) => setStartDate(date)} class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" />
// 																						</span>
// 																					</div>

// 																					<div class="col-span-6 sm:col-span-3">
// 																						<label for="country" class="block text-sm font-medium text-gray-700"
// 																						>Time slot<span class="text-red-400">*</span></label
// 																						>
// 																						<select
// 																							required
// 																							name="vcTimeSlot"
// 																							class="form-select text-black block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
// 																						>
// 																							<option value="10am to 11am" >10am to 11am</option>
// 																							<option value="11am to 12pm" >11am to 12pm</option>
// 																							<option value="12pm to 1pm" >12pm to 1pm</option>
// 																							<option value="1pm to 2pm" >1pm to 2pm</option>
// 																							<option value="2pm to 3pm" >2pm to 3pm</option>
// 																							<option value="3pm to 4pm" >3pm to 4pm</option>
// 																							<option value="4pm to 5pm" >4pm to 5pm</option>
// 																							<option value="5pm to 6pm">5pm to 6pm</option>

// 																						</select>																			</div>
// 																				</div>
// 																				<br />
// 																				<div>
// 																					<label for="country" class="block text-sm font-medium text-gray-700"
// 																					>Video call from <span class="text-red-400">*</span></label
// 																					>
// 																					<select
// 																						required
// 																						name="vcFrom"
// 																						class="form-select mt-2 text-black block py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
// 																					>
// 																						<option value="Whatsapp" selected>Whatsapp</option>
// 																						<option value="Skype">Skype</option>
// 																						<option value="Google Duo">Google Duo</option>
// 																						<option value="Zoom">Zoom</option>

// 																					</select>
// 																				</div>
// 																				<br />
// 																				<div>
// 																					<label class="block text-sm font-medium text-gray-700">
// 																						Property requirement
// 																					</label>
// 																					<textarea
// 																						name="vcReq"
// 																						class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 																					/>
// 																				</div>
// 																			</div>
// 																			<div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 ">
// 																				<button type="submit" class="text-white bg-green-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Schedule</button>
// 																				<button onClick={() => videoCallModal(false)} data-modal-toggle="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">Go back</button>
// 																			</div>
// 																		</form>

// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 												{vcDone ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div className="relative w-auto my-6 mx-auto max-w-sm">
// 																{/*content*/}
// 																<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 																	{/*header*/}
// 																	<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 																		Thanks for choosing RealDukaan.

// 																	</div>
// 																	{/*body*/}

// 																	<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
// 																		<div class="w-full h-full text-center">
// 																			<div class="flex h-full flex-col justify-between">

// 																				<p class="text-gray-600 text-md py-2 px-6">
// 																					Video call request placed
// 																				</p>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																					<button onClick={() => vcPlaced(false)}
// 																						type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																						Done
// 																					</button>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 											</div>

// 											<div class="">

// 												<button
// 													onClick={checkAuth}
// 													type="button" class="py-2 px-4 flex justify-center items-center  bg-red-400 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
// 													<img src="https://img.icons8.com/material-outlined/24/ffffff/like--v1.png" />
// 												</button>
// 												Mark favourite
// 												{addedToFav ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div className="relative w-auto my-6 mx-auto max-w-sm">
// 																{/*content*/}
// 																<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 																	{/*header*/}
// 																	<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 																		Thanks for choosing RealDukaan.

// 																	</div>
// 																	{/*body*/}

// 																	<div class="rounded-2xl p-4 bg-white w-64 m-auto">
// 																		<div class="w-full h-full text-center">
// 																			<div class="flex h-full flex-col justify-between">
// 																				<img class="h-12 w-12 mt-4 m-auto" src="https://img.icons8.com/external-sbts2018-flat-sbts2018/64/000000/external-favorite-social-media-basic-1-sbts2018-flat-sbts2018.png" />

// 																				<p class="text-gray-600 text-md py-2 px-6">
// 																					Marked as favourite

// 																				</p>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																					<button onClick={() => setAddedToFav(false)}
// 																						type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																						Done
// 																					</button>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 												{alreadyFav ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div className="relative w-auto my-6 mx-auto max-w-sm">
// 																{/*content*/}
// 																<div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 																	{/*header*/}
// 																	<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 																		Thanks for choosing RealDukaan.
// 																	</div>
// 																	{/*body*/}

// 																	<div class="rounded-2xl p-4 bg-white w-64 m-auto">
// 																		<div class="w-full h-full text-center">
// 																			<div class="flex h-full flex-col justify-between">

// 																				<p class="text-gray-600 text-md py-2 px-6">
// 																					Already marked as favourite
// 																				</p>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																					<a href="/favourites"
// 																						type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																						Go to favourites
// 																					</a>
// 																				</div>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-">
// 																					<button onClick={() => setAlreadyFav(false)}
// 																						type="button" class="py-2 px-4 text-dark w-full transition ease-in duration-200 text-center text-base  rounded-lg ">
// 																						Cancel
// 																					</button>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 												{authPopup ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div className="relative w-auto my-6 mx-auto max-w-sm">
// 																{/*content*/}
// 																<div className="border-0 rounded-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">

// 																	<div class="rounded-2xl p-4 bg-white w-64 m-auto">
// 																		<div class="w-full h-full text-center">
// 																			<div class="flex h-full flex-col justify-between">

// 																				<p class="text-gray-600 text-md py-2 px-6">
// 																					You need to login for making this property as favourite

// 																				</p>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																					<a href="/sign-in"
// 																						type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																						Login
// 																					</a>
// 																				</div>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-4">
// 																					<p onClick={() => askAuth(false)}
// 																						type="button" class="py-2 px-4 text-black w-full transition ease-in duration-200 text-center text-base font-normal rounded-lg ">
// 																						Go back
// 																					</p>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 											</div>
// 											<div class="">
// 												<button onClick={handleShareButton}
// 													type="button" class="py-2 px-4 flex justify-center items-center  bg-blue-400  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md rounded-lg ">
// 													<img src="https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-share-network-sharing-those-icons-fill-those-icons.png" />								</button>
// 												Share
// 											</div>
// 											{shareVar ? (
// 												<>
// 													<div
// 														className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 													>
// 														<div className="relative w-auto my-6 mx-auto max-w-sm">
// 															{/*content*/}
// 															<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 																{/*header*/}
// 																<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 																	Thanks for choosing RealDukaan.
// 																</div>
// 																{/*body*/}

// 																<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
// 																	<div class="w-full h-full text-center">
// 																		<div class="flex h-full flex-col justify-between">

// 																			<p class="text-gray-600 text-md py-2 px-6">
// 																				Sharable link copied.
// 																			</p>
// 																			<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																				<button onClick={() => setClipboard(false)}
// 																					type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																					Done
// 																				</button>
// 																			</div>
// 																		</div>
// 																	</div>
// 																</div>

// 															</div>
// 														</div>
// 													</div>
// 													<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 												</>
// 											) : null}
// 										</div>
// 									</div>
// 									<button
// 										onClick={() => setShowModal(true)}

// 										class="px-4 w-full mt-4 bg-gray-800 hover:bg-indigo-800 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white "
// 									>
// 										View Floor Plan
// 									</button>
// 									{showModal ? (
// 										<>
// 											<div
// 												className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 											>
// 												<div className="relative w-auto my-6 mx-auto max-w-sm">
// 													{/*content*/}
// 													<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 														{/*header*/}
// 														<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 															<h3 className="text-3xl font-semibold">
// 																Modal Title
// 															</h3>
// 															<button
// 																className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
// 																onClick={() => setShowModal(false)}
// 															>
// 																<span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
// 																	×
// 																</span>
// 															</button>
// 														</div>
// 														{/*body*/}
// 														<div className="relative p-6 flex-auto">
// 															<div class="relative p-6 flex-auto">

// 																<img src="https://demo1.wpresidence.net/wp-content/uploads/2015/02/floor_plan_3d1.jpg" />
// 																<p class="my-4 text-blueGray-500 text-lg leading-relaxed">
// 																	Inside this enchanting home, the great room enjoys a fireplace and
// 																	views of the rear patio. The secluded master suite at the front of
// 																	the home delights in tons of natural light, a splendid bath, a
// 																	sitting room with a fireplace, and a private lanai. Three
// 																	upper-level bedrooms share an optional bonus room, perfect for a
// 																	home gym, playroom, or studio. Click the home to see the layout!
// 																</p>
// 															</div>
// 														</div>
// 														{/*footer*/}
// 														<div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
// 															<button
// 																className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
// 																type="button"
// 																onClick={() => setShowModal(false)}
// 															>
// 																Close
// 															</button>
// 														</div>
// 													</div>
// 												</div>
// 											</div>
// 											<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 										</>
// 									) : null}
// 								</div>

// 							</div>
// 							<div class="max-w-2xl mx-auto py-2 sm:px-2 lg:max-w-7xl lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
// 								<div class="lg:col-span-2 lg:pr-8">
// 									<div>
// 										<h3 class="sr-only">Description</h3>
// 										<div class="px-4">
// 											<div class="px-4">
// 												<div class="mt-6">
// 													<div class="max-w-4xl mx-auto bg-white rounded-lg">
// 														<div class="flex items-center">
// 															<span class="h-8 w-8 relative">
// 																<img src="https://img.icons8.com/color/48/000000/checked-2--v1.png" />
// 															</span>
// 															<p class="text-2xl font-bold text-gray-700 hover:underline">Key specifications</p>
// 														</div>
// 														<div class="mt-2">
// 															<p class="mt-2 text-gray-600">
// 																<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
// 																	{whyThis()}
// 																</div>

// 															</p>
// 														</div>

// 													</div>
// 												</div>
// 												<div class="mt-6">
// 													<div class="max-w-4xl mx-auto bg-white rounded-lg ">
// 														<div class="mt-2">
// 															<p class="text-2xl font-bold text-gray-700 hover:underline">Address</p>

// 															<p class="mt-2 text-gray-600">
// 																<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
// 																	<div v-if="p.fields.rera" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">Location</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.address_1}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																	<div v-if="p.fields.square_feet" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">Area</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.area}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																	<div v-if="p.fields.size" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">City</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.city}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
// 																	<div v-if="p.fields.rera" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">State</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.state}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																	<div v-if="p.fields.square_feet" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">Zipcode</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.zipcode}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																	<div v-if="p.fields.size" class="p-4">
// 																		<div class="flex-col flex justify-left items-left">
// 																			<div class="text-left flex flex-col">
// 																				<p class="text-sm font-medium">Country</p>
// 																				<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																					{p.fields.country}
// 																				</p>
// 																			</div>
// 																		</div>
// 																	</div>
// 																</div>
// 															</p>
// 														</div>
// 													</div>
// 												</div>
// 												<div class="mt-4"><p class="text-2xl font-bold text-gray-700 hover:underline">About property</p>
// 													<p class="mt-2 text-gray-600">
// 														<div class="">
// 															<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
// 																<div v-if="p.fields.rera" class="p-4">
// 																	<div class="flex-col flex">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">RERA</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.rera}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.square_feet" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Square feet</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.square_feet}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.size" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Size</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.size}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 														<div class="">
// 															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
// 																<div v-if="p.fields.construction_status" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Status</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.construction_status}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.floor_no" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Floor</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.floor_no}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.total_floor" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Total floor</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.total_floor}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>

// 														<div class="">
// 															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
// 																<div v-if="p.fields.property_facing" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Property Facing</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.property_facing}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.side" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Side</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.side}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.age" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Age of property</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.age}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 														<div class="">
// 															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-4">
// 																<div v-if="p.fields.usage_status" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Usage status</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.usage_status}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.posession" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Possession</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.posession}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 																<div v-if="p.fields.propertyBuilder" class="p-4">
// 																	<div class="flex-col flex justify-left items-left">
// 																		<div class="text-left flex flex-col">
// 																			<p class="text-sm font-medium">Property builder</p>
// 																			<p class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
// 																				{p.fields.propertyBuilder}
// 																			</p>
// 																		</div>
// 																	</div>
// 																</div>
// 															</div>
// 														</div>
// 													</p>
// 												</div>
// 											</div>
// 										</div>

// 									</div>
// 								</div>
// 								<div class="px-4 mt-2 lg:mt-0 lg:row-span-4">
// 									<div class="pr-3 py-2">
// 										<div class="">
// 											<div class="lg:row-span-3">

// 												<form onSubmit={placePropertyEnquiry} class="px-4 mt-2" method="POST">
// 													<label class="block text-lg font-medium text-gray-700">
// 														Interested in this property ?
// 													</label>
// 													<label class="block text-xs  text-gray-700">
// 														Place your enquiry now.
// 													</label>
// 													{author.records.map(a => (
// 														<a
// 															href={a.fields.slugUrl}
// 															class="flex items-center my-2"
// 														>
// 															<img
// 																src={a.fields.thumbnailUrl[0].thumbnails.large.url}
// 																alt={a.fields.name}
// 																class="w-20 h-20 mr-4"
// 															/>
// 															<p class="text-black text-sm">{a.fields.name}</p>

// 														</a>
// 													))}

// 													<input type="hidden" name="remember" value="true" />
// 													<div class="rounded-md -space-y-px">
// 														<div>
// 															<label class="block text-sm font-medium text-gray-700">
// 																Name <span class="text-red-400">*</span>
// 															</label>
// 															<input
// 																required
// 																name="name"
// 																type="text"
// 																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 															/>
// 														</div>
// 														<br />
// 														<div>
// 															<label class="block text-sm font-medium text-gray-700">
// 																Email <span class="text-red-400">*</span>
// 															</label>
// 															<input
// 																name="email"
// 																type="email"
// 																required
// 																autocomplete="current-password"
// 																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 															/>
// 														</div>
// 														<br />
// 														<div>
// 															<label class="block text-sm font-medium text-gray-700">
// 																Phone Number <span class="text-red-400">*</span>
// 															</label>
// 															<input
// 																required
// 																name="number"
// 																type="tel"
// 																autocomplete="current-password"
// 																class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
// 															/>
// 														</div>
// 														<br />
// 														<div>
// 															<label class="py-2 block text-sm font-medium text-gray-700">
// 																Are you real estate agent ?
// 															</label>
// 															<label class="inline-flex items-center mt-3 px-4">
// 																<input
// 																	value="yes"
// 																	checked={isChecked}
// 																	onChange={handleOnChange}
// 																	name="isAgent"
// 																	type="checkbox"
// 																	class="form-checkbox h-5 w-5 text-blue-600"
// 																/>
// 																<label class="block text-sm font-medium text-gray-700 pl-2"> I'm real estate agent </label>
// 															</label>

// 														</div>
// 													</div>
// 													<label class="py-2 block text-sm font-medium text-gray-700">
// 														Do you want extra services or focusing property only ?
// 													</label>
// 													<label class="inline-flex items-center mt-3 px-4">
// 														<input
// 															checked={isServicesChecked}
// 															onChange={cbService}
// 															value="loan"
// 															type="checkbox"
// 															class="form-checkbox h-5 w-5 text-blue-600"
// 														/>
// 														<label class="block text-sm font-medium text-gray-700 pl-2">Extra services </label>
// 													</label>

// 													<br />
// 													<label class="inline-flex items-center mt-3 px-4">
// 														<input
// 															value="art"
// 															checked={isOnlyPropChecked}
// 															onChange={cbOnlyProp}
// 															type="checkbox"
// 															class="form-checkbox h-5 w-5 text-blue-600"
// 														/>
// 														<label class="block text-sm font-medium text-gray-700 pl-2"> Only property </label>
// 													</label>
// 													<button
// 														type="submit"
// 														class="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"              >
// 														Enquire
// 													</button>
// 												</form>
// 												{enqDone ? (
// 													<>
// 														<div
// 															className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
// 														>
// 															<div className="relative w-auto my-6 mx-auto max-w-sm">
// 																<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
// 																	<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
// 																		Thanks for choosing RealDukaan.

// 																	</div>

// 																	<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
// 																		<div class="w-full h-full text-center">
// 																			<div class="flex h-full flex-col justify-between">

// 																				<p class="text-gray-600 text-md py-2 px-6">
// 																					Enquiry placed. <br /> We will get back to you soon
// 																				</p>
// 																				<div class="flex items-center justify-between gap-4 w-full mt-8">
// 																					<button onClick={() => enqPlaced(false)}
// 																						type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
// 																						Thanks!
// 																					</button>
// 																				</div>
// 																			</div>
// 																		</div>
// 																	</div>

// 																</div>
// 															</div>
// 														</div>
// 														<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
// 													</>
// 												) : null}
// 											</div>

// 										</div>
// 									</div>

// 								</div>

// 							</div>



// 							<div class="max-w-2xl mx-auto pb-8 px-4 sm:px-6 lg:max-w-7xl lg:pt-2 lg:pb-12 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
// 								<div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
// 								</div>


// 								<div class="px-4 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
// 									<div class="">
// 										<div class="mt-1">
// 											<div class="max-w-4xl py-6 mx-auto bg-white rounded-lg">
// 												<div class="mt-2"><p class="text-2xl font-bold text-gray-700 hover:underline">Nearby places</p>
// 													<p class="mt-2 text-black">
// 														<div class="">
// 															<div class="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-4 gap-2">
// 																<div class="mt-4 px-4 py-4">
// 																	{nearby()}
// 																</div>
// 															</div>
// 														</div>
// 													</p>
// 												</div>
// 											</div>
// 										</div>

// 										<div class="mt-2">
// 											<div class="max-w-4xl py-6 mx-auto bg-white rounded-lg">
// 												<div class="mt-2"><p class="text-2xl font-bold text-gray-700 hover:underline">Amenities</p>
// 													<section class="text-gray-600 body-font">
// 														<div class="container py-6 mx-auto">

// 															<div class="">
// 																{/* <div class="p-4 lg:w-1/3">
// 																	<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
// 																		<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">A1</h2>
// 																	</div>
// 																</div>
// 																<div class="p-4 lg:w-1/3">
// 																	<div class="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
// 																		<h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">A2</h2>
// 																	</div>
// 																</div> */}

// 																<div className="mx-auto ">
// 																	<div class="max-w-2xl mx-auto lg:max-w-none">
// 																		{loadAmenities()}
// 																	</div>

// 																</div>

// 															</div>
// 														</div>
// 													</section>
// 												</div>
// 											</div>
// 										</div>


// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</span>
// 			))}
// 			<Footer />

// 		</>
// 	)
// }

export const getStaticProps = async (context) => {
	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?filterByFormula=AND({status}='approved',{slug}='" + context.params.pSlug + "')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const resp = await res.json()
	const ucode = resp.records[0].fields.ucode
	const ress = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la?filterByFormula=AND({status}='approved',{ucode}='" + ucode + "')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const resa = await ress.json()

	return {
		props: {
			product: resp,
			author: resa
		},
	}
}

export async function getStaticPaths() {
	const res = await fetch("https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/listing_requests?&filterByFormula=AND({status}='approved')", {
		method: 'get',
		headers: new Headers({
			'Authorization': 'Bearer keyLRae2Fru3dnFqr',
		}),
	})
	const products = await res.json()
	const paths = products.records.map((user) => ({
		params: { pSlug: String(user.fields.slug) },

	}))

	return { paths, fallback: true }
}

export default Product