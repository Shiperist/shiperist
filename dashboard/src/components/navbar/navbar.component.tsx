import React, { Fragment } from 'react';
import { Disclosure, Listbox, Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import ProjectSelect from '~/components/navbar/project-select';
import { useRouter } from 'next/router';
import AppCreate from '~/components/app/app-create';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar() {
  const session = useSession();
  const router = useRouter();

  const user = session?.data?.user;

  const handleSignOut = () => {
    signOut()
      .then(() => {
        // Handle successful sign-out if needed
      })
      .catch((error) => {
        console.log(error); // Handle sign-out error if needed
      });
  };

  const handleSignIn = (app: string) => {
    signIn(app)
      .then(() => {
        // Handle successful sign-out if needed
      })
      .catch((error) => {
        console.log(error); // Handle sign-out error if needed
      });
  };

  const navigateToHome = () => {
    void router.push('/');
  };

  const navigateToProfile = () => {
    if (!user) {
      return;
    }

    void router.push(`/profile/${user?.id}`);
  };

  return (
    <Disclosure as="nav" className="shadow-none sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div
              className="flex flex-shrink-0 items-center cursor-pointer"
              onClick={navigateToHome}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                className="text-gray-100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="100%" height="100%" rx="16" fill="currentColor" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <ProjectSelect user={user} />
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <AppCreate />
            <Menu as="div" className="relative ml-5">
              <div>
                <Menu.Button className="flex rounded-full bg-white text-sm items-center focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={user?.image || 'https://avatar.vercel.sh/leerob'}
                    height={32}
                    width={32}
                    alt={`${user?.name || 'placeholder'} avatar`}
                  />
                  <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  {user ? (
                    <div>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={navigateToProfile}
                          >
                            Profile
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex w-full px-4 py-2 text-sm text-gray-700'
                            )}
                            onClick={() => handleSignOut}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  ) : (
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={classNames(
                            active ? 'bg-gray-100' : '',
                            'flex w-full px-4 py-2 text-sm text-gray-700'
                          )}
                          onClick={() => handleSignIn('github')}
                        >
                          Sign in
                        </button>
                      )}
                    </Menu.Item>
                  )}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2">
              <span className="sr-only">Open main menu</span>
            </Disclosure.Button>
          </div>
        </div>
      </div>

      <Disclosure.Panel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3"></div>
        <div className="border-t border-gray-200 pt-4 pb-3">
          {user ? (
            <>
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Image
                    className="h-8 w-8 rounded-full"
                    src={user?.image || ''}
                    height={32}
                    width={32}
                    alt={user?.name ? `${user.name} avatar` : ''}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <button
                  onClick={() => handleSignOut()}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
                >
                  Sign out
                </button>
              </div>
            </>
          ) : (
            <div className="mt-3 space-y-1">
              <button
                onClick={() => handleSignIn('github')}
                className="flex w-full px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}
