'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface UserProfile {
	id: number;
	username: string;
	email: string;
	number: string;
}

const ViewProfilePage = () => {
	const [profile, setProfile] = useState<UserProfile | null>(null);
	const { id } = useParams();

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await axios.get(`http://localhost:8000/get-user/${id}`);
				setProfile(res.data.user);
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};

		fetchProfile();
	}, []);

	if (!profile) {
		return <h1>Loading profile...</h1>;
	}

	return (
		<div className='max-w-md mx-auto mt-12 p-6 border rounded-lg shadow-lg'>
			<h1 className='text-2xl font-bold mb-4'>User Profile</h1>
			<div className='space-y-4'>
				<div>
					<label className='text-sm font-medium text-gray-500'>Name:</label>
					<p className='text-lg font-semibold'>{profile.username}</p>
				</div>
				<div>
					<label className='text-sm font-medium text-gray-500'>Email:</label>
					<p className='text-lg font-semibold'>{profile.email}</p>
				</div>
				<div>
					<label className='text-sm font-medium text-gray-500'>Phone:</label>
					<p className='text-lg font-semibold'>{profile.number}</p>
				</div>
			</div>
		</div>
	);
};

export default ViewProfilePage;
