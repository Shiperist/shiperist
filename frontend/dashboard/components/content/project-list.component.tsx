import React from 'react';

export default async function projectList() {
  return (
    <div className='midwrap max-w-full max-h-full mx-auto w-[1200px] px-4'>
      <div className='tbwrap my-8'></div>
      <div className='flex flex-col gap-6'>
        <form className='search-bar'>
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
              <svg
                aria-hidden='true'
                className='w-5 h-5 text-neutral'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
            </div>
            <input
              className='block w-full p-4 pl-10 text-sm input input-bordered bg-ghost text-neutral'
              placeholder='Search projects...'
            />
          </div>
        </form>
        <div className='flex flex-wrap gap-4'>
          <div className='card card-compact w-64 bg-ghost border transition cursor-pointer hover:shadow-lg'>
            <div className='card-body'>
              <div className='flex flex-row gap-2'>
                <img
                  width='100'
                  height='100'
                  src='data:image/png;base64,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'
                  className='w-8 h-8 rounded-full border'></img>
                <h2 className='card-title text-neutral'>Project Name</h2>
              </div>
              <div className='text-xs pt-4'>
                <div className='flex flex-row gap-4'>
                  <div className='flex flex-col'>
                    <div className='text-md font-bold text-neutral'>Memory Usage</div>
                    <div className='text-xl text-accent'>$2,4</div>
                  </div>
                  <div className='flex flex-col'>
                    <div className='text-md font-bold text-neutral'>CPU Usage</div>
                    <div className='text-xl text-accent'>$1,9</div>
                  </div>
                </div>
                <p className='pt-4 text-neutral'>time ago</p>
              </div>
            </div>
          </div>
          <div className='card card-compact w-64 bg-ghost border transition cursor-pointer hover:shadow-lg'>
            <h1 className='text-5xl text-secondary mx-auto my-auto'>+</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
