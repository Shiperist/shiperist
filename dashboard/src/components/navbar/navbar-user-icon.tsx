import { Menu, Transition } from '@headlessui/react';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { useUserProfile } from '~/components/navbar/hooks/useUserProfile';
import { ChevronDown, LogIn, LogOut, User } from 'lucide-react';

export function NavbarUserIcon() {
  const { user, handleSignOut, handleSignIn, navigateToProfile } =
    useUserProfile();

  return (
    <Menu as="div" className="relative ml-5">
      <div>
        <Menu.Button className="flex rounded-full text-sm items-center focus:outline-none">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-6 w-6 rounded-full"
            src={user?.image || 'https://avatar.vercel.sh/leerob'}
            height={32}
            width={32}
            alt={`${user?.name || 'placeholder'} avatar`}
          />
          <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-mantle py-1 border-1 border-cat-overlay1">
          {user ? (
            <div>
              <Menu.Item>
                <button
                  className="flex w-full px-4 py-2 text-sm text-cat-text hover:bg-cat-mantle"
                  onClick={navigateToProfile}
                >
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="ml-2">Profile</span>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className="flex w-full px-4 py-2 text-sm text-cat-text hover:bg-cat-mantle"
                  onClick={() => handleSignOut}
                >
                  <LogOut className="h-5 w-5 text-gray-400" />
                  <span className="ml-2">Sign out</span>
                </button>
              </Menu.Item>
            </div>
          ) : (
            <Menu.Item>
              <button
                className="flex w-full px-4 py-2 text-sm text-cat-text hover:bg-cat-mantle"
                onClick={() => handleSignIn('github')}
              >
                <LogIn className="h-5 w-5 text-gray-400" />
                <span className="ml-2">Sign in</span>
              </button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
