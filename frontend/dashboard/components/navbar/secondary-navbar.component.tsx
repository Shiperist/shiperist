import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function SCNavbarComponent() {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-base-100 border-b border-gray-500 px-[-5px]'>
      <div tabIndex={0} className='tabs px-2 shadow bg-base-100 rounded-box w-auto'>
        <li className='tab tab-bordered tab-active' tabIndex={0}>
          <a>Project</a>
        </li>
        <li className='tab tab-bordered' tabIndex={0}>
          <a>Deployments</a>
        </li>
        <li className='tab tab-bordered' tabIndex={0}>
          <a>Settings</a>
        </li>
      </div>
    </div>
  );
}
