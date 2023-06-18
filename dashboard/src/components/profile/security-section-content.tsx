import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import {
  LinkIcon,
  LockClosedIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import ProfileSection from '~/components/profile/profile-section';
import { Text, TextInput } from '@tremor/react';
import { Button } from '~/components/base/button';

const SecutirySectionContent = () => {
  return (
    <>
      <h1 className="text-2xl font-bold">Security</h1>
      <div className="divider" />
      <div className="flex flex-col gap-4" />
    </>
  );
};

export default SecutirySectionContent;
