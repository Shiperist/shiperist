import { Fragment } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';
import { useSession } from 'next-auth/react';
import { api } from '~/utils/api';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function ProjectSelect() {
  const { data: sessionData } = useSession();
  const { data: data } = api.apps.list.useQuery(
    { pageSize: 25 }, // no input
    { enabled: sessionData?.user !== undefined }
  );
  const apps = data ?? [];
  const pathname = usePathname();
  const router = useRouter();

  const selectedApp = apps.find((app) => app.id === router.query.slug);

  if (!apps || apps.length === 0 || !selectedApp) {
    return null;
  }

  const navigateToApp = (id: string) => {
    void router.push(`/app/${id}`);
  };

  return (
    <Listbox value={selectedApp.id}>
      <div className="relative my-auto z-30">
        <Listbox.Button className="w-full my-auto cursor-default cursor-pointer rounded-lg text-gray-600 font-bold py-2 pl-3 pr-12 text-left hover:bg-gray-100 focus:bg-dray-100 sm:text-sm">
          <span className="block truncate">{selectedApp.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="w-5 h-5" aria-hidden="true" />
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
          <Listbox.Options className="absolute mt-1 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {apps.map((app, appIdx) => (
              <Listbox.Option
                key={appIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={app.id}
                onClick={() => navigateToApp(app.id)}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {app.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
