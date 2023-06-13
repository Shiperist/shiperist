import React from "react";

import {Locale} from "@/i18n-config";
import {getDictionary} from "@/get-dictionary";
import ProjectListComponent from "@/components/list/project-list.component";
import {getServerSession} from "next-auth";
import {getToken} from "next-auth/jwt";

export default async function ProjectListPage({params: {lang}}: {params: {lang: Locale}}) {
  await getDictionary(lang);

  return (
    <div className="mt-24">
      <ProjectListComponent />
    </div>
  );
}
