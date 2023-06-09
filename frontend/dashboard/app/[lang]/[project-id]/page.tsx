import {Locale} from "@/i18n-config";
import {getDictionary} from "@/get-dictionary";
import ProjectListComponent from "@/app/[lang]/components/list/project-list.component";
import React from "react";

export default async function ProjectListPage({params: {lang}}: { params: { lang: Locale } }) {
    await getDictionary(lang);
    return (
        <div className='mt-24'>
            <ProjectListComponent/>
        </div>
    );
}
