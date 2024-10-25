'use client';

import { UserInterface } from '@/interface/user';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';

const ShowUserPage = () => {
	const [users, setUsers] = useState<null | UserInterface[]>(null);
	const router = useRouter();

	const { id } = useParams();

	useEffect(() => {
		const getUserData = async () => {
			try {
				const res = await axios.get('http://localhost:8000/get-all-users');
				setUsers(res.data.users);
			} catch (error) {
				console.log(error);
			}
		};
		getUserData();
	}, []);

	const removeUser = async (userId: string) => {
		try {
			const res = await axios.delete(
				`http://localhost:8000/remove-user/${userId}`
			);
			setUsers(
				(prevUsers) => prevUsers?.filter((user) => user._id !== userId) || null
			);
		} catch (error) {
			console.log(error);
		}
	};

	if (!users) {
		return <h1 className='text-2xl text-center mt-10'>Loading users...</h1>;
	}

	return (
		<div className='flex flex-col items-center mt-8'>
			<h1 className='text-3xl font-bold text-gray-800 mb-6'>User List</h1>
			<div className='w-full max-w-4xl'>
				<table className='min-w-full bg-white shadow-md rounded-lg'>
					<thead>
						<tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
							<th className='py-3 px-6 text-left'>ID</th>
							<th className='py-3 px-6 text-left'>Name</th>
							<th className='py-3 px-6 text-left'>Email</th>
							<th className='py-3 px-6 text-left'>Phone</th>
							<th className='py-3 px-6 text-center'>Actions</th>
						</tr>
					</thead>
					<tbody className='text-gray-600 text-sm font-light'>
						{users.map((user, index) => (
							<tr
								key={index}
								className='border-b border-gray-200 hover:bg-gray-100'
							>
								<td className='py-3 px-6 text-left'>{index + 1}</td>
								<td className='py-3 px-6 text-left'>{user.username}</td>
								<td className='py-3 px-6 text-left'>{user.email}</td>
								<td className='py-3 px-6 text-left'>{user.number}</td>
								<td className='py-3 px-6 text-center'>
									<div className='flex item-center justify-center space-x-4'>
										<button
											className='w-4 mr-2 transform hover:text-blue-500 hover:scale-110'
											onClick={() => router.push(`/edit/${user._id}`)}
										>
											<MdEdit />
										</button>
										<button className='w-4 mr-2 transform hover:text-green-500 hover:scale-110' onClick={() => router.push(`/view/${user._id}`)}>
											<FaEye />
										</button>
										<button
											className='w-4 transform hover:text-red-500 hover:scale-110'
											onClick={() => removeUser(user._id)}
										>
											<MdDelete />
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ShowUserPage;
