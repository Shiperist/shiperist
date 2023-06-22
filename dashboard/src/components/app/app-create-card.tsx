import React from 'react';
import { Card, Flex, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import { PackagePlus, Plus } from 'lucide-react';

const CreateAppCard = () => {
  const router = useRouter();

  const navigateToCreate = () => {
    void router.push(`/app/create`);
  };

  return (
    <Card
      key={'create-app'}
      className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-dashed border-ctp-overlay1 bg-ctp-mantle hover:bg-ctp-crust"
      onClick={navigateToCreate}
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="col"
        className="h-full gap-2"
      >
        <PackagePlus className="w-8 h-8 text-ctp-text" />
        <Title className="font-bold text-ctp-text">Create App</Title>
      </Flex>
    </Card>
  );
};

export default CreateAppCard;
