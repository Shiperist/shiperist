import React from 'react';
import { Card, Title } from '@tremor/react';

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
      className="content-section flex flex-col p-8 rounded-lg shadow-0 ring-0 border-1 border-ctp-overlay1"
      id={id}
      key={id}
    >
      <Title className="text-2xl font-bold text-ctp-text">{title}</Title>
      <div className="divider" />
      <div className="flex flex-col gap-4 text-ctp-text">{children}</div>
    </Card>
  );
}
