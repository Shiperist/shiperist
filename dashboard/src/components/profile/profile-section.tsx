import React, { useEffect, useState } from 'react';
import { TextInput, Divider, Text, Card, Title } from '@tremor/react';
import { Button } from '~/components/base/button';

export default function ProfileSection({
  title,
  id,
  children
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      className="content-section flex flex-col p-8 rounded-lg shadow-0 ring-0 border-1 border-gray-300"
      id={id}
      key={id}
    >
      <Title className="text-2xl">{title}</Title>
      <div className="divider" />
      <div className="flex flex-col gap-4">{children}</div>
    </Card>
  );
}
