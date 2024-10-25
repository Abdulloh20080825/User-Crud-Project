'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useState } from 'react';

const CreateUserPage = () => {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [number, setNumber] = useState<string | number>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);
	const router = useRouter();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.name === 'username') setUsername(e.target.value);
		else if (e.target.name === 'email') setEmail(e.target.value);
		else if (e.target.name === 'number') setNumber(e.target.value);
		else console.log('Input not found');
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		try {
			const res = await axios.post('http://localhost:8000/create-user', {
				username,
				email,
				number,
			});
			router.push('/show-users');
			console.log(res);
		} catch (error: any) {
			console.log(error.respo);
			if (error.response.data.error) {
				setError(error.response.data.message);
			}
		} finally {
			setUsername('');
			setUsername('');
			setNumber('');
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col items-center mt-12'>
			<h1 className='text-4xl font-bold text-gray-800 tracking-wide mb-8'>
				Create User
			</h1>
			{error ? <p className='text-red-600 font-bold'>{error}</p> : null}
			<form
				className='flex flex-col space-y-5 bg-white p-8 rounded-lg shadow-lg max-w-md w-full'
				onSubmit={handleSubmit}
			>
				<input
					type='text'
					name='username'
					autoComplete='off'
					placeholder='Enter a username'
					className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800'
					value={username}
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='email'
					name='email'
					placeholder='Enter email address'
					autoComplete='off'
					className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800'
					value={email}
					onChange={(e) => handleChange(e)}
				/>
				<input
					type='number'
					name='number'
					placeholder='Enter a number'
					autoComplete='off'
					className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800'
					value={number}
					onChange={(e) => handleChange(e)}
				/>
				<button
					type='submit'
					className='w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300'
				>
					{loading ? 'Loadin...' : 'Create'}
				</button>
			</form>
		</div>
	);
};

export default CreateUserPage;
