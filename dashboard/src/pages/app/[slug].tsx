import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import { Text } from '@tremor/react';

const Project: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug;
  const id = slug as string; //TODO Check if this is correct
  const { data: data } = api.apps.get.useQuery(
    { id: id },
    { enabled: slug !== undefined }
  );

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="midwrap max-w-full w-[1200px] mx-auto px-4">
      <Text>{data.name}</Text>
    </div>
  );
};

export default Project;
