import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Locale } from '@/i18n-config';
import { getDictionary } from '@/get-dictionary';
import ProjectList from '@/components/content/project-list.component';
import NavbarComponent from '@/app/[lang]/components/navbar/navbar.component';
//import SCNavbarComponent from '@/app/[lang]/components/navbar/secondary-navbar.component';

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const session = await getServerSession(authOptions);
  const dictionary = await getDictionary(lang);

  return (
    <div>
      <header>
        <NavbarComponent />
        {/* <SCNavbarComponent /> //tabs */}
      </header>
      <main>
        <p>Current locale: {lang}</p>
        <p>This text is rendered on the server: {dictionary['server-component'].welcome}</p>
      </main>
      <ProjectList />
      <h1>Server Session</h1>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
}
