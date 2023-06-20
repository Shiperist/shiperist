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

const AppList = () => {
  const { data: sessionData } = useSession();
  const { data: data } = api.apps.list.useQuery(
    { pageSize: 25 }, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const apps = data ?? [];
  const router = useRouter();

  const navigateToApp = (id: string) => {
    void router.push(`/app/${id}`);
  };

  return (
    <div className="py-24 mx-auto max-w-7xl w-full">
      <div className="flex flex-row px-8 items-center">
        <Squares2X2Icon className="w-8 h-8 text-tremor-metric text-cat-text" />
        <Title className="text-tremor-display flex-1 ml-4 text-cat-text">
          My Workspace
        </Title>
      </div>
      <Grid className="gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 mt-8">
        <div className="relative group">
          <div className="absolute -inset-1 group-hover:bg-gradient-to-r from-cat-peach to-cat-pink rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500 group-hover:duration-500"></div>
          <Card
            key={'create-app'}
            className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-dashed border-cat-overlay1 bg-cat-mantle hover:border-cat-peach hover:bg-cat-crust"
            //onClick={() => navigateToApp(app.id)}
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
        </div>
        {apps?.map((app) => {
          return (
            <div className="relative group">
              <div className="absolute -inset-1 group-hover:bg-gradient-to-r from-cat-peach to-cat-pink rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500 group-hover:duration-500"></div>
              <Card
                key={app.id}
                className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-cat-overlay1 bg-cat-mantle hover:border-cat-peach hover:bg-cat-crust"
                onClick={() => navigateToApp(app.id)}
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
                    <Title className="font-bold flex-1 text-cat-text">
                      {app.name}
                    </Title>
                    <Button className="w-8 h-8 bg-transparent border-0 hover:bg-cat-mantle">
                      <EllipsisVerticalIcon className="w-6 h-6 text-cat-text" />
                    </Button>
                  </Flex>
                  <text className="text-sm text-cat-subtext0 flex-1">
                    {app.description}
                  </text>
                  <Flex
                    justifyContent="start"
                    alignItems="stretch"
                    className="gap-2"
                  >
                    <Badge
                      size="xs"
                      className="self-center capitalize bg-cat-green text-cat-surface0"
                    >
                      {app.os}
                    </Badge>
                    <Badge
                      size="xs"
                      className="self-center capitalize bg-cat-blue text-cat-surface0"
                    >
                      {app.platform}
                    </Badge>
                  </Flex>
                </Flex>
              </Card>
            </div>
          );
        })}
      </Grid>
    </div>
  );
};

export default AppList;
