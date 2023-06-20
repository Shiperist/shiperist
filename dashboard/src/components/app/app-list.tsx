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
import { Squares2X2Icon } from '@heroicons/react/24/outline';
import AppCreateCard from '~/components/app/app-create-card';
import { AppCard } from '~/components/app/app-card';
import { useApps } from '~/components/app/hooks/useApps';

export function AppList() {
  const apps = useApps();

  return (
    <div className="py-24 mx-auto max-w-7xl w-full">
      <div className="flex flex-row px-8 items-center">
        <Squares2X2Icon className="w-8 h-8 text-tremor-metric text-cat-text" />
        <Title className="text-tremor-display flex-1 ml-4 text-cat-text">
          My Workspace
        </Title>
      </div>
      <Grid className="gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-8 mt-8">
        <AppCreateCard />
        {apps?.map((app) => {
          return (
            <AppCard
              key={app.id}
              id={app.id}
              name={app.name}
              description={app.description}
            />
          );
        })}
      </Grid>
    </div>
  );
}
