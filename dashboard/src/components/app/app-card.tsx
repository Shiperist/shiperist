import React from 'react';
import {
  Badge,
  Button,
  Card,
  Flex,
  Grid,
  List,
  ListItem,
  Title
} from '@tremor/react';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import { useRouter } from 'next/router';
import { EllipsisVerticalIcon, PlusIcon } from '@heroicons/react/24/solid';
import AppCreate from '~/components/app/app-create';
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';

const AppCard = ({
  id,
  name,
  description
}: {
  id: string;
  name: string;
  description: string | null;
}) => {
  const router = useRouter();

  const navigateToApp = (id: string) => {
    void router.push(`/app/${id}`);
  };

  return (
    <Card
      className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 bg-cat-mantle hover:bg-cat-crust"
      onClick={() => navigateToApp(id)}
    >
      <Flex
        justifyContent="start"
        alignItems="stretch"
        flexDirection="col"
        className="h-full gap-2"
      >
        <Flex className="gap-2">
          <Image
            className="w-6 h-6 rounded-full"
            alt="preview-img"
            src={'https://avatar.vercel.sh/leerob'}
            height={32}
            width={32}
          />
          <Title className="font-bold flex-1 text-cat-text">{name}</Title>
          <Button className="w-8 h-8 bg-transparent border-0 hover:bg-cat-mantle">
            <EllipsisVerticalIcon className="w-6 h-6 text-cat-text" />
          </Button>
        </Flex>
        <text className="text-sm text-cat-subtext0 flex-1">{description}</text>
        <Flex justifyContent="start" alignItems="stretch" className="gap-2">
          <></>
        </Flex>
      </Flex>
    </Card>
  );
};

export default AppCard;
