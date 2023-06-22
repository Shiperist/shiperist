import React from 'react';
import { AppCreateEntry } from '~/components/app/create/app-create-entry';

interface IAppCreateListProps {
  repos:
    | {
        name: string;
        url: string;
        updatedAt: Date;
        private: boolean;
        id: number;
        createdAt: Date;
        namespace: string;
        defaultBranch: string;
        ownerType: string;
      }[]
    | undefined;
}

export function AppCreateList(props: IAppCreateListProps) {
  return (
    <div className="mt-4 border-ctp-overlay1 border-1 rounded-lg overflow-y-scroll h-96">
      {props?.repos?.map((repo, repoId) => {
        return (
          <AppCreateEntry
            key={repoId}
            name={repo.name}
            url={repo.url}
            updatedAt={repo.updatedAt}
            private={repo.private}
          />
        );
      })}
    </div>
  );
}
