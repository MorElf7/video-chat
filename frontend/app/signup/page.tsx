"use client";

import { AuthenticationContext } from "@/components/AuthenticationProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LoginResponse, SignUpRequest } from "@/interfaces/IAuth";
import client from "@/utils/axiosClient";
import { config } from "@/utils/config";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

export default function Login() {
	const [payload, setPayload] = useState({
		username: "",
		password: "",
		firstName: "",
		lastName: "",
	} as SignUpRequest);
	const router = useRouter();
	const [token, setToken] = useLocalStorage("token", "");
	const { userProfile } = useContext(AuthenticationContext);
	const [refreshToken, setRefreshToken] = useLocalStorage("refreshToken", "");

	useEffect(() => {
		if (userProfile && token !== "") {
			router.push("/");
		}
	}, [userProfile]);

	const handleChange = useCallback((e: any) => {
		e.preventDefault();
		setPayload((old: SignUpRequest) => {
			return { ...old, [e.target.name]: e.target.value };
		});
	}, []);

	const handleSubmit = async () => {
		const res = (await client.post(
			`${config.cloud.uri}/api/auth/signup`,
			payload
		)) as LoginResponse;
		setToken(res.token);
		setRefreshToken(res.refreshToken);
		router.push("/");
	};

	return (
		<div className="flex items-center justify-stretch h-full">
			<div className="max-w-2xl w-96 mx-auto ">
				<div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
					<form className="space-y-6" action="#">
						<h3 className="text-xl font-medium text-gray-900 dark:text-white">
							Sign up for our platform
						</h3>
						<div>
							<label
								htmlFor="username"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								Username
							</label>
							<input
								onChange={handleChange}
								type="username"
								name="username"
								id="username"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								placeholder="Your username"
								required={true}
							/>
						</div>
						<div>
							<label
								htmlFor="password"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								Password
							</label>
							<input
								onChange={handleChange}
								type="password"
								name="password"
								id="password"
								placeholder="Your password"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required={true}
							/>
						</div>
						<div>
							<label
								htmlFor="firstName"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								First Name
							</label>
							<input
								onChange={handleChange}
								type="text"
								name="firstName"
								id="firstName"
								placeholder="First Name"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required={true}
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
								Last Name
							</label>
							<input
								onChange={handleChange}
								type="text"
								name="lastName"
								id="lastName"
								placeholder="Last Name"
								className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
								required={true}
							/>
						</div>
						<button
							type="submit"
							onClick={handleSubmit}
							className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
							Sign up for your account
						</button>
						<div className="text-sm font-medium text-gray-500 dark:text-gray-300">
							Have an account?{" "}
							<Link href="/login" className="text-blue-700 hover:underline dark:text-blue-500">
								Login
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
