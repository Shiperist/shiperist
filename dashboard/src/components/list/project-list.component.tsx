import React from 'react';
import ProjectEntryComponent from '~/components/list/project-entry.component';
import ProjectCreateComponent from '~/components/list/project-create.component';
import Search from '~/components/list/search.component';
import {Button, Card} from '@tremor/react';

declare global {
  interface Window {
    project_create: HTMLDialogElement;
  }
}

export type Project = {
  id: string;
  name: string;
  description: string;
  image: string;
  url: string;
};

export default function ProjectListComponent() {
  type Projects = {
    [key: string]: Project;
  };

  const projects: Projects = {
    'project-1': {
      id: '435345934759839230597235',
      name: 'Project 1',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com'
    },
    'project-2': {
      id: '435345934759839230597235',
      name: 'Project 2',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com'
    },
    'project-3': {
      id: '435345934759839230597235',
      name: 'Project 3',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com'
    }
  };

  const projectList = Object.keys(projects).map((project) => {
    const projectEntry = projects[project];
    if (projectEntry) {
      return <ProjectEntryComponent key={project} project={projectEntry} />;
    }
    return null; // or handle the case when projectEntry is undefined
  });

  return (
    <div className="midwrap max-w-full max-h-full mx-auto w-[1200px] px-4">
      <div className="tbwrap my-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row justify-between w-full gap-4">
            <Search />
            <Button className="rounded-full" onClick={() => window.project_create.showModal()}>
              Add project
            </Button>
            <ProjectCreateComponent />
          </div>
          <Card className="bg-gray-50 overflow-auto drop-shadow-s border-1/2 border-gray-300">
            {projectList}
          </Card>
        </div>
      </div>
    </div>
  );
}
