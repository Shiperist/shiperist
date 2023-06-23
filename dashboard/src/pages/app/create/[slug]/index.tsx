import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { Card, Text } from '@tremor/react';
import { type NextPage } from 'next';
import { useSession } from 'next-auth/react';
import React, { useState, useTransition } from 'react';
import { api } from '~/utils/api';
import { Types } from '~/types/app-types';
import Button from '~/components/Button/Button';
import Link from 'next/link';
import AppCreateInput from '~/components/app/create/app-create-input';
import { ChevronRight } from 'lucide-react';

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
        <Card className="shadow-0 ring-0 border-1 border-ctp-overlay1">
          <form
            className="modal-box w-full"
            id="app_create_form"
            method="dialog"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row mt-3 flex-grow gap-4">
                <div className="flex flex-col gap-10 flex-grow">
                  <AppCreateInput
                    name="App Name"
                    optional={false}
                    placeholder="my-app"
                  >
                    This is the name of your app.
                  </AppCreateInput>
                  <AppCreateInput
                    name="App Icon"
                    optional={true}
                    placeholder="https://example.com/icon.png"
                  >
                    A url to an image that will be used as the icon for your
                    app. This is only used for display purposes.
                  </AppCreateInput>
                  <AppCreateInput
                    name="App Description"
                    optional={true}
                    placeholder="This is my app. It does stuff."
                  >
                    A description of your app. What does it do? What is it for?
                    This is only used for display purposes.
                  </AppCreateInput>
                  <AppCreateInput
                    name="Platform"
                    optional={true}
                    placeholder="e.g. src"
                  >
                    The root directory of your app. This is where the build
                    command will be run.
                  </AppCreateInput>
                  <AppCreateInput
                    name="Root Directory"
                    optional={true}
                    placeholder="react-native"
                  >
                    A platform is a system on which is you app built. For
                    example, if your OS of choice is Windows, you can choose
                    between UWP, Win32 and WSL. You can see the list of
                    supported platforms
                    {'here'}
                  </AppCreateInput>
                  <Card className="flex flex-row gap-4 shadow-0 ring-0 border-1 border-ctp-overlay1">
                    <ChevronRight className="w-5 h-5 text-ctp-text" />
                    <Text className="text-ctp-text font-bold">
                      Android Build Settings
                    </Text>
                  </Card>
                  <Card className="flex flex-row gap-4 shadow-0 ring-0 border-1 border-ctp-overlay1">
                    <ChevronRight className="w-5 h-5 text-ctp-text" />
                    <Text className="text-ctp-text font-bold">
                      iOS Build Settings
                    </Text>
                  </Card>
                  <Card className="flex flex-row gap-4 shadow-0 ring-0 border-1 border-ctp-overlay1">
                    <ChevronRight className="w-5 h-5 text-ctp-text" />
                    <Text className="text-ctp-text font-bold">
                      Windows Build Settings
                    </Text>
                  </Card>
                </div>
              </div>
              <Button type="submit" className="mt-8 w-full" variant="success">
                Create
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Import;
