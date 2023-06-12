'use client';
import ProjectEntryComponent from '@/app/[lang]/components/list/project-entry.component';
import ProjectCreateComponent from '@/app/[lang]/components/list/project-create.component';
import React from 'react';
declare global {
  interface Window {
    project_create: HTMLDialogElement;
  }
}

export default function ProjectListComponent() {
  type Project = {
    id: string;
    name: string;
    description: string;
    image: string;
    url: string;
  };

  type Projects = {
    [key: string]: Project;
  };

  const projects: Projects = {
    'project-1': {
      id: '435345934759839230597235',
      name: 'Project 1',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com',
    },
    'project-2': {
      id: '435345934759839230597235',
      name: 'Project 2',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com',
    },
    'project-3': {
      id: '435345934759839230597235',
      name: 'Project 3',
      description: 'This is a project',
      image: 'https://picsum.photos/200/300',
      url: 'https://google.com',
    },
  };

  const projectList = Object.keys(projects).map((project) => {
    return <ProjectEntryComponent project={projects[project]} />;
  });

  return (
    <div className='midwrap max-w-full max-h-full mx-auto w-[1200px] px-4'>
      <div className='tbwrap my-8'>
        <div className='flex flex-col gap-6'>
          <div className='flex flex-row justify-between w-full gap-4'>
            <form className='flex-1'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 text-neutral'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </div>
                <input
                  className='block w-full p-4 pl-10 text-sm input input-bordered bg-ghost text-neutral'
                  placeholder='Search...'
                />
              </div>
            </form>
            <button className='btn' onClick={() => window.project_create.showModal()}>
              Add project
            </button>
            <ProjectCreateComponent />
          </div>
          <div className='card card-compact bg-ghost border overflow-auto bg-neutral-content'>{projectList}</div>
        </div>
      </div>
    </div>
  );
}
