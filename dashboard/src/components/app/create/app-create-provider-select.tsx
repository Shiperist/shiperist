import React, { Fragment } from 'react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { Listbox, Transition } from '@headlessui/react';
import { GitProvider } from '~/types/app-types';
import { Flex } from '@tremor/react';

interface IAppCreateProviderSelectProps {
  setProvider: React.Dispatch<React.SetStateAction<GitProvider>>;
  selectedProvider: GitProvider;
  providers: GitProvider[];
}

export function AppCreateProviderSelect(props: IAppCreateProviderSelectProps) {
  return (
    <div className="w-72">
      <Listbox value={props.selectedProvider} onChange={props.setProvider}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-transparent border-ctp-overlay1 border py-2 pl-3 pr-10 text-left">
            <Flex
              justifyContent="start"
              alignItems="center"
              flexDirection="row"
            >
              {props.selectedProvider.icon}
              <span className="ml-4 text-ctp-text">
                {props.selectedProvider.name}
              </span>
            </Flex>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>
        <Transition
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-[204px] overflow-y-auto rounded-md bg-ctp-base py-1 border-1 border-ctp-overlay1 text-ctp-text">
            {props.providers.map((provider, providerId) => (
              <Listbox.Option
                key={providerId}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 px-4 ${
                    active
                      ? 'bg-ctp-mantle text-ctp-text cursor-pointer'
                      : 'text-ctp-text'
                  }`
                }
                value={provider}
              >
                <Flex
                  justifyContent="start"
                  alignItems="center"
                  flexDirection="row"
                >
                  {provider.icon}
                  <span className="ml-4">{provider.name}</span>
                </Flex>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
