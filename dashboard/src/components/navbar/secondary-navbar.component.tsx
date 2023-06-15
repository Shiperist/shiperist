import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

export default function SCNavbarComponent() {
  return (
    <div className="bg-base-100 border-b border-gray-500 px-[-5px]">
      <div className="tabs px-2 shadow bg-base-100 rounded-box w-auto">
        <link className="tab tab-bordered tab-active">
          <button>Project</button>
        </link>
        <link className="tab tab-bordered">
          <button>Deployments</button>
        </link>
        <link className="tab tab-bordered">
          <button>Settings</button>
        </link>
      </div>
    </div>
  );
}
