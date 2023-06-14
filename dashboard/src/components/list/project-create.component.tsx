import React, { Fragment, useState, useTransition } from 'react';
import { Button, TextInput } from '@tremor/react';
import { Dialog, Transition, Listbox } from '@headlessui/react';

interface OSData {
  platform: string[];
}

interface OSOptions {
  [key: string]: OSData;
}

const OS: OSOptions = {
  android: {
    platform: ['Java / Kotlin', 'React Native', 'Xamarin', 'Unity']
  },
  windows: {
    platform: ['UWP', 'WPF', 'WinForms', 'Unity']
  }
};

const types = [
  { id: 1, type: 'Alpha' },
  { id: 2, type: 'Beta' },
  { id: 3, type: 'Production' },
  { id: 4, type: 'Custom' }
];

const ProjectCreateComponent = () => {
  const [isPending, startTransition] = useTransition();
  let [isOpen, setIsOpen] = useState(false);
  const [selectedOS, setSelectedOS] = useState<string>('android');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    OS[selectedOS]?.platform || ['Java / Kotlin']
  );
  const [selectedType, setSelectedType] = useState(types[0]);
  const [selectedPlatform, setSelectedPlatform] = useState(
    selectedPlatforms[0]
  );

  const resetReleaseTypes = (types: Array<{ id: number; type: string }>) => {
    setSelectedType(types[0]);
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOS = event.target.value.toLowerCase();
    const platforms = OS[selectedOS]?.platform || [];
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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div>
      <Button className="ml-4" onClick={openModal}>
        Add project
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
                    id="project_create_form"
                    method="dialog"
                  >
                    <Button
                      className="absolute right-2 top-2 !bg-transparent text-black !border-transparent"
                      onClick={closeModal}
                      size="xs"
                    >
                      ✕
                    </Button>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row mt-3 flex-grow gap-4">
                        <div className="flex flex-col gap-1 flex-grow">
                          <p className="text-sm">
                            Project name:
                            <span className="text-red-600"> *</span>
                          </p>
                          <TextInput
                            required
                            className="input input-bordered flex w-full"
                            id="project_name"
                            placeholder="Enter a project name"
                            tabIndex={0}
                            type="text"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-sm">Icon:</p>
                          <div className="w-12 h-12 bg-gray-200 rounded-full flex cursor-pointer">
                            <input
                              className="hidden"
                              id="file_input"
                              type="file"
                            />
                            <label
                              className="w-full h-full flex items-center justify-center"
                              htmlFor="file_input"
                            >
                              <svg
                                className="w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M19 9l-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0-6.258-5.908L12.24 1.462A1.55 1.55 0 0010.882 1H9.118a1.55 1.55 0 00-1.358.462L7.258 3.092 1 9m18 0v8a2 2 0 01-2 2H3a2 2 0 01-2-2V9m0 0h18" />
                              </svg>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row mt-3 flex-grow gap-4">
                        <div className="flex flex-col gap-1 flex-grow">
                          <p className="text-sm">
                            Release type:
                            <span className="text-red-600"> *</span>
                          </p>
                          {selectedType && selectedType.type != 'Custom' && (
                            <Listbox
                              value={selectedType}
                              onChange={setSelectedType}
                            >
                              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">
                                  {selectedType.type}
                                </span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                  >
                                    <path d="M19 9l-7 7-7-7" />
                                  </svg>
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
                                className="input input-bordered flex w-full"
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
                        <p className="text-sm">
                          OS:<span className="text-red-600"> *</span>
                        </p>
                        <div className="flex flex-col gap-1">{renderOSes}</div>
                      </div>
                      <div className="flex flex-row gap-24 mt-3">
                        <p className="text-sm">
                          Platform:<span className="text-red-600"> *</span>
                        </p>
                        <div className="flex flex-col gap-1">
                          {renderPlatform}
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="mt-8 place-items-end">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Create
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProjectCreateComponent;
