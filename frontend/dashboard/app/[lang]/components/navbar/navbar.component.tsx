import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import SignInComponent from '@/app/[lang]/components/navbar/sign-in.component';

export default async function NavbarComponent() {
  //const session = await getServerSession(authOptions);

  return (
    <div className='navbar px-8 border-b border-gray-200'>
      <div className='navbar-start'>
        <a href='#' className='btn btn-ghost normal-case text-neutral text-xl'>
          Heligion
        </a>
      </div>
      <div className='navbar-end'>
        {/*         <button className='btn btn-ghost btn-circle'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            />
          </svg>
        </button>
        <div className='divider divider-horizontal !mx-[1px]'></div> */}
        <SignInComponent />
      </div>
    </div>
  );
}
