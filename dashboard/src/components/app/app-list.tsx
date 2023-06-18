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
import { Types } from '~/types/app-types';
import { useRouter } from 'next/router';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';

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

  /*
  <Card className="mt-4 overflow-auto p-0 cursor-pointer drop-shadow-s border-0 bg-white ring-0">
    //TODO Scaleaway style
    <List>
      {apps?.map((app) => {
        const icon = Types[app.os]?.icon;
        const trustedIcon: { __html: string | TrustedHTML } | undefined = icon
          ? { __html: icon as string | TrustedHTML }
          : undefined;
        return (
          <ListItem
            key={app.id}
            className="hover:bg-gray-100 p-5 border-none"
            onClick={() => navigateToApp(app.id)}
          >
            <img
              className="w-12 h-12 rounded-full mr-4"
              alt="preview-img"
              src="https://images.unsplash.com/photo-1686216941182-0f5699f4584d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"
            />
            <div className="flex flex-col flex-1">
              <text className="font-bold text-gray-800">{app.name}</text>
              <text className="text-sm text-gray-500">{app.description}</text>
            </div>
            <div className="flex flex-col flex-1">
              <text className="font-bold text-gray-800">ID</text>
              <text className="text-sm text-gray-500">{app.id}</text>
            </div>
            <div className="flex flex-1 flex-row">
              <div
                className="border-2 mr-4 w-12 h-12 p-3 rounded-full place-content-center text-2xl"
                style={{ borderColor: Types[app.os]?.color }}
                dangerouslySetInnerHTML={trustedIcon}
              />
              <Badge size="xs" color="green" className="self-center">
                {app.platform}
              </Badge>
            </div>
            <text className="text-gray-500 mt-auto mb-auto">
              Updated 5m ago
            </text>
          </ListItem>
        );
      })}
    </List>
  </Card>
   */

  return (
    <Grid className="gap-4 grid-cols-3 grid-rows-3 mt-8 px-8 mt-8 mx-auto max-w-7xl">
      {apps?.map((app) => {
        const icon = Types[app.os]?.icon;
        const trustedIcon: { __html: string | TrustedHTML } | undefined = icon
          ? { __html: icon as string | TrustedHTML }
          : undefined;
        return (
          <Card
            key={app.id}
            className="transition ease-in-out duration-300 px-3 py-6 h-36 cursor-pointer shadow-0 ring-0 border-1 border-gray-300 hover:shadow-lg"
            onClick={() => navigateToApp(app.id)}
          >
            <div className="flex flex-row items-center gap-8 h-full">
              <div className="flex flex-row">
                <img
                  className="w-8 h-8 rounded-full"
                  alt="preview-img"
                  src="https://images.unsplash.com/photo-1686216941182-0f5699f4584d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"
                />
              </div>
              <div className="flex flex-col flex-1">
                <Title className="font-bold">{app.name}</Title>
                <text className="text-sm text-gray-500">{app.description}</text>
                <div className="flex flex-row gap-2 mt-2">
                  <Badge
                    size="xs"
                    color="green"
                    className="self-center capitalize"
                  >
                    {app.os}
                  </Badge>
                  <Badge
                    size="xs"
                    color="green"
                    className="self-center capitalize"
                  >
                    {app.platform}
                  </Badge>
                </div>
              </div>
              <Button className="w-8 h-8 bg-transparent border-0 hover:bg-gray-100">
                <EllipsisVerticalIcon className="w-6 h-6 text-gray-800" />
              </Button>
            </div>
          </Card>
        );
      })}
    </Grid>
  );
};

export default AppList;
