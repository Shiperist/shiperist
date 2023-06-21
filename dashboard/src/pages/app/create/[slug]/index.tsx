import { Listbox, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChevronUpDownIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Card, Divider, Text, TextInput, Title } from '@tremor/react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { Fragment, useState, useTransition } from 'react';
import { api } from '~/utils/api';
import { Types } from '~/types/app-types';
import Button from '~/components/base/button';
import RequiredLabel from '~/components/base/required-label';
import InfoCircle from '~/components/base/info-circle';

const types = [
  { id: 1, type: 'Alpha' },
  { id: 2, type: 'Beta' },
  { id: 3, type: 'Production' },
  { id: 4, type: 'Custom' }
];

const Import: NextPage = () => {
  const { data: sessionData } = useSession();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOSes, setSelectedOSes] = useState<string[]>(
    Object.keys(Types) || ['Android']
  );
  const [selectedOS, setSelectedOS] = useState<string>(selectedOSes[0] || '');

  const [selectedType, setSelectedType] = useState<string>(
    types[0]?.type || ''
  );

  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    Types[selectedOS]?.platform || ['Java / Kotlin']
  );

  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    selectedPlatforms[0] || ''
  );

  const { data: repositories } = api.integrations.listRepositories.useQuery({
    provider: 'github'
  });

  //console.log(repositories);

  const addApp = api.apps.addApp.useMutation({
    onSuccess: () => {
      //closeModal();
    }
  });

  const resetReleaseTypes = (types: Array<{ id: number; type: string }>) => {
    setSelectedType(types[0]?.type || '');
  };

  const handleOSChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const OSes = Object.keys(Types) || [];
    const selectedOS = event.target.value;
    const platforms = Types[selectedOS]?.platform || [];
    const defaultPlatform = platforms[0] || 'Java / Kotlin';

    setSelectedOSes(OSes);
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
        <label
          className="text-cat-text"
          htmlFor={`radio-${platform.toLowerCase()}`}
        >
          {platform}
        </label>
      </div>
    ));
  };

  const renderOS = () => {
    return selectedOSes.map((os) => (
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
        <label className="text-cat-text" htmlFor={`radio-${os.toLowerCase()}`}>
          {os.charAt(0).toUpperCase() + os.slice(1)}
        </label>
      </div>
    ));
  };

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
        releaseType: selectedType || 'Alpha',
        os: selectedOS || 'Android',
        platform: selectedPlatform || 'Java / Kotlin'
      });
    });
  };

  const router = useRouter();

  const navigateToImport = () => {
    void router.push(`/new`);
  };

  return (
    <div className="midwrap max-w-full w-[800px] mx-auto px-4">
      <div className="tbwrap py-8 flex flex-col gap-4">
        <a
          onClick={() => navigateToImport}
          className="text-cat-text flex flex-row gap-2 hover:underline cursor-pointer"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <Text>Back to import</Text>
        </a>
        <div className="flex flex-row gap-2">
          <Card className="border border-dashed border-cat-overlay1 bg-cat-mantle px-6">
            <div className="px-6 py-2 my-auto">
              <Title className="text-lg font-medium font-bold leading-6 text-cat-text">
                Github repository
              </Title>
              <div className="flex flex-row">
                <div className="bg-cat-crust w-fit rounded-lg px-4 py-4 my-auto">
                  <Text className="text-cat-text">Github Repo</Text>
                </div>
                <div className="ml-auto px-4 flex flex-col bg-cat-crust rounded-lg py-2">
                  <div className="flex flex-row gap-1">
                    <FolderIcon className="w-4 h-4 stroke-cat-overlay1" />
                    <Text className="flex flex-row gap-1 text-cat-text">
                      User/Github Repo
                    </Text>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FolderIcon className="w-4 h-4 stroke-cat-overlay1" />
                    <Text className="flex flex-row gap-1 text-cat-text">
                      Branch
                    </Text>
                  </div>
                  <div className="flex flex-row gap-1">
                    <FolderIcon className="w-4 h-4 stroke-cat-overlay1" />
                    <Text className="flex flex-row gap-1 text-cat-text">
                      ./
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <Card className="border border-dashed border-cat-overlay1 bg-cat-mantle">
          <div className="overflow-y-auto w-full">
            <div className="flex min-h-full w-full p-2">
              <div className="w-full transform overflow-hidden rounded-lg bg-cat-mantle p-6 text-left align-middle transition-all">
                <Title className="text-lg font-medium font-bold leading-6 text-cat-text">
                  Configure project
                </Title>
                <Divider className="bg-cat-text" />
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
                          className="flex w-full text-cat-text"
                          name="name"
                          placeholder="Enter a project name"
                          tabIndex={0}
                          type="text"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <Text className="text-cat-text">Icon:</Text>
                        <div className="w-12 h-12 bg-cat-overlay1 rounded-full flex cursor-pointer">
                          <input className="hidden" id="image" type="file" />
                          <label
                            className="w-full h-full flex items-center justify-center"
                            htmlFor="file_input"
                          >
                            <ArrowUpTrayIcon className="h-6 w-6 stroke-cat-text" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 flex-grow">
                      <Text className="text-cat-text">Description:</Text>
                      <TextInput
                        className="flex w-full text-cat-text"
                        name="description"
                        placeholder="Enter a project description"
                        tabIndex={0}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-row mt-3 flex-grow gap-4">
                      <div className="flex flex-col gap-1 flex-grow">
                        <div className="flex flex-row gap-2">
                          <RequiredLabel text="Release type" />
                          <InfoCircle tooltip="test tooltip"></InfoCircle>
                        </div>
                        {selectedType != 'Custom' && (
                          <Listbox
                            value={selectedType}
                            onChange={setSelectedType}
                          >
                            <Listbox.Button className="w-full cursor-pointer my-auto flex flex-row border cursor-default font-bold rounded-md text-cat-text py-2 px-3 hover:bg-cat-crust focus:bg-cat-crust sm:text-sm">
                              <span className="block truncate my-auto flex flex-grow">
                                {selectedType}
                              </span>
                              <span className="flex ml-left">
                                <ChevronUpDownIcon className="w-5 h-5 stroke-cat-overlay1" />
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
                              <Listbox.Options className="absolute mt-16 max-h-60 w-[640px] overflow-y-auto rounded-md bg-cat-crust py-1 text-cat-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {types.map((type, typeID) => (
                                  <Listbox.Option
                                    key={typeID}
                                    className={({ active }) =>
                                      `relative cursor-default select-none py-2 px-4 ${
                                        active
                                          ? 'bg-cat-mantle text-cat-text cursor-pointer'
                                          : 'text-cat-text'
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
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </Listbox>
                        )}
                        {selectedType == 'Custom' && (
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
                              className="text-sm underline cursor-pointer text-left text-cat-text"
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
                      <div className="flex flex-col gap-1">{renderOS()}</div>
                    </div>
                    <div className="flex flex-row gap-24 mt-3">
                      <RequiredLabel text="Platform" />
                      <div className="flex flex-col gap-1">
                        {renderPlatforms()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-8 ml-auto">
                    <Button
                      type="submit"
                      className="ml-auto w-full justify-center flex px-2 py-1"
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Import;
