/** @format */

import { useEffect, useState } from "react";
import { get } from "@utils/request";
import PayssionSelect from "@components/payssion/PayssionSelect";
import useHandlers from "./payssion/hooks/useHandlers";
import Apg from "@components/Apg";
import PaymentNet from "@components/paymentNet";
import Airwallex from "./pricing/Airwallex";
import AirwallexCallback from "./pricing/Airwallex/Callback";
import Asiapay from "@components/Asiapay";

const features = [
	["Individual configuration", "No setup, or hidden fees", "Credits"],
	["Supports Up to 2 Devices/Users", "No setup, or hidden fees", "Credits"],
	["Supports Up to 5 Devices/Users", "No setup, or hidden fees", "120 Credits"],
	[
		"Supports Up to 10 Devices/Users",
		"No setup, or hidden fees",
		"Credits",
		"API Batch Processing",
		"24/7 Dedicated Customer Support",
	],
];
const features2 = [
	["Individual configuration", "No setup, or hidden fees", "Credits"],
	[
		"Supports Up to 10 Devices/Users",
		"No setup, or hidden fees",
		"Credits",
		"API Batch Processing",
		"24/7 Dedicated Customer Support",
	],
];

function FeatureItems({ product, index }) {
	return (
		<ul role="list" className="mb-8 space-y-4 text-left text-sm">
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{features[index][0]}</span>
			</li>
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{features[index][1]}</span>
			</li>
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{product.credits} Credits</span>
			</li>
			{features[index][3] && (
				<li className="flex items-center space-x-3">
					<svg
						className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						></path>
					</svg>
					<span>{features[index][3]}</span>
				</li>
			)}
			{features[index][4] && (
				<li className="flex items-center space-x-3">
					<svg
						className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						></path>
					</svg>
					<span>{features[index][4]}</span>
				</li>
			)}
		</ul>
	);
}
function FeatureItems2({ product, index }) {
	return (
		<ul role="list" className="mb-8 space-y-4 text-left text-sm">
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{features2[index][0]}</span>
			</li>
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{features2[index][1]}</span>
			</li>
			<li className="flex items-center space-x-3">
				<svg
					className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fillRule="evenodd"
						d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						clipRule="evenodd"
					></path>
				</svg>
				<span>{product.credits} Credits /month</span>
			</li>
			{features2[index][3] && (
				<li className="flex items-center space-x-3">
					<svg
						className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						></path>
					</svg>
					<span>{features2[index][3]}</span>
				</li>
			)}
			{features2[index][4] && (
				<li className="flex items-center space-x-3">
					<svg
						className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
							clipRule="evenodd"
						></path>
					</svg>
					<span>{features2[index][4]}</span>
				</li>
			)}
		</ul>
	);
}

export default function PricingCard() {
	const [products, setProducts] = useState([]);
	const [preminumProducts, setPremiumProducts] = useState([]);
	const [product, setProduct] = useState(null);
	const [activedKey, setActivedKey] = useState(1);
	const [channels, setChannels] = useState([]);
	const handlers = useHandlers();
	const { setVisible } = handlers;

	const isLoggedIn = !!localStorage.getItem("user");

	const paymentButtonRender = (product) => {
		if (!isLoggedIn) {
			return (
				<div
					className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
					onClick={() => {
						login.click();
					}}
				>
					Subscribe
				</div>
			);
		}

		return channels.map(({ channel }) => {
			switch (channel) {
				// apg
				case 20:
					return <Apg product={product} />;
				// Payession
				case 9:
					return (
						<div
							className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:focus:ring-primary-900"
							onClick={() => {
								setVisible(true);
								setProduct(product);
							}}
						>
							Pay with wallet
						</div>
					);
				// paymentNet
				case 21:
					return <PaymentNet product={product} />;
				// asiapy
				case 23:
					return <Asiapay product={product} />;
				case 8:
					return <Airwallex product={product} />;
				default:
					return null;
			}
		});
	};

	useEffect(() => {
		get(`/products`, { type: 1 }).then(({ data }) => {
			const extraInfo = [
				{
					title: "Starter Package",
					desc: "Best option for personal use & for your next project.",
				},
				{
					title: "Basic Package",
					desc: "Relevant for multiple users, extended & premium support.",
				},
				{
					title: "Standard Package",
					desc: "Perfect for growing teams requiring additional resources and flexibility.",
				},
				{
					title: "Business Package",
					desc: "Best for large scale uses and extended redistribution rights.",
				},
			];
			setProducts(
				data.map((product, index) => ({
					...product,
					...(extraInfo[index] || {}),
				})),
			);
		});
		get(`/products`, { type: 0 }).then(({ data }) => {
			const extraInfo = [
				{
					title: "1 month",
					desc: "Best option for personal use & for your next project.",
				},
				{
					title: "12 months",
					desc: "Relevant for multiple users, extended & premium support.",
				},
			];
			setPremiumProducts(
				data.map((product, index) => ({
					...product,
					...(extraInfo[index] || {}),
				})),
			);
		});
	}, []);

	useEffect(() => {
		if (isLoggedIn) {
			get(`/v3/channels`).then(({ data }) => {
				setChannels(data);
			});
		}
	}, [isLoggedIn]);

console.log(product)

	return (
		<>
			<Tabs
				activedKey={activedKey}
				onClick={(value) => {
					setActivedKey(value);
				}}
			/>
			<div className="space-y-8 lg:flex sm:gap-3 xl:gap-5 lg:space-y-0 min-h-[500px] justify-center">
				{(activedKey === 1 ? products : preminumProducts).map(
					(product, index) => (
						<div
							key={product.id}
							className="flex flex-col p-3 max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-4 dark:bg-gray-800 dark:text-white"
						>
							<h3 className="mb-4 text-2xl font-semibold">{product.title}</h3>
							<p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
								{product.desc}
							</p>
							<div className="flex justify-center items-baseline my-8">
								<span className="mr-2 text-5xl font-extrabold">
									${product?.discount?.price || product.price}
								</span>
							</div>
							{product?.discount?.description && (
								<div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 mb-2 -mt-6">
									{product?.discount?.description}
								</div>
							)}
							{activedKey === 1 ? (
								<FeatureItems product={product} index={index} />
							) : (
								<FeatureItems2 product={product} index={index} />
							)}

							<div className="flex flex-col gap-2 mt-auto">
								{paymentButtonRender(product)}
							</div>
						</div>
					),
				)}
			</div>
			<PayssionSelect {...handlers} product={product} paymentList={channels.filter(({channel}) => channel===9)?.[0]?.localPaymentMethods || []} />
			<AirwallexCallback />
		</>
	);
}

const Tabs = ({ activedKey, onClick }) => {
	// 菜单
	const tabs = [
		{ label: "Credits Package", value: 1 },
		{ label: "Premium Plan", value: 0 },
	];
	return (
		<ul className="flex h-20 w-full space-x-6 font-bold text-3xl justify-center mb-4">
			{tabs.map(({ label, value }) => (
				<li
					key={value}
					className={`relative flex h-full cursor-pointer items-center font-bold text-gray-900`}
					onClick={() => {
						onClick(value);
					}}
				>
					{label}
					{activedKey === value && (
						<div className="absolute bottom-[10px] left-1/2 h-[6px] w-20 -translate-x-1/2 bg-primary-600"></div>
					)}
				</li>
			))}
		</ul>
	);
};
