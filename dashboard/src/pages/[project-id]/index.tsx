import React from "react";
import ProjectListComponent from "~/components/list/project-list.component";
import {NextPage} from "next";

const ProjectList: NextPage = () => {
  return (
    <div className="mt-24">
      <ProjectListComponent />
    </div>
  );
};

export default ProjectList;
