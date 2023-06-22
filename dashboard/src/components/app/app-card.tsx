import React from 'react';
import { Card, Flex, Title } from '@tremor/react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { MoreVertical } from 'lucide-react';
import IconButton from '~/components/button/IconButton';

interface IAppCardProps {
  id: string;
  name: string;
  description: string | null;
}

export function AppCard(props: IAppCardProps) {
  const router = useRouter();

  const navigateToApp = () => {
    void router.push(`/app/${props.id}`);
  };

  return (
    <Card
      className="transition ease-in-out duration-300 p-3 h-48 cursor-pointer shadow-0 ring-0 bg-ctp-mantle hover:bg-ctp-crust"
      onClick={navigateToApp}
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
          <Title className="font-bold flex-1 text-ctp-text">{props.name}</Title>
          <IconButton
            className="w-8 h-8 text-ctp-text hover:bg-ctp-mantle hover:text-ctp-text"
            icon={MoreVertical}
            variant="ghost"
          />
        </Flex>
        <text className="text-sm text-ctp-subtext0 flex-1">
          {props.description}
        </text>
        <Flex justifyContent="start" alignItems="stretch" className="gap-2">
          <></>
        </Flex>
      </Flex>
    </Card>
  );
}
