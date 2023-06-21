import React from 'react';
import { Disclosure } from '@headlessui/react';
import ProjectSelect from '~/components/navbar/project-select';
import { NavbarHome } from '~/components/navbar/navbar-home';
import { NavbarUserIcon } from '~/components/navbar/navbar-user-icon';
import { NavbarUserMenu } from '~/components/navbar/navbar-user-menu';
import { Bars3Icon } from '@heroicons/react/24/outline';

//TODO: Maybe add transition to disclosure panel
export function Navbar() {
  return (
    <Disclosure as="nav" className="shadow-none sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <NavbarHome />
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <ProjectSelect />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <NavbarUserIcon />
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md h-8 w-8">
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </Disclosure.Button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <NavbarUserMenu />
      </Disclosure.Panel>
    </Disclosure>
  );
}
