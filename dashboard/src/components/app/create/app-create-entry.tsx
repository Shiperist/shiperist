import { Flex, Text } from '@tremor/react';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';
import React from 'react';
import { useRouter } from 'next/router';
import { Base64 } from 'js-base64';
import Button from '~/components/Button/Button';

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
      className="p-4 gap-2 border-b-1 border-ctp-overlay1 hover:bg-ctp-mantle"
    >
      <Flex
        justifyContent="start"
        alignItems="center"
        flexDirection="row"
        className="gap-2"
      >
        {props.private ? (
          <LockClosedIcon className="w-4 h-4 stroke-ctp-red" />
        ) : (
          ''
        )}
        <Text className="text-ctp-text overflow-hidden line-clamp-1">
          {props.name}
        </Text>
      </Flex>
      <Flex justifyContent="end" alignItems="center" className="basis-2/3">
        <Text className="text-ctp-text text-right">
          {DateTime.fromJSDate(props.updatedAt).setLocale('en').toRelative()}
        </Text>
        <Button
          className="ml-4"
          variant="success"
          size="medium"
          onClick={navigateToCreateApp}
        >
          Import
        </Button>
      </Flex>
    </Flex>
  );
}
