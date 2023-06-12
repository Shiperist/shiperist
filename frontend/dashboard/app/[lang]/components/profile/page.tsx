'use client';
import React, { useState } from 'react';
import ProfileSidebar from '@/app/[lang]/components/profile/profile-sidebar.component';
import ProfileContent from '@/app/[lang]/components/profile/profile-content.component';

export default function ProfileComponent() {
  return (
    <div className='midwrap max-w-full w-[1200px] mx-auto px-4'>
      <div className='tbwrap my-8'>
        <div className='flex flex-row w-full'>
          {/* sidebar */}
          <ProfileSidebar />
          {/* content */}
          <ProfileContent />
        </div>
      </div>
    </div>
  );
}
