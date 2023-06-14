import React from "react";
import {ListItem} from "@tremor/react";
import {Project} from "~/components/list/project-list.component";

export default function ProjectEntryComponent({project}: {project: Project}) {
  return (
    <ListItem className="bg-base-100 hover:bg-gray-200 p-5 border-none">
      <img className="w-12 h-12 rounded-full mr-4"
           src="https://images.unsplash.com/photo-1686216941182-0f5699f4584d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80" />
      <div className="flex flex-col flex-1">
        <text className="font-bold text-gray-800">{project.name}</text>
        <text className="text-sm text-gray-500">{project.description}</text>
      </div>
      <div className="flex flex-col flex-1">
        <text className="font-bold text-gray-800">ID</text>
        <text className="text-sm text-gray-500">{project.id}</text>
      </div>
      <text className="text-gray-500 mt-auto mb-auto">Updated 5m ago</text>
    </ListItem>
  );
}
