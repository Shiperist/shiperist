import React from 'react';
import { useSession } from 'next-auth/react';
import type { NextPage } from 'next';
import ProfileSidebar from '~/pages/profile/[slug]/profile-sidebar.component';
import ProfileContent from '~/pages/profile/[slug]/profile-content.component';

const Profile: NextPage = () => {
  const session = useSession();

  if (session.status === 'authenticated') {
  }

  return (
    <div className="midwrap max-w-full w-[1200px] mx-auto px-4">
      <div className="tbwrap my-8">
        <div className="flex flex-row w-full">
          {/* sidebar */}
          <ProfileSidebar />
          {/* content */}
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
