import React from 'react'
import Head from 'next/head'
import Navbar from '../../components/Navbar'
import { useRouter } from 'next/router'
import Footer from '../../components/Footer';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/storage"
let app = null;
import { useCookies } from "react-cookie"

const firebaseConfig = {
	apiKey: 'AIzaSyBQ8VmCzHKwHjNd0NmtEOpAsvYwqayH0MU',
	authDomain: 'ddetails-47db8.firebaseapp.com',
	projectId: 'ddetails-47db8',
	storageBucket: 'ddetails-47db8.appspot.com',
	messagingSenderId: '231286919067',
	appId: '1:231286919067:web:c0ba041779d3353bafdb3e'
}
app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const SignUpSellerOnboard = ({ children }) => {
	const [cookie, setCookie, removeCookie] = useCookies(["user"])
	const router = useRouter()
	const [loader, loadingScreen] = React.useState(false);

	const [avatarURL, setAvatarURL] = React.useState('');

	const [mynumber, setnumber] = React.useState("");
	const uploadPhoto = () => {
		loadingScreen(true)

		if (image == null) {
			return;
		}
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
	const ValidateOtp = () => {
		try {
			final.confirm(otp).then((result) => {
				setCookie("phn", JSON.stringify(mynumber), {
					path: "/",
					maxAge: 3600, // Expires after 1hr
					sameSite: true,
				})
				otpVerified(true)
			}).catch((err) => {
				otpError(true)
			})
		} catch (err) {

			otpError(true)
		}


		// final.confirm(otp).then((result) => {
		// 	alert("OKAAY")
		// }).catch((err) => {
		// 	otpError(true)
		// })


	}
	const [phInput, setInput] = React.useState('');

	const [otpScreen1, otpLandScreen] = React.useState(false);
	const [enqDone, enqPlaced] = React.useState(false);
	const [otpSent, otpSuccess] = React.useState(false);
	const [otpFailure, otpError] = React.useState(false);

	const [otpTrue, otpVerified] = React.useState(false);
	let sentCodeId = null
	const [image, setImage] = React.useState('');
	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	const loadOTPScreen = () => {
		otpLandScreen(true)
	}
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	const upload = () => {
		firebaseUpload(true)
		if (image == null) {
			return;
		}
		const storage = firebase.storage();
		storage.ref(`${image.name}`).put(image);
		sleep(10000).then(() => {
			storage.ref(`${image.name}`).getDownloadURL()
				.then(url => {
					setAvatarURL(url);
					firebaseUpload(false)
				});;
		});

	}

	// const upload = () => {
	// 	if (image == null) {
	// 		return;
	// 	} else {
	// 		const storage = firebase.storage()
	// 		storage.ref(`${image.name}`).put(image);
	// 		setTimeout('', 5000);
	// 		storage.ref(`${image.name}`).getDownloadURL().then(url => {
	// 			avatarURL = url;
	// 			console.log(typeof (avatarURL))
	// 		})
	// 	}

	// }

	const generateOTP = async event => {
		const ph = String(phInput)
		if (ph.includes("+91")) {
		} else {
			phInput = "+91" + phInput
		}
		try {
			// let verify = new firebase.auth.RecaptchaVerifier('recaptcha-container');
			// auth.signInWithPhoneNumber("+919328880571", verify).then((result) => {
			// 	sentCodeId = result.verificationId
			// 	alert(result.verificationId)
			// 	otpSuccess(true)
			// })
			// 	.catch((err) => {
			// 		alert(err);
			// 		window.location.reload()
			// 	});
			// firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
			// otpSuccess(true)
			// });

			otpSuccess(true)

		} catch (err) {
			alert(err)
		}
	}
	const loadSellerOnboard = () => {
		Router.push("/")
	}
	const verifyOTP = async event => {
		const isTrue = false

		try {
			// 		const credential = firebase.auth.PhoneAuthProvider.credential(sentCodeId, event.target.otp.value);
			//   firebase
			//     .auth()
			//     .signInWithCredential(credential)
			//     .then(() => {
			// })
			// firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
			if (event.target.otp.value == 123) {
				otpSuccess(false)

				otpVerified(true)
			} else {
				otpSuccess(false)
				otpError(true)
			}
			// });
		} catch (err) {
		}
	}
	const createUserSeller = async event => {
		loadingScreen(true)
		event.preventDefault();
		const email = event.target.email.value
		const password = event.target.password.value
		const dateObj = new Date();
		const month = dateObj.getUTCMonth() + 1; //months from 1-12
		const day = dateObj.getUTCDate();
		const year = dateObj.getUTCFullYear();
		const sec = dateObj.getUTCSeconds();
		const code = day + "" + month + "" + year + "" + sec;
		const name = String(event.target.name.value)
		const uucode = name.substring(0, 4).toUpperCase();
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			+ (currentdate.getMonth() + 1) + "/"
			+ currentdate.getFullYear() + " @ "
			+ currentdate.getHours() + ":"
			+ currentdate.getMinutes() + ":"
			+ currentdate.getSeconds();
		const res = fetch('https://api.airtable.com/v0/appgsdBi4Ssk6GHRs/la', {
			body: JSON.stringify({
				records: [
					{
						fields: {
							name: event.target.name.value,
							email: event.target.email.value,
							contact: cookie.phn,
							city: event.target.city.value,
							status: "approved",
							package: "free",
							ucode: uucode + code,
							about: event.target.about.value,
							slug: event.target.name.value.toLowerCase().replace(/\s/g, "-"),
							slugUrl: "/" + event.target.name.value.toLowerCase().replace(/\s/g, "-"),
							thumbnailUrl: [{ url: avatarURL ? avatarURL : "https://img.icons8.com/fluency/344/person-male.png" }],
							businessType: event.target.businessType.value,
							userType: "seller",
							cameAs: "seller",
							timestamp: datetime,
							keywords:event.target.name.value
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


		try {
			firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
				removeCookie('vid')
				removeCookie('phn')
				loadingScreen(false)
				enqPlaced(true)
			});
		} catch (err) {
			console.error(err);
		}
	}
	return (
		<><Head>
			<title>Sign up - Real Dukaan</title>
			<meta name="description" content="Sign up" />
			<link rel="icon" href="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:title" content="Onboad seller - RealDukaan" />
			<meta property="og:description" content="Real Dukaan is India's community-managed shop listing platform which enables users to explore shops easily and efficiently.Explore commercial shops now." />
			<meta property="og:url" content="https://rdtesting.netlify.app/" />
			<meta property="og:image" content="https://dl.airtable.com/.attachmentThumbnails/3fbe59fbd3d405d40173f878ff5187ca/9f0069ed" />
			<meta property="og:site_name" content="Real Dukaan" />
			<meta property="og:type" content="website" />

		</Head>
			<Navbar />
			<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div class="max-w-md w-full space-y-8">
					<div>
						<h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
							Tell us something more about you
						</h2>
						<p class="mt-2 text-center text-sm text-gray-600">

						</p>
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
					<form onSubmit={createUserSeller} method="POST" class="mt-8 space-y-6" >
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
							<p class="text-center py-4" onClick={() => { setAvatarURL("https://img.icons8.com/fluency/344/person-male.png") }}>skip photo uploading</p>

						</div>
						<div style={{ display: avatarURL ? "block" : "none" }}>
							<div class="rounded-md shadow-sm -space-y-px">
								<div class="col-span-6 sm:col-span-3">
									<label for="country" class="block text-sm font-medium text-gray-700"
									>You are <span class="text-red-400">*</span></label
									>
									<select
										name="businessType"
										class="form-select mt-2 text-black block py-4 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded w-full"
									>
										<option value="Agent" selected>Agent</option>
										<option value="Builder">Builder</option>
										<option value="Individual">Individual</option>
									</select>
								</div>
								<br />

								<div>
									<label for="email-address" class="block text-sm font-medium text-gray-700"
									>Name <span class="text-red-400">*</span></label
									>
									<input
										name="name"
										type="text"

										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>


								<div class="col-span-6 sm:col-span-3">
									<label for="email-address" class="block text-sm font-medium text-gray-700"
									>Email <span class="text-red-400">*</span></label
									>
									<input
										name="email"
										type="email"
										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<div>
									<label for="password" class="block text-sm font-medium text-gray-700"
									>Set Password (must be 6 character long)
										<span class="text-red-400">*</span></label
									>
									<input
										name="password"
										type="password"
										autocomplete="current-password"

										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<div>
									<label for="password" class="block text-sm font-medium text-gray-700"
									>Confirm Password <span class="text-red-400">*</span></label
									>
									<input
										name="cnfPassword"
										type="password"

										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<div>
									<label for="email-address" class="block text-sm font-medium text-gray-700"
									>City <span class="text-red-400">*</span></label
									>
									<input
										name="city"
										type="text"

										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<div>
									<label for="email-address" class="block text-sm font-medium text-gray-700"
									>About</label
									>
									<input
										name="about"
										type="text"
										class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
									/>
								</div>
								<br />

							</div>
							<div>
								<button
									type="submit"
									class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Submit
								</button>
							</div>
						</div>
						<div class="flex items-center justify-between">
							<div class="text-sm">
								<a
									href="/sign-in"
									class="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Already have an account ?
								</a>
							</div>
						</div>

						{otpTrue ? (
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
															OTP verified
														</p>
														<div class="flex items-center justify-between gap-4 w-full mt-8">
															<button onClick={loadSellerOnboard()}
																class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
																Proceed next
															</button>
														</div>
													</div>
												</div>
											</div>

										</div>
									</div>
								</div>
							</>
						) : null}
					</form>

				</div>

				{otpSent ? (
					<>
						<form onSubmit={verifyOTP} method="POST">
							<div
								className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
							>
								<div className="relative w-auto my-6 mx-auto max-w-sm">
									<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
										<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
											OTP is sent to your mobile

										</div>

										<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
											<div class="w-full h-full text-center">
												<div class="flex h-full flex-col justify-between">

													<p class="text-gray-600 text-md py-2 px-6">
														Enter OTP
													</p>
													<input
														name="otp"
														type="tel"
														class="my-2 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
													/>

													<div class="flex items-center justify-between gap-4 w-full mt-8">
														<button
															type="submit"
															class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
															Verify OTP
														</button>
													</div>
												</div>
											</div>
										</div>

									</div>
								</div>
							</div>
						</form>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</>
				) : null}

				{otpFailure ? (
					<>
						<div
							className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
						>
							<div className="relative w-auto my-6 mx-auto max-w-sm">
								<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
									<div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
									</div>

									<div class="shadow-lg rounded-2xl p-4 bg-white w-64 m-auto">
										<div class="w-full h-full text-center">
											<div class="flex h-full flex-col justify-between">

												<p class="text-gray-600 text-md py-2 px-6">
													Incorrect OTP
												</p>
												<div class="flex items-center justify-between gap-4 w-full mt-8">
													<a href="/list-property"
														type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														Try again
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
															Uploading...
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

									<div class="rounded-2xl p-4 bg-white w-64 m-auto">
										<div class="w-full h-full text-center">
											<div class="flex h-full flex-col justify-between">

												<p class="text-gray-600 text-md py-2 px-6">
													Your account is created.
												</p>
												<div class="flex items-center justify-between gap-4 w-full mt-8">
													<a href="/list-property"
														type="button" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
														Continue to list property
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
			<Footer />
		</>
	)
}

export default SignUpSellerOnboard
