import React from 'react';
import NavbarComponent from '@/components/navbar/navbar.component';
import SCNavbarComponent from '@/components/navbar/secondary-navbar.component';
import ProjectList from '@/components/content/project-list.component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-base-100 h-screen w-screen'>
      <header>
        <NavbarComponent />
        {/* <SCNavbarComponent /> */}
      </header>
      <main></main>
      <ProjectList />
      {/* <h1>Server Session</h1> */}
      {/* <pre>{JSON.stringify(session)}</pre> */}
    </div>
  );
}
