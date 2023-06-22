import { Listbox, Transition } from '@headlessui/react';
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChevronUpDownIcon,
  FolderIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Card, Divider, Flex, Text, TextInput, Title } from '@tremor/react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { Fragment, useState, useTransition } from 'react';
import { api } from '~/utils/api';
import { Types } from '~/types/app-types';
import RequiredLabel from '~/components/base/required-label';
import InfoCircle from '~/components/base/info-circle';
import Button from '~/components/button/Button';
import Link from 'next/link';

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

  const [selectedType, setSelectedType] = useState(types[0]);

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
    setSelectedType(types[0]);
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
          className="text-ctp-text"
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
        <label className="text-ctp-text" htmlFor={`radio-${os.toLowerCase()}`}>
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
        releaseType: selectedType?.type || 'Alpha',
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
    <div className="midwrap max-w-7xl mx-auto px-8">
      <div className="tbwrap py-8 flex flex-col gap-4">
        <a
          onClick={() => navigateToImport}
          className="text-ctp-text flex flex-row gap-2 hover:underline cursor-pointer"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <Text>Back to import</Text>
        </a>
        <text className="text-3xl text-ctp-text">
          Importing from
          <Link href={''} className="font-bold text-ctp-text">
            {' '}
            zZHorizonZz
          </Link>
        </text>
        <form
          className="modal-box w-full"
          id="app_create_form"
          method="dialog"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2 py-8">
            <div className="flex flex-row mt-3 flex-grow gap-4">
              <div className="flex flex-col gap-10 flex-grow">
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">App name</Text>
                    <Text className="text-ctp-subtext0">
                      This is the name of your app.
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="my-app"
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">
                      App icon{' '}
                      <span className="text-ctp-subtext0 font-normal">
                        (Optional)
                      </span>
                    </Text>
                    <Text className="text-ctp-subtext0">
                      A url to an image that will be used as the icon for your
                      app. This is only used for display purposes.
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="https://example.com/icon.png"
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">
                      App description{' '}
                      <span className="text-ctp-subtext0 font-normal">
                        (Optional)
                      </span>
                    </Text>
                    <Text className="text-ctp-subtext0">
                      A description of your app. What does it do? What is it
                      for? This is only used for display purposes.
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="This is my app. It does stuff."
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">
                      Root directory{' '}
                      <span className="text-ctp-subtext0 font-normal">
                        (Optional)
                      </span>
                    </Text>
                    <Text className="text-ctp-subtext0">
                      The root directory of your app. This is where the build
                      command will be run.
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="e.g. src"
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">
                      App description{' '}
                      <span className="text-ctp-subtext0 font-normal">
                        (Optional)
                      </span>
                    </Text>
                    <Text className="text-ctp-subtext0">
                      A description of your app. What does it do? What is it
                      for? This is only used for display purposes.
                    </Text>
                  </div>
                  {/*selectedType?.type != 'Custom' && (
                    <Listbox
                      value={selectedType}
                      onChange={setSelectedType}
                    >
                      <Listbox.Button
                        className='w-full cursor-pointer my-auto flex flex-row border cursor-default font-bold rounded-md text-ctp-text py-2 px-3 hover:bg-ctp-crust focus:bg-ctp-crust sm:text-sm'>
                              <span className='block truncate my-auto flex flex-grow'>
                                {selectedType?.type}
                              </span>
                        <span className='flex ml-left'>
                                <ChevronUpDownIcon className='w-5 h-5 stroke-ctp-overlay1' />
                              </span>
                      </Listbox.Button>
                      <Transition
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 scale-95'
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'
                      >
                        <Listbox.Options
                          className='absolute mt-16 max-h-60 w-[640px] overflow-y-auto rounded-md bg-ctp-crust py-1 text-ctp-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                          {types.map((type, typeID) => (
                            <Listbox.Option
                              key={typeID}
                              className={({ active }) =>
                                `relative cursor-default select-none py-2 px-4 ${
                                  active
                                    ? 'bg-ctp-mantle text-ctp-text cursor-pointer'
                                    : 'text-ctp-text'
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
                  {selectedType?.type == 'Custom' && (
                    <div
                      className='flex flex-col gap-1'
                      id='release_type_custom'
                    >
                      <TextInput
                        required
                        className='flex w-full'
                        id='release_type_input'
                        placeholder='Type your release type'
                        type='text'
                      />
                      <button
                        className='text-sm underline cursor-pointer text-left text-ctp-text'
                        onClick={() => resetReleaseTypes(types)}
                      >
                        Return to pre-set release types
                      </button>
                    </div>
                  )*/}
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">Platform</Text>
                    <Text className="text-ctp-subtext0">
                      A platform is a system on which is you app built. For
                      example, if your OS of choice is Windows, you can choose
                      between UWP, Win32 and WSL. You can see the list of
                      supported platforms
                      {'here'}
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="This is my app. It does stuff."
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
                <Flex
                  justifyContent="start"
                  alignItems="start"
                  flexDirection="row"
                  className="gap-8"
                >
                  <div className="basis-2/5">
                    <Text className="font-bold text-ctp-text">
                      Build Command{' '}
                      <span className="text-ctp-subtext0 font-normal">
                        (Optional)
                      </span>
                    </Text>
                    <Text className="text-ctp-subtext0">
                      This command will be executed when the app is built and is
                      executed in the root of the repository. If you don't
                      specify a build command, the app will be built using the
                      default build command for the platform.
                    </Text>
                  </div>
                  <TextInput
                    required
                    className="flex w-full h-12 text-ctp-text"
                    name="name"
                    placeholder="dotnet publish -c Release -r win-x64"
                    tabIndex={0}
                    type="text"
                  />
                </Flex>
              </div>
            </div>
          </div>
          <Button type="submit" className="ml-auto w-full" variant="success">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Import;
