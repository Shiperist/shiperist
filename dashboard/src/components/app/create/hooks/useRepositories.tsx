import { api } from '~/utils/api';
import { useState } from 'react';

export function useRepositories() {
  const [selectedProvider, setSelectedProvider] = useState<string>('GitHub');
  const [searchRepository, setSearchRepository] = useState('');

  const { data: repos } = api.integrations.listRepositories.useQuery({
    provider: selectedProvider.toLowerCase()
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
