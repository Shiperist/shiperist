import React, { useState } from 'react';
import {
  Card,
  Title,
  Text,
  Divider,
  List,
  Flex,
  TextInput
} from '@tremor/react';
import { type NextPage } from 'next';
import {
  ChevronUpDownIcon,
  LockClosedIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { Button } from '~/components/base/button';
import { Listbox } from '@headlessui/react';

const providers = [
  { id: 1, name: 'Github' },
  { id: 1, name: 'Gitlab' },
  { id: 1, name: 'Bitbucket' }
];

const New: NextPage = () => {
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [selectedProvider, setSelectedProvider] = useState(providers[0]);

  return (
    <div className="midwrap max-w-full w-[800px] mx-auto px-4">
      <div className="tbwrap py-8 flex">
        <Card className="border border-dashed border-cat-overlay1 pb-48 bg-cat-mantle">
          <Title className="text-cat-text mb-2">Import Git Repository</Title>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 mt-1">
              {/* providers */}
              <div className="w-72">
                <Listbox
                  value={selectedProvider}
                  onChange={setSelectedProvider}
                >
                  <div className="relative">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-cat-crust border-cat-overlay1 border py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate text-cat-text">
                        {selectedProvider?.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                  </div>
                  <Listbox.Options className="absolute mt-1 max-h-60 w-[204px] overflow-y-auto rounded-md bg-cat-crust py-1 text-cat-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {providers.map((provider, providerId) => (
                      <Listbox.Option
                        key={providerId}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 px-4 ${
                            active
                              ? 'bg-cat-mantle text-cat-text cursor-pointer'
                              : 'text-cat-text'
                          }`
                        }
                        value={provider}
                      >
                        {provider.name}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Listbox>
              </div>
              {/* search */}
              <div className="flex flex-row w-full bg-cat-crust">
                <div className="relative w-full">
                  <input
                    placeholder="Search repositories..."
                    className="w-full h-full bg-transparent border border-cat-overlay1 rounded-md form-control px-4 pl-10 text-cat-text focus:outline-1 focus:outline-cat-overlay1"
                  ></input>
                  <div className="absolute top-1/2 left-3 transform -translate-y-1/2">
                    <MagnifyingGlassIcon className="w-4 h-4 text-cat-overlay1" />
                  </div>
                </div>
              </div>
            </div>
            {/* repos */}
            <div className="flex flex-col py-2 gap-2 bg-cat-crust border border-cat-overlay1 rounded-lg">
              <div className="flex gap-2 my-auto items-center px-4 py-2">
                <LockClosedIcon className="w-6 h-6 rounded-full" />
                <div className="flex flex-row gap-1 my-auto items-center justify-between">
                  <Text className="text-cat-text">Git Repo Name</Text>
                  {isPrivate ? (
                    <LockClosedIcon className="w-4 h-4 stroke-cat-overlay1" />
                  ) : (
                    ''
                  )}
                  <p className="text-cat-text">∙</p>
                  <Text className="text-cat-text">time ago</Text>
                </div>
                <Button className="px-2 py-1 ml-auto">Import</Button>
              </div>
              {/* <Divider className="!m-0 bg-cat-text"></Divider> */}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default New;
