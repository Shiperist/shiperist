import { Flex, Text } from '@tremor/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';
import React from 'react';
import { useRouter } from 'next/router';
import Button from '~/components/base/button';
import { Base64 } from 'js-base64';

interface IAppCreateEntryProps {
  name: string;
  url: string;
  updatedAt: Date;
  private: boolean;
}

export function AppCreateEntry(props: IAppCreateEntryProps) {
  const router = useRouter();

  const navigateToCreateApp = () => {
    void router.push(`/app/create/${Base64.toBase64(props.url)}`);
  };

  return (
    <Flex
      justifyContent="center"
      alignItems="stretch"
      flexDirection="row"
      className="p-4 gap-2 border-b-1 border-cat-overlay1 hover:bg-cat-mantle"
    >
      <Flex
        justifyContent="start"
        alignItems="center"
        flexDirection="row"
        className="gap-2"
      >
        {props.private ? (
          <LockClosedIcon className="w-4 h-4 stroke-cat-red" />
        ) : (
          ''
        )}
        <Text className="text-cat-text overflow-hidden line-clamp-1">
          {props.name}
        </Text>
      </Flex>
      <Flex justifyContent="end" alignItems="center" className="basis-2/3">
        <Text className="text-cat-text text-right">
          {DateTime.fromJSDate(props.updatedAt).setLocale('en').toRelative()}
        </Text>
        <Button
          className="w-20 h-8 ml-4"
          color="green"
          variant="outline"
          onClick={navigateToCreateApp}
        >
          Import
        </Button>
      </Flex>
    </Flex>
  );
}
