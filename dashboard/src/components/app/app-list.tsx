import React from 'react';
import { Grid, Title } from '@tremor/react';
import AppCreateCard from '~/components/app/app-create-card';
import { AppCard } from '~/components/app/app-card';
import { useApps } from '~/components/app/hooks/useApps';
import { LayoutGrid } from 'lucide-react';

export function AppList() {
  const { apps } = useApps();

  return (
    <div className="py-24 px-8 mx-auto max-w-7xl w-full">
      <div className="flex flex-row items-center">
        <LayoutGrid className="w-8 h-8 text-tremor-metric text-ctp-text" />
        <Title className="text-tremor-display flex-1 ml-4 text-ctp-text">
          My Workspace
        </Title>
      </div>
      <Grid className="gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
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
        }) ?? null}
      </Grid>
    </div>
  );
}
