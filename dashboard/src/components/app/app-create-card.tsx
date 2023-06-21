import React from 'react';
import { Card, Flex, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import { PlusIcon } from '@heroicons/react/24/solid';

const CreateAppCard = () => {
  const router = useRouter();

  const navigateToCreate = () => {
    void router.push(`/app/create`);
  };

  return (
    <Card
      key={'create-app'}
      className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-dashed border-cat-overlay1 bg-cat-mantle hover:bg-cat-crust"
      onClick={navigateToCreate}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="col"
        className="h-full gap-2"
      >
        <PlusIcon className="w-8 h-8 text-cat-text" />
        <Title className="font-bold text-cat-text">Create App</Title>
      </Flex>
    </Card>
  );
};

export default CreateAppCard;
