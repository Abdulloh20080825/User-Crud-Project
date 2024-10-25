import Link from 'next/link';
import React from 'react';

const HomePage: React.FC = () => {
	return (
		<div className='mt-44 flex flex-col items-center justify-center p-6'>
			<h1 className='text-4xl font-bold text-blue-700 mb-4'>
				Welcome to React CRUD App
			</h1>
			<p className='text-lg text-gray-700 mb-8 text-center'>
				This is a simple CRUD application built with Next.js. You can create,
				view, and manage user data.
			</p>
			<div className='flex space-x-4'>
				<Link
					href='/create'
					className='px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition-colors'
				>
					Create User
				</Link>
				<Link
					href='/show'
					className='px-6 py-3 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition-colors'
				>
					Show Users
				</Link>
			</div>
		</div>
	);
};

export default HomePage;
