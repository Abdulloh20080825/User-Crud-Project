import Link from 'next/link';
import React from 'react';

const Header: React.FC = () => {
	return (
		<div className='bg-gradient-to-r from-slate-950 to-slate-900 p-4 shadow-lg flex justify-between h-[10vh] '>
			<h1 className='text-white text-2xl font-bold'>React CRUD</h1>
			<nav className='mt-2'>
				<ul className='flex space-x-6'>
					<li>
						<Link href='/' className='text-white hover:text-blue-200'>
							Home
						</Link>
					</li>
					<li>
						<Link href='/create' className='text-white hover:text-blue-200'>
							Create User
						</Link>
					</li>
					<li>
						<Link href='/show-users' className='text-white hover:text-blue-200'>
							Show User
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;
