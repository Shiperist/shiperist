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
    <div className="py-24  mx-auto max-w-7xl w-full">
      <div className="flex flex-row px-8 items-center">
        <Squares2X2Icon className="w-8 h-8 text-tremor-metric" />
        <Title className="text-tremor-display flex-1 ml-4">My Workspace</Title>
      </div>
      <Grid className="gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 mt-8">
        <Card
          key={'create-app'}
          className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-dashed border-gray-300 bg-gray-50 hover:shadow-lg hover:border-amber-600 hover:bg-white"
          //onClick={() => navigateToApp(app.id)}
        >
          <Flex
            justifyContent="center"
            alignItems="center"
            flexDirection="col"
            className="h-full gap-2"
          >
            <PlusIcon className="w-8 h-8 text-gray-800" />
            <Title className="font-bold">Create App</Title>
          </Flex>
        </Card>
        {apps?.map((app) => {
          return (
            <Card
              key={app.id}
              className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 border-1 border-gray-300 bg-gray-50 hover:shadow-lg hover:bg-white"
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
                  <Title className="font-bold flex-1">{app.name}</Title>
                  <Button className="w-8 h-8 bg-transparent border-0 hover:bg-gray-100">
                    <EllipsisVerticalIcon className="w-6 h-6 text-gray-800" />
                  </Button>
                </Flex>
                <text className="text-sm text-gray-500 flex-1">
                  {app.description}
                </text>
                <Flex
                  justifyContent="start"
                  alignItems="stretch"
                  className="gap-2"
                >
                  <Badge
                    size="xs"
                    color="green"
                    className="self-center capitalize"
                  >
                    {app.os}
                  </Badge>
                  <Badge
                    size="xs"
                    color="blue"
                    className="self-center capitalize"
                  >
                    {app.platform}
                  </Badge>
                </Flex>
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </div>
  );
};

export default AppList;
