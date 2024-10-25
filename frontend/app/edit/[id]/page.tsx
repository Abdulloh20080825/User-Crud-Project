'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';

const EditUserPage = () => {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
		number: '',
	});

	const { id } = useParams();
	const router = useRouter();

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const res = await axios.get(`http://localhost:8000/get-user/${id}`);
				setUserData({
					username: res.data.user.username,
					email: res.data.user.email,
					number: res.data.user.number,
				});
			} catch (error) {
				console.error('Error fetching user data:', error);
			}
		};
		fetchUserData();
	}, [id]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUserData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			await axios.put(`http://localhost:8000/update-user/${id}`, userData);
			router.push('/show-users');
		} catch (error) {
			console.error('Error updating user:', error);
		}
	};

	return (
		<div className='flex flex-col items-center justify-center h-[90vh]  '>
			<h1 className='text-3xl font-extrabold text-white mb-8'>Edit User</h1>
			<form
				className='bg-white shadow-lg rounded-lg px-10 py-8 w-full max-w-md'
				onSubmit={handleSubmit}
			>
				<div className='mb-6'>
					<label
						className='block text-gray-800 text-lg font-semibold mb-2'
						htmlFor='username'
					>
						Name
					</label>
					<input
						type='text'
						name='username'
						value={userData.username}
						onChange={handleChange}
						className='shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-200 ease-in-out'
						required
					/>
				</div>

				<div className='mb-6'>
					<label
						className='block text-gray-800 text-lg font-semibold mb-2'
						htmlFor='email'
					>
						Email
					</label>
					<input
						type='email'
						name='email'
						value={userData.email}
						onChange={handleChange}
						className='shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-200 ease-in-out'
						required
					/>
				</div>

				<div className='mb-6'>
					<label
						className='block text-gray-800 text-lg font-semibold mb-2'
						htmlFor='number'
					>
						Phone
					</label>
					<input
						type='text'
						name='number'
						value={userData.number}
						onChange={handleChange}
						className='shadow-md appearance-none border border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline transition duration-200 ease-in-out'
						required
					/>
				</div>

				<div className='flex items-center justify-between'>
					<button
						type='submit'
						className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline shadow-md transition-all duration-300 ease-in-out'
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditUserPage;
