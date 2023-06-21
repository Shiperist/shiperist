import { api } from '~/utils/api';
import React, { useState } from 'react';
import { GitProvider } from '~/types/app-types';
import { Github } from 'lucide-react';

export function useRepositories() {
  const [selectedProvider, setSelectedProvider] = useState<GitProvider>({
    key: 'github',
    name: 'GitHub',
    icon: <Github className="w-6 h-6 text-cat-text" />
  });
  const [searchRepository, setSearchRepository] = useState('');

  const { data: repos } = api.integrations.listRepositories.useQuery({
    provider: selectedProvider.name.toLowerCase()
  });

  const filteredRepos = repos?.filter((repo) => {
    return repo.name.toLowerCase().includes(searchRepository.toLowerCase());
  });

  const sortedRepos = filteredRepos?.sort((a, b) => {
    return a.updatedAt > b.updatedAt ? -1 : 1;
  });

  return {
    sortedRepos,
    selectedProvider,
    setSelectedProvider,
    searchRepository,
    setSearchRepository
  };
}
