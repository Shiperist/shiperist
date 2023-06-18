import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useTransition } from 'react';
import { Flex, TextInput, Title } from '@tremor/react';
import AppCreate from '~/components/app/app-create';

const Search = ({ disabled }: { disabled?: boolean }) => {
  const [isPending, startTransition] = useTransition();
  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      //handleRouterReplace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <Flex className="bg-white border-b-2 shadow-none">
      <div className="flex flex-row my-12 mx-auto max-w-7xl w-full px-8 items-center">
        <Title className="text-[35px] flex-1">Apps</Title>
        <AppCreate />
      </div>
    </Flex>
  );
};

export default Search;
