"use client";
import React from "react";
import {useSession} from "next-auth/react";

import ProfileSidebar from "@/app/[lang]/profile/[slug]/profile-sidebar.component";
import ProfileContent from "@/app/[lang]/profile/[slug]/profile-content.component";
import user from "@/lib/openapi";

export default function ProfileComponent() {
  const session = useSession();

  if (session.status === "authenticated") {
    console.log(session.data);
    user()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
}
