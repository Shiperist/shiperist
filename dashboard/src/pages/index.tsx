import { type NextPage } from 'next';
import React from 'react';
import Search from '~/components/app/app-search';
import AppList from '~/components/app/app-list';

const Home: NextPage = () => {
  return (
    <main>
      <Search />
      <AppList />
    </main>
  );
};

export default Home;
