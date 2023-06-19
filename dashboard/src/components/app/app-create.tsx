import React, { Fragment, useState, useTransition } from 'react';
import { Text, TextInput } from '@tremor/react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { Types } from '~/types/app-types';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';
import {
  ArrowUpTrayIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline';
import { Button, RequiredLabel } from '../base/button';

const types = [
  { id: 1, type: 'Alpha' },
  { id: 2, type: 'Beta' },
  { id: 3, type: 'Production' },
  { id: 4, type: 'Custom' }
];

const AppCreate = () => {
  const { data: sessionData } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOS, setSelectedOS] = useState<string>('android');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    Types[selectedOS]?.platform || ['Java / Kotlin']
  );
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedPlatform, setSelectedPlatform] = useState(
    selectedPlatforms[0]
  );

  const addApp = api.apps.addApp.useMutation({
    onSuccess: () => {
      closeModal();
    }
  });

  const resetReleaseTypes = (types: Array<{ id: number; type: string }>) => {
    setSelectedType(types[0]);
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOS = event.target.value.toLowerCase();
    const platforms = Types[selectedOS]?.platform || [];
    const defaultPlatform = platforms[0];

    setSelectedOS(selectedOS);
    setSelectedPlatforms(platforms);
    setSelectedPlatform(defaultPlatform);
  };

  const renderPlatforms = () => {
    return selectedPlatforms.map((platform) => (
      <div
        key={`radio-${platform.toLowerCase()}`}
        className="flex flex-row gap-2"
      >
        <input
          required
          className="radio"
          id={`radio-${platform.toLowerCase().replace(/\s/g, '')}`}
          name="platform_input"
          tabIndex={0}
          type="radio"
          value={platform}
          checked={selectedPlatform?.toLowerCase() === platform.toLowerCase()}
          onChange={() => setSelectedPlatform(platform)}
        />
        <label htmlFor={`radio-${platform.toLowerCase()}`}>{platform}</label>
      </div>
    ));
  };

  const renderOS = () => {
    const OSes: string[] = ['Android', 'Windows'];

    return OSes.map((os) => (
      <div key={`radio-${os.toLowerCase()}`} className="flex flex-row gap-2">
        <input
          required
          className="radio"
          id={`radio-${os.toLowerCase().replace(/\s/g, '')}`}
          name="os_input"
          tabIndex={0}
          type="radio"
          value={os}
          onChange={handleOSChange}
          checked={selectedOS.toLowerCase() === os.toLowerCase()}
        />
        <label htmlFor={`radio-${os.toLowerCase()}`}>{os}</label>
      </div>
    ));
  };
  //Declaration for rendering
  const renderOSes = renderOS();
  const renderPlatform = renderPlatforms();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const name = data.name as string;
    const description = data.description as string;
    const image = data.image as string;

    startTransition(() => {
      addApp.mutate({
        name: name,
        description: description,
        image: image,
        releaseType: selectedType?.type || 'Alpha',
        os: selectedOS || 'Android',
        platform: selectedPlatform || 'Java / Kotlin'
      });
    });
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Button onClick={openModal} className="ml-4">
        Add new...
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    New project
                  </Dialog.Title>
                  <form
                    className="modal-box w-full"
                    id="app_create_form"
                    method="dialog"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row mt-3 flex-grow gap-4">
                        <div className="flex flex-col gap-1 flex-grow">
                          <RequiredLabel text="Project name" />
                          <TextInput
                            required
                            className="flex w-full"
                            name="name"
                            placeholder="Enter a project name"
                            tabIndex={0}
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <Text>Icon:</Text>
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex cursor-pointer">
                            <input className="hidden" id="image" type="file" />
                            <label
                              className="w-full h-full flex items-center justify-center"
                              htmlFor="file_input"
                            >
                              <ArrowUpTrayIcon className="h-6 w-6 stroke-gray-500" />
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1 flex-grow">
                        <Text>Description:</Text>
                        <TextInput
                          className="flex w-full"
                          name="description"
                          placeholder="Enter a project description"
                          tabIndex={0}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-row mt-3 flex-grow gap-4">
                        <div className="flex flex-col gap-1 flex-grow">
                          <RequiredLabel text="Release type" />
                          {selectedType && selectedType.type != 'Custom' && (
                            <Listbox
                              value={selectedType}
                              onChange={setSelectedType}
                            >
                              <Listbox.Button className="w-full cursor-pointer my-auto flex flex-row border cursor-default font-bold rounded-md text-gray-600 py-2 px-3 hover:bg-gray-100 focus:bg-dray-100 sm:text-sm">
                                <span className="block truncate my-auto flex flex-grow">
                                  {selectedType.type}
                                </span>
                                <span className="flex ml-left">
                                  <ChevronUpDownIcon className="w-5 h-5 stroke-gray-200" />
                                </span>
                              </Listbox.Button>
                              <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                              >
                                <Listbox.Options className="absolute mt-16 max-h-60 w-[400px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  {types.map((type, typeID) => (
                                    <Listbox.Option
                                      key={typeID}
                                      className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                          active
                                            ? 'bg-amber-100 text-amber-900'
                                            : 'text-gray-900'
                                        }`
                                      }
                                      value={type}
                                    >
                                      {({ selected }) => (
                                        <>
                                          <span
                                            className={`block truncate ${
                                              selected
                                                ? 'font-medium'
                                                : 'font-normal'
                                            }`}
                                          >
                                            {type.type === 'Custom'
                                              ? 'Custom...'
                                              : type.type}
                                          </span>
                                          {selected ? (
                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                              <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                aria-hidden="true"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                              >
                                                {' '}
                                                <path d="M20 6L9 17l-5-5" />
                                              </svg>
                                            </span>
                                          ) : null}
                                        </>
                                      )}
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </Listbox>
                          )}
                          {selectedType && selectedType.type == 'Custom' && (
                            <div
                              className="flex flex-col gap-1"
                              id="release_type_custom"
                            >
                              <TextInput
                                required
                                className="flex w-full"
                                id="release_type_input"
                                placeholder="Type your release type"
                                type="text"
                              />
                              <button
                                className="text-sm underline cursor-pointer text-left"
                                onClick={() => resetReleaseTypes(types)}
                              >
                                Return to pre-set release types
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-row gap-32 mt-3">
                        <RequiredLabel text="OS" />
                        <div className="flex flex-col gap-1">{renderOSes}</div>
                      </div>
                      <div className="flex flex-row gap-24 mt-3">
                        <RequiredLabel text="Platform" />
                        <div className="flex flex-col gap-1">
                          {renderPlatform}
                        </div>
                      </div>
                    </div>
                    <div className="mt-8 ml-auto">
                      <Button type="submit" className="ml-auto flex">
                        Create
                      </Button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default AppCreate;
