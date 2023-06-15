import { type NextPage } from 'next';
import React from 'react';
import Search from '~/components/list/app-search';
import AppList from '~/components/list/app-list';

const Home: NextPage = () => {
  return (
    <main className="px-8 mt-8 mx-auto max-w-7xl">
      <Search />
      <AppList />
    </main>
  );
};

export default Home;
